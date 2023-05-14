import { defineStore } from 'pinia'
import type { Field } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    /**
     * In progress record for create and update actions
     */
    record: {} as Partial<{ [key in Field]: any }>,
  }),
})

export default useActionStore
