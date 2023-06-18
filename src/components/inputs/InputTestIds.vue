<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { truncateString } from '@/utils/common'
import { Type, type Field, type ParentRecord } from '@/types/database'
import type { ObjectSchema } from 'yup'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

const props = defineProps<{
  field: Field
  label: string
  desc: string
  getDefault: () => any
  validator: ObjectSchema<any, any, any>
  validationMessage: string
}>()

const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()

    const records = (await DB.getParentsByType(Type.TEST)) as ParentRecord[]

    options.value = records.map((r: ParentRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 4, '*')})`,
    }))
  } catch (error) {
    log.error('Error with test ids input', error)
  }
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
