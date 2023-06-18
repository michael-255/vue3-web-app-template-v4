<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { getDisplayDate } from '@/utils/common'
import { Icon } from '@/types/icons'
import { AppName } from '@/types/general'
import { useMeta } from 'quasar'
import { SettingKey, Type, type ParentRecord } from '@/types/database'
import { ref, type Ref, onUnmounted } from 'vue'
import { getRecordsCountDisplay } from '@/utils/common'
import DataSchema from '@/services/DataSchema'
import ResponsivePage from '@/components/ResponsivePage.vue'
import WelcomeOverlay from '@/components/WelcomeOverlay.vue'
import useRoutables from '@/composables/useRoutables'
import useUIStore from '@/stores/ui'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Dashboard` })

const uiStore = useUIStore()
const { log } = useLogger()
const { goToParentCreate, goToChildCreate, goToParentEdit, goToParentInspect, goToCharts } =
  useRoutables()
const { confirmDialog, dismissDialog } = useDialogs()

const showDescription: Ref<boolean> = ref(false)
const dashboardOptions = DataSchema.getParentTypeOptions()
// Type is used as the key to access related parent records
const dashboardRecords: Ref<{ [key in Type]: ParentRecord[] }> = ref(
  Object.values(Type).reduce((acc, type) => {
    acc[type] = []
    return acc
  }, {} as { [key in Type]: ParentRecord[] })
)

const settingsSubscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    showDescription.value = !!liveSettings.find((s) => s.key === SettingKey.SHOW_DESCRIPTIONS)
      ?.value
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

const dashboardSubscription = DB.liveDashboard().subscribe({
  next: (liveDashboard) => {
    dashboardRecords.value = liveDashboard
  },
  error: (error) => {
    log.error('Error fetching live Dashboard', error)
  },
})

onUnmounted(() => {
  settingsSubscription.unsubscribe()
  dashboardSubscription.unsubscribe()
})

async function viewLastNote(note: string) {
  dismissDialog('Last Note', note, Icon.NOTE, 'info')
}

async function onFavorite(id: string, name: string) {
  confirmDialog(
    'Favorite',
    `Do you want to favorite ${name}?`,
    Icon.FAVORITE_ON,
    'info',
    async () => {
      try {
        await DB.Parents.update(id, { favorited: true })
        log.info(`${name} favorited`, { id, name })
      } catch (error) {
        log.error('Favorite update failed', error)
      }
    }
  )
}

async function onUnfavorite(id: string, name: string) {
  confirmDialog(
    'Unfavorite',
    `Do you want to unfavorite ${name}?`,
    Icon.FAVORITE_OFF,
    'info',
    async () => {
      try {
        await DB.Parents.update(id, { favorited: false })
        log.info(`${name} unfavorited`, { id, name })
      } catch (error) {
        log.error('Unfavorite update failed', error)
      }
    }
  )
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DASHBOARD" bannerTitle="Dashboard">
    <WelcomeOverlay />

    <section class="q-mb-lg">
      <p class="text-h6 q-mb-sm">What would you like to work on?</p>

      <QOptionGroup
        color="primary"
        :options="dashboardOptions"
        :model-value="uiStore.dashboardSelection"
        @update:model-value="uiStore.dashboardSelection = $event"
      >
        <template v-slot:label="opt">
          <div class="row items-center">
            <QIcon :name="opt.icon" size="xs" class="q-mr-sm" />
            <span>{{ opt.label }}</span>
          </div>
        </template>
      </QOptionGroup>
    </section>

    <!-- Dashboard Cards -->
    <div v-for="(record, i) in dashboardRecords[uiStore.dashboardSelection]" :key="i">
      <QCard class="q-mb-md">
        <QCardSection>
          <p class="text-h6">{{ record.name }}</p>
          <p v-if="showDescription">{{ record.desc }}</p>

          <!-- Top right corner buttons on card -->
          <div class="absolute-top-right q-ma-xs">
            <!-- Note Icon -->
            <QIcon
              v-show="record?.lastChild?.note"
              :name="Icon.NOTE"
              color="primary"
              size="md"
              class="cursor-pointer q-mr-xs"
              @click="viewLastNote(record?.lastChild?.note || '')"
            />

            <!-- Favorite Star Icon -->
            <QIcon
              v-show="record.favorited"
              :name="Icon.FAVORITE_ON"
              color="warning"
              size="md"
              class="cursor-pointer"
              @click="onUnfavorite(record.id as string, record.name as string)"
            />
            <QIcon
              v-show="!record.favorited"
              :name="Icon.FAVORITE_OFF"
              color="grey"
              size="md"
              class="cursor-pointer"
              @click="onFavorite(record.id as string, record.name as string)"
            />

            <!-- Vertical Actions Menu -->
            <QBtn round flat :icon="Icon.MENU_VERTICAL">
              <QMenu
                auto-close
                anchor="top right"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <QList>
                  <QItem clickable @click="goToCharts(record.type as Type, record.id as string)">
                    <QItemSection avatar>
                      <QIcon color="accent" :name="Icon.CHARTS" />
                    </QItemSection>
                    <QItemSection>Charts</QItemSection>
                  </QItem>

                  <QItem
                    clickable
                    @click="goToParentInspect(record.type as Type, record.id as string)"
                  >
                    <QItemSection avatar>
                      <QIcon color="primary" :name="Icon.INSPECT" />
                    </QItemSection>
                    <QItemSection>Inspect</QItemSection>
                  </QItem>

                  <QItem
                    clickable
                    @click="goToParentEdit(record.type as Type, record.id as string)"
                  >
                    <QItemSection avatar>
                      <QIcon color="warning" :name="Icon.EDIT" />
                    </QItemSection>
                    <QItemSection>Edit</QItemSection>
                  </QItem>
                </QList>
              </QMenu>
            </QBtn>
          </div>

          <div class="q-mb-md">
            <!-- Time Ago Display -->
            <QBadge rounded color="secondary" class="q-py-none">
              <QIcon :name="Icon.PREVIOUS" />
              <span class="text-caption q-ml-xs">
                {{ useTimeAgo(record?.lastChild?.timestamp || '').value || 'No previous records' }}
              </span>
            </QBadge>

            <!-- Previous Record Created Date -->
            <div v-if="record?.lastChild?.timestamp">
              <QIcon :name="Icon.CALENDAR_CHECK" />
              <span class="text-caption q-ml-xs">
                {{ getDisplayDate(record?.lastChild?.timestamp) }}
              </span>
            </div>
          </div>

          <QBtn
            label="Attach Record"
            color="primary"
            :icon="Icon.ADD_NOTE"
            @click="goToChildCreate(record.type as Type, record.id as string)"
          />
        </QCardSection>
      </QCard>
    </div>

    <!-- Record Count & Create -->
    <div class="row justify-center q-my-md">
      <div class="col-12 text-center">
        <QIcon name="menu_open" size="80px" color="grey" />
      </div>

      <p class="col-12 text-grey text-center">
        {{ getRecordsCountDisplay(dashboardRecords[uiStore.dashboardSelection]) }}
      </p>

      <QBtn
        color="positive"
        :icon="Icon.CREATE"
        :label="`Create ${DataSchema.getParentLabelSingular(uiStore.dashboardSelection)}`"
        @click="goToParentCreate(uiStore.dashboardSelection)"
      />
    </div>
  </ResponsivePage>
</template>
