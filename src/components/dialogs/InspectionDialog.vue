<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { Icon } from '@/types/icons'

defineProps<{
  title: string
  record: { [key: string]: any }
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

      <QCardSection v-if="record?.id" class="q-mt-md">{{ record.id }}</QCardSection>

      <QCardSection v-if="record?.type" class="q-mt-md">{{ record.type }}</QCardSection>
    </QCard>
  </QDialog>
</template>
