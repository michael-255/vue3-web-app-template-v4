import { defineStore } from 'pinia'
import { DatabaseField } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    /**
     * Used as the WIP record for creates and updates.
     */
    record: Object.values(DatabaseField).reduce((acc, field) => {
      acc[field] = null as any
      return acc
    }, {} as { [key in DatabaseField]: any }),
  }),
})

export default useActionStore
