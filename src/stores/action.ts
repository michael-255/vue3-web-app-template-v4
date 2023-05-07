import { defineStore } from 'pinia'
import { Field } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    /**
     * Used as the WIP record for creates and updates.
     */
    record: Object.values(Field).reduce((acc, field) => {
      acc[field] = null
      return acc
    }, {} as { [key in Field]: any }),
  }),
})

export default useActionStore
