<script setup lang="ts">
import { onMounted } from 'vue'
import type { Field } from '@/types/database'
import type { ObjectSchema } from 'yup'
import useActionStore from '@/stores/action'

const props = defineProps<{
  field: Field
  label: string
  getDefault: () => any
  validator: ObjectSchema<any, any, any>
  validationMessage: string
}>()

const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()
})

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
