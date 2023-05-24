<script setup lang="ts">
import { onMounted } from 'vue'
import type { Field } from '@/types/database'
import { Limit } from '@/types/general'
import type { MixedSchema } from 'yup'
import useActionStore from '@/stores/action'

// Props & Emits
const props = defineProps<{
  field: Field
  label: string
  getDefault: () => any
  validator: MixedSchema<any, any, any>
  validationMessage: string
}>()

// Composables & Stores
const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()
})

/**
 * Input validation rule for the template component.
 */
function validationRule() {
  return async (val: string) => (await props.validator.isValid(val)) || props.validationMessage
}
</script>

<template>
  <QCard>
    <QCardSection>
      <p class="text-h6">{{ label }}</p>

      <QInput
        v-model="actionStore.record[field]"
        :rules="[validationRule()]"
        type="number"
        lazy-rules
        dense
        outlined
        color="primary"
      />
    </QCardSection>
  </QCard>
</template>
