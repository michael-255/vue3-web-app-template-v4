<script setup lang="ts">
import { Icon } from '@/types/icons'
import { onMounted, ref, type Ref } from 'vue'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { logFields } from '@/services/field-props'
import type { Log } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Inspect Log` })

const { routeAutoId } = useRoutables()
const { log } = useLogger()

const inspectRecord: Ref<any> = ref({} as Log)

onMounted(async () => {
  try {
    if (routeAutoId) {
      const logRecord = await DB.getLog(routeAutoId)

      if (logRecord) {
        inspectRecord.value = logRecord
      }
    }
  } catch (error) {
    log.error('Error loading log inspect view', error)
  }
})
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INSPECT" bannerTitle="Inspect Log">
    <QCard v-for="(fieldProp, i) in logFields" :key="i" class="q-mb-md">
      <QCardSection>
        <p class="text-h6">{{ fieldProp.label }}</p>
        <div>{{ fieldProp.inspectFormat(inspectRecord?.[fieldProp?.field]) }}</div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
