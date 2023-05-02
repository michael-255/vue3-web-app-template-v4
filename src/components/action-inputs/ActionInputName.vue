<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
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
  actionStore.record[DatabaseField.NAME] =
    actionStore.record[DatabaseField.NAME] ?? FieldDefault[DatabaseField.NAME]() // function call
})

/**
 * Input validation rule for the template component.
 */
function validationRule() {
  return (val: string) =>
    (typeof val === 'string' &&
      val.trim().length <= Limit.MAX_NAME_LENGTH &&
      val.trim().length >= Limit.MIN_NAME_LENGTH) ||
    `Name must be between ${Limit.MIN_NAME_LENGTH} and ${Limit.MAX_NAME_LENGTH} characters`
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">The record name. Dashboard records are partial sorted by name.</div>

      <QInput
        v-model="actionStore.record[DatabaseField.NAME]"
        ref="inputRef"
        :rules="[validationRule()]"
        :disable="locked"
        :maxlength="Limit.MAX_NAME_LENGTH"
        type="text"
        counter
        dense
        outlined
        color="primary"
        @blur="
          actionStore.record[DatabaseField.NAME] = actionStore.record[DatabaseField.NAME].trim()
        "
      />
    </QCardSection>
  </QCard>
</template>
