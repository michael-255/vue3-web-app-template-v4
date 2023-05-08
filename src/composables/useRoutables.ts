import type { Group, Type } from '@/types/database'
import { RouteName } from '@/router/route-names'
import { useRoute, useRouter } from 'vue-router'
import useLogger from '@/composables/useLogger'

/**
 * Composable with route param helpers and navigation functions.
 */
export default function useRoutables() {
  const route = useRoute()
  const router = useRouter()
  const { log } = useLogger()

  // Possible route params
  const uid = route.params.uid
  const groupId = route.params.groupId
  const type = route.params.type
  const group = route.params.group
  // Cleaned route params
  const routeUid = Array.isArray(uid) ? String(uid[0]) : String(uid)
  const routeGroupId = Array.isArray(groupId) ? String(groupId[0]) : String(groupId)
  const routeType = (Array.isArray(type) ? type[0] : type) as Type
  const routeGroup = (Array.isArray(group) ? group[0] : group) as Group

  /**
   * Go to data table route.
   * @param type
   * @param group
   */
  async function goToData(type: Type, group: Group) {
    try {
      router.push({
        name: RouteName.DATA,
        params: { type, group },
      })
    } catch (error) {
      log.error('Error accessing data route', error)
    }
  }

  /**
   * Go to record creation route.
   * @param type
   * @param group
   * @param groupId
   */
  function goToCreate(type: Type, group: Group, groupId?: string) {
    try {
      router.push({
        name: RouteName.CREATE,
        params: { type, group, groupId },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  /**
   * Go to record inspection route.
   * @param type
   * @param group
   * @param uid
   */
  function goToInspect(type: Type, group: Group, uid: string) {
    try {
      router.push({
        name: RouteName.INSPECT,
        params: { type, group, uid },
      })
    } catch (error) {
      log.error('Error accessing inspect route', error)
    }
  }

  /**
   * Go to record edit route.
   * @param type
   * @param group
   * @param uid
   */
  function goToEdit(type: Type, group: Group, uid: string) {
    try {
      router.push({
        name: RouteName.EDIT,
        params: { type, group, uid },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  /**
   * Go to charts route.
   * @param type
   * @param group
   * @param uid
   */
  function goToCharts(type: Type, group: Group, uid: string) {
    try {
      router.push({
        name: RouteName.CHARTS,
        params: { type, group, uid },
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
    routeUid,
    routeGroupId,
    routeType,
    routeGroup,
    goToData,
    goToInspect,
    goToCreate,
    goToEdit,
    goToCharts,
    goBack,
  }
}
