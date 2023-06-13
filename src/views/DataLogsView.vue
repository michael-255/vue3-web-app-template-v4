<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { Icon } from '@/types/icons'
import { Field } from '@/types/database'
import { type Ref, ref, onUnmounted } from 'vue'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import { hiddenColumnNames, logColumns } from '@/services/table-columns'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Logs Data` })

// Composables & Stores
const { log } = useLogger()
const { routeType, goToInspect, goBack } = useRoutables()

// Data
const columns: Ref<QTableColumn[]> = ref(logColumns)
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
const visibleColumns: Ref<Field[]> = ref([Field.TIMESTAMP, Field.SEVERITY, Field.LABEL])
const rows: Ref<any[]> = ref([])
const searchFilter: Ref<string> = ref('')

const subscription = DB.liveLogs().subscribe({
  next: (records) => {
    rows.value = records
  },
  error: (error) => {
    log.error('Error fetching live Logs', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})

// TODO
function inspectTheseRows(id: string) {
  return rows.value.find((row) => row.autoId === Number(id))
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
            @click="goToInspect(routeType, inspectTheseRows(props.cols[0].value))"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Table Title -->
        <div class="col-10 text-h6 ellipsis">Logs</div>
        <!-- Go Back Button -->
        <QBtn
          round
          flat
          class="absolute-top-right q-mr-sm q-mt-sm"
          :icon="Icon.BACK"
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
