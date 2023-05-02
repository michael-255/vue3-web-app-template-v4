import { ref, watch, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import type { Optional } from '@/types/misc'
import type { DatabaseRecord } from '@/types/models'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import DB from '@/services/LocalDatabase'

/**
 * Composable with the watcher for parent id.
 */
export default function useParentIdWatcher() {
  const actionStore = useActionStore()
  const { log } = useLogger()

  const previousRecord: Ref<Optional<DatabaseRecord>> = ref(null)

  /**
   * Watching actionStore parent id.
   */
  watch(
    () => actionStore.record[DatabaseField.PARENT_ID] as string,
    async (parentId) => {
      try {
        const type = actionStore.record[DatabaseField.TYPE]

        // Do NOT continue without a parent id or type
        if (!parentId || !type) {
          return
        }

        previousRecord.value = await DB.getPreviousChildRecord(type, parentId)
      } catch (error) {
        log.error('Error with parent id watcher', error)
      }
    },
    { immediate: true }
  )

  return { previousRecord }
}
