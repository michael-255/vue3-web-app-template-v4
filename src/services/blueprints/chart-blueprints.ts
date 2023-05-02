import type { ChartBlueprint } from '@/types/misc'
import { date } from 'quasar'
import { defineAsyncComponent } from 'vue'

/*
This file contains chart objects used to help render chart data.
Do NOT mutate these objects as they are used by multiple components.
*/

/**
 * Numbers chart for child records.
 */
export const numberChart: ChartBlueprint = {
  label: 'Numbers',
  chartOptions: {
    reactive: true,
    responsive: true,
    radius: 2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem: any) => {
            return date.formatDate(tooltipItem?.[0]?.label, 'ddd, YYYY MMM D, h:mm a')
          },
        },
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 70,
          minRotation: 70,
        },
      },
    },
  },
  component: defineAsyncComponent(() => import('@/components/charts/ChartNumbers.vue')),
}
