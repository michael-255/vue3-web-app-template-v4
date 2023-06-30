<script setup lang="ts">
import { onMounted } from 'vue'
import type { AnyField } from '@/types/core'
import { Limit } from '@/types/general'
import type { z } from 'zod'
import useActionStore from '@/stores/action'

const props = defineProps<{
  field: AnyField
  label: string
  desc?: string
  getDefault: () => any
  schema: z.ZodType<any, any, any>
  message: string
}>()

const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()
})

function validationRule() {
  return (val: string) => props.schema.safeParse(val).success || props.message
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
        :maxlength="Limit.MAX_TEXT_AREA"
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
