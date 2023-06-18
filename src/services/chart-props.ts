import type { ChartProps } from '@/types/database'
import { defineAsyncComponent } from 'vue'

export const percentChart: ChartProps = {
  component: defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue')),
}
