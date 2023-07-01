<script setup lang="ts">
import { Icon } from '@/types/general'
import {
  allFields,
  type AnyField,
  type AnyRecord,
  type RecordGroup,
  type RecordType,
} from '@/types/core'
import { onMounted, onUnmounted, ref } from 'vue'
import { extend, uid, useMeta } from 'quasar'
import { AppName } from '@/constants/global'
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

const label = DataSchema.getLabel(routeGroup as RecordGroup, routeType as RecordType, 'singular')
const fields = DataSchema.getFields(routeGroup as RecordGroup, routeType as RecordType)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    actionStore.record[allFields.Values.id] = uid()
    actionStore.record[allFields.Values.type] = routeType

    if (routeId) {
      const editRecord = (await DB.getRecord(routeGroup as RecordGroup, routeId)) as AnyRecord

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
      await DB.updateRecord(
        routeGroup as RecordGroup,
        routeType as RecordType,
        routeId as string,
        deepRecordCopy
      )

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
    <div v-if="!label || !fields">
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
        <div v-for="(field, i) in fields" :key="i" class="q-mb-md">
          <component :is="field" :inspecting="false" />
        </div>

        <!-- Submit -->
        <div class="row justify-center q-my-sm">
          <QBtn label="Update" type="submit" color="positive" :icon="Icon.SAVE" />
        </div>

        <!-- Validation Message -->
        <div class="row justify-center">
          <div v-show="!isFormValid">
            <QIcon :name="Icon.WARN" color="warning" />
            <span class="text-caption q-ml-xs text-warning">
              Correct invalid entries and try again
            </span>
          </div>
        </div>
      </QForm>
    </div>
  </ResponsivePage>
</template>
