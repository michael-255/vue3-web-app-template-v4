<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { truncateString } from '@/utils/common'
import { recordGroups, type AnyField, recordTypes, type AnyCoreRecord } from '@/types/core'
import type { z } from 'zod'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

const props = defineProps<{
  field: AnyField
  label: string
  desc: string
  getDefault: () => any
  schema: z.ZodType<any, any, any>
  message: string
}>()

const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()

    const records = (await DB.getRecords(
      recordGroups.Values.core,
      recordTypes.Values.test
    )) as AnyCoreRecord[]

    options.value = records.map((r: AnyCoreRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 4, '*')})`,
    }))
  } catch (error) {
    log.error('Error with test ids input', error)
  }
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

      <QSelect
        v-model="actionStore.record[field]"
        :rules="[validationRule()]"
        :options="options"
        counter
        multiple
        emit-value
        map-options
        options-dense
        dense
        outlined
        color="primary"
      />
    </QCardSection>
  </QCard>
</template>
