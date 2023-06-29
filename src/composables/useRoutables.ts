import type { RecordGroup, RecordType } from '@/types/database'
import { RouteName } from '@/router/route-names'
import { useRoute, useRouter } from 'vue-router'
import useLogger from '@/composables/useLogger'

export default function useRoutables() {
  const route = useRoute()
  const router = useRouter()
  const { log } = useLogger()

  // Possible route params
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const coreId = Array.isArray(route.params.coreId) ? route.params.coreId[0] : route.params.coreId
  const type = Array.isArray(route.params.type) ? route.params.type[0] : route.params.type
  const group = Array.isArray(route.params.group) ? route.params.group[0] : route.params.group

  // Cleaned route params
  const routeId = String(id) || undefined
  const routeCoreId = String(coreId) || undefined
  const routeType = (String(type) as RecordType) || undefined
  const routeGroup = (String(group) as RecordGroup) || undefined

  function goToLogsData() {
    try {
      router.push({
        name: RouteName.DATA_LOGS,
      })
    } catch (error) {
      log.error('Error accessing logs data route', error)
    }
  }

  function goToRecordsData(group: RecordGroup, type: RecordType) {
    try {
      router.push({
        name: RouteName.DATA_RECORDS,
        params: { group, type },
      })
    } catch (error) {
      log.error('Error accessing records data route', error)
    }
  }

  function goToCreate(group: RecordGroup, type: RecordType, coreId?: string) {
    try {
      router.push({
        name: RouteName.CREATE,
        params: { group, type, coreId },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  function goToEdit(group: RecordGroup, type: RecordType, id: string) {
    try {
      router.push({
        name: RouteName.EDIT,
        params: { group, type, id },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  // Charts can only be accessed from parents, so no group parameter is needed
  function goToCharts(type: RecordType, id: string) {
    try {
      router.push({
        name: RouteName.CHARTS,
        params: { type, id },
      })
    } catch (error) {
      log.error('Error accessing charts route', error)
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
        router.push({ name: RouteName.DASHBOARD })
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
    goToCharts,
    goBack,
  }
}
