<script setup lang="ts">
import { allFields } from '@/types/core'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: number) {
  return `${val || '-'}`
}
</script>

<template>
  <!-- Inspection only -->
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Auto Id</div>
    <div>{{ inspectFormat(actionStore.record[allFields.Values.autoId]) }}</div>
  </div>
</template>
