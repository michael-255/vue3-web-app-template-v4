import { DatabaseField, DatabaseType, type SettingId } from '@/types/database'
import { RouteName } from '@/router/route-names'
import { slugify } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'
import { getTypeFromSlug } from '@/services/Blueprints'
import type { Optional } from '@/types/misc'
import useLogger from '@/composables/useLogger'

/**
 * Composable with route param helpers and navigation functions.
 */
export default function useRoutables() {
  const route = useRoute()
  const router = useRouter()
  const { log } = useLogger()

  /**
   * (Important) The "databaseTypeSlug" param is validated by the "beforeEnter" hook in router index.
   */
  const routeTypeSlug = route?.params?.databaseTypeSlug as string

  /**
   * Assumed valid since the "databaseTypeSlug" is validated by the "beforeEnter" hook in router index.
   */
  const routeDatabaseType = getTypeFromSlug(routeTypeSlug) as DatabaseType

  /**
   * (Important) The "id" param is validated by the "beforeEnter" hook in router index.
   */
  const routeId = route?.params?.[DatabaseField.ID] as string

  /**
   * Optional "parentId" param for child record creates.
   */
  const routeParentId = route?.params?.[DatabaseField.PARENT_ID] as Optional<string>

  /**
   * Go to data table route.
   * @param type
   */
  async function goToData(type: DatabaseType) {
    try {
      router.push({
        name: RouteName.DATA,
        params: { databaseTypeSlug: slugify(type) },
      })
    } catch (error) {
      log.error('Error accessing data route', error)
    }
  }

  /**
   * Go to record inspection route.
   * @param type
   * @param id
   */
  function goToInspect(type: DatabaseType, id: string | SettingId) {
    try {
      router.push({
        name: RouteName.ACTION_INSPECT,
        params: {
          databaseTypeSlug: slugify(type),
          id,
        },
      })
    } catch (error) {
      log.error('Error accessing inspect route', error)
    }
  }

  /**
   * Go to record creation route. If parentId is provided, it will be used for child records.
   * @param type
   * @param parentId Optional parent id
   */
  function goToCreate(type: DatabaseType, parentId?: string) {
    try {
      router.push({
        name: RouteName.ACTION_CREATE,
        params: {
          databaseTypeSlug: slugify(type),
          parentId,
        },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  /**
   * Go to record edit route.
   * @param type
   * @param id
   */
  function goToEdit(type: DatabaseType, id: string) {
    try {
      router.push({
        name: RouteName.ACTION_EDIT,
        params: {
          databaseTypeSlug: slugify(type),
          id,
        },
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
  function goToCharts(type: DatabaseType, id: string) {
    try {
      router.push({
        name: RouteName.ACTION_CHARTS,
        params: {
          databaseTypeSlug: slugify(type),
          id,
        },
      })
    } catch (error) {
      log.error('Error accessing charts route', error)
    }
  }

  /**
   * Go to record curing route.
   */
  function goToRecordCuring() {
    try {
      router.push({ name: RouteName.RECORD_CURING })
    } catch (error) {
      log.error('Error accessing record curing route', error)
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
    routeTypeSlug,
    routeDatabaseType,
    routeId,
    routeParentId,
    goToData,
    goToInspect,
    goToCreate,
    goToEdit,
    goToCharts,
    goToRecordCuring,
    goBack,
  }
}
