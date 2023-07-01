<script setup lang="ts">
import { allFields } from '@/types/core'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: string) {
  return `${val || '-'}`
}
</script>

<template>
  <!-- Inspection only -->
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Log Level</div>
    <div>{{ inspectFormat(actionStore.record[allFields.Values.logLevel]) }}</div>
  </div>
</template>
