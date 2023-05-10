import type { Type } from '@/types/database'
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
  const id = route.params.id
  const parentId = route.params.parentId
  const type = route.params.type
  // Cleaned route params
  const routeId = Array.isArray(id) ? String(id[0]) : String(id)
  const routeParentId = Array.isArray(parentId) ? String(parentId[0]) : String(parentId)
  const routeType = (Array.isArray(type) ? type[0] : type) as Type

  /**
   * Go to data table route.
   * @param type
   */
  async function goToData(type: Type) {
    try {
      router.push({
        name: RouteName.DATA,
        params: { type },
      })
    } catch (error) {
      log.error('Error accessing data route', error)
    }
  }

  /**
   * Go to record creation route.
   * @param type
   * @param parentId
   */
  function goToCreate(type: Type, parentId?: string) {
    try {
      router.push({
        name: RouteName.CREATE,
        params: { type, parentId },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  /**
   * Go to record inspection route.
   * @param type
   * @param id
   */
  function goToInspect(type: Type, id: string) {
    try {
      router.push({
        name: RouteName.INSPECT,
        params: { type, id },
      })
    } catch (error) {
      log.error('Error accessing inspect route', error)
    }
  }

  /**
   * Go to record edit route.
   * @param type
   * @param id
   */
  function goToEdit(type: Type, id: string) {
    try {
      router.push({
        name: RouteName.EDIT,
        params: { type, id },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  /**
   * Go to charts route.
   * @param type
   * @param id
   */
  function goToCharts(type: Type, id: string) {
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
    routeParentId,
    routeType,
    goToData,
    goToInspect,
    goToCreate,
    goToEdit,
    goToCharts,
    goBack,
  }
}
