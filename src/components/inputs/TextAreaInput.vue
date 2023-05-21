<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import type { Field } from '@/types/database'
import { Limit } from '@/types/general'
import useActionStore from '@/stores/action'
import type { MixedSchema } from 'yup'

// Props & Emits
const props = defineProps<{
  field: Field
  label: string
  desc?: string
  getDefault: () => any
  validator: MixedSchema<any, any, any>
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
  return async (val: string) => (await props.validator.isValid(val)) || props.validationMessage
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
        :maxlength="Limit.MAX_TEXT_AREA_LENGTH"
        type="textarea"
        lazy-rules
        autogrow
        counter
        dense
        outlined
        clearable
        color="primary"
        @blur="actionStore.record[field] = actionStore.record[field].trim()"
      />
    </QCardSection>
  </QCard>
</template>
