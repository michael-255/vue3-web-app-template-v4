<script setup lang="ts">
import { Icon } from '@/types/icons'
import { onMounted, ref, type Ref } from 'vue'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import type { Record } from '@/types/database'
import DataSchema from '@/services/DataSchema'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Inspect Record` })

// Composables & Stores
const { routeType, routeId } = useRoutables()
const { log } = useLogger()

// Data
const labelSingular = DataSchema.getLabelSingular(routeType)
const fieldProps = DataSchema.getFieldProps(routeType)
const inspectRecord: Ref<Record> = ref({} as Record)

onMounted(async () => {
  try {
    if (routeId && routeType) {
      const record = (await DB.getRecord(routeType, routeId)) as Record
      if (record) {
        inspectRecord.value = record
      }
    }
  } catch (error) {
    log.error('Error loading inspect view', error)
  }
})
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INSPECT" :bannerTitle="`Inspect ${labelSingular}`">
    <!-- Parent info card for child record creation  -->
    <ParentInfoCard />
    <!-- Field Loop -->
    <QCard v-for="(fieldProp, i) in fieldProps" :key="i" class="q-mb-md">
      <QCardSection>
        <p class="text-h6">{{ fieldProp.label }}</p>
        <div>{{ fieldProp.inspectFormat(inspectRecord?.[fieldProp.field]) }}</div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
