<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { Icon } from '@/types/icons'
import { getDisplayDate } from '@/utils/common'
import type { DashboardCard } from '@/types/misc'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/LocalDatabase'

// Props & Emits
defineProps<{
  showDescription: boolean
  dashboardCard: DashboardCard
}>()

// Composables & Stores
const { log } = useLogger()
const { goToInspect, goToEdit, goToCharts } = useRoutables()
const { confirmDialog, dismissDialog } = useDialogs()

/**
 * Opens a dialog that displays the previous record note.
 * @param note
 */
async function viewPreviousNote(note: string) {
  dismissDialog('Previous Note', note, Icon.NOTE, 'info')
}

/**
 * On confirmation, favorite the matching record in the database.
 * @param uid
 * @param name
 */
async function onFavorite(uid: string, name: string) {
  confirmDialog(
    'Favorite',
    `Do you want to favorite ${name}?`,
    Icon.FAVORITE_ON,
    'info',
    async () => {
      try {
        await DB.update(uid, { favorited: true })
        log.info(`${name} favorited`, { uid, name })
      } catch (error) {
        log.error('Favorite update failed', error)
      }
    }
  )
}

/**
 * On confirmation, unfavorite the matching record in the database.
 * @param uid
 * @param name
 */
async function onUnfavorite(uid: string, name: string) {
  confirmDialog(
    'Unfavorite',
    `Do you want to unfavorite ${name}?`,
    Icon.FAVORITE_OFF,
    'info',
    async () => {
      try {
        await DB.update(uid, { favorited: false })
        log.info(`${name} unfavorited`, { uid, name })
      } catch (error) {
        log.error('Unfavorite update failed', error)
      }
    }
  )
}

/**
 * On confirmation, delete the parent and children records from the database.
 * @param uid
 * @param name
 */
async function onParentDelete(uid: string, name: string) {
  confirmDialog(
    'Delete',
    `Permanently delete ${name}? This will also delete any underlying child records.`,
    Icon.DELETE,
    'negative',
    async () => {
      try {
        await DB.deleteRecord(uid)
        log.info(`${name} and grouped records deleted`, { uid, name })
      } catch (error) {
        log.error('Delete failed', error)
      }
    }
  )
}
</script>

<template>
  <QCard>
    <QCardSection>
      <p class="text-h6">{{ dashboardCard.name }}</p>

      <!-- Description (if show setting is true) -->
      <p v-if="showDescription">{{ dashboardCard.desc }}</p>

      <!-- Top right corner buttons on card -->
      <div class="absolute-top-right q-ma-xs">
        <!-- Note Icon -->
        <QIcon
          v-show="dashboardCard.previousNote"
          :name="Icon.NOTE"
          color="primary"
          size="md"
          class="cursor-pointer q-mr-xs"
          @click="viewPreviousNote(dashboardCard.previousNote || '')"
        />

        <!-- Favorite Star Icon -->
        <QIcon
          v-show="dashboardCard.favorited"
          :name="Icon.FAVORITE_ON"
          color="warning"
          size="md"
          class="cursor-pointer"
          @click="onUnfavorite(dashboardCard.uid, dashboardCard.name)"
        />
        <QIcon
          v-show="!dashboardCard.favorited"
          :name="Icon.FAVORITE_OFF"
          color="grey"
          size="md"
          class="cursor-pointer"
          @click="onFavorite(dashboardCard.uid, dashboardCard.name)"
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
              <QItem
                clickable
                @click="goToInspect(dashboardCard.type, dashboardCard.group, dashboardCard.uid)"
              >
                <QItemSection avatar>
                  <QIcon color="primary" :name="Icon.INSPECT" />
                </QItemSection>
                <QItemSection>Inspect</QItemSection>
              </QItem>

              <QItem
                clickable
                @click="goToEdit(dashboardCard.type, dashboardCard.group, dashboardCard.uid)"
              >
                <QItemSection avatar>
                  <QIcon color="primary" :name="Icon.EDIT" />
                </QItemSection>
                <QItemSection>Edit</QItemSection>
              </QItem>

              <QItem
                clickable
                @click="goToCharts(dashboardCard.type, dashboardCard.group, dashboardCard.uid)"
              >
                <QItemSection avatar>
                  <QIcon color="primary" :name="Icon.CHARTS" />
                </QItemSection>
                <QItemSection>Charts</QItemSection>
              </QItem>

              <QSeparator />

              <QItem clickable @click="onParentDelete(dashboardCard.uid, dashboardCard.name)">
                <QItemSection avatar>
                  <QIcon color="negative" :name="Icon.DELETE" />
                </QItemSection>
                <QItemSection>Delete</QItemSection>
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
            {{ useTimeAgo(dashboardCard.previousTimestamp || '').value || 'No previous records' }}
          </span>
        </QBadge>

        <!-- Previous Record Created Date -->
        <div v-if="dashboardCard.previousTimestamp">
          <QIcon :name="Icon.CALENDAR_CHECK" />
          <span class="text-caption q-ml-xs">
            {{ getDisplayDate(dashboardCard.previousTimestamp) }}
          </span>
        </div>
      </div>

      <!-- Slot -->
      <div>
        <slot />
      </div>
    </QCardSection>
  </QCard>
</template>
