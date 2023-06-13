<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { Icon } from '@/types/icons'
import { type Ref, ref, onUnmounted } from 'vue'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import { settingColumns } from '@/services/table-columns'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Settings Data` })

// Composables & Stores
const { log } = useLogger()
const { goBack } = useRoutables()

// Data
const columns: Ref<QTableColumn[]> = ref(settingColumns)
const rows: Ref<any[]> = ref([])
const searchFilter: Ref<string> = ref('')

const subscription = DB.liveSettings().subscribe({
  next: (records) => {
    rows.value = records
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})
</script>

<template>
  <QTable
    :rows="rows"
    :columns="columns"
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
        <QTh v-for="col in (props.cols as any[])" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
      </QTr>
    </template>

    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in (props.cols as any[])" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <!-- Table Title -->
        <div class="col-10 text-h6 ellipsis">Settings</div>
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
