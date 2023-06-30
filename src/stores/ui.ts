import { defineStore } from 'pinia'
import { Duration } from '@/types/general'
import DataSchema from '@/services/DataSchema'

const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
    dashboardSelection: DataSchema.getDashboardOptions()[0].value,
    chartTime: Duration[Duration['Three Months']] as keyof typeof Duration,
  }),
})

export default useUIStore
