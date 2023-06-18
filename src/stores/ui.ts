import { defineStore } from 'pinia'
import { ChartTime, Milliseconds } from '@/types/general'
import type { Type } from '@/types/database'
import DataSchema from '@/services/DataSchema'

const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
    dashboardSelection: DataSchema.getParentTypeOptions()[0].value as Type,
    chartTime: ChartTime.THREE_MONTHS,
  }),

  getters: {
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
