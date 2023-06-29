import { defineStore } from 'pinia'
import type { RecordField } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as Record<keyof RecordField, string>,
  }),
})

export default useActionStore
