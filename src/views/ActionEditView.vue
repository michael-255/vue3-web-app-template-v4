<script setup lang="ts">
import { Icon } from '@/types/icons'
import { DatabaseField } from '@/types/database'
import type { DatabaseRecord } from '@/types/models'
import { onMounted, onUnmounted, ref } from 'vue'
import { getFieldBlueprints, getFields, getLabel } from '@/services/Blueprints'
import { AppName } from '@/types/misc'
import { extend, useMeta } from 'quasar'
import useRoutables from '@/composables/useRoutables'
import useActionStore from '@/stores/action'
import useDialogs from '@/composables/useDialogs'
import useLogger from '@/composables/useLogger'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Edit Record` })

// Composables & Stores
const { routeDatabaseType, routeId, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

// Data
const fieldBlueprints = getFieldBlueprints(routeDatabaseType)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    actionStore.record[DatabaseField.TYPE] = routeDatabaseType

    if (routeId) {
      const oldRecord = await DB.getRecord(routeDatabaseType, routeId)

      if (oldRecord) {
        Object.keys(oldRecord).forEach((key) => {
          actionStore.record[key as DatabaseField] = oldRecord[key as DatabaseField]
        })
      }
    }
  } catch (error) {
    log.error('Error loading edit view', error)
  }
})

onUnmounted(() => {
  actionStore.$reset()
})

/**
 * Confirmation edits the existing record in the database. Validation dialog appears if any field inputs are invalid.
 */
async function onSubmit() {
  const fields = getFields(routeDatabaseType)

  // Build record from store using only fields used by its type (ignoring others in store)
  const record = fields.reduce((acc, field) => {
    acc[field] = actionStore.record[field] as DatabaseRecord[typeof field]
    return acc
  }, {} as any) as DatabaseRecord

  confirmDialog(
    'Update Record',
    `Update record ${record[DatabaseField.ID]} for ${record[DatabaseField.TYPE]}?`,
    Icon.EDIT,
    'positive',
    async () => {
      try {
        const deepRecordCopy = extend(true, {}, record) as DatabaseRecord
        await DB.updateRecord(routeDatabaseType, routeId, deepRecordCopy)

        log.info('Successfully updated record', {
          updatedRecordType: routeDatabaseType,
          updatedRecordId: routeId,
        })

        actionStore.$reset()
        goBack() // Return to previous page
      } catch (error) {
        log.error('Update failed', error)
      }
    }
  )
}
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.EDIT"
    :bannerTitle="`Edit ${getLabel(routeDatabaseType, 'singular')}`"
  >
    <!-- Error Render -->
    <div v-if="fieldBlueprints.length === 0">
      <QCard class="q-mb-md">
        <QCardSection>
          <div class="text-h6">No fields available for this record type</div>
        </QCardSection>
      </QCard>
    </div>

    <!-- Normal Page Render -->
    <div v-else>
      <!-- Create Form -->
      <QForm
        greedy
        @submit="onSubmit"
        @validation-error="isFormValid = false"
        @validation-success="isFormValid = true"
      >
        <div v-for="(fieldBP, i) in fieldBlueprints" :key="i" class="q-mb-md">
          <!-- Dynamic Async Components -->
          <component :is="fieldBP.component" :label="fieldBP.label" />
        </div>

        <div class="row justify-start">
          <!-- Form Submit -->
          <div class="col">
            <QBtn label="Update" type="submit" color="positive" :icon="Icon.SAVE" />
          </div>
          <!-- Invalid entries message -->
          <div class="col">
            <div v-show="!isFormValid">
              <QIcon :name="Icon.WARN" color="warning" />
              <span class="text-caption q-ml-xs text-warning">
                Correct invalid entries and try again
              </span>
            </div>
          </div>
        </div>
      </QForm>
    </div>
  </ResponsivePage>
</template>
