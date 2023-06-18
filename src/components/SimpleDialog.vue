<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import type { Icon } from '@/types/icons'

/*
Small dialogs used for confirming operations or providing information that can be dismissed.

@example
// You can hook into the methods below:
$q.dialog({...})
  .onOk(() => {
    console.log('Called on OK')
  })
  .onCancel(() => {
    console.log('Called on Cancel')
  })
  .onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
*/

const props = defineProps<{
  type: 'Confirm' | 'Dismiss'
  icon: Icon
  title: string
  message: string
  color: string
  persistent: boolean // If it can be dismissed by clicking outside it
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}
</script>

<template>
  <QDialog ref="dialogRef" :persistent="persistent" @hide="onDialogHide">
    <QCard class="q-dialog-plugin">
      <QCardSection :class="`bg-${props.color} text-white q-py-sm`">
        <QIcon :name="icon" size="sm" class="q-pb-sm q-mr-md" />
        <span class="text-h6">{{ title }}</span>
      </QCardSection>

      <QCardSection class="q-mt-md">{{ message }}</QCardSection>

      <QCardActions align="right">
        <QBtn v-if="type === 'Confirm'" flat label="Cancel" @click="onDialogCancel" />
        <QBtn flat :label="type" :color="color" @click="onOKClick" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
