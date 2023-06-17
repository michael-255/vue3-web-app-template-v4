import { defineStore } from 'pinia'
import type { RecordField } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as Partial<{ [key in RecordField]: any }>,
  }),
})

export default useActionStore
