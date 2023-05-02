<script setup lang="ts">
import { Icon } from '@/types/icons'
import { getChartBlueprints, getLabel } from '@/services/Blueprints'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ChartTimeInput from '@/components/charts/ChartTimeInput.vue'

useMeta({ title: `${AppName} - Charts` })

// Composables & Stores
const { routeDatabaseType } = useRoutables()

// Data
const chartBlueprints = getChartBlueprints(routeDatabaseType)
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.CHARTS"
    :bannerTitle="`${getLabel(routeDatabaseType, 'singular')} Charts`"
    :showPageNoData="chartBlueprints.length === 0"
  >
    <ChartTimeInput class="q-mb-md" />

    <div v-for="(chartBP, i) in chartBlueprints" :key="i" class="q-mb-md">
      <!-- Dynamic Async Components -->
      <component
        :is="chartBP.component"
        :label="chartBP.label"
        :chartOptions="chartBP.chartOptions"
      />
    </div>
  </ResponsivePage>
</template>
