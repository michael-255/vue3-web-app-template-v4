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
import { idSchema, allFields, recordTypes } from '@/types/core'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import useUIStore from '@/stores/ui'
import useChartTimeWatcher from '@/composables/useChartTimeWatcher'
import DB from '@/services/Database'
import { Duration } from '@/types/general'

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

const uiStore = useUIStore()
const { getPaletteColor } = colors
const { log } = useLogger()
const { routeType, routeId } = useRoutables()
useChartTimeWatcher(recalculateChart)

const recordCount: Ref<number> = ref(0)
const chartLabel = 'Percentages'
const chartOptions = {
  reactive: true,
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.75,
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

async function recalculateChart() {
  try {
    // Get all records for the current route type and id
    const isTypeValid = recordTypes.safeParse(routeType).success
    const isIdValid = idSchema.safeParse(routeId).success

    if (isTypeValid && isIdValid) {
      const chartingRecords = await DB.getCoreSubRecords(routeId as string)

      // Continue if there are records
      if (chartingRecords.length > 0) {
        // Filter records to only include those within the chart time
        const timeRestrictedRecords = chartingRecords.filter((record: any) => {
          const timeDifference = new Date().getTime() - record[allFields.Values.timestamp]
          return timeDifference <= Duration[uiStore.chartTime]
        })

        recordCount.value = timeRestrictedRecords.length

        // Create chart label dates from the created timestamps
        const chartLabels = timeRestrictedRecords.map((record: any) =>
          date.formatDate(record[allFields.Values.timestamp], 'YYYY MMM D')
        )

        // Create chart data from the number fields
        const chartDataItems = timeRestrictedRecords.map(
          (record: any) => record[allFields.Values.percent]
        )

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
      <p class="text-h6">{{ chartLabel }}</p>

      <!-- Chart -->
      <div v-if="recordCount > 0">
        <Line :options="chartOptions" :data="chartData" />

        <QBadge rounded color="secondary" class="q-py-none">
          <span class="text-caption">{{ recordCount }} in time frame</span>
        </QBadge>
      </div>

      <!-- No Data -->
      <div v-else>
        <div class="text-bold q-my-md">No Records Found</div>
        <div>This item may not have any records created for it yet.</div>
      </div>
    </QCardSection>
  </QCard>
</template>