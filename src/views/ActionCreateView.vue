<script setup lang="ts">
import { Icon } from '@/types/icons'
import { DatabaseField } from '@/types/database'
import type { DatabaseRecord } from '@/types/models'
import { getFieldBlueprints, getFields, getLabel } from '@/services/Blueprints'
import { onMounted, onUnmounted, ref } from 'vue'
import { AppName } from '@/types/misc'
import { extend, useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'
import useRoutables from '@/composables/useRoutables'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Create Record` })

// Composables & Stores
const { routeDatabaseType, routeParentId, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

// Data
const fieldBlueprints = getFieldBlueprints(routeDatabaseType)
const isFormValid = ref(true)

onMounted(() => {
  try {
    actionStore.record[DatabaseField.TYPE] = routeDatabaseType
  } catch (error) {
    log.error('Error loading create view', error)
  }
})

onUnmounted(() => {
  actionStore.$reset()
})

/**
 * Confirmation creates a new record in the database. All inputs must be valid.
 */
async function onSubmit() {
  const fields = getFields(routeDatabaseType)

  // Build record from store using only fields used by its type (ignoring others in store)
  const record = fields.reduce((acc, field) => {
    acc[field] = actionStore.record[field] as DatabaseRecord[typeof field]
    return acc
  }, {} as any) as DatabaseRecord

  confirmDialog(
    'Create Record',
    `Create record ${record[DatabaseField.ID]} for ${record[DatabaseField.TYPE]}?`,
    Icon.CREATE,
    'positive',
    async () => {
      try {
        const deepRecordCopy = extend(true, {}, record) as DatabaseRecord
        await DB.addRecord(deepRecordCopy)

        log.info('Successfully created record', {
          createdRecordType: record[DatabaseField.TYPE],
          createdRecordId: record[DatabaseField.ID],
        })

        goBack() // Return to previous page
      } catch (error) {
        log.error('Create failed', error)
      }
    }
  )
}

/**
 * Determines which fields are locked or hidden when a routeParentId is present.
 * Having a routeParentId means you are creating a child record for a parent record.
 * @param field
 */
function lockFields(field: DatabaseField) {
  const lockedFields = [DatabaseField.PARENT_ID, DatabaseField.CREATED_TIMESTAMP]

  if (routeParentId && lockedFields.includes(field)) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.CREATE"
    :bannerTitle="`Create ${getLabel(routeDatabaseType, 'singular')}`"
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
          <component
            :is="fieldBP.component"
            :locked="lockFields(fieldBP.field)"
            :label="fieldBP.label"
          />
        </div>

        <div class="row justify-start">
          <!-- Form Submit -->
          <div class="col">
            <QBtn label="Create" type="submit" color="positive" :icon="Icon.SAVE" />
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
