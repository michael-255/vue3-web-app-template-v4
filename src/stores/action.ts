import type { DBField, InternalField } from '@/types/database'
import { defineStore } from 'pinia'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as Record<DBField | InternalField, any>,
  }),
})

export default useActionStore
