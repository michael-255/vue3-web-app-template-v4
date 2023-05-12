<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { Key, Type } from '@/types/database'
import { ref, type Ref, onUnmounted } from 'vue'
import type { DashboardListCardProps } from '@/types/general'
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

// Composables & Stores
const uiStore = useUIStore()
const { log } = useLogger()
const { goToCreate } = useRoutables()

// Data
const showDescription: Ref<boolean> = ref(false)
const dashboardCards: Ref<{ [key in Type]: DashboardListCardProps[] }> = ref(
  Object.values(Type).reduce((acc, type) => {
    acc[type] = []
    return acc
  }, {} as { [key in Type]: DashboardListCardProps[] })
)
const dashboardOptions = DataSchema.getParentTypeOptions()

// Subscriptions
const settingsSubscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    showDescription.value = !!liveSettings.find((s) => s.key === Key.SHOW_DESCRIPTIONS)?.value
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

/**
 * Returns dashboard cards for current dashboard selection.
 */
function currentDashboardCards() {
  return dashboardCards.value[uiStore.dashboardType]
}

/**
 * Returns display string with record count for bottom of dashboard page.
 */
function getCountDisplay() {
  return getRecordsCountDisplay(dashboardCards.value[uiStore.dashboardType])
}

/**
 * Returns label text for create button on bottom of dashboard page.
 */
function getCreateLabel() {
  const labelSingular = DataSchema.getLabelSingular(uiStore.dashboardType)
  return `Create ${labelSingular}`
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DASHBOARD" bannerTitle="Dashboard">
    <WelcomeOverlay />

    <!-- Dashboard Selection -->
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">What would you like to work on?</p>

        <QOptionGroup
          color="primary"
          :options="dashboardOptions"
          :model-value="uiStore.dashboardType"
          @update:model-value="uiStore.dashboardType = $event"
        />
      </QCardSection>
    </QCard>

    <!-- Dashboard Cards -->
    <div v-for="(dashboardCard, i) in currentDashboardCards()" :key="i">
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

      <p class="col-12 text-grey text-center">{{ getCountDisplay() }}</p>

      <QBtn
        color="positive"
        :icon="Icon.CREATE"
        :label="`${getCreateLabel()}`"
        @click="goToCreate(uiStore.dashboardType)"
      />
    </div>
  </ResponsivePage>
</template>
