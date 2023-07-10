<script setup lang="ts">
import { Icon } from '@/types/general'
import { DBTable } from '@/types/database'
import type { Test } from '@/models/Test'
import { getRecordsCountDisplay } from '@/utils/common'
import useRouting from '@/composables/useRouting'
import CardMenu from '@/components/dashboard/CardMenu.vue'

defineProps<{
  tests: Test[]
  showDescriptions: boolean
}>()

const { goToCreate } = useRouting()
</script>

<template>
  <div v-for="record in tests" :key="record.id">
    <QCard>
      <QCardSection>
        <CardMenu :record="record" />
        {{ record }}
      </QCardSection>
    </QCard>
  </div>

  <div class="row justify-center">
    <p class="col-12 text-grey text-center text-body1">{{ getRecordsCountDisplay(tests) }}</p>

    <QBtn
      color="positive"
      :icon="Icon.CREATE"
      label="Create Test"
      @click="goToCreate(DBTable.TESTS)"
    />
  </div>
</template>
