<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { type Ref, ref, onUnmounted } from 'vue'
import { Icon } from '@/types/icons'
import { Field } from '@/types/database'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import { hiddenColumnNames } from '@/services/table-columns'
import DataSchema from '@/services/DataSchema'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Records Data` })

const { log } = useLogger()
const { routeType, goToCharts, goToParentInspect, goToParentEdit, goToParentCreate, goBack } =
  useRoutables()
const { confirmDialog } = useDialogs()

const searchFilter: Ref<string> = ref('')
const rows: Ref<any[]> = ref([])
const visibleColumns: Ref<Field[]> = ref([Field.ID, Field.TIMESTAMP, Field.NAME])
const columns: Ref<QTableColumn[]> = ref(DataSchema.getParentTableColumns(routeType))
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)

const subscription = DB.liveParents(routeType).subscribe({
  next: (records) => {
    rows.value = records
  },
  error: (error) => {
    log.error('Error fetching live parent records', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})

async function onParentDelete(id: string) {
  let dialogMessage = `Permanently delete ${DataSchema.getParentLabelSingular(
    routeType
  )} with id ${id}? This will also delete accompanying child records.`

  confirmDialog('Delete', dialogMessage, Icon.DELETE, 'negative', async () => {
    try {
      await DB.deleteParent(id)
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
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            :icon="Icon.INSPECT"
            @click="goToParentInspect(routeType, props.cols[0].value)"
          />
          <!-- EDIT -->
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            :icon="Icon.EDIT"
            @click="goToParentEdit(routeType, props.cols[0].value)"
          />
          <!-- DELETE -->
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onParentDelete(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Table Title -->
        <div class="col-10 text-h6 text-bold ellipsis">
          {{ DataSchema.getParentLabelPlural(routeType) }}
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
            <template v-slot:before>
              <!-- CREATE - Child records cannot be created alone on the data table -->
              <QBtn
                color="positive"
                class="q-px-sm q-mr-xs"
                :icon="Icon.ADD"
                @click="goToParentCreate(routeType)"
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
