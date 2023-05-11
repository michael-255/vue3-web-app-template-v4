<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { type Record, Group } from '@/types/database'
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
    ///////////////////////////////////////////////////////////////////////////
    /**
     * /create/parentType
     * /create/parentType/parentId -> create attached child record - DISPLAY HERE
     * /(inspect|edit|charts)/parentType/id
     * /(inspect|edit|charts)/childType/id - DISPLAY HERE
     */
    // TODO
    ///////////////////////////////////////////////////////////////////////////
    if (routeGroup === Group.CHILD) {
      if (await idValidator.isValid(routeGroupId)) {
        // Child record creation route params
        const parentRecord = (await DB.getParent(routeGroupId)) as Record

        if (parentRecord) {
          parent.value = parentRecord
          isVisible.value = true
        }
      } else if (await idValidator.isValid(routeUid)) {
        // Child record Inspect and Edit route params
        const childRecord = (await DB.getRecord(routeUid)) as Record

        if (childRecord) {
          const parentRecord = (await DB.getParent(childRecord.groupId)) as Record

          if (parentRecord) {
            parent.value = parentRecord
            isVisible.value = true
          }
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

      <p class="q-my-none q-py-none text-grey text-caption">Unique Id: {{ parent.uid }}</p>
      <p class="q-my-none q-py-none text-grey text-caption">Group Id: {{ parent.groupId }}</p>
    </QCardSection>
  </QCard>
</template>
