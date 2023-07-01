import { useQuasar } from 'quasar'
import { Icon } from '@/types/general'
import type { AnyDatabaseRecord, FieldProps, RecordType } from '@/types/core'
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog.vue'
import DismissalDialog from '@/components/dialogs/DismissalDialog.vue'
import InspectionDialog from '@/components/dialogs/InspectionDialog.vue'
import ChartingDialog from '@/components/dialogs/ChartingDialog.vue'

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
      component: ConfirmationDialog,
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
      component: DismissalDialog,
      componentProps: {
        title,
        message,
        icon,
        color,
      },
    })
  }

  function inspectDialog(title: string, fieldProps: FieldProps[], record: AnyDatabaseRecord) {
    $q.dialog({
      component: InspectionDialog,
      componentProps: {
        title,
        fieldProps,
        record,
      },
    })
  }

  function chartsDialog(title: string, type: RecordType, id: string) {
    $q.dialog({
      component: ChartingDialog,
      componentProps: {
        title,
        type,
        id,
      },
    })
  }

  return {
    confirmDialog,
    dismissDialog,
    inspectDialog,
    chartsDialog,
  }
}
