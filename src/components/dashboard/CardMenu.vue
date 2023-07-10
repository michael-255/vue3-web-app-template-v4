<script setup lang="ts">
import { Icon } from '@/types/general'
import type { AnyDBRecord } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import useRouting from '@/composables/useRouting'
import useUIStore from '@/stores/ui'
import DB from '@/services/Database'

defineProps<{
  record: AnyDBRecord
}>()

const uiStore = useUIStore()
const { log } = useLogger()
const { goToEdit } = useRouting()
const { confirmDialog, dismissDialog } = useDialogs()

async function viewPreviousNote(note: string) {
  dismissDialog('Previous Note', note, Icon.NOTE)
}

async function onFavorite(id: string, name: string) {
  confirmDialog(
    'Favorite',
    `Do you want to favorite ${name}?`,
    Icon.FAVORITE_ON,
    'info',
    async () => {
      try {
        // await DB.CoreRecords.update(id, { favorited: true }) // TODO
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
        // await DB.CoreRecords.update(id, { favorited: false }) // TODO
        log.info(`${name} unfavorited`, { id, name })
      } catch (error) {
        log.error('Unfavorite update failed', error)
      }
    }
  )
}

async function onInspect(id: string) {
  const table = uiStore.dashboardSelection
  // const title = DataSchema.getLabel(RecordGroup.CORE, type, 'singular') as string
  // const record = (await DB.getRecord(RecordGroup.CORE, id)) as AnyCoreRecord
  // const fields = DataSchema.getFields(RecordGroup.CORE, type)
  // inspectDialog(title, record, fields)
}

async function onCharts(id: string) {
  const table = uiStore.dashboardSelection
  // const title = DataSchema.getLabel(
  //   RecordGroup.CORE,
  //   uiStore.dashboardSelection,
  //   'singular'
  // ) as string
  // chartsDialog(title, type, id)
}
</script>

<template>
  <div class="absolute-top-right q-ma-xs">
    <QIcon
      v-show="record.previous?.note"
      :name="Icon.NOTE"
      color="primary"
      size="md"
      class="cursor-pointer q-mr-xs"
      @click="viewPreviousNote(record?.previous?.note || '')"
    />

    <QBtn v-if="record.activated" round flat color="warning" :icon="Icon.CLEAR" />

    <span v-else>
      <QIcon
        v-if="record.favorited"
        :name="Icon.FAVORITE_ON"
        color="warning"
        size="md"
        class="cursor-pointer"
        @click="onUnfavorite(record.id, record.name)"
      />
      <QIcon
        v-if="!record.favorited"
        :name="Icon.FAVORITE_OFF"
        color="grey"
        size="md"
        class="cursor-pointer"
        @click="onFavorite(record.id, record.name)"
      />
    </span>

    <QBtn round flat :icon="Icon.MENU_VERTICAL">
      <QMenu auto-close anchor="top right" transition-show="flip-right" transition-hide="flip-left">
        <QList>
          <QItem clickable @click="onCharts(record.id)">
            <QItemSection avatar>
              <QIcon color="accent" :name="Icon.CHARTS" />
            </QItemSection>
            <QItemSection>Charts</QItemSection>
          </QItem>

          <QItem clickable @click="onInspect(record.id)">
            <QItemSection avatar>
              <QIcon color="primary" :name="Icon.INSPECT" />
            </QItemSection>
            <QItemSection>Inspect</QItemSection>
          </QItem>

          <QItem
            :disable="record.activated"
            clickable
            @click="goToEdit(uiStore.dashboardSelection, record.id)"
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
</template>
