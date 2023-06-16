<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { SettingKey, Type, type ParentRecord } from '@/types/database'
import { ref, type Ref, onUnmounted } from 'vue'
import { getRecordsCountDisplay } from '@/utils/common'
import DataSchema from '@/services/DataSchema'
import ResponsivePage from '@/components/ResponsivePage.vue'
import WelcomeOverlay from '@/components/WelcomeOverlay.vue'
import DashboardParentCard from '@/components/DashboardParentCard.vue'
import useRoutables from '@/composables/useRoutables'
import useUIStore from '@/stores/ui'
import useLogger from '@/composables/useLogger'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Dashboard` })

const uiStore = useUIStore()
const { log } = useLogger()
const { goToCreate } = useRoutables()

const showDescription: Ref<boolean> = ref(false)
const dashboardOptions = DataSchema.getParentTypeOptions()
const dashboardCards: Ref<ParentRecord[]> = ref([])

const settingsSubscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    showDescription.value = !!liveSettings.find((s) => s.key === SettingKey.SHOW_DESCRIPTIONS)
      ?.value
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

const dashboardSubscription = DB.liveDashboard().subscribe({
  next: (liveDashboard) => {
    dashboardCards.value = liveDashboard
  },
  error: (error) => {
    log.error('Error fetching live Dashboard', error)
  },
})

onUnmounted(() => {
  settingsSubscription.unsubscribe()
  dashboardSubscription.unsubscribe()
})
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DASHBOARD" bannerTitle="Dashboard">
    <WelcomeOverlay />

    <section class="q-mb-lg">
      <p class="text-h6 q-mb-sm">What would you like to work on?</p>

      <QOptionGroup
        color="primary"
        :options="dashboardOptions"
        :model-value="uiStore.dashboardType"
        @update:model-value="uiStore.dashboardType = $event"
      />
    </section>

    <!-- Dashboard Cards -->
    <div v-for="(dashboardCard, i) in dashboardCards[uiStore.dashboardType]" :key="i">
      <DashboardParentCard
        class="q-mb-md"
        :showDescription="showDescription"
        :dashboardCard="dashboardCard"
      >
        <QBtn
          label="Attach Record"
          color="primary"
          :icon="Icon.ADD_NOTE"
          @click="goToCreate(DataSchema.getChildType(dashboardCard.type) as Type, dashboardCard.id)"
        />
      </DashboardParentCard>
    </div>

    <!-- Record Count & Create -->
    <div class="row justify-center q-my-md">
      <div class="col-12 text-center">
        <QIcon name="menu_open" size="80px" color="grey" />
      </div>

      <p class="col-12 text-grey text-center">
        {{ getRecordsCountDisplay(dashboardCards[uiStore.dashboardType]) }}
      </p>

      <QBtn
        color="positive"
        :icon="Icon.CREATE"
        :label="`Create ${DataSchema.getLabelSingular(uiStore.dashboardType)}`"
        @click="goToCreate(uiStore.dashboardType)"
      />
    </div>
  </ResponsivePage>
</template>
