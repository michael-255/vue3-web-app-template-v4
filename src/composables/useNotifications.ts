import { useQuasar } from 'quasar'
import { Icon } from '@/types/icons'

export default function useNotifications() {
  const $q = useQuasar()

  /**
   * Notification (alert). Most settings defined in "~/src/main.ts" as part of the Quasar config.
   * @param message
   * @param icon
   * @param color
   */
  function notify(message: string, icon: Icon = Icon.INFO, color: string = 'info') {
    $q.notify({
      message,
      icon,
      color,
    })
  }

  return { notify }
}
