<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import { Key } from '@/types/database'
import { ref, type Ref, onUnmounted } from 'vue'
import ResponsivePage from '@/components/ResponsivePage.vue'
import useLogger from '@/composables/useLogger'
import DB from '@/services/LocalDatabase'
import type { Record } from '@/types/models'

useMeta({ title: `${AppName} - Dashboard` })

// Composables & Stores
const { log } = useLogger()

// Data
// const dashboardListOptions = getParentCategoryTypes().map((type, i) => ({
//   label: type,
//   value: i,
// }))
const showWelcome: Ref<any> = ref(null)
const showDescriptions: Ref<any> = ref(null)
const records: Ref<Record[]> = ref([])

// Subscriptions
const settingsSubscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    showWelcome.value = liveSettings.find((s) => s.key === Key.SHOW_WELCOME)?.value
    showDescriptions.value = liveSettings.find((s) => s.key === Key.SHOW_DESCRIPTIONS)?.value
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

const dashboardSubscription = DB.liveDashboard().subscribe({
  next: (liveDashboard) => {
    records.value = liveDashboard
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
    <div>Dashboard</div>
  </ResponsivePage>
</template>
