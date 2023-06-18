<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import type { ParentRecord } from '@/types/database'
import useLogger from '@/composables/useLogger'
import DB from '@/services/Database'

const props = defineProps<{
  parentId: string
}>()

const { log } = useLogger()

const parent: Ref<ParentRecord> = ref({} as ParentRecord)
const isVisible = ref(false)

onMounted(async () => {
  try {
    const parentRecord = await DB.getParent(props.parentId)

    if (parentRecord) {
      parent.value = parentRecord
      isVisible.value = true
    }
  } catch (error) {
    log.error('Error loading parent info card', error)
  }
})
</script>

<template>
  <QCard v-if="isVisible" class="q-mb-md">
    <QCardSection>
      <p class="text-h6">Record for {{ parent.name }}</p>

      <p>{{ parent.desc }}</p>

      <p class="q-my-none q-py-none text-grey text-caption">{{ parent.id }}</p>
    </QCardSection>
  </QCard>
</template>
