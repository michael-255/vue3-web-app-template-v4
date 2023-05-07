<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { Icon } from '@/types/icons'
import { Action, SettingField, LogField, Field } from '@/types/database'
import { type Ref, ref, onUnmounted } from 'vue'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import { appSchema } from '@/services/AppSchema'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Data` })

// Composables & Stores
const { log } = useLogger()
const { routeType, routeRelation, goToCharts, goToInspect, goToEdit, goToCreate, goBack } =
  useRoutables()
const { confirmDialog } = useDialogs()

// Data
const schemaTableTitle = appSchema.find(
  (i) => i.type === routeType && (!i.relation || i.relation === routeRelation)
)?.labelPlural
const schemaTableColumns =
  appSchema.find((i) => i.type === routeType && (!i.relation || i.relation === routeRelation))
    ?.tableColumns ?? []
const schemaVisibleColumns =
  appSchema.find((i) => i.type === routeType && (!i.relation || i.relation === routeRelation))
    ?.visibleColumns ?? []
const schemaSupportedActions =
  appSchema.find((i) => i.type === routeType && (!i.relation || i.relation === routeRelation))
    ?.supportedActions ?? []

const columns: Ref<QTableColumn[]> = ref(schemaTableColumns)
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
const visibleColumns: Ref<(Field | SettingField | LogField)[]> = ref(schemaVisibleColumns)
const rows: Ref<any[]> = ref([])
const searchFilter: Ref<string> = ref('')

const subscription = DB.liveDataTable(routeType, routeRelation).subscribe({
  next: (records) => {
    rows.value = records
  },
  error: (error) => {
    log.error('Error fetching live Data Table', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})

/**
 * On confirmation, delete the matching record from the database.
 * @param id
 * @param timestamp
 */
async function onDelete(id: string, timestamp: number) {
  confirmDialog('Delete', `Permanently delete this record?`, Icon.DELETE, 'negative', async () => {
    try {
      await DB.deleteRecord(id, timestamp)
      log.info('Successfully deleted record', { id, timestamp })
    } catch (error) {
      log.error('Delete failed', error)
    }
  })
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
          v-show="col.name !== 'hiddenId' && col.name !== 'hiddenTimestamp'"
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
          <!-- CHARTS -->
          <QBtn
            v-if="schemaSupportedActions.includes(Action.CHARTS)"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            :icon="Icon.CHARTS"
            @click="goToCharts(String(props.cols[0].value), Number(props.cols[1].value))"
          />
          <!-- INSPECT -->
          <QBtn
            v-if="schemaSupportedActions.includes(Action.INSPECT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            :icon="Icon.INSPECT"
            @click="goToInspect(String(props.cols[0].value), Number(props.cols[1].value))"
          />
          <!-- EDIT -->
          <QBtn
            v-if="schemaSupportedActions.includes(Action.EDIT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            :icon="Icon.EDIT"
            @click="goToEdit(String(props.cols[0].value), Number(props.cols[1].value))"
          />
          <!-- DELETE -->
          <QBtn
            v-if="schemaSupportedActions.includes(Action.DELETE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onDelete(String(props.cols[0].value), Number(props.cols[1].value))"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Table Title -->
        <div class="col-10 text-h6 ellipsis">{{ schemaTableTitle }}</div>
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
              <!-- CREATE -->
              <QBtn
                v-if="schemaSupportedActions.includes(Action.CREATE)"
                color="positive"
                class="q-px-sm q-mr-xs"
                :icon="Icon.ADD"
                @click="goToCreate(routeType, routeRelation)"
              />
              <!-- OPTIONS (Visible Columns) -->
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
