import { defineStore } from 'pinia'
import { ChartTime, Milliseconds } from '@/types/general'
import type { Type } from '@/types/database'
import DataSchema from '@/services/DataSchema'

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
    dashboardType: DataSchema.getParentTypes()[0] as Type,
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
