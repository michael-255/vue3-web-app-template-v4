<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { truncateString } from '@/utils/common'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { getParentType } from '@/services/Blueprints'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/LocalDatabase'
import type { DatabaseRecord } from '@/types/models'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const { routeDatabaseType, routeParentId } = useRoutables()
const { log } = useLogger()
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    const parentType = getParentType(routeDatabaseType)

    // Parent type must exist to continue
    if (!parentType) {
      throw new Error('Missing parent type')
    }

    // Gets all enabled parent records
    const parentTypeRecords = await DB.getEnabledParentRecords(parentType)

    // Build select box options
    options.value = parentTypeRecords.map((r: DatabaseRecord) => ({
      value: r.id, // Item id is used as the value under the hood
      label: `${r.name} (${truncateString(r.id, 4, '*')})`, // Truncate id for readability
    }))

    // Set the current option
    // Must do this first so it can be null if parent was deleted versus being the first option
    if (routeParentId) {
      // An existing parent id means we have to try and match it too our options as a selection
      const matchedParent = options.value?.find(
        (option) => option.value === routeParentId // Comparing the full ids
      )?.value

      if (matchedParent) {
        // Parent match found, so use that id
        actionStore.record[DatabaseField.PARENT_ID] = matchedParent
      } else {
        // Parent match NOT found, so set to null (parent is missing for some reason)
        actionStore.record[DatabaseField.PARENT_ID] = null
      }
    } else if (options.value?.length > 0) {
      // We know at least one option exists, so default to the first option
      actionStore.record[DatabaseField.PARENT_ID] = options.value[0].value
    } else {
      // No options exist, so set to null (this record cannot be completed until a parent is created)
      actionStore.record[DatabaseField.PARENT_ID] = null
    }
  } catch (error) {
    log.error('Error with parent id input', error)
  }
})

/**
 * Input validation rule for the template component.
 */
function validationRule() {
  return (val: string) => (val !== undefined && val !== null && val !== '') || '* Required'
}
</script>

<template>
  <!-- Always shown so the user knows what Parent record they a making a Child record for -->
  <QCard>
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        The parent record that this child record is linked with. Select one from the list. Part of
        the parent record id is shown to the right of each selection.
      </div>

      <QSelect
        v-model="actionStore.record[DatabaseField.PARENT_ID]"
        ref="inputRef"
        :disable="locked"
        :options="options"
        :rules="[validationRule()]"
        emit-value
        map-options
        options-dense
        dense
        outlined
        color="primary"
      />
    </QCardSection>
  </QCard>
</template>
