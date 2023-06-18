<script setup lang="ts">
import { Icon } from '@/types/icons'
import { Field, type ChildRecord } from '@/types/database'
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

const { routeType, routeId, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

const labelSingular = DataSchema.getChildLabelSingular(routeType)
const fieldProps = DataSchema.getChildFieldProps(routeType)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    if (await idValidator.isValid(routeId)) {
      const editRecord = (await DB.getChild(routeId as string)) as any

      if (editRecord) {
        Object.keys(editRecord).forEach((key) => {
          actionStore.record[key as Field] = editRecord[key]
        })
      }
    }
  } catch (error) {
    log.error('Error loading edit child view', error)
  }
})

onUnmounted(() => {
  actionStore.$reset()
})

async function onSubmit() {
  confirmDialog('Update', `Update ${labelSingular} record?`, Icon.SAVE, 'positive', async () => {
    try {
      const deepRecordCopy = extend(true, {}, actionStore.record) as ChildRecord
      await DB.updateChild(routeId as string, deepRecordCopy)

      log.info('Successfully updated record', {
        id: deepRecordCopy[Field.ID],
        type: routeType,
      })

      goBack()
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
        <ParentInfoCard
          v-if="actionStore.record?.parentId"
          :parentId="actionStore.record.parentId"
        />

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
