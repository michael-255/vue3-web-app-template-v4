<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Duration, Icon } from '@/types/general'
import { AppName } from '@/constants/global'
import { useMeta } from 'quasar'
import { recordGroups } from '@/types/database'
import useUIStore from '@/stores/ui'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DataSchema from '@/services/DataSchema'

useMeta({ title: `${AppName} - Charts` })

const uiStore = useUIStore()
const { routeType } = useRoutables()

const inputRef: Ref<any> = ref(null)
const options: Ref<string[]> = ref([
  Duration[Duration['One Week']],
  Duration[Duration['One Month']],
  Duration[Duration['Three Months']],
  Duration[Duration['Six Months']],
  Duration[Duration['One Year']],
  Duration[Duration['All Time']],
])
const title = DataSchema.getLabel(recordGroups.Values.core, routeType, 'singular')
const charts = DataSchema.getCharts(routeType)

function chartTimeRule(time: string) {
  return time !== undefined && time !== null && time !== ''
}
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.CHARTS"
    :bannerTitle="`${title} Charts`"
    :showPageNoData="charts.length === 0"
  >
    <!-- Chart Time used by UI store -->
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Chart Time</p>

        <p>Select how far back you want the charts to display record data.</p>

        <QSelect
          v-model="uiStore.chartTime"
          ref="inputRef"
          label="Chart Time"
          :options="options"
          :rules="[(chartTime: string) => chartTimeRule(chartTime) || '* Required']"
          emit-value
          map-options
          options-dense
          dense
          outlined
          color="primary"
          @blur="!!inputRef?.value?.validate()"
        />
      </QCardSection>
    </QCard>

    <!-- Chart components -->
    <div v-for="(chart, i) in charts" :key="i" class="q-mb-md">
      <component :is="chart" />
    </div>
  </ResponsivePage>
</template>
