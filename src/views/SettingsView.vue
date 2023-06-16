<script setup lang="ts">
import { exportFile } from 'quasar'
import { Icon } from '@/types/icons'
import { type BackupData, AppName, Limit, LogRetention } from '@/types/general'
import { type Setting, Type, SettingKey } from '@/types/database'
import { type Ref, ref, onUnmounted } from 'vue'
import { useMeta } from 'quasar'
import DataSchema from '@/services/DataSchema'
import useLogger from '@/composables/useLogger'
import useNotifications from '@/composables/useNotifications'
import useDialogs from '@/composables/useDialogs'
import useDefaults from '@/composables/useDefaults'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Settings` })

const { log } = useLogger()
const { notify } = useNotifications()
const { confirmDialog } = useDialogs()
const { onDefaults } = useDefaults()
const { goToData } = useRoutables()

const tableOptions = DataSchema.getTableOptions()
const settings: Ref<Setting[]> = ref([])
const logRetentionIndex: Ref<number> = ref(0)
const importFile: Ref<any> = ref(null)
const accessOptions = ref([...tableOptions])
const accessModel = ref(accessOptions.value[0])
const deleteOptions = ref([...tableOptions])
const deleteModel = ref(deleteOptions.value[0])

const subscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    settings.value = liveSettings
    const logRetentionTime = liveSettings.find(
      (s) => s.key === SettingKey.LOG_RETENTION_TIME
    )?.value
    logRetentionIndex.value = Object.values(LogRetention).findIndex((i) => i === logRetentionTime)
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})

function onTestLogger() {
  log.debug('This is a Debug Log', { name: 'Debug' })
  log.info('This is an Info Log', { name: 'Info' })
  log.warn('This is a Warning Log', { name: 'Warning' })
  log.error('This is an Error Log', { name: 'Error' })
}

// Called when a file has been rejected by the input
function onRejectedFile(entries: any) {
  const fileName = entries[0]?.importFile?.name || undefined
  log.warn(`Cannot import"${fileName}`, entries)
}

function onImportFile() {
  confirmDialog(
    'Import',
    `Import backup data from ${importFile?.value?.name} and attempt to load records into the database from it?`,
    Icon.INFO,
    'info',
    async () => {
      try {
        const backupData = JSON.parse(await importFile.value.text()) as BackupData

        log.silentDebug('backupData:', backupData)

        if (backupData.appName !== AppName) {
          throw new Error(`Cannot import data from the app ${backupData.appName}`)
        }

        // Import settings first in case errors stop type importing below
        if (backupData.settings.length > 0) {
          await Promise.all(
            backupData.settings
              .filter((s) => Object.values(SettingKey).includes(s.key as SettingKey))
              .map(async (s) => await DB.setSetting(s.key as SettingKey, s.value))
          )
        }

        // Logs are never imported
        await Promise.all([
          DB.importParents(backupData.parents),
          DB.importChildren(backupData.children),
        ])

        importFile.value = null // Clear input
        log.info('Successfully imported available data')
      } catch (error) {
        log.error('Error during import', error)
      }
    }
  )
}

function onExportRecords() {
  // Build export file name
  const appNameSlug = AppName.toLowerCase().split(' ').join('-')
  const date = new Date().toISOString().split('T')[0]
  const filename = `export-${appNameSlug}-${date}.json`

  confirmDialog(
    'Export',
    `Export all selected record types into the file ${filename}?`,
    Icon.INFO,
    'info',
    async () => {
      try {
        // Build backup data
        const backupData = {
          appName: AppName,
          backupTimestamp: Date.now(),
          logs: await DB.getLogs(),
          settings: await DB.getSettings(),
          parents: await DB.getParents(),
          children: await DB.getChildren(),
        } as BackupData

        log.silentDebug('backupData:', backupData)

        // Attempt to download the export records as a JSON file
        const fileStatus = exportFile(filename, JSON.stringify(backupData), {
          encoding: 'UTF-8',
          mimeType: 'application/json',
        })

        if (fileStatus === true) {
          log.info('File downloaded successfully', { filename })
        } else {
          throw new Error('Browser denied file download')
        }
      } catch (error) {
        log.error('Export failed', error)
      }
    }
  )
}

