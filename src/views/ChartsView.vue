<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Icon } from '@/types/icons'
import { AppName, ChartTime } from '@/types/general'
import { useMeta } from 'quasar'
import useUIStore from '@/stores/ui'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DataSchema from '@/services/DataSchema'

useMeta({ title: `${AppName} - Charts` })

const uiStore = useUIStore()
const { routeType } = useRoutables()

const inputRef: Ref<any> = ref(null)
const options: Ref<ChartTime[]> = ref(Object.values(ChartTime))
const title = DataSchema.getParentLabelSingular(routeType)
const chartProps = DataSchema.getChartProps(routeType)

function chartTimeRule(time: string) {
  return time !== undefined && time !== null && time !== ''
}
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.CHARTS"
    :bannerTitle="`${title} Charts`"
    :showPageNoData="chartProps.length === 0"
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
          :rules="[(time: ChartTime) => chartTimeRule(time) || '* Required']"
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
    <div v-for="(chartProp, i) in chartProps" :key="i" class="q-mb-md">
      <component :is="chartProp.component" />
    </div>
  </ResponsivePage>
</template>
