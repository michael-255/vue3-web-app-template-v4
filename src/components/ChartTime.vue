<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { ChartTime } from '@/types/general'
import useUIStore from '@/stores/ui'

// Composables & Stores
const uiStore = useUIStore()

// Data
const inputRef: Ref<any> = ref(null)
const options: Ref<ChartTime[]> = ref(Object.values(ChartTime))

/**
 * Input rule test for the chart time.
 * @param time
 */
function chartTimeRule(time: string) {
  return time !== undefined && time !== null && time !== ''
}
</script>

<template>
  <QCard>
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
</template>