async function onChangeLogRetention(logRetentionIndex: number) {
  try {
    const logRetentionTime = Object.values(LogRetention)[logRetentionIndex]
    await DB.setSetting(SettingKey.LOG_RETENTION_TIME, logRetentionTime)
    log.info('Updated log retention time', { time: logRetentionTime, index: logRetentionIndex })
  } catch (error) {
    log.error('Log retention update failed', error)
  }
}

async function onResetSettings() {
  confirmDialog(
    'Reset Settings',
    'Would you like to reset your app Settings to the defaults? This does not impact your data.',
    Icon.REFRESH,
    'primary',
    async () => {
      try {
        await DB.resetSettings()
        log.info('Successfully reset settings')
      } catch (error) {
        log.error('Error reseting settings', error)
      }
    }
  )
}

async function onDeleteBy(label: string, optionValue: string[]) {
  confirmDialog(
    `Delete ${label}`,
    `Permanetly delete all ${label} from the database?`,
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        switch (optionValue[0]) {
          case 'internal':
            if (optionValue[1] === 'logs') {
              await DB.clearLogs()
            } else if (optionValue[1] === 'settings') {
              await DB.resetSettings()
            } else {
              throw new Error(`Unknown internal type ${optionValue[1]}`)
            }
            break
          case 'parent':
            await DB.clearParentsByType(optionValue[1] as Type)
            break
          case 'child':
            await DB.clearChildrenByType(optionValue[1] as Type)
            break
          default:
            throw new Error(`Unknown type ${optionValue[0]}`)
        }

        log.info('Successfully deleted selected data')
      } catch (error) {
        log.error(`Error deleting ${label}`, error)
      }
    }
  )
}

async function onDeleteAll() {
  confirmDialog(
    'Delete All',
    'Permanetly delete all data from the database?',
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.clearLogs()
        await DB.resetSettings()
        await DB.clearParents()
        await DB.clearChildren()
        log.info('All data successfully deleted')
      } catch (error) {
        log.error('Error deleting all data', error)
      }
    }
  )
}

async function onDeleteDatabase() {
  confirmDialog(
    'Delete Database',
    'Delete the underlining database? All data will be lost. You must reload the website after this action to reinitialize the database.',
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.deleteDatabase()
        notify('Reload the website now', Icon.WARN, 'warning')
      } catch (error) {
        log.error('Database deletion failed', error)
      }
    }
  )
}

function onAccessData(optionValue: string[]) {
  try {
    switch (optionValue[0]) {
      case 'internal':
        if (optionValue[1] === 'logs') {
          // TODO - Go to logs data table
        } else if (optionValue[1] === 'settings') {
          // TODO - Go to settings data table
        } else {
          throw new Error(`Unknown internal type ${optionValue[1]}`)
        }
        break
      case 'parent':
        // TODO - Go to parent data table
        break
      case 'child':
        // TODO - Go to child data table
        break
      default:
        throw new Error(`Unknown type ${optionValue[0]}`)
    }
  } catch (error) {
    log.error('Error accessing data table', error)
  }
}

