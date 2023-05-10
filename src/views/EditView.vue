<script setup lang="ts">
import { Icon } from '@/types/icons'
import { Field } from '@/types/database'
import { onMounted, onUnmounted, ref } from 'vue'
import { AppName } from '@/types/misc'
import { extend, useMeta } from 'quasar'
import { dataSchema } from '@/services/data-schema'
import type { Record } from '@/types/models'
import { idValidator } from '@/services/validators'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useRoutables from '@/composables/useRoutables'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Edit Record` })

// Composables & Stores
const { routeUid, routeType, routeGroup, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

// Data
const schemaLabelSingular = dataSchema.find(
  (i) => i.type === routeType && i.group === routeGroup
)?.labelSingular
const schemaFieldProps = dataSchema.find(
  (i) => i.type === routeType && i.group === routeGroup
)?.fieldProps

const isFormValid = ref(true)

onMounted(async () => {
  try {
    if (await idValidator.isValid(routeUid)) {
      const editRecord = (await DB.getRecord(routeUid)) as Record

      if (editRecord) {
        // Assign values from record to the action store
        Object.keys(editRecord).forEach((key) => {
          actionStore.record[key as Field] = editRecord[key as Field]
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
  confirmDialog(
    'Update',
    `Update ${schemaLabelSingular} record?`,
    Icon.CREATE,
    'positive',
    async () => {
      try {
        const deepRecordCopy = extend(true, {}, actionStore.record) as Record

        await DB.update(deepRecordCopy.uid, deepRecordCopy)

        log.info('Successfully updated record', {
          uid: deepRecordCopy[Field.UID],
          groupId: deepRecordCopy[Field.GROUP_ID],
          type: deepRecordCopy[Field.TYPE],
          group: deepRecordCopy[Field.GROUP],
        })

        goBack() // Return to previous page
      } catch (error) {
        log.error('Update failed', error)
      }
    }
  )
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.EDIT" :bannerTitle="`Edit ${schemaLabelSingular}`">
    <!-- Error Render -->
    <div v-if="!schemaLabelSingular || !schemaFieldProps">
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
        <div v-for="(fieldProps, i) in schemaFieldProps" :key="i" class="q-mb-md">
          <component
            :is="fieldProps.component"
            :field="fieldProps.field"
            :label="fieldProps.label"
            :desc="fieldProps.desc"
            :getDefault="fieldProps.getDefault"
            :validator="fieldProps.validator"
            :validationMessage="fieldProps.validationMessage"
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
