<script setup lang="ts">
import { Icon } from '@/types/general'
import { getDisplayDate, getRecordsCountDisplay } from '@/utils/common'
import { useTimeAgo } from '@vueuse/core'
import type { AnyDBRecord, DBTable, ParentTable } from '@/types/database'
import DashboardRecordCardMenu from '@/components/dashboard/DashboardRecordCardMenu.vue'
import useRouting from '@/composables/useRouting'
import DB from '@/services/Database'

defineProps<{
  parentTable: ParentTable
  records: AnyDBRecord[]
  showDescriptions: boolean
}>()

const { goToCreate, goToActive } = useRouting()

async function onActivate(table: DBTable, id: string) {
  await DB.toggleActive(table, id)
  goToActive()
}
</script>

<template>
  <div class="row justify-center q-gutter-md">
    <div v-for="record in records" :key="record.id" class="col-xs-12 col-sm-12 col-md-12 col-lg-5">
      <QCard class="column full-height">
        <QCardSection class="col">
          <DashboardRecordCardMenu :parentTable="parentTable" :record="record" />

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
              {{ getDisplayDate(record.previous?.createdTimestamp) }}
            </span>
          </div>
        </QCardSection>

        <QCardActions v-if="record.activated" class="col-auto">
          <QBtn
            label="Go To Active"
            color="positive"
            class="full-width"
            :icon="Icon.UP"
            @click="goToActive()"
          />
        </QCardActions>

        <QCardActions v-else class="col-auto">
          <QBtn
            :label="`Attach ${DB.getLabel(DB.getChildTable(parentTable), 'singular')}`"
            color="primary"
            class="full-width q-mb-sm"
            :icon="Icon.ATTACH"
            @click="goToCreate(parentTable, record.id)"
          />

          <QBtn
            label="Activate"
            color="primary"
            class="full-width"
            :icon="Icon.READY"
            @click="onActivate(parentTable, record.id)"
          />
        </QCardActions>
      </QCard>
    </div>

    <div class="col-12 text-grey text-center text-body1">{{ getRecordsCountDisplay(records) }}</div>

    <QBtn
      color="positive"
      :icon="Icon.CREATE"
      :label="`Create ${DB.getLabel(parentTable, 'singular')}`"
      @click="goToCreate(parentTable)"
    />
  </div>
</template>
