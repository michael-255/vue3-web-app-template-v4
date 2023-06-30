<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { recordGroups, type AnyCoreRecord } from '@/types/core'
import useLogger from '@/composables/useLogger'
import DB from '@/services/Database'

const props = defineProps<{
  coreId: string
}>()

const { log } = useLogger()

const record: Ref<AnyCoreRecord | undefined> = ref(undefined)
const isVisible = ref(false)

onMounted(async () => {
  try {
    const coreRecord = (await DB.getRecord(recordGroups.Values.core, props.coreId)) as AnyCoreRecord

    if (coreRecord) {
      record.value = coreRecord
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
      <p class="text-h6">Record for {{ record?.name }}</p>

      <p>{{ record?.desc }}</p>

      <p class="q-my-none q-py-none text-grey text-caption">{{ record?.id }}</p>
    </QCardSection>
  </QCard>
</template>
