<script setup lang="ts">
import { onMounted } from 'vue'
import { allFields, textAreaSchema } from '@/types/core'
import { Limit } from '@/types/general'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

const field = allFields.Values.note

onMounted(() => {
  actionStore.record[field] = actionStore.record[field] ?? ''
})

function inspectFormat(val: string) {
  return `${val || '-'}`
}
</script>

<template>
  <div class="text-weight-bold text-body1">Note</div>

  <div v-if="inspecting">
    {{ inspectFormat(actionStore.record[field]) }}
  </div>

  <div v-else>
    <p>Text note about the record that can be viewed on the Dashboard.</p>

    <QInput
      v-model="actionStore.record[field]"
      :rules="[(val: string) => textAreaSchema.safeParse(val).success || `Note cannot exceed ${Limit.MAX_TEXT_AREA} characters`]"
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
  </div>
</template>
