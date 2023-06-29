<script setup lang="ts">
import type { Field } from '@/types/database'
import { onMounted } from 'vue'
import useActionStore from '@/stores/action'

const props = defineProps<{
  field: Field
  label: string
  desc: string
  getDefault: () => any
}>()

const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()
})
</script>

<template>
  <QCard>
    <QCardSection>
      <p class="text-h6">{{ label }}</p>

      <p>{{ desc }}</p>

      <QToggle v-model="actionStore.record[field]" />
    </QCardSection>
  </QCard>
</template>
@/types/data
