<script setup lang="ts">
import { colors, date } from 'quasar'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { onMounted, ref, type Ref } from 'vue'
import { Field, type Type } from '@/types/database'
import { typeValidator, idValidator } from '@/services/validators'
import DataSchema from '@/services/DataSchema'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import useUIStore from '@/stores/ui'
import useChartTimeWatcher from '@/composables/useChartTimeWatcher'
import DB from '@/services/Database'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

// Composables & Stores
const uiStore = useUIStore()
const { getPaletteColor } = colors
const { log } = useLogger()
const { routeType, routeId } = useRoutables()
useChartTimeWatcher(recalculateChart)

// Data
const chartLabel = 'Percentages'
const chartOptions = {
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
}
const recordCount: Ref<number> = ref(0)
const chartData: Ref<{
  labels: any[]
  datasets: any[]
}> = ref({
  labels: [],
  datasets: [],
})

onMounted(async () => {
  await recalculateChart()
})

/**
 * Returns the color for the chart line if the trend is downward.
 * @param ctx
 * @param value
 */
function downwardTrend(ctx: any, color: any) {
  return ctx.p0.parsed.y > ctx.p1.parsed.y ? color : undefined
}

/**
 * Rebuilds the chart data.
 */
async function recalculateChart() {
  try {
    // Get all records for the current route type and id
    const isTypeValid = await typeValidator.isValid(routeType)
    const isIdValid = await idValidator.isValid(routeId)

    if (isTypeValid && isIdValid) {
      const childType = DataSchema.getChildType(routeType)
      const chartingRecords = await DB.getParentChildren(childType as Type, routeId as string)

      // Continue if there are records
      if (chartingRecords.length > 0) {
        const chartMilliseconds = uiStore.getChartTimeMilliseconds

        // Filter records to only include those within the chart time
        const timeRestrictedRecords = chartingRecords.filter((record: any) => {
          const timeDifference = new Date().getTime() - record[Field.TIMESTAMP]
          return timeDifference <= chartMilliseconds
        })

        recordCount.value = timeRestrictedRecords.length

        // Create chart label dates from the created timestamps
        const chartLabels = timeRestrictedRecords.map((record: any) =>
          date.formatDate(record[Field.TIMESTAMP], 'YYYY MMM D')
        )

        // Create chart data from the number fields
        const chartDataItems = timeRestrictedRecords.map((record: any) => record[Field.PERCENT])

        // Set chart data with the labels and data
        chartData.value = {
          labels: chartLabels,
          datasets: [
            {
              label: '', // Legend label
              backgroundColor: getPaletteColor('primary'),
              borderColor: getPaletteColor('primary'),
              segment: {
                borderColor: (ctx: any) =>
                  downwardTrend(ctx, getPaletteColor('accent')) || getPaletteColor('primary'),
              },
              data: chartDataItems,
            },
          ],
        }
      }
    }
  } catch (error) {
    log.error('Error loading numbers chart', error)
  }
}
</script>

<template>
  <QCard class="q-mb-md">
    <QCardSection>
      <div class="text-h6">{{ chartLabel }}</div>

      <!-- Chart -->
      <Line v-if="recordCount && recordCount > 0" :options="chartOptions" :data="chartData" />

      <!-- Record Count -->
      <QBadge v-if="recordCount && recordCount === 1" rounded color="secondary" class="q-py-none">
        <span class="text-caption">{{ recordCount }} record in time frame</span>
      </QBadge>
      <QBadge v-if="recordCount && recordCount > 1" rounded color="secondary" class="q-py-none">
        <span class="text-caption">{{ recordCount }} records in time frame</span>
      </QBadge>

      <!-- No Data -->
      <div v-else>
        <div class="text-bold q-my-md">No Records Found</div>
        <div>This item may not have any records created for it yet.</div>
      </div>
    </QCardSection>
  </QCard>
</template>
