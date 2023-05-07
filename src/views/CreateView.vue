<script setup lang="ts">
import { Icon } from '@/types/icons'
import { Field } from '@/types/database'
import { onMounted, onUnmounted, ref } from 'vue'
import { AppName } from '@/types/misc'
import { extend, uid, useMeta } from 'quasar'
import { appSchema } from '@/services/AppSchema'
import type { Record } from '@/types/models'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useRoutables from '@/composables/useRoutables'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Create Record` })

// Composables & Stores
const { routeSk, routeType, routeGroup, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

// Data
const schemaLabelSingular = appSchema.find(
  (i) => i.type === routeType && i.group === routeGroup
)?.labelSingular
const schemaFieldProps = appSchema.find(
  (i) => i.type === routeType && i.group === routeGroup
)?.fieldProps

const isFormValid = ref(true)

onMounted(() => {
  try {
    // Pre-set required underlying fields on the action record store
    actionStore.record[Field.PK] = uid()
    actionStore.record[Field.SK] = routeSk || uid() // Creating new parent requires new SK (could be empty string)
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
          pk: deepRecordCopy[Field.PK],
          sk: deepRecordCopy[Field.SK],
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
        <!-- Parent info card for child record creation  -->
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
