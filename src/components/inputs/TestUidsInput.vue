<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { truncateString } from '@/utils/common'
import type { Field } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/Database'
import type { Record } from '@/types/models'

// Props & Emits
const props = defineProps<{
  field: Field
  label: string
  desc: string
  getDefault: () => any
  validator: (val: any) => Promise<boolean>
  validationMessage: string
}>()

// Composables & Stores
const { routeType } = useRoutables()
const { log } = useLogger()
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()

    const records = (await DB.getAllParentTypes(routeType)) as Record[]

    // Build select box options
    options.value = records.map((r: Record) => ({
      value: r.uid,
      label: `${r.name} (${truncateString(r.uid, 4, '*')})`, // Truncate UID for readability
    }))
  } catch (error) {
    log.error('Error with test uids input', error)
  }
})

/**
 * Input validation rule for the template component.
 */
function validationRule() {
  return async (val: string) => (await props.validator(val)) || props.validationMessage
}
</script>

<template>
  <!-- Always shown so the user knows what Parent record they a making a Child record for -->
  <QCard>
    <QCardSection>
      <p class="text-h6 q-mb-md">{{ label }}</p>

      <p class="q-mb-md">{{ desc }}</p>

      <QSelect
        v-model="actionStore.record[field]"
        ref="inputRef"
        :rules="[validationRule()]"
        :options="options"
        counter
        multiple
        emit-value
        map-options
        options-dense
        dense
        outlined
        color="primary"
      />
    </QCardSection>
  </QCard>
</template>
