import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark } from 'quasar'
import { Duration } from '@/types/general'
import { AppName } from '@/constants/global'
import {
  type Log,
  type Setting,
  type AnyRecord,
  type AnyCoreRecord,
  type AnySubRecord,
  type LogLevel,
  type SettingKey,
  type RecordType,
  type RecordGroup,
  allFields,
  settingkeys,
  recordTypes,
  recordGroups,
} from '@/types/core'
import DataSchema from '@/services/DataSchema'

class Database extends Dexie {
  // Required for easier TypeScript usage
  Logs!: Table<Log>
  Settings!: Table<Setting>
  CoreRecords!: Table<AnyCoreRecord>
  SubRecords!: Table<AnySubRecord>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      Logs: `++${allFields.Values.autoId}`,
      Settings: `&${allFields.Values.key}`,
      CoreRecords: `&${allFields.Values.id}, ${allFields.Values.type}`,
      SubRecords: `&${allFields.Values.id}, ${allFields.Values.type}, ${allFields.Values.coreId}`,
    })
  }

  //
  // LOGS
  //

  async getLogs() {
    return await this.Logs.toArray()
  }

  async getLog(autoId: number) {
    return await this.Logs.get(autoId)
  }

  async addLog(logLevel: LogLevel, label: string, details?: any) {
    const log: Log = {
      // Auto Id handled by Dexie
      timestamp: Date.now(),
      logLevel,
      label,
    }

    // Remaining properties determined by details
    if (details && typeof details === 'object') {
      if ('message' in details || 'stack' in details) {
        // An object with a message or stack property is a JS Error
        log.message = details?.message
        log.stack = details?.stack
      } else {
        // Should be safe to store most other objects into the details property
        log.details = details
      }
    }

    return await this.Logs.add(log)
  }

  async deleteExpiredLogs() {
    const logDuration = (await this.Settings.get(settingkeys.Values['log-retention-duration']))
      ?.value as Duration

    if (!logDuration || logDuration === Duration.Forever) {
      return 0 // No logs purged
    }

    const logs = await this.Logs.toArray()

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = log.timestamp ?? 0
        const logAge = Date.now() - logTimestamp
        return logAge > logDuration
      })
      .map((log: Log) => log.autoId as number) // Map remaining Log ids for removal

    await this.Logs.bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  //
  // SETTINGS
  //

  async getSettings() {
    return await this.Settings.toArray()
  }

  async getSetting(key: SettingKey) {
    return await this.Settings.get(key)
  }

  async initSettings() {
    const defaultSettings: Readonly<{
      [key in SettingKey]: any
    }> = {
      [settingkeys.Values['welcome-overlay']]: true,
      [settingkeys.Values['dashboard-descriptions']]: true,
      [settingkeys.Values['dark-mode']]: true,
      [settingkeys.Values['console-logs']]: false,
      [settingkeys.Values['info-messages']]: true,
      [settingkeys.Values['log-retention-duration']]: Duration['Three Months'],
    }

    const keys = settingkeys.options

    const settings = await Promise.all(
      keys.map(async (key) => {
        const setting = await this.Settings.get(key)

        if (setting) {
          return setting
        } else {
          return { key, value: defaultSettings[key] }
        }
      })
    )

    Dark.set(Boolean(settings.find((s) => s.key === settingkeys.Values['dark-mode'])?.value))

    await Promise.all(settings.map((s) => this.setSetting(s.key as SettingKey, s.value)))
  }

  async setSetting(key: SettingKey, value: any) {
    if (key === settingkeys.Values['dark-mode']) {
      Dark.set(Boolean(value))
    }

    const currentSetting = await this.Settings.get(key)

    if (!currentSetting) {
      return await this.Settings.add({ key, value })
    } else {
      return await this.Settings.update(key, { value })
    }
  }

  //
  // LIVE QUERIES
  //

  liveLogs() {
    return liveQuery(() => this.Logs.orderBy(allFields.Values.autoId).reverse().toArray())
  }

  liveSettings() {
    return liveQuery(() => this.Settings.orderBy(allFields.Values.key).toArray())
  }

  liveCoreRecords(type: RecordType) {
    return liveQuery(() =>
      this.CoreRecords.where(allFields.Values.type).equals(type).sortBy(allFields.Values.name)
    )
  }

  liveSubRecords(type: RecordType) {
    return liveQuery(async () =>
      (
        await this.SubRecords.where(allFields.Values.type)
          .equals(type)
          .sortBy(allFields.Values.timestamp)
      ).reverse()
    )
  }

  liveDashboard() {
    return liveQuery(async () => {
      const parents = await this.CoreRecords.filter((p) => p.enabled === true).sortBy(
        allFields.Values.name
      )

      const favorites: AnyCoreRecord[] = []
      const nonFavorites: AnyCoreRecord[] = []

      parents.forEach((p) => {
        if (p.favorited === true) {
          favorites.push(p)
        } else {
          nonFavorites.push(p)
        }
      })

      return recordTypes.options.reduce((acc, type) => {
        acc[type] = [
          ...favorites.filter((p) => p.type === type),
          ...nonFavorites.filter((p) => p.type === type),
        ]
        return acc
      }, {} as { [key in RecordType]: AnyCoreRecord[] })
    })
  }

  //
  // RECORD GETS
  //

  async getAllCoreRecords() {
    return await this.CoreRecords.toArray()
  }

  async getAllSubRecords() {
    return await this.SubRecords.toArray()
  }

  async getRecords(group: RecordGroup, type: RecordType) {
    if (group === recordGroups.Values.core) {
      return await this.CoreRecords.where(allFields.Values.type)
        .equals(type)
        .sortBy(allFields.Values.name)
    } else {
      return (
        await this.SubRecords.where(allFields.Values.type)
          .equals(type)
          .sortBy(allFields.Values.timestamp)
      ).reverse()
    }
  }

  async getRecord(group: RecordGroup, id: string) {
    if (group === recordGroups.Values.core) {
      return await this.CoreRecords.get(id)
    } else {
      return await this.SubRecords.get(id)
    }
  }

  async getCoreSubRecords(coreId: string) {
    return await this.SubRecords.where(allFields.Values.coreId)
      .equals(coreId)
      .sortBy(allFields.Values.timestamp)
  }

  //
  // RECORD CREATES
  //

  async addRecord(group: RecordGroup, type: RecordType, record: AnyRecord) {
    const schema = DataSchema.getSchema(group, type)

    if (!schema || !schema.safeParse(record).success) {
      throw new Error(
        `Invalid schema with parameters: ${group}, ${type}, ${JSON.stringify(record)}`
      )
    }

    if (group === recordGroups.Values.core) {
      const newRecord = schema.parse(record) as AnyCoreRecord
      const result = await this.CoreRecords.add(newRecord)
      await this.updateLastSub(newRecord.id)
      return result
    } else {
      const newRecord = schema.parse(record) as AnySubRecord
      const result = await this.SubRecords.add(newRecord)
      await this.updateLastSub(newRecord.coreId)
      return result
    }
  }

  async importRecords(group: RecordGroup, records: AnyRecord[]) {
    const validRecords: AnyRecord[] = []
    const skippedRecords: AnyRecord[] = []

    for await (const r of records) {
      const schema = DataSchema.getSchema(group, r.type)

      if (schema && schema.safeParse(r).success) {
        validRecords.push(schema.parse(r) as AnyRecord)
      } else {
        skippedRecords.push(r)
      }
    }

    if (group === recordGroups.Values.core) {
      await this.CoreRecords.bulkAdd(validRecords as AnyCoreRecord[])
    } else {
      await this.SubRecords.bulkAdd(validRecords as AnySubRecord[])
    }

    await this.updateAllLastSub()

    if (skippedRecords.length > 0) {
      // Error for the frontend to report if any records were skipped
      throw new Error(
        `Records skipped due to validation failures (${
          skippedRecords.length
        }): ${skippedRecords.map((r) => String(r.id))}`
      )
    }
  }

  //
  // RECORD UPDATES
  //

  async updateRecord(group: RecordGroup, type: RecordType, id: string, updatedRecord: AnyRecord) {
    const schema = DataSchema.getSchema(group, type)

    if (!schema || !schema.safeParse(updatedRecord).success) {
      throw new Error(
        `Invalid schema with parameters: ${group}, ${type}, ${id}, ${JSON.stringify(updatedRecord)}`
      )
    }

    if (group === recordGroups.Values.core) {
      const result = await this.CoreRecords.update(id, schema.parse(updatedRecord))
      await this.updateLastSub(id)
      return result
    } else {
      const result = await this.SubRecords.update(id, schema.parse(updatedRecord))
      await this.updateLastSub(updatedRecord.coreId)
      return result
    }
  }

  async updateLastSub(coreId: string) {
    const lastSub = (
      await this.SubRecords.where(allFields.Values.coreId)
        .equals(coreId)
        .sortBy(allFields.Values.timestamp)
    ).reverse()[0]
    return await this.CoreRecords.update(coreId, { lastSub })
  }

  /**
   * - Call after imports to update the lastSub property of all core records
   */
  async updateAllLastSub() {
    const coreRecords = await this.CoreRecords.toArray()
    return await Promise.all(coreRecords.map((p) => this.updateLastSub(p.id)))
  }

  //
  // RECORD DELETES
  //

  async deleteRecord(group: RecordGroup, id: string) {
    const recordToDelete = (await this.getRecord(group, id)) as AnyRecord | undefined

    if (!recordToDelete) {
      throw new Error(`No record found to delete with: ${group}, ${id}`)
    }

    if (group === recordGroups.Values.core) {
      await this.CoreRecords.delete(id)
      await this.SubRecords.where(allFields.Values.coreId).equals(id).delete()
    } else {
      await this.SubRecords.delete(id)
      await this.updateLastSub(recordToDelete.coreId)
    }

    return recordToDelete
  }

  async clearRecordsByType(group: RecordGroup, type: RecordType) {
    if (group === recordGroups.Values.core) {
      await this.CoreRecords.where(allFields.Values.type).equals(type).delete()
      return await this.SubRecords.where(allFields.Values.type).equals(type).delete()
    } else {
      await this.SubRecords.where(allFields.Values.type).equals(type).delete()
      const parentsToUpdate = await this.CoreRecords.where(allFields.Values.type)
        .equals(type)
        .toArray()
      return await Promise.all(
        parentsToUpdate.map((r) => this.CoreRecords.update(r.id, { lastChild: undefined }))
      )
    }
  }

  async clearLogs() {
    return await this.Logs.clear()
  }

  async clearSettings() {
    await this.Settings.clear()
    return await this.initSettings()
  }

  async clearAll() {
    await this.Logs.clear()
    await this.Settings.clear()
    await this.CoreRecords.clear()
    await this.SubRecords.clear()
    return await this.initSettings()
  }

  // Deletes entire database. Require app reload to reinitialize the database.
  async deleteDatabase() {
    return await this.delete()
  }
}

/**
 * Use this preconfigured Database instance. Do NOT create another one!
 */
const DB = new Database(AppName)

export default DB
