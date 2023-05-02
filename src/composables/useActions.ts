import type { DatabaseType } from '@/types/database'
import { Icon } from '@/types/icons'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'

/**
 * Composable with actions that relate to CRUD operations.
 */
export default function useActions() {
  const { log } = useLogger()
  const { confirmDialog } = useDialogs()

  /**
   * On confirmation, delete the matching record from the database.
   * @param type
   * @param id
   */
  async function onDeleteRecord(type: DatabaseType, id: string) {
    confirmDialog(
      'Delete Record',
      `Permanently delete record ${id} from ${type}?`,
      Icon.DELETE,
      'negative',
      async () => {
        try {
          await DB.deleteRecord(type, id)
          log.info('Successfully deleted record', { deletedRecordType: type, deletedRecordId: id })
        } catch (error) {
          log.error('Delete failed', error)
        }
      }
    )
  }

  return { onDeleteRecord }
}
