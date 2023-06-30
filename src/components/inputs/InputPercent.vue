<script setup lang="ts">
import { onMounted } from 'vue'
import type { RecordField } from '@/types/database'
import type { z } from 'zod'
import useActionStore from '@/stores/action'

const props = defineProps<{
  field: RecordField
  label: string
  getDefault: () => any
  validator: z.ZodType<any, any, any>
  validationMessage: string
}>()

const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()
})

function validationRule() {
  return (val: string) => props.validator.safeParse(val).success || props.validationMessage
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
