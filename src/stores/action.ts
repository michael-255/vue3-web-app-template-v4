import type { DBField } from '@/types/database'
import { defineStore } from 'pinia'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as Record<DBField, any>,
  }),
})

export default useActionStore
