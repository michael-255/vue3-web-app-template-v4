<script setup lang="ts">
import { allFields } from '@/types/core'
import { onMounted } from 'vue'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

const field = allFields.Values.favorited

onMounted(() => {
  actionStore.record[field] = actionStore.record[field] ?? true
})

function inspectFormat(val: boolean) {
  return val ? 'Yes' : 'No'
}
</script>

<template>
  <div class="text-weight-bold text-body1">Favorited</div>

  <div v-if="inspecting">
    {{ inspectFormat(actionStore.record[field]) }}
  </div>

  <div v-else>
    <p>Whether the record is favorited and is prioritized on the Dashboard.</p>
    <QToggle v-model="actionStore.record[field]" />
  </div>
</template>
