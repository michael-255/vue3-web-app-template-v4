<script setup lang="ts">
import { Icon } from '@/types/general'
import { DBTable } from '@/types/database'
import type { Example } from '@/models/Example'
import { getDisplayDate, getRecordsCountDisplay } from '@/utils/common'
import { useTimeAgo } from '@vueuse/core'
import useRouting from '@/composables/useRouting'
import DashboardCardMenu from '@/components/dashboard/DashboardCardMenu.vue'

defineProps<{
  examples: Example[]
  showDescriptions: boolean
}>()

const { goToCreate } = useRouting()
</script>

<template>
  <div class="row justify-center q-gutter-md">
    <div v-for="record in examples" :key="record.id" class="col-xs-12 col-sm-12 col-md-12 col-lg-5">
      <QCard class="column full-height">
        <QCardSection class="col">
          <DashboardCardMenu :table="DBTable.EXAMPLES" :record="record" />

          <QBadge
            v-if="record.activated"
            rounded
            color="warning"
            class="absolute-top-left q-py-none"
            style="left: -4px; top: -6px"
          >
            <QIcon :name="Icon.LOCK" />
            <span class="text-caption q-ml-xs">Active</span>
          </QBadge>

          <p class="text-h6">{{ record.name }}</p>
          <p v-if="showDescriptions">{{ record.desc }}</p>

          <QBadge rounded color="secondary" class="q-py-none">
            <QIcon :name="Icon.PREVIOUS" />
            <span class="text-caption q-ml-xs">
              {{
                useTimeAgo(record.previous?.createdTimestamp || '').value || 'No previous records'
              }}
            </span>
          </QBadge>

          <div v-if="record.previous?.createdTimestamp">
            <QIcon :name="Icon.CALENDAR_CHECK" />
            <span class="text-caption q-ml-xs">
              {{ getDisplayDate(record?.previous?.createdTimestamp) }}
            </span>
          </div>
        </QCardSection>

        <QCardActions clas="col-auto">
          <QBtn
            v-if="!record.activated"
            label="Attach Example Result"
            color="primary"
            class="full-width"
            :icon="Icon.ATTACH"
            @click="goToCreate(DBTable.EXAMPLES, record.id)"
          />

          <QBtn v-else label="Go To ACTIVE" color="primary" class="full-width" :icon="Icon.UP" />
        </QCardActions>
      </QCard>
    </div>

    <div class="col-12 text-grey text-center text-body1">
      {{ getRecordsCountDisplay(examples) }}
    </div>

    <QBtn
      color="positive"
      :icon="Icon.CREATE"
      label="Create Example"
      @click="goToCreate(DBTable.EXAMPLES)"
    />
  </div>
</template>
