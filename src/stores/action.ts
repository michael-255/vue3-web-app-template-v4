import { defineStore } from 'pinia'
import type { AnyField } from '@/types/database'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as { [key in AnyField]: any },
  }),
})

export default useActionStore
