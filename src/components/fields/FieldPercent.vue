<script setup lang="ts">
import { onMounted } from 'vue'
import { allFields, percentSchema } from '@/types/core'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

const field = allFields.Values.percent

onMounted(() => {
  actionStore.record[field] = actionStore.record[field] ?? 0
})

function inspectFormat(val: number) {
  return `${val}%`
}
</script>

<template>
  <div class="text-weight-bold text-body1">Percentage</div>

  <div v-if="inspecting">
    {{ inspectFormat(actionStore.record[field]) }}
  </div>

  <QInput
    v-else
    v-model.number="actionStore.record[field]"
    :rules="[(val: number) => percentSchema.safeParse(val).success || 'Percent must be between 0 and 100']"
    type="number"
    lazy-rules
    dense
    outlined
    color="primary"
  />
</template>
