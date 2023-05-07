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
  const pk = route.params.pk
  const sk = route.params.sk
  const type = route.params.type
  const group = route.params.group
  // Cleaned route params
  const routePk = Array.isArray(pk) ? String(pk[0]) : String(pk)
  const routeSk = Array.isArray(sk) ? String(sk[0]) : String(sk)
  const routeType = (Array.isArray(type) ? type[0] : type) as Type
  const routeGroup = (Array.isArray(group) ? group[0] : group) as Group

  /**
   * Go to data table route.
   * @param type
   * @param group
   */
  async function goToData(type: Type, group?: Group) {
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
   * @param sk
   */
  function goToCreate(type: Type, group: Group, sk?: string) {
    try {
      router.push({
        name: RouteName.CREATE,
        params: { type, group, sk },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  /**
   * Go to record inspection route.
   * @param pk
   */
  function goToInspect(pk: string) {
    try {
      router.push({
        name: RouteName.INSPECT,
        params: { pk },
      })
    } catch (error) {
      log.error('Error accessing inspect route', error)
    }
  }

  /**
   * Go to record edit route.
   * @param pk
   */
  function goToEdit(pk: string) {
    try {
      router.push({
        name: RouteName.EDIT,
        params: { pk },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  /**
   * Go to charts route.
   * @param pk
   */
  function goToCharts(pk: string) {
    try {
      router.push({
        name: RouteName.CHARTS,
        params: { pk },
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
    routePk,
    routeSk,
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
