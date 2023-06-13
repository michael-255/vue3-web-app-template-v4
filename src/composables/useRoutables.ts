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
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const parentId = Array.isArray(route.params.parentId)
    ? route.params.parentId[0]
    : route.params.parentId
  const type = Array.isArray(route.params.type) ? route.params.type[0] : route.params.type
  // Cleaned route params
  const routeId = String(id) || undefined
  const routeParentId = String(parentId) || undefined
  const routeType = (String(type) as Type) || undefined

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
    console.log(id)

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
