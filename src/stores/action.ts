import { defineStore } from 'pinia'
import type { Record } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    /**
     * In progress record for create and update actions
     */
    record: {} as Partial<Record>,
  }),
})

export default useActionStore
