<script setup lang="ts">
import { Icon } from '@/types/icons'
import { type Ref, ref, onUnmounted } from 'vue'
import {
  DatabaseType,
  DatabaseField,
  SettingId,
  type DatabaseChildType,
  type SettingValue,
} from '@/types/database'
import { type DashboardParent, type Optional, AppName } from '@/types/misc'
import { getParentCategoryTypes, getChildType, getLabel } from '@/services/Blueprints'
import { useMeta } from 'quasar'
import { getRecordsCountDisplay } from '@/utils/common'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DashboardIntroduction from '@/components/DashboardIntroduction.vue'
import useLogger from '@/composables/useLogger'
import useRoutables from '@/composables/useRoutables'
import DashboardParentCard from '@/components/DashboardParentCard.vue'
import useUIStore from '@/stores/ui'
import DB from '@/services/LocalDatabase'

useMeta({ title: `${AppName} - Dashboard` })

// Composables & Stores
const uiStore = useUIStore()
const { log } = useLogger()
const { goToCreate } = useRoutables()

// Data
const dashboardListOptions = getParentCategoryTypes().map((type, i) => ({
  label: type,
  value: i,
}))
const showIntroduction: Ref<Optional<SettingValue>> = ref(null)
const showDescription: Ref<Optional<SettingValue>> = ref(null)
const dashboardParentRefs: Ref<DashboardParent[]>[] = getParentCategoryTypes().map(() => ref([]))

