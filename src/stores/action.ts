import { defineStore } from 'pinia'
import type { Field } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as Partial<{ [key in Field]: any }>,
  }),
})

export default useActionStore
