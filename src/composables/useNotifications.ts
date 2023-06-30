import { useQuasar } from 'quasar'
import { Icon } from '@/types/icons'

export default function useNotifications() {
  const $q = useQuasar()

  function notify(message: string, icon: Icon = Icon.INFO, color: string = 'info') {
    $q.notify({
      message,
      icon,
      color,
    })
  }

  return { notify }
}
