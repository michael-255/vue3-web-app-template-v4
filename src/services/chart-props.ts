import { date } from 'quasar'
import type { ChartProps } from '@/types/database'
import { defineAsyncComponent } from 'vue'

/**
 * Percent chart for child records.
 */
export const percentChart: ChartProps = {
  label: 'Percent',
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
  component: defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue')),
}
