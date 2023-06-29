<script setup lang="ts">
import { onMounted } from 'vue'
import type { Field } from '@/types/database'
import { Limit } from '@/types/general'
import type { ObjectSchema } from 'yup'
import useActionStore from '@/stores/action'

const props = defineProps<{
  field: Field
  label: string
  desc?: string
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

      <p>{{ desc }}</p>

      <QInput
        v-model="actionStore.record[field]"
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
@/types/data
