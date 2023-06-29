<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { type Ref, ref, onUnmounted } from 'vue'
import type { Subscription } from 'dexie'
import { Icon } from '@/types/icons'
import { Field, Group, Type, type Log, type Setting } from '@/types/database'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import { hiddenColumnNames } from '@/services/table-columns'
import DataSchema from '@/services/DataSchema'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Internal Data` })

const { log } = useLogger()
const { routeType, goBack } = useRoutables()

const searchFilter: Ref<string> = ref('')
const rows: Ref<(Log | Setting)[]> = ref([])
const visibleColumns: Ref<Field[]> = ref([])
const columns: Ref<QTableColumn[]> = ref(
  DataSchema.getTableColumns(Group.INTERNAL, routeType) as QTableColumn[]
)
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
let subscription: Subscription | null = null

if (routeType === Type.LOG) {
  visibleColumns.value = [Field.TIMESTAMP, Field.SEVERITY, Field.LABEL]

  subscription = DB.liveLogs().subscribe({
    next: (records) => {
      rows.value = records
    },
    error: (error) => {
      log.error('Error fetching live Logs', error)
    },
  })
} else if (routeType === Type.SETTING) {
  visibleColumns.value = [Field.KEY, Field.VALUE]

  subscription = DB.liveSettings().subscribe({
    next: (records) => {
      rows.value = records
    },
    error: (error) => {
      log.error('Error fetching live Settings', error)
    },
  })
} else {
  log.error('Error fetching live data', { routeType })
}

onUnmounted(() => {
  subscription?.unsubscribe()
})
</script>

<template>
  <QTable
    :rows="rows"
    :columns="columns"
    :visible-columns="visibleColumns"
    :rows-per-page-options="[0]"
    :filter="searchFilter"
    virtual-scroll
    fullscreen
    row-key="id"
  >
    <!-- Column Headers -->
    <template v-slot:header="props">
      <QTr :props="props">
        <!-- Do not show hidden columns -->
        <QTh
          v-for="col in (props.cols as any[])"
          v-show="!hiddenColumnNames.includes(col.name)"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </QTh>
        <QTh auto-width class="text-left">Actions</QTh>
      </QTr>
    </template>

    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in (props.cols as any[])" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
        <QTd auto-width>
          <!-- INSPECT -->
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            :icon="Icon.INSPECT"
            @click="goToInspect(routeType, props.cols[0].value)"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Table Title -->
        <div class="col-10 text-h6 text-bold ellipsis">
          {{ DataSchema.getLabel(Group.INTERNAL, routeType, 'plural') }}
        </div>
        <!-- Go Back Button -->
        <QBtn
          round
          flat
          class="absolute-top-right q-mr-sm q-mt-sm"
          :icon="Icon.CLOSE"
          @click="goBack()"
        />
      </div>

      <div class="row justify-start full-width">
        <div class="col-12">
          <!-- SEARCH -->
          <QInput
            :disable="!rows.length"
            outlined
            dense
            clearable
            debounce="300"
            v-model="searchFilter"
            placeholder="Search"
          >
            <template v-if="routeType === Type.LOG" v-slot:before>
              <!-- COLUMN OPTIONS (Visible Columns) -->
              <QSelect
                v-model="visibleColumns"
                :options="columnOptions"
                :disable="!rows.length"
                bg-color="primary"
                standout
                multiple
                dense
                options-dense
                emit-value
                map-options
                option-value="name"
                display-value=""
              >
                <template v-slot:prepend>
                  <QIcon color="white" :name="Icon.OPTIONS" />
                </template>
              </QSelect>
            </template>

            <template v-slot:append>
              <QIcon name="search" />
            </template>
          </QInput>
        </div>
      </div>
    </template>

    <template v-slot:bottom>{{ getRecordsCountDisplay(rows) }}</template>
  </QTable>
</template>
