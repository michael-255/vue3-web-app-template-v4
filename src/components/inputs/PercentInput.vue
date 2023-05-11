<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import type { Field } from '@/types/database'
import { Limit } from '@/types/general'
import useActionStore from '@/stores/action'

// Props & Emits
const props = defineProps<{
  field: Field
  label: string
  desc: string
  getDefault: () => any
  validator: (val: any) => Promise<boolean>
  validationMessage: string
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()
})

/**
 * Input validation rule for the template component.
 */
function validationRule() {
  return async (val: string) => (await props.validator(val)) || props.validationMessage
}
</script>

<template>
  <QCard>
    <QCardSection>
      <p class="text-h6 q-mb-md">{{ label }}</p>

      <p class="q-mb-md">{{ desc }}</p>

      <QInput
        v-model="actionStore.record[field]"
        ref="inputRef"
        :rules="[validationRule()]"
        :maxlength="Limit.MAX_NAME_LENGTH"
        type="number"
        step="0.01"
        lazy-rules
        dense
        outlined
        color="primary"
      />
    </QCardSection>
  </QCard>
</template>
