<script setup lang="ts">
import { Icon } from '@/types/icons'
import { type Record, Field } from '@/types/database'
import { onMounted, onUnmounted, ref } from 'vue'
import { AppName } from '@/types/general'
import { extend, uid, useMeta } from 'quasar'
import { idValidator } from '@/services/validators'
import DataSchema from '@/services/DataSchema'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useRoutables from '@/composables/useRoutables'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Create Record` })

// Composables & Stores
const { routeGroupId, routeType, routeGroup, goBack } = useRoutables()
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
    if (await idValidator.isValid(routeGroupId)) {
      // Attaching child record to this group
      actionStore.record[Field.GROUP_ID] = routeGroupId
    } else {
      // Creating new parent record
      actionStore.record[Field.GROUP_ID] = uid()
    }

    actionStore.record[Field.UID] = uid() // New record UID
    actionStore.record[Field.TYPE] = routeType
    actionStore.record[Field.GROUP] = routeGroup
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
  confirmDialog(
    'Create',
    `Create ${schemaLabelSingular} record?`,
    Icon.CREATE,
    'positive',
    async () => {
      try {
        const deepRecordCopy = extend(true, {}, actionStore.record) as Record

        await DB.add(deepRecordCopy)

        log.info('Successfully created record', {
          uid: deepRecordCopy[Field.UID],
          groupId: deepRecordCopy[Field.GROUP_ID],
          type: deepRecordCopy[Field.TYPE],
          group: deepRecordCopy[Field.GROUP],
        })

        goBack() // Return to previous page
      } catch (error) {
        log.error('Create failed', error)
      }
    }
  )
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.CREATE" :bannerTitle="`Create ${schemaLabelSingular}`">
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
