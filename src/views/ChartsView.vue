<script setup lang="ts">
import { Icon } from '@/types/icons'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ChartTime from '@/components/ChartTime.vue'
import DataSchema from '@/services/DataSchema'

useMeta({ title: `${AppName} - Charts` })

// Composables & Stores
const { routeType } = useRoutables()

// Data
const title = DataSchema.getLabelSingular(routeType)
const chartProps = DataSchema.getChartProps(routeType)
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.CHARTS"
    :bannerTitle="`${title} Charts`"
    :showPageNoData="chartProps.length === 0"
  >
    <ChartTime class="q-mb-md" />

    <div v-for="(chartProp, i) in chartProps" :key="i" class="q-mb-md">
      <!-- Dynamic Async Components -->
      <component
        :is="chartProp.component"
        :label="chartProp.label"
        :chartOptions="chartProp.chartOptions"
      />
    </div>
  </ResponsivePage>
</template>
