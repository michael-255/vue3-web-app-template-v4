import { RouteName } from '@/router/route-names'
import { useRouter } from 'vue-router'
import useLogger from '@/composables/useLogger'

/**
 * Composable with route param helpers and navigation functions.
 */
export default function useRoutables() {
  const router = useRouter()
  const { log } = useLogger()

  /**
   * Go to data table route.
   */
  async function goToData() {
    try {
      router.push({
        name: RouteName.DATA,
        params: {
          type: '1',
          relation: 2,
        },
      })
    } catch (error) {
      log.error('Error accessing data route', error)
    }
  }

  /**
   * Go to record inspection route.
   */
  function goToInspect() {
    try {
      router.push({
        name: RouteName.INSPECT,
        params: {
          id: '1',
          timestamp: 2,
        },
      })
    } catch (error) {
      log.error('Error accessing inspect route', error)
    }
  }

  /**
   * Go to record creation route.
   */
  function goToCreate() {
    try {
      router.push({
        name: RouteName.CREATE,
        params: {
          id: '1',
          timestamp: 2,
        },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  /**
   * Go to record edit route.
   */
  function goToEdit() {
    try {
      router.push({
        name: RouteName.EDIT,
        params: {
          id: '1',
          timestamp: 2,
        },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  /**
   * Go to charts route.
   */
  function goToCharts() {
    try {
      router.push({
        name: RouteName.CHARTS,
        params: {
          id: '1',
          timestamp: 2,
        },
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

  return { goToData, goToInspect, goToCreate, goToEdit, goToCharts, goBack }
}
