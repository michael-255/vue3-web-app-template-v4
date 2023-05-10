<script setup lang="ts">
import { Icon } from '@/types/icons'
import { onMounted, ref, type Ref } from 'vue'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import { dataSchema } from '@/services/data-schema'
import type { Record } from '@/types/models'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Inspect Record` })

// Composables & Stores
const { routeUid, routeType, routeGroup } = useRoutables()
const { log } = useLogger()

// Data
const schemaLabelSingular = dataSchema.find(
  (i) => i.type === routeType && i.group === routeGroup
)?.labelSingular
const schemaFieldProps = dataSchema.find(
  (i) => i.type === routeType && i.group === routeGroup
)?.fieldProps

const record: Ref<Record> = ref({} as Record)

onMounted(async () => {
  try {
    record.value = (await DB.getRecord(routeUid)) as Record
  } catch (error) {
    log.error('Error loading inspect view', error)
  }
})
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INSPECT" :bannerTitle="`Inspect ${schemaLabelSingular}`">
    <!-- Parent info card for child record creation  -->
    <ParentInfoCard />
    <!-- Field Loop -->
    <QCard v-for="(fieldProp, i) in schemaFieldProps" :key="i" class="q-mb-md">
      <QCardSection>
        <p class="text-h6">{{ fieldProp.label }}</p>
        <div>{{ fieldProp.inspectFormat(record?.[fieldProp.field]) }}</div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
