import type { Type } from '@/types/database'
import { RouteName } from '@/router/route-names'
import { useRoute, useRouter } from 'vue-router'
import useLogger from '@/composables/useLogger'

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

  function goToLogsData() {
    try {
      router.push({
        name: RouteName.DATA_LOGS,
      })
    } catch (error) {
      log.error('Error accessing logs data route', error)
    }
  }

  function goToSettingsData() {
    try {
      router.push({
        name: RouteName.DATA_SETTINGS,
      })
    } catch (error) {
      log.error('Error accessing settings data route', error)
    }
  }

  function goToParentData(type: Type) {
    try {
      router.push({
        name: RouteName.DATA_PARENTS,
        params: { type },
      })
    } catch (error) {
      log.error('Error accessing parent data route', error)
    }
  }

  function goToChildData(type: Type) {
    try {
      router.push({
        name: RouteName.DATA_CHILDREN,
        params: { type },
      })
    } catch (error) {
      log.error('Error accessing child data route', error)
    }
  }

  function goToParentCreate(type: Type) {
    try {
      router.push({
        name: RouteName.CREATE_PARENT,
        params: { type },
      })
    } catch (error) {
      log.error('Error accessing parent create route', error)
    }
  }

  function goToChildCreate(type: Type, parentId?: string) {
    try {
      router.push({
        name: RouteName.CREATE_CHILD,
        params: { type, parentId },
      })
    } catch (error) {
      log.error('Error accessing child create route', error)
    }
  }

  function goToParentEdit(type: Type, id: string) {
    try {
      router.push({
        name: RouteName.EDIT_PARENT,
        params: { type, id },
      })
    } catch (error) {
      log.error('Error accessing parent edit route', error)
    }
  }

  function goToChildEdit(type: Type, id: string) {
    try {
      router.push({
        name: RouteName.EDIT_CHILD,
        params: { type, id },
      })
    } catch (error) {
      log.error('Error accessing child edit route', error)
    }
  }

  function goToParentInspect(type: Type, id: string) {
    try {
      router.push({
        name: RouteName.INSPECT_PARENT,
        params: { type, id },
      })
    } catch (error) {
      log.error('Error accessing parent inspect route', error)
    }
  }

  function goToChildInspect(type: Type, id: string) {
    try {
      router.push({
        name: RouteName.INSPECT_CHILD,
        params: { type, id },
      })
    } catch (error) {
      log.error('Error accessing child inspect route', error)
    }
  }

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
    goToLogsData,
    goToSettingsData,
    goToParentData,
    goToChildData,
    goToParentCreate,
    goToChildCreate,
    goToParentEdit,
    goToChildEdit,
    goToParentInspect,
    goToChildInspect,
    goToCharts,
    goBack,
  }
}