function getSettingValue(key: SettingKey) {
  return settings.value.find((s) => s.key === key)?.value
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.SETTINGS" bannerTitle="Settings">
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Options</p>

        <div class="q-mb-md">
          <p>Reset your app Settings to the defaults without impacting any of your data.</p>
          <QBtn label="Reset Settings" color="primary" @click="onResetSettings()" />
        </div>

        <div class="q-mb-md">
          <p>
            Welcome overlay provides helpful instructions on basic app usage on the Dashboard page.
          </p>
          <QToggle
            label="Show Welcome Overlay"
            :model-value="getSettingValue(SettingKey.SHOW_WELCOME)"
            @update:model-value="DB.setSetting(SettingKey.SHOW_WELCOME, $event)"
          />
        </div>

        <div class="q-mb-md">
          <p>Show descriptions for records displayed on the Dashboard page.</p>
          <QToggle
            label="Show Dashboard Descriptions"
            :model-value="getSettingValue(SettingKey.SHOW_DESCRIPTIONS)"
            @update:model-value="DB.setSetting(SettingKey.SHOW_DESCRIPTIONS, $event)"
          />
        </div>

        <div>
          <p>Dark mode allows you to switch between a light or dark theme for the app.</p>
          <QToggle
            label="Dark Mode"
            :model-value="getSettingValue(SettingKey.DARK_MODE)"
            @update:model-value="DB.setSetting(SettingKey.DARK_MODE, $event)"
          />
        </div>
      </QCardSection>
    </QCard>

    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Defaults</p>

        <div>
          <p>Load default demostration records into the database. This action can be repeated.</p>
          <QBtn label="Load Examples" color="primary" @click="onDefaults()" />
        </div>
      </QCardSection>
    </QCard>

    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Data Management</p>

        <div class="q-mb-md">
          <p>
            Import data into the database from a JSON file. The app expects the data in the file to
            be structured the same as the exported version.
          </p>
          <QFile
            v-model="importFile"
            dense
            outlined
            counter
            bottom-slots
            label="File Select"
            :max-file-size="Limit.MAX_FILE_SIZE"
            accept="application/json"
            @rejected="onRejectedFile"
          >
            <template v-slot:before>
              <QBtn :disable="!importFile" label="Import" color="primary" @click="onImportFile()" />
            </template>
            <template v-slot:append>
              <QIcon
                v-if="importFile"
                :name="Icon.CLOSE"
                class="cursor-pointer"
                @click.stop="importFile = null"
              />
            </template>
          </QFile>
        </div>

        <div class="q-mb-md">
          <p>
            Export your data as a JSON file. Do this on a regularly basis so you have a backup of
            your data.
          </p>
          <QBtn label="Export" color="primary" @click="onExportRecords()" />
        </div>

        <div class="q-mb-md">
          <p>Access any app data types to view the records or troubleshoot issues.</p>
          <QSelect
            v-model="accessModel"
            outlined
            dense
            label="Record Type"
            :options="accessOptions"
          >
            <template v-slot:before>
              <QBtn
                :disable="!accessModel"
                label="Access Data"
                color="primary"
                @click="onAccessData(accessModel.value)"
              />
            </template>
          </QSelect>
        </div>
      </QCardSection>
    </QCard>

    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Logging</p>

        <div class="q-mb-md">
          <p>Show Console Logs will display all log messages in the browser console.</p>
          <QToggle
            label="Show Console Logs"
            :model-value="getSettingValue(SettingKey.SHOW_CONSOLE_LOGS)"
            @update:model-value="DB.setSetting(SettingKey.SHOW_CONSOLE_LOGS, $event)"
          />
        </div>

        <div class="q-mb-md">
          <p>Show Info Messages will display info level notifications.</p>
          <QToggle
            label="Show Info Messages"
            :model-value="getSettingValue(SettingKey.SHOW_INFO_MESSAGES)"
            @update:model-value="DB.setSetting(SettingKey.SHOW_INFO_MESSAGES, $event)"
          />
        </div>

        <div class="q-mb-md">
          <p>
            Validate that your logging settings above are working as expected by using the test
            action below.
          </p>
          <QBtn label="Test Logger" color="primary" @click="onTestLogger()" />
        </div>

        <div class="q-mb-md">
          <p>
            Change log retention time below. Logs older than the selected time will be deleted. This
            functions retroactivley, so if you change the time to 3 months, all logs older than 3
            months will be deleted. Expired log processing occurs every time the app is loaded.
          </p>

          <div class="q-mx-lg">
            <QSlider
              v-model="logRetentionIndex"
              :label-value="Object.values(LogRetention)[logRetentionIndex]"
              color="primary"
              markers
              label-always
              switch-label-side
              :min="0"
              :max="Object.values(LogRetention).length - 1"
              @change="(index) => onChangeLogRetention(index)"
            />
          </div>
        </div>
      </QCardSection>
    </QCard>

    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6 text-negative">DANGER ZONE</p>

        <p>
          The following operations cannot be undone. Consider exporting your data before proceeding.
        </p>

        <div class="q-mb-md">
          <p>Select a data type and permanently delete all of its records.</p>
          <QSelect
            v-model="deleteModel"
            outlined
            dense
            label="Record Type"
            :options="deleteOptions"
          >
            <template v-slot:before>
              <QBtn
                :disable="!deleteModel"
                label="Delete Data"
                color="negative"
                @click="onDeleteBy(deleteModel.label, deleteModel.value)"
              />
            </template>
          </QSelect>
        </div>

        <div class="q-mb-md">
          <p>Permanently delete all data records from the database.</p>
          <QBtn label="Delete All Data" color="negative" @click="onDeleteAll()" />
        </div>

        <div class="q-mb-md">
          <p>Delete the underlining database and all of its data (requires website reload).</p>
          <QBtn label="Delete Database" color="negative" @click="onDeleteDatabase()" />
        </div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
