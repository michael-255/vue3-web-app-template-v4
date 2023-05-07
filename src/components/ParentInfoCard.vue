<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import type { Record } from '@/types/models'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/LocalDatabase'
import { Group } from '@/types/database'

// Composables & Stores
const { routeSk, routeGroup } = useRoutables()

// Data
const isVisible: Ref<boolean> = ref(false)
const parent: Ref<Record> = ref({} as Record)

onMounted(async () => {
  // Require SK and the child group to display parent info for child record
  if (routeSk && routeGroup && routeGroup === Group.CHILD) {
    parent.value = (await DB.getParent(routeSk)) as Record

    if (parent.value) {
      isVisible.value = true
    } else {
      new Error('Error loading parent record for child creation')
    }
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
