<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { idsSchema } from '@/models/_Entity'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<{ value: string; label: string; disable: boolean }[]> = ref([])

onMounted(async () => {
  try {
    options.value = await DB.getTestIdsOptions()
  } catch (error) {
    log.error('Error with test ids field', error)
  }
})
</script>

<template>
  <div class="text-weight-bold text-body1">Tests</div>

  <p>Tests that are stored by the Example record.</p>

  <QSelect
    v-model="actionStore.record.testIds"
    :rules="[(val: string[]) => idsSchema.safeParse(val).success || 'Required']"
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
</template>