const subscription = DB.liveDashboard().subscribe({
  next: async (records) => {
    // Settings
    showIntroduction.value = records.find((s) => s.id === SettingId.SHOW_INTRODUCTION)?.value
    showDescription.value = records.find(
      (s) => s.id === SettingId.SHOW_DASHBOARD_DESCRIPTIONS
    )?.value

    // Examples - Enabled only, sorted by name
    const dashboardExamples = await Promise.all(
      records
        .filter((r) => r.type === DatabaseType.EXAMPLE && r[DatabaseField.IS_ENABLED] === true)
        .map(async (r) => {
          const previousChild = await DB.getPreviousChildRecord(
            getChildType(r[DatabaseField.TYPE]) as DatabaseChildType,
            r[DatabaseField.ID]
          )

          return {
            [DatabaseField.TYPE]: r[DatabaseField.TYPE],
            [DatabaseField.ID]: r[DatabaseField.ID],
            [DatabaseField.NAME]: r[DatabaseField.NAME],
            [DatabaseField.DESCRIPTION]: r[DatabaseField.DESCRIPTION],
            [DatabaseField.IS_FAVORITED]: r[DatabaseField.IS_FAVORITED],
            previousNote: previousChild?.[DatabaseField.NOTE],
            previousCreatedTimestamp: previousChild?.[DatabaseField.CREATED_TIMESTAMP],
            previousNumber: previousChild?.[DatabaseField.NUMBER],
          } as DashboardParent
        })
    )

    // Group favorites at the top
    let favorites = dashboardExamples.filter((r) => r[DatabaseField.IS_FAVORITED] === true)
    let nonFavorites = dashboardExamples.filter((r) => r[DatabaseField.IS_FAVORITED] === false)
    dashboardParentRefs[0].value = [...favorites, ...nonFavorites]

    // Empty out the arrays
    favorites = []
    nonFavorites = []

    // Tests - Enabled only, sorted by name
    const dashboardTests = await Promise.all(
      records
        .filter((r) => r.type === DatabaseType.TEST && r[DatabaseField.IS_ENABLED] === true)
        .map(async (r) => {
          const previousChild = await DB.getPreviousChildRecord(
            getChildType(r[DatabaseField.TYPE]) as DatabaseChildType,
            r[DatabaseField.ID]
          )

          return {
            [DatabaseField.TYPE]: r[DatabaseField.TYPE],
            [DatabaseField.ID]: r[DatabaseField.ID],
            [DatabaseField.NAME]: r[DatabaseField.NAME],
            [DatabaseField.DESCRIPTION]: r[DatabaseField.DESCRIPTION],
            [DatabaseField.IS_FAVORITED]: r[DatabaseField.IS_FAVORITED],
            previousNote: previousChild?.[DatabaseField.NOTE],
            previousCreatedTimestamp: previousChild?.[DatabaseField.CREATED_TIMESTAMP],
            previousNumber: previousChild?.[DatabaseField.NUMBER],
          } as DashboardParent
        })
    )
    // Group favorites at the top
    favorites = dashboardTests.filter((r) => r[DatabaseField.IS_FAVORITED] === true)
    nonFavorites = dashboardTests.filter((r) => r[DatabaseField.IS_FAVORITED] === false)
    dashboardParentRefs[1].value = [...favorites, ...nonFavorites]
  },
  error: (error) => {
    log.error('Error loading live dashboard records', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DASHBOARD" bannerTitle="Dashboard">
    <DashboardIntroduction v-if="showIntroduction" class="q-mb-md" />

    <!-- Dashboard List Selection -->
    <QCard class="q-mb-md">
      <QCardSection>
        <div class="text-h6 q-mb-xs">What would you like to work on?</div>

        <QOptionGroup
          color="primary"
          :options="dashboardListOptions"
          :model-value="uiStore.dashboardListIndex"
          @update:model-value="uiStore.dashboardListIndex = $event"
        />
      </QCardSection>
    </QCard>

    <!-- Examples - Using v-show so the DOM doesn't get updated when switching selections -->
    <div v-show="uiStore.dashboardListIndex === 0">
      <div v-for="(record, i) in dashboardParentRefs[0].value" :key="i">
        <DashboardParentCard
          :[DatabaseField.TYPE]="record[DatabaseField.TYPE]"
          :[DatabaseField.ID]="record[DatabaseField.ID]"
          :[DatabaseField.NAME]="record[DatabaseField.NAME]"
          :showDescription="showDescription"
          :[DatabaseField.DESCRIPTION]="record[DatabaseField.DESCRIPTION]"
          :[DatabaseField.IS_FAVORITED]="record[DatabaseField.IS_FAVORITED]"
          :previousNote="record.previousNote"
          :previousCreatedTimestamp="record.previousCreatedTimestamp"
          :previousNumber="record.previousNumber"
          class="q-mb-md"
        >
          <QBtn
            round
            color="positive"
            :icon="Icon.ADD_NOTE"
            @click="goToCreate(DatabaseType.EXAMPLE_RESULT, record[DatabaseField.ID])"
          />
        </DashboardParentCard>
      </div>
    </div>

    <!-- Tests - Using v-show so the DOM doesn't get updated when switching selections -->
    <div v-show="uiStore.dashboardListIndex === 1">
      <div v-for="(record, j) in dashboardParentRefs[1].value" :key="j">
        <DashboardParentCard
          :[DatabaseField.TYPE]="record[DatabaseField.TYPE]"
          :[DatabaseField.ID]="record[DatabaseField.ID]"
          :[DatabaseField.NAME]="record[DatabaseField.NAME]"
          :showDescription="showDescription"
          :[DatabaseField.DESCRIPTION]="record[DatabaseField.DESCRIPTION]"
          :[DatabaseField.IS_FAVORITED]="record[DatabaseField.IS_FAVORITED]"
          :previousNote="record.previousNote"
          :previousCreatedTimestamp="record.previousCreatedTimestamp"
          :previousNumber="record.previousNumber"
          class="q-mb-md"
        >
          <QBtn
            round
            color="positive"
            :icon="Icon.ADD_NOTE"
            @click="goToCreate(DatabaseType.TEST_RESULT, record[DatabaseField.ID])"
          />
        </DashboardParentCard>
      </div>
    </div>

    <!-- Bottom of Dashboard message and create button -->
    <div class="row justify-center q-my-md">
      <div class="col-12 text-center">
        <QIcon name="menu_open" size="80px" color="grey" />
      </div>

      <div class="col-12 text-grey text-center q-mb-md">
        {{ getRecordsCountDisplay(dashboardParentRefs?.[uiStore.dashboardListIndex]?.value) }}
        (enabled only)
      </div>

      <QBtn
        color="positive"
        :icon="Icon.CREATE"
        :label="`Create ${getLabel(
          dashboardListOptions[uiStore.dashboardListIndex].label,
          'singular'
        )}`"
        @click="goToCreate(dashboardListOptions[uiStore.dashboardListIndex].label)"
      />
    </div>
  </ResponsivePage>
</template>
