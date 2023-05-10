import { defineStore } from 'pinia'
import { ChartTime, Milliseconds } from '@/types/misc'
import { dataSchema } from '@/services/data-schema'
import { Group, Type } from '@/types/database'

const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    /**
     * Side nav drawer state.
     */
    drawer: false,
    /**
     * Currently selected dashboard list type.
     * - Select first parent type by default
     */
    dashboardType: dataSchema.filter((s) => s.group === Group.PARENT).map((p) => p.type)[0] as Type,
    /**
     * Currently selected chart time used for graphing.
     */
    chartTime: ChartTime.THREE_MONTHS,
  }),

  getters: {
    /**
     * Returns the milliseconds for the current chart time value.
     */
    getChartTimeMilliseconds: (state: any) => {
      return {
        [ChartTime.ONE_MONTH]: Milliseconds.PER_MONTH,
        [ChartTime.THREE_MONTHS]: Milliseconds.PER_THREE_MONTHS,
        [ChartTime.SIX_MONTHS]: Milliseconds.PER_SIX_MONTHS,
        [ChartTime.ONE_YEAR]: Milliseconds.PER_YEAR,
        [ChartTime.ALL_TIME]: Milliseconds.FOREVER,
      }[state.chartTime as ChartTime]
    },
  },
})

export default useUIStore
