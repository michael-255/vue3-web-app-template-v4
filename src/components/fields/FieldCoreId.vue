<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { truncateString } from '@/utils/common'
import {
  type AnyCoreRecord,
  type RecordType,
  recordGroups,
  idSchema,
  allFields,
} from '@/types/core'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/Database'

defineProps<{
  inspecting: boolean
}>()

const { routeType } = useRoutables()
const { log } = useLogger()
const actionStore = useActionStore()

const field = allFields.Values.coreId
const options: Ref<{ value: string; label: string }[]> = ref([])

onMounted(async () => {
  try {
    // actionStore.record[field] = actionStore.record[field] ?? null // TODO - May need to choose a record after this is set

    const records = (await DB.getRecords(
      recordGroups.Values.core,
      routeType as RecordType
    )) as AnyCoreRecord[]

    options.value = records.map((r: AnyCoreRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 4, '*')})`,
    }))
  } catch (error) {
    log.error('Error with core ids input', error)
  }
})

function inspectFormat(val: string) {
  return `${val || '-'}`
}
</script>

<template>
  <div class="text-weight-bold text-body1">Core Record</div>

  <div v-if="inspecting">
    {{ inspectFormat(actionStore.record[field]) }}
  </div>

  <div v-else>
    <p>The core record that this sub record is associated with.</p>

    <QSelect
      v-model="actionStore.record[field]"
      :rules="[(val: string) => idSchema.safeParse(val).success || '* Required']"
      :options="options"
      emit-value
      map-options
      options-dense
      dense
      outlined
      color="primary"
    />
  </div>
</template>
