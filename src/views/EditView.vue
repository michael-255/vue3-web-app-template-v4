<script setup lang="ts">
import { Icon } from '@/types/icons'
import { allFields, type AnyField, type AnyRecord } from '@/types/database'
import { onMounted, onUnmounted, ref } from 'vue'
import { AppName } from '@/types/general'
import { extend, uid, useMeta } from 'quasar'
import DataSchema from '@/services/DataSchema'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useRoutables from '@/composables/useRoutables'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Edit Record` })

const { routeGroup, routeType, routeId, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

const label = DataSchema.getLabel(routeGroup, routeType, 'singular')
const fieldProps = DataSchema.getFieldProps(routeGroup, routeType)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    actionStore.record[allFields.Values.id] = uid()
    actionStore.record[allFields.Values.type] = routeType

    if (routeId) {
      const editRecord = (await DB.getRecord(routeGroup, routeId)) as AnyRecord

      if (editRecord) {
        Object.keys(editRecord).forEach((key) => {
          actionStore.record[key as AnyField] = editRecord[key as AnyField]
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

async function onSubmit() {
  confirmDialog('Update', `Update ${label} record?`, Icon.EDIT, 'positive', async () => {
    try {
      const deepRecordCopy = extend(true, {}, actionStore.record) as AnyRecord
      await DB.updateRecord(routeGroup, routeType, routeId as string, deepRecordCopy)

      log.info('Successfully updated record', {
        id: deepRecordCopy[allFields.Values.id],
        type: routeType,
      })

      goBack()
    } catch (error) {
      log.error('Edit failed', error)
    }
  })
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.EDIT" :bannerTitle="`Edit ${label}`">
    <!-- Error Render -->
    <div v-if="!label || !fieldProps">
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
        <ParentInfoCard v-if="actionStore.record?.coreId" :coreId="actionStore.record.coreId" />

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
