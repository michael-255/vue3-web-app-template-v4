<script setup lang="ts">
import { uid } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { slugify } from '@/utils/common'
import { Limit } from '@/types/misc'
import { FieldDefault } from '@/services/Defaults'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.ID] =
    actionStore.record[DatabaseField.ID] ?? FieldDefault[DatabaseField.ID]() // function call
})

/**
 * Input validation rule for the template component.
 */
function validationRule() {
  return (val: string) =>
    (typeof val === 'string' &&
      slugify(val).length <= Limit.MAX_ID_LENGTH &&
      slugify(val).length >= Limit.MIN_ID_LENGTH) ||
    `Id must be between ${Limit.MIN_ID_LENGTH} and ${Limit.MAX_ID_LENGTH} characters`
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Unique id for the record. Generate a random id with the button on the right.
      </div>

      <QInput
        v-model="actionStore.record[DatabaseField.ID]"
        ref="inputRef"
        :rules="[validationRule()]"
        :disable="locked"
        :maxlength="Limit.MAX_ID_LENGTH"
        type="text"
        counter
        dense
        outlined
        color="primary"
        hint="Auto formatted"
        @blur="actionStore.record[DatabaseField.ID] = slugify(actionStore.record[DatabaseField.ID])"
      >
        <template v-slot:after>
          <QBtn
            :disable="locked"
            :icon="Icon.REFRESH"
            color="primary"
            class="q-px-sm"
            @click="actionStore.record[DatabaseField.ID] = uid()"
          />
        </template>
      </QInput>
    </QCardSection>
  </QCard>
</template>
