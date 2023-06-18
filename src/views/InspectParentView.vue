<script setup lang="ts">
import { Icon } from '@/types/icons'
import { onMounted, ref, type Ref } from 'vue'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import type { ParentRecord } from '@/types/database'
import DataSchema from '@/services/DataSchema'
import ParentInfoCard from '@/components/ParentInfoCard.vue'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Inspect Parent Record` })

const { routeType, routeId } = useRoutables()
const { log } = useLogger()

const inspectRecord: Ref<any> = ref({} as ParentRecord)

onMounted(async () => {
  try {
    if (routeId && routeType) {
      const record = await DB.getParent(routeId)

      if (record) {
        inspectRecord.value = record
      }
    }
  } catch (error) {
    log.error('Error loading parent inspect view', error)
  }
})
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.INSPECT"
    :bannerTitle="`Inspect ${DataSchema.getParentLabelSingular(routeType)}`"
  >
    <!-- Parent info card for child record creation  -->
    <ParentInfoCard />

    <!-- Field Loop -->
    <QCard
      v-for="(fieldProp, i) in DataSchema.getParentFieldProps(routeType)"
      :key="i"
      class="q-mb-md"
    >
      <QCardSection>
        <p class="text-h6">{{ fieldProp.label }}</p>
        <div>{{ fieldProp.inspectFormat(inspectRecord?.[fieldProp?.field]) }}</div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
