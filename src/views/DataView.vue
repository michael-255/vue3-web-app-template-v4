<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { Icon } from '@/types/icons'
import { Action, Field, Type } from '@/types/database'
import { type Ref, ref, onUnmounted } from 'vue'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import { hiddenColumnNames } from '@/services/table-columns'
import DataSchema from '@/services/DataSchema'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Data` })

// Composables & Stores
const { log } = useLogger()
const { routeType, goToCharts, goToInspect, goToEdit, goToCreate, goBack } = useRoutables()
const { confirmDialog } = useDialogs()

// Data
const title = DataSchema.getLabelPlural(routeType)
const tableColumns = DataSchema.getTableColumns(routeType)
const tableVisibleColumns = DataSchema.getVisibleColumns(routeType)
const supportedActions = DataSchema.getSupportedActions(routeType)
const columns: Ref<QTableColumn[]> = ref(tableColumns)
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
const visibleColumns: Ref<Field[]> = ref(tableVisibleColumns)
const rows: Ref<any[]> = ref([])
const searchFilter: Ref<string> = ref('')

const subscription = DB.liveDataTable(routeType).subscribe({
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
 * On confirmation, delete the matching record and child records if any from the database.
 * @param id
 */
async function onDelete(type: Type, id: string) {
  let dialogMessage = `Permanently delete ${DataSchema.getLabelSingular(type)} with id ${id}?`

  if (DataSchema.getChildType(type)) {
    // Child type exists, so provide additional warning about child record deletions
    dialogMessage +=
      ' This will also delete any underlying child records associated with this record.'
  }

  confirmDialog('Delete', dialogMessage, Icon.DELETE, 'negative', async () => {
    try {
      await DB.deleteRecord(routeType, id)
      log.info('Successfully deleted record', { type: routeType, id })
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
          <!-- CHARTS -->
          <QBtn
            v-if="supportedActions.includes(Action.CHARTS)"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            :icon="Icon.CHARTS"
            @click="goToCharts(routeType, props.cols[0].value)"
          />
          <!-- INSPECT -->
          <QBtn
            v-if="supportedActions.includes(Action.INSPECT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            :icon="Icon.INSPECT"
            @click="goToInspect(routeType, props.cols[0].value)"
          />
          <!-- EDIT -->
          <QBtn
            v-if="supportedActions.includes(Action.EDIT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            :icon="Icon.EDIT"
            @click="goToEdit(routeType, props.cols[0].value)"
          />
          <!-- DELETE -->
          <QBtn
            v-if="supportedActions.includes(Action.DELETE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onDelete(routeType, props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Table Title -->
        <div class="col-10 text-h6 ellipsis">{{ title }}</div>
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
              <!-- CREATE - Child records cannot be created alone on the data table -->
              <QBtn
                v-if="supportedActions.includes(Action.CREATE)"
                color="positive"
                class="q-px-sm q-mr-xs"
                :icon="Icon.ADD"
                @click="goToCreate(routeType)"
              />
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
