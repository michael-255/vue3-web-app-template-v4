import type { Relation, Type } from '@/types/database'
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
  const timestamp = route.params.timestamp
  const type = route.params.type
  const relation = route.params.relation
  // Cleaned route params
  const routeId = Array.isArray(id) ? String(id[0]) : String(id)
  const routeTimestamp = Array.isArray(timestamp) ? Number(timestamp[0]) : Number(timestamp)
  const routeType = (Array.isArray(type) ? type[0] : type) as Type
  const routeRelation = (Array.isArray(relation) ? relation[0] : relation) as Relation

  /**
   * Go to data table route.
   * @param type
   * @param relation
   */
  async function goToData(type: Type, relation?: Relation) {
    try {
      router.push({
        name: RouteName.DATA,
        params: { type, relation },
      })
    } catch (error) {
      log.error('Error accessing data route', error)
    }
  }

  /**
   * Go to record creation route.
   * @param type
   * @param relation
   * @param id
   */
  function goToCreate(type: Type, relation: Relation, id?: string) {
    try {
      router.push({
        name: RouteName.CREATE,
        params: { type, relation, id },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  /**
   * Go to record inspection route.
   * @param id
   * @param timestamp
   */
  function goToInspect(id: string, timestamp: number) {
    try {
      router.push({
        name: RouteName.INSPECT,
        params: { id, timestamp },
      })
    } catch (error) {
      log.error('Error accessing inspect route', error)
    }
  }

  /**
   * Go to record edit route.
   * @param id
   * @param timestamp
   */
  function goToEdit(id: string, timestamp: number) {
    try {
      router.push({
        name: RouteName.EDIT,
        params: { id, timestamp },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  /**
   * Go to charts route.
   * @param id
   * @param timestamp
   */
  function goToCharts(id: string, timestamp: number) {
    try {
      router.push({
        name: RouteName.CHARTS,
        params: { id, timestamp },
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
    routeTimestamp,
    routeType,
    routeRelation,
    goToData,
    goToInspect,
    goToCreate,
    goToEdit,
    goToCharts,
    goBack,
  }
}
