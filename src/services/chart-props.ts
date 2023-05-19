import type { ChartProps } from '@/types/database'
import { defineAsyncComponent } from 'vue'

/**
 * Percent chart for child records.
 */
export const percentChart: ChartProps = {
  component: defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue')),
}
