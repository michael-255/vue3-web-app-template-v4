<script setup lang="ts">
import { Icon } from '@/types/icons'
import { Field, type ChildRecord } from '@/types/database'
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

const { routeType, routeParentId, goBack } = useRoutables()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

const labelSingular = DataSchema.getChildLabelSingular(routeType)
const fieldProps = DataSchema.getChildFieldProps(routeType)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    if (await idValidator.isValid(routeParentId)) {
      actionStore.record[Field.ID] = uid()
      actionStore.record[Field.TYPE] = routeType
      actionStore.record[Field.PARENT_ID] = routeParentId
    } else {
      throw new Error(`Invalid parent id: ${routeParentId}`)
    }
  } catch (error) {
    log.error('Error loading create child view', error)
  }
})

onUnmounted(() => {
  actionStore.$reset()
})

async function onSubmit() {
  confirmDialog('Create', `Create ${labelSingular} record?`, Icon.CREATE, 'positive', async () => {
    try {
      const deepRecordCopy = extend(true, {}, actionStore.record) as ChildRecord
      await DB.addChild(deepRecordCopy)

      log.info('Successfully created record', {
        id: deepRecordCopy[Field.ID],
        type: routeType,
      })

      goBack()
    } catch (error) {
      log.error('Create failed', error)
    }
  })
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.CREATE" :bannerTitle="`Create ${labelSingular}`">
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
