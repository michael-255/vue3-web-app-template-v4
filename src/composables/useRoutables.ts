import type { RecordGroup, RecordType } from '@/types/core'
import { useRoute, useRouter } from 'vue-router'
import { routeNames } from '@/types/general'
import useLogger from '@/composables/useLogger'

export default function useRoutables(): {
  routeId?: string
  routeCoreId?: string
  routeType?: RecordType
  routeGroup?: RecordGroup
  goToLogsData: () => void
  goToRecordsData: (group: RecordGroup, type: RecordType) => void
  goToCreate: (group: RecordGroup, type: RecordType, coreId?: string) => void
  goToEdit: (group: RecordGroup, type: RecordType, id: string) => void
  goBack: () => void
} {
  const route = useRoute()
  const router = useRouter()
  const { log } = useLogger()

  // Possible route params
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const coreId = Array.isArray(route.params.coreId) ? route.params.coreId[0] : route.params.coreId
  const type = Array.isArray(route.params.type) ? route.params.type[0] : route.params.type
  const group = Array.isArray(route.params.group) ? route.params.group[0] : route.params.group

  // Cleaned route params
  const routeId = id || undefined
  const routeCoreId = coreId || undefined
  const routeType = (type as RecordType) || undefined
  const routeGroup = (group as RecordGroup) || undefined

  function goToLogsData() {
    try {
      router.push({
        name: routeNames.Values.DataLogs,
      })
    } catch (error) {
      log.error('Error accessing logs data route', error)
    }
  }

  function goToRecordsData(group: RecordGroup, type: RecordType) {
    try {
      router.push({
        name: routeNames.Values.DataRecords,
        params: { group, type },
      })
    } catch (error) {
      log.error('Error accessing records data route', error)
    }
  }

  function goToCreate(group: RecordGroup, type: RecordType, coreId?: string) {
    try {
      router.push({
        name: routeNames.Values.Create,
        params: { group, type, coreId },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  function goToEdit(group: RecordGroup, type: RecordType, id: string) {
    try {
      router.push({
        name: routeNames.Values.Edit,
        params: { group, type, id },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  /**
   * Go back if previous route state is part of the app history, otherwise go to Dashboard.
   */
  function goBack() {
    try {
      if (router?.options?.history?.state?.back) {
        router.back()
      } else {
        router.push({ name: routeNames.Values.Dashboard })
      }
    } catch (error) {
      log.error('Error accessing go back route', error)
    }
  }

  return {
    routeId,
    routeCoreId,
    routeType,
    routeGroup,
    goToLogsData,
    goToRecordsData,
    goToCreate,
    goToEdit,
    goBack,
  }
}
