<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import type { Record, Type } from '@/types/database'
import { idValidator, typeValidator } from '@/services/validators'
import useRoutables from '@/composables/useRoutables'
import useLogger from '@/composables/useLogger'
import DataSchema from '@/services/DataSchema'
import DB from '@/services/Database'

// Composables & Stores
const { routeId, routeParentId, routeType } = useRoutables()
const { log } = useLogger()

// Data
const isVisible: Ref<boolean> = ref(false)
const parent: Ref<Record> = ref({} as Record)

onMounted(async () => {
  try {
    const isIdValid = await idValidator.isValid(routeId)
    const isParentIdValid = await idValidator.isValid(routeParentId)
    const isTypeValid = await typeValidator.isValid(routeType)

    if (isTypeValid && isParentIdValid) {
      // Creating child record attached to parent
      const parentType = DataSchema.getParentType(routeType) as Type
      const parentRecord = (await DB.getRecord(parentType, routeParentId as string)) as Record

      if (parentRecord) {
        parent.value = parentRecord
        isVisible.value = true
      }
    } else if (isTypeValid && isIdValid) {
      // Creating new child record, so need to get the child record to get the parent id
      const childRecord = (await DB.getRecord(routeType, routeId as string)) as Record

      if (childRecord && childRecord.parentId) {
        const parentType = DataSchema.getParentType(routeType) as Type
        const parentRecord = (await DB.getRecord(parentType, childRecord.parentId)) as Record

        if (parentRecord) {
          parent.value = parentRecord
          isVisible.value = true
        }
      }
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
