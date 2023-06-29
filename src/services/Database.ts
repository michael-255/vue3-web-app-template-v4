import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark } from 'quasar'
import { Milliseconds, AppName, LogRetention } from '@/types/general'
import DataSchema from '@/services/DataSchema'
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
  logFieldsSchema,
  settingFieldsSchema,
  recordFieldsSchema,
  settingkeySchema,
  recordTypeSchema,
  recordGroupSchema,
} from '@/types/database'

class Database extends Dexie {
  // Required for easier TypeScript usage
  Logs!: Table<Log>
  Settings!: Table<Setting>
  CoreRecords!: Table<AnyCoreRecord>
  SubRecords!: Table<AnySubRecord>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      Logs: `++${logFieldsSchema.Values.autoId}`,
      Settings: `&${settingFieldsSchema.Values.key}`,
      CoreRecords: `&${recordFieldsSchema.Values.id}, ${recordFieldsSchema.Values.type}`,
      SubRecords: `&${recordFieldsSchema.Values.id}, ${recordFieldsSchema.Values.type}, ${recordFieldsSchema.Values.coreId}`,
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
    const logRetentionTime = (
      await this.Settings.get(settingkeySchema.Values['log-retention-time'])
    )?.value as LogRetention

    if (!logRetentionTime || logRetentionTime === LogRetention.FOREVER) {
      return 0 // No logs purged
    }

    const lookupMilliseconds: Readonly<{
      [key in LogRetention]: number
    }> = {
      [LogRetention.ONE_WEEK]: Milliseconds.PER_WEEK,
      [LogRetention.THREE_MONTHS]: Milliseconds.PER_THREE_MONTHS,
      [LogRetention.ONE_YEAR]: Milliseconds.PER_YEAR,
      [LogRetention.FOREVER]: Milliseconds.FOREVER,
    }

    const logs = await this.Logs.toArray()

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = log.timestamp ?? 0
        const logAgeMilliseconds = Date.now() - logTimestamp
        return logAgeMilliseconds > lookupMilliseconds[logRetentionTime]
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
      [settingkeySchema.Values['welcome-overlay']]: true,
      [settingkeySchema.Values['dashboard-descriptions']]: true,
      [settingkeySchema.Values['dark-mode']]: true,
      [settingkeySchema.Values['console-logs']]: false,
      [settingkeySchema.Values['info-messages']]: true,
      [settingkeySchema.Values['log-retention-time']]: LogRetention.THREE_MONTHS,
    }

    const keys = settingkeySchema.options

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

    Dark.set(Boolean(settings.find((s) => s.key === settingkeySchema.Values['dark-mode'])?.value))

    await Promise.all(settings.map((s) => this.setSetting(s.key, s.value)))
  }

  async setSetting(key: SettingKey, value: any) {
    if (key === settingkeySchema.Values['dark-mode']) {
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
    return liveQuery(() => this.Logs.orderBy(logFieldsSchema.Values.autoId).reverse().toArray())
  }

  liveSettings() {
    return liveQuery(() => this.Settings.orderBy(settingFieldsSchema.Values.key).toArray())
  }

  liveRecords(group: RecordGroup, type: RecordType) {
    if (group === recordGroupSchema.Values['core-record']) {
      return liveQuery(() =>
        this.CoreRecords.where(recordFieldsSchema.Values.type)
          .equals(type)
          .sortBy(recordFieldsSchema.Values.name)
      )
    } else {
      return liveQuery(async () =>
        (
          await this.SubRecords.where(recordFieldsSchema.Values.type)
            .equals(type)
            .sortBy(recordFieldsSchema.Values.timestamp)
        ).reverse()
      )
    }
  }

  // TODO - remove?
  liveCoreRecords(type: RecordType) {
    return liveQuery(() =>
      this.CoreRecords.where(recordFieldsSchema.Values.type)
        .equals(type)
        .sortBy(recordFieldsSchema.Values.name)
    )
  }

  // TODO - remove?
  liveSubRecords(type: RecordType) {
    return liveQuery(async () =>
      (
        await this.SubRecords.where(recordFieldsSchema.Values.type)
          .equals(type)
          .sortBy(recordFieldsSchema.Values.timestamp)
      ).reverse()
    )
  }

  liveDashboard() {
    return liveQuery(async () => {
      const parents = await this.CoreRecords.filter((p) => p.enable === true).sortBy(
        recordFieldsSchema.Values.name
      )

      const favorites: AnyCoreRecord[] = []
      const nonFavorites: AnyCoreRecord[] = []

      parents.forEach((p) => {
        if (p.favorite === true) {
          favorites.push(p)
        } else {
          nonFavorites.push(p)
        }
      })

      return recordTypeSchema.options.reduce((acc, type) => {
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
    if (group === recordGroupSchema.Values['core-record']) {
      return await this.CoreRecords.where(recordFieldsSchema.Values.type)
        .equals(type)
        .sortBy(recordFieldsSchema.Values.name)
    } else {
      return (
        await this.SubRecords.where(recordFieldsSchema.Values.type)
          .equals(type)
          .sortBy(recordFieldsSchema.Values.timestamp)
      ).reverse()
    }
  }

  async getRecord(group: RecordGroup, id: string) {
    if (group === recordGroupSchema.Values['core-record']) {
      return await this.CoreRecords.get(id)
    } else {
      return await this.SubRecords.get(id)
    }
  }

  async getCoreSubRecords(coreId: string) {
    return await this.SubRecords.where(recordFieldsSchema.Values.coreId)
      .equals(coreId)
      .sortBy(recordFieldsSchema.Values.timestamp)
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

    if (group === recordGroupSchema.Values['core-record']) {
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

  async importRecords(group: RecordGroup, records: (AnyCoreRecord | AnySubRecord)[]) {
    const validRecords: (AnyCoreRecord | AnySubRecord)[] = []
    const skippedRecords: (AnyCoreRecord | AnySubRecord)[] = []

    for await (const r of records) {
      const schema = DataSchema.getSchema(group, r.type)

      if (schema && schema.safeParse(r).success) {
        validRecords.push(schema.parse(r) as AnyRecord)
      } else {
        skippedRecords.push(r)
      }
    }

    if (group === recordGroupSchema.Values['core-record']) {
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

    if (group === recordGroupSchema.Values['core-record']) {
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
      await this.SubRecords.where(recordFieldsSchema.Values.coreId)
        .equals(coreId)
        .sortBy(recordFieldsSchema.Values.timestamp)
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

    if (group === recordGroupSchema.Values['core-record']) {
      await this.CoreRecords.delete(id)
      await this.SubRecords.where(recordFieldsSchema.Values.coreId).equals(id).delete()
    } else {
      await this.SubRecords.delete(id)
      await this.updateLastSub(recordToDelete.coreId)
    }

    return recordToDelete
  }

  async clearRecordsByType(group: RecordGroup, type: RecordType) {
    if (group === recordGroupSchema.Values['core-record']) {
      await this.CoreRecords.where(recordFieldsSchema.Values.type).equals(type).delete()
      return await this.SubRecords.where(recordFieldsSchema.Values.type).equals(type).delete()
    } else {
      await this.SubRecords.where(recordFieldsSchema.Values.type).equals(type).delete()
      const parentsToUpdate = await this.CoreRecords.where(recordFieldsSchema.Values.type)
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
