import { useQuasar } from 'quasar'
import { Icon } from '@/types/icons'
import confirmationDialog from '@/components/dialogs/confirmationDialog.vue'
import dismissalDialog from '@/components/dialogs/dismissalDialog.vue'
import inspectionDialog from '@/components/dialogs/inspectionDialog.vue'

export default function useDialogs() {
  const $q = useQuasar()

  function confirmDialog(
    title: string,
    message: string,
    icon: Icon,
    color: string,
    onOkFunc: () => void
  ) {
    $q.dialog({
      component: confirmationDialog,
      componentProps: {
        title,
        message,
        icon,
        color,
      },
    }).onOk(() => {
      onOkFunc()
    })
  }

  function dismissDialog(
    title: string,
    message: string,
    icon: Icon = Icon.INFO,
    color: string = 'info'
  ) {
    $q.dialog({
      component: dismissalDialog,
      componentProps: {
        title,
        message,
        icon,
        color,
      },
    })
  }

  function inspectDialog(title: string, record: { [key: string]: any }) {
    $q.dialog({
      component: inspectionDialog,
      componentProps: {
        title,
        record,
      },
    })
  }

  return {
    confirmDialog,
    dismissDialog,
    inspectDialog,
  }
}
