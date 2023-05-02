<script setup lang="ts">
import { Icon } from '@/types/icons'
import { onMounted, ref, type Ref } from 'vue'
import type { DatabaseRecord } from '@/types/models'
import { type Optional, AppName } from '@/types/misc'
import { getFieldBlueprints, getLabel } from '@/services/Blueprints'
import { useMeta } from 'quasar'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Inspect Record` })

// Composables & Stores
const { routeDatabaseType, routeId } = useRoutables()
const { log } = useLogger()

// Data
const fieldBlueprints = getFieldBlueprints(routeDatabaseType)
const record: Ref<Optional<DatabaseRecord>> = ref(null)

onMounted(async () => {
  try {
    record.value = await DB.getRecord(routeDatabaseType, routeId)
  } catch (error) {
    log.error('Error loading inspect view', error)
  }
})
</script>

<template>
  <ResponsivePage
    :bannerIcon="Icon.INSPECT"
    :bannerTitle="`Inspect ${getLabel(routeDatabaseType, 'singular')}`"
  >
    <QCard v-for="(fieldBP, i) in fieldBlueprints" :key="i" class="q-mb-md">
      <QCardSection>
        <div class="text-h6 q-mb-sm">{{ fieldBP.label }}</div>
        <div>{{ fieldBP.inspectFormat(record?.[fieldBP.field]) ?? '-' }}</div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
