<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { Icon } from '@/types/general'
import type { AnyDatabaseRecord } from '@/types/core'

defineProps<{
  title: string
  record: AnyDatabaseRecord
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

// TODO
// - Create divs for each potential field in the record with v-ifs
</script>

<template>
  <QDialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
    @hide="onDialogHide"
  >
    <QCard class="q-dialog-plugin">
      <QToolbar class="bg-info text-white q-py-sm">
        <QIcon :name="Icon.INSPECT" size="sm" class="q-mx-sm" />

        <QToolbarTitle>Inspect {{ title }}</QToolbarTitle>

        <QBtn flat round :icon="Icon.CLOSE" @click="onDialogOK" />
      </QToolbar>

      <QCardSection class="q-mt-md">{{ JSON.stringify(record) }}</QCardSection>

      <QCardSection v-if="record?.autoId" class="q-mt-md">{{ record.autoId }}</QCardSection>

      <QCardSection v-if="record?.type" class="q-mt-md">{{ record.type }}</QCardSection>
    </QCard>
  </QDialog>
</template>
@/types/core