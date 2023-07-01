<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { type Ref, ref, onUnmounted } from 'vue'
import { Icon } from '@/types/general'
import { useMeta } from 'quasar'
import { AppName } from '@/constants/global'
import { getRecordsCountDisplay } from '@/utils/common'
import { hiddenColumnNames, logColumns } from '@/services/table-columns'
import { allFields, type AnyDatabaseRecord, type AnyField, type Log } from '@/types/core'
import { logFieldProps } from '@/services/field-props'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Logs Data` })

const { log } = useLogger()
const { goBack } = useRoutables()
const { inspectDialog } = useDialogs()

const searchFilter: Ref<string> = ref('')
const rows: Ref<Log[]> = ref([])
const visibleColumns: Ref<AnyField[]> = ref([
  allFields.Values.timestamp,
  allFields.Values.logLevel,
  allFields.Values.label,
])
const columns: Ref<QTableColumn[]> = ref(logColumns)
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
const subscription = DB.liveLogs().subscribe({
  next: (records) => {
    rows.value = records
  },
  error: (error) => {
    log.error('Error fetching live Logs', error)
  },
})

onUnmounted(() => {
  subscription?.unsubscribe()
})

async function onInspect(autoId: number) {
  const record = (await DB.getLog(Number(autoId))) as AnyDatabaseRecord
  inspectDialog('Log', logFieldProps, record)
}
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
          v-for="col in props.cols"
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
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
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
            @click="onInspect(props.cols[0].value)"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Table Title -->
        <div class="col-10 text-h6 text-bold ellipsis">Logs</div>
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
            <template v-slot:before>
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
