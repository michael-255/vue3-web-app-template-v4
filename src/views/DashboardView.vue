<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import { Key, Group, Type } from '@/types/database'
import { ref, type Ref, onUnmounted } from 'vue'
import type { DashboardCard } from '@/types/misc'
import { getRecordsCountDisplay } from '@/utils/common'
import { appSchema } from '@/services/AppSchema'
import ResponsivePage from '@/components/ResponsivePage.vue'
import WelcomeOverlay from '@/components/WelcomeOverlay.vue'
import DashboardParentCard from '@/components/DashboardParentCard.vue'
import useRoutables from '@/composables/useRoutables'
import useUIStore from '@/stores/ui'
import useLogger from '@/composables/useLogger'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Dashboard` })

// Composables & Stores
const uiStore = useUIStore()
const { log } = useLogger()
const { goToCreate } = useRoutables()

// Data
const showDescription: Ref<boolean> = ref(false)
const dashboardCards: Ref<DashboardCard[]> = ref([])
const dashboardOptions = appSchema
  .filter((i) => i.group === Group.PARENT)
  .map((p) => ({
    label: p.labelPlural,
    value: p.labelPlural,
  }))

// Subscriptions
const settingsSubscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    showDescription.value = liveSettings.find((s) => s.key === Key.SHOW_DESCRIPTIONS)?.value
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
  return dashboardCards.value.filter((dc) => dc.labelPlural === uiStore.dashboardSelection)
}

/**
 * Returns display string with record count for bottom of dashboard page.
 */
function getCountDisplay() {
  return getRecordsCountDisplay(
    dashboardCards.value.filter((dc) => dc.labelPlural === uiStore.dashboardSelection)
  )
}

/**
 * Returns label text for create button on bottom of dashboard page.
 */
function getCreateLabel() {
  const labelSingular = appSchema.find(
    (i) => i.labelPlural === uiStore.dashboardSelection
  )?.labelSingular

  return `Create ${labelSingular}`
}

/**
 * Returns schema type for creat based on dashboard selection.
 */
function getSchemaType() {
  return appSchema.find((i) => i.labelPlural === uiStore.dashboardSelection)?.type as Type
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
          :model-value="uiStore.dashboardSelection"
          @update:model-value="uiStore.dashboardSelection = $event"
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
          round
          color="positive"
          :icon="Icon.ADD_NOTE"
          @click="goToCreate(dashboardCard.type, Group.CHILD, dashboardCard.sk)"
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
        @click="goToCreate(getSchemaType(), Group.PARENT)"
      />
    </div>
  </ResponsivePage>
</template>
