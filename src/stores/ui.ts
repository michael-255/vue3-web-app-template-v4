import { defineStore } from 'pinia'
import { Duration } from '@/types/general'
import DataSchema from '@/services/DataSchema'
import type { RecordType } from '@/types/core'

const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
    dashboardSelection: DataSchema.getDashboardOptions()[0].value as RecordType,
    chartTime: Duration[Duration['Three Months']] as keyof typeof Duration,
  }),
})

export default useUIStore
