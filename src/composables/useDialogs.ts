import { useQuasar } from 'quasar'
import { Icon } from '@/types/general'
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog.vue'
import DismissalDialog from '@/components/dialogs/DismissalDialog.vue'
import InspectionDialog from '@/components/dialogs/InspectionDialog.vue'
import ChartingDialog from '@/components/dialogs/ChartingDialog.vue'
import type { AnyDBRecord, DBTable, InternalTable } from '@/types/database'
import type { defineAsyncComponent } from 'vue'
import type { Log } from '@/models/Log'

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

  function inspectDialog(
    title: string,
    record: AnyDBRecord,
    fieldComponents: ReturnType<typeof defineAsyncComponent>[]
  ) {
    $q.dialog({
      component: InspectionDialog,
      componentProps: {
        title,
        record,
        fieldComponents,
      },
    })
  }

  function chartsDialog(
    title: string,
    id: string,
    chartComponents: ReturnType<typeof defineAsyncComponent>[]
  ) {
    $q.dialog({
      component: ChartingDialog,
      componentProps: {
        title,
        id,
        chartComponents,
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
