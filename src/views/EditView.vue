<script setup lang="ts">
import { Icon } from '@/types/icons'
import { type Record, Field } from '@/types/database'
import { onMounted, onUnmounted, ref } from 'vue'
import { AppName } from '@/types/general'
import { extend, useMeta } from 'quasar'
import { idValidator } from '@/services/validators'
import DataSchema from '@/services/DataSchema'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useRoutables from '@/composables/useRoutables'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Edit Record` })

// Composables & Stores
const { routeType, routeId, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

// Data
const labelSingular = DataSchema.getLabelSingular(routeType)
const fieldProps = DataSchema.getFieldProps(routeType)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    if (await idValidator.isValid(routeId)) {
      const editRecord = (await DB.getRecord(routeType, routeId as string)) as Record

      if (editRecord) {
        // Assign values from record to the action store
        Object.keys(editRecord).forEach((key) => {
          actionStore.record[key as Field] = editRecord[key as Field] as any
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
 * Confirmation creates a new record in the database. All inputs must be valid.
 */
async function onSubmit() {
  confirmDialog('Update', `Update ${labelSingular} record?`, Icon.CREATE, 'positive', async () => {
    try {
      const deepRecordCopy = extend(true, {}, actionStore.record) as Record

      await DB.updateRecord(routeType, routeId as string, deepRecordCopy)

      log.info('Successfully updated record', {
        id: deepRecordCopy[Field.ID],
        type: routeType,
      })

      goBack() // Return to previous page
    } catch (error) {
      log.error('Update failed', error)
    }
  })
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.EDIT" :bannerTitle="`Edit ${labelSingular}`">
    <!-- Error Render -->
    <div v-if="!labelSingular || !fieldProps">
      <QCard class="q-mb-md">
        <QCardSection>
          <QIcon :name="Icon.WARN" size="md" color="warning" />
          <span class="q-ml-md">Error rendering this record</span>
        </QCardSection>
      </QCard>
    </div>

    <!-- Normal Page Render -->
    <div v-else>
      <QForm
        @submit="onSubmit"
        @validation-error="isFormValid = false"
        @validation-success="isFormValid = true"
      >
        <!-- Parent info card for child record actions -->
        <ParentInfoCard />
        <!-- Dynamic Async Components -->
        <div v-for="(fieldProp, i) in fieldProps" :key="i" class="q-mb-md">
          <component
            :is="fieldProp.component"
            :field="fieldProp.field"
            :label="fieldProp.label"
            :desc="fieldProp.desc"
            :getDefault="fieldProp.getDefault"
            :validator="fieldProp.validator"
            :validationMessage="fieldProp.validationMessage"
          />
        </div>

        <div class="row justify-start">
          <!-- Submit -->
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
