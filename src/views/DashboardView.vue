<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import { Key, Relation } from '@/types/database'
import { ref, type Ref, onUnmounted } from 'vue'
import type { DashboardCard } from '@/types/misc'
import { getRecordsCountDisplay } from '@/utils/common'
import { appSchema } from '@/services/AppSchema'
import ResponsivePage from '@/components/ResponsivePage.vue'
import WelcomeOverlay from '@/components/WelcomeOverlay.vue'
import useUIStore from '@/stores/ui'
import useLogger from '@/composables/useLogger'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Dashboard` })

// Composables & Stores
const uiStore = useUIStore()
const { log } = useLogger()

// Data
const showDescriptions: Ref<boolean> = ref(false)
const dashboardCards: Ref<DashboardCard[]> = ref([])
const dashboardOptions = appSchema
  .filter((i) => i.relation === Relation.PARENT)
  .map((p) => ({
    label: p.labelPlural,
    value: p.labelPlural,
  }))

// Subscriptions
const settingsSubscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    showDescriptions.value = liveSettings.find((s) => s.key === Key.SHOW_DESCRIPTIONS)?.value
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

const dashboardSubscription = DB.liveDashboard().subscribe({
  next: (liveDashboard) => {
    const favorites: DashboardCard[] = []
    const nonFavorites: DashboardCard[] = []

    liveDashboard.forEach((p) => {
      const dashboardCard = {
        labelPlural: appSchema.find((i) => i.type === p.type && i.relation === Relation.PARENT)
          ?.labelPlural,
        id: p.id,
        timestamp: p.timestamp,
        type: p.type,
        relation: p.relation,
        name: p.name,
        desc: p.desc,
        favorited: p.favorited,
        previousNote: '', // TODO
        previousChildTimestamp: 0, // TODO
      } as DashboardCard

      if (p.favorited === true) {
        favorites.push(dashboardCard)
      } else {
        nonFavorites.push(dashboardCard)
      }
    })

    dashboardCards.value = [...favorites, ...nonFavorites]
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
function getRecordCreateLabel() {
  const labelSingular = appSchema.find(
    (i) => i.labelPlural === uiStore.dashboardSelection
  )?.labelSingular

  return `Create ${labelSingular}`
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DASHBOARD" bannerTitle="Dashboard">
    <WelcomeOverlay />

    <!-- Dashboard Selection -->
    <QCard class="q-mb-md">
      <QCardSection>
        <div class="text-h6 q-mb-xs">What would you like to work on?</div>

        <QOptionGroup
          color="primary"
          :options="dashboardOptions"
          :model-value="uiStore.dashboardSelection"
          @update:model-value="uiStore.dashboardSelection = $event"
        />
      </QCardSection>
    </QCard>

    <!-- Dashboard Cards -->
    <div
      v-for="(dashboardCard, i) in dashboardCards.filter(
        (dc) => dc.labelPlural === uiStore.dashboardSelection
      )"
      :key="i"
    >
      <QCard class="q-mb-md">
        <QCardSection>
          {{ dashboardCard }}
          <QBtn round color="positive" :icon="Icon.ADD_NOTE" />
        </QCardSection>
      </QCard>
    </div>

    <!-- Record Count & Create -->
    <div class="row justify-center q-my-md">
      <div class="col-12 text-center">
        <QIcon name="menu_open" size="80px" color="grey" />
      </div>

      <div class="col-12 text-grey text-center q-mb-md">
        {{ getCountDisplay() }}
      </div>

      <QBtn color="positive" :icon="Icon.CREATE" :label="`${getRecordCreateLabel()}`" />
    </div>
  </ResponsivePage>
</template>
