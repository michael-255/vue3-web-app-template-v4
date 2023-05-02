<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { Icon } from '@/types/icons'
import { DatabaseAction, DatabaseType, SettingId } from '@/types/database'
import { type Ref, ref, onMounted, onUnmounted } from 'vue'
import type { DatabaseRecord } from '@/types/models'
import {
  getTableColumns,
  getFields,
  getVisibleColumns,
  getSupportedActions,
} from '@/services/Blueprints'
import { AppName } from '@/types/misc'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import useActions from '@/composables/useActions'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Data` })

// Composables & Stores
const { log } = useLogger()
const { routeDatabaseType, goToCharts, goToInspect, goToEdit, goToCreate, goBack } = useRoutables()
const { onDeleteRecord } = useActions()

// Data
const columns: Ref<QTableColumn[]> = ref(getTableColumns(routeDatabaseType) ?? [])
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
const visibleColumns: Ref<string[]> = ref([])
const rows: Ref<DatabaseRecord[]> = ref([])
const searchFilter: Ref<string> = ref('')

const subscription = DB.liveDataType(routeDatabaseType).subscribe({
  next: (records) => {
    rows.value = records
  },
  error: (error) => {
    log.error('Error during data retrieval', error)
  },
})

onMounted(async () => {
  try {
    // Get the setting for showing all columns
    const showAllDataColumns = (
      await DB.getRecord(DatabaseType.SETTING, SettingId.SHOW_ALL_DATA_COLUMNS)
    )?.value

    // This sets up what is currently visible on the QTable
    if (showAllDataColumns) {
      visibleColumns.value = getFields(routeDatabaseType) ?? [] // All columns
    } else {
      visibleColumns.value = getVisibleColumns(routeDatabaseType) ?? [] // Default columns
    }
  } catch (error) {
    log.error('Error loading data view', error)
  }
})

onUnmounted(() => {
  subscription.unsubscribe()
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
        <!-- Do not show "hiddenType" and "hiddenId" -->
        <QTh
          v-for="col in (props.cols as QTableColumn[])"
          v-show="col.name !== 'hiddenType' && col.name !== 'hiddenId'"
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
            v-if="getSupportedActions(routeDatabaseType).includes(DatabaseAction.CHARTS)"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            :icon="Icon.CHARTS"
            @click="goToCharts(props.cols[0].value, props.cols[1].value)"
          />
          <!-- INSPECT -->
          <QBtn
            v-if="getSupportedActions(routeDatabaseType).includes(DatabaseAction.INSPECT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            :icon="Icon.INSPECT"
            @click="goToInspect(props.cols[0].value, props.cols[1].value)"
          />
          <!-- EDIT -->
          <QBtn
            v-if="getSupportedActions(routeDatabaseType).includes(DatabaseAction.EDIT)"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            :icon="Icon.EDIT"
            @click="goToEdit(props.cols[0].value, props.cols[1].value)"
          />
          <!-- DELETE -->
          <QBtn
            v-if="getSupportedActions(routeDatabaseType).includes(DatabaseAction.DELETE)"
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onDeleteRecord(props.cols[0].value, props.cols[1].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Tabel Title -->
        <div class="col-10 text-h6 ellipsis">{{ routeDatabaseType }}</div>
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
                v-if="getSupportedActions(routeDatabaseType).includes(DatabaseAction.CREATE)"
                color="positive"
                class="q-px-sm q-mr-xs"
                :icon="Icon.ADD"
                @click="goToCreate(routeDatabaseType)"
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
