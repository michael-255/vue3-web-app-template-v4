<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { Icon } from '@/types/general'
import type { AnyDatabaseRecord, FieldProps } from '@/types/core'

defineProps<{
  title: string
  fieldProps: FieldProps[]
  record: AnyDatabaseRecord
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
</script>

<template>
  <QDialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
    @hide="onDialogHide"
  >
    <QToolbar class="bg-info text-white" style="max-height: 50px">
      <QIcon :name="Icon.INSPECT" size="sm" class="q-mx-sm" />
      <QToolbarTitle>Inspect</QToolbarTitle>
      <QBtn flat round :icon="Icon.CLOSE" @click="onDialogOK" />
    </QToolbar>

    <QCard class="q-dialog-plugin">
      <QCardSection>
        <p class="text-h5">{{ title }}</p>
        <div v-for="(fieldProp, i) in fieldProps" :key="i" class="q-mb-md">
          <div class="text-weight-bold">{{ fieldProp.label }}</div>
          <div>{{ fieldProp.inspectFormat(record?.[fieldProp?.field]) }}</div>
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
