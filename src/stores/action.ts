import { defineStore } from 'pinia'
import type { RecordField } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as { [key in RecordField]: any },
  }),
})

export default useActionStore
