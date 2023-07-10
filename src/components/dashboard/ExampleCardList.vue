<script setup lang="ts">
import { Icon } from '@/types/general'
import { DBTable } from '@/types/database'
import type { Example } from '@/models/Example'
import { getRecordsCountDisplay } from '@/utils/common'
import useRouting from '@/composables/useRouting'
import CardMenu from '@/components/dashboard/CardMenu.vue'

defineProps<{
  examples: Example[]
  showDescriptions: boolean
}>()

const { goToCreate } = useRouting()
</script>

<template>
  <div v-for="record in examples" :key="record.id">
    <QCard>
      <QCardSection>
        <CardMenu :record="record" />
        {{ record }}
      </QCardSection>
    </QCard>
  </div>

  <div class="row justify-center">
    <p class="col-12 text-grey text-center text-body1">{{ getRecordsCountDisplay(examples) }}</p>

    <QBtn
      color="positive"
      :icon="Icon.CREATE"
      label="Create Example"
      @click="goToCreate(DBTable.EXAMPLES)"
    />
  </div>
</template>
