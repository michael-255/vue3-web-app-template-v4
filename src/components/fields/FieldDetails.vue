<script setup lang="ts">
import { allFields } from '@/types/core'
import type { Details } from '@/types/core'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: Details) {
  if (val && typeof val === 'object') {
    return Object.entries(val)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
  } else {
    return '-'
  }
}
</script>

<template>
  <!-- Inspection only -->
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Details</div>
    <div>{{ inspectFormat(actionStore.record[allFields.Values.details]) }}</div>
  </div>
</template>
