<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { Icon } from '@/types/general'
import type { AnyDatabaseRecord, AnyField } from '@/types/core'
import { defineAsyncComponent, onUnmounted } from 'vue'
import useActionStore from '@/stores/action'

const props = defineProps<{
  title: string
  record: AnyDatabaseRecord
  fields: ReturnType<typeof defineAsyncComponent>[]
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const actionStore = useActionStore()

// Setup action store record with all the record values
Object.keys(props.record).map((key) => {
  actionStore.record[key as AnyField] = props.record[key as AnyField]
})

onUnmounted(() => {
  actionStore.$reset()
})
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

        <div v-for="(field, i) in fields" :key="i" class="q-mb-md">
          <component :is="field" :inspecting="true" />
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
