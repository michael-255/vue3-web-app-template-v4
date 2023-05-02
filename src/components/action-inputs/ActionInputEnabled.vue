<script setup lang="ts">
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { onMounted } from 'vue'
import { FieldDefault } from '@/services/Defaults'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[DatabaseField.IS_ENABLED] =
    actionStore.record[DatabaseField.IS_ENABLED] ?? FieldDefault[DatabaseField.IS_ENABLED]() // function call
})
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Toggle the record as enabled or not. Only enabled records will appear on the Dashboard.
      </div>

      <QToggle :disable="locked" v-model="actionStore.record[DatabaseField.IS_ENABLED]" />
    </QCardSection>
  </QCard>
</template>
