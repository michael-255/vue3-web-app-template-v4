<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/LocalDatabase'
import type { Record } from '@/types/models'

// Composables & Stores
const { routeSk } = useRoutables()

// Data
const isVisible: Ref<boolean> = ref(false)
const parent: Ref<Record> = ref({} as Record)

onMounted(async () => {
  if (routeSk) {
    parent.value = (await DB.getParent(routeSk)) as Record
    isVisible.value = true
  }
})
</script>

<template>
  <QCard v-if="isVisible" class="q-mb-md">
    <QCardSection>
      <p class="text-h6">Record for {{ parent.name }}</p>

      <p>{{ parent.desc }}</p>

      <p class="q-my-none q-py-none text-grey text-caption">PK {{ parent.pk }}</p>
      <p class="q-my-none q-py-none text-grey text-caption">SK {{ parent.sk }}</p>
    </QCardSection>
  </QCard>
</template>
