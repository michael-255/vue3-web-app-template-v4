import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark } from 'quasar'
import type { ChildRecord, Log, ParentRecord, Setting } from '@/types/database'
import { Milliseconds, AppName, LogRetention } from '@/types/general'
import { Severity, Type, Field, SettingKey } from '@/types/database'
import DataSchema from '@/services/DataSchema'

class Database extends Dexie {
  // Required for easier TypeScript usage
  Logs!: Table<Log>
  Settings!: Table<Setting>
  Parents!: Table<ParentRecord>
  Children!: Table<ChildRecord>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      Logs: `++${Field.AUTO_ID}`,
      Settings: `&${Field.KEY}`,
      Parents: `&${Field.ID}, ${Field.TYPE}`,
      Children: `&${Field.ID}, ${Field.TYPE}, ${Field.PARENT_ID}`,
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     LIVE QUERIES                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  liveSettings() {
    return liveQuery(() => this.Settings.toArray())
  }

  liveLogs() {
    return liveQuery(() => this.Logs.orderBy(Field.AUTO_ID).reverse().toArray())
  }

  liveDashboard() {
    return liveQuery(async () => {
      const parents = await this.Parents.filter((p) => p.enabled === true).sortBy(Field.NAME)

      const favorites: ParentRecord[] = []
      const nonFavorites: ParentRecord[] = []

      parents.forEach((p) => {
        if (p.favorited === true) {
          favorites.push(p)
        } else {
          nonFavorites.push(p)
        }
      })

      return Object.values(Type).reduce((acc, type) => {
        acc[type] = [
          ...favorites.filter((p) => p.type === type),
          ...nonFavorites.filter((p) => p.type === type),
        ]
        return acc
      }, {} as { [key in Type]: ParentRecord[] })
    })
  }

  liveParents(type: Type) {
    return liveQuery(async () => {
      return await this.Parents.where(Field.TYPE).equals(type).sortBy(Field.NAME)
    })
  }

  liveChildren(type: Type) {
    return liveQuery(async () => {
      return (await this.Children.where(Field.TYPE).equals(type).sortBy(Field.TIMESTAMP)).reverse()
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     LOGS                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getLogs() {
    return await this.Logs.toArray()
  }

  async getLog(autoId: number) {
    return await this.Logs.get(autoId)
  }

  async addLog(severity: Severity, label: string, details?: any) {
    const log: Log = {
      // Auto Id handled by Dexie
      timestamp: Date.now(),
      severity,
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
    const logRetentionTime = (await this.getSetting(SettingKey.LOG_RETENTION_TIME))
      ?.value as LogRetention

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

    const logs = await this.getLogs()

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

  async clearLogs() {
    await this.Logs.clear()
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     SETTINGS                                                            //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async initSettings() {
    const defaultSettings: Readonly<{
      [key in SettingKey]: any
    }> = {
      // Can't use undefined or null as default values for settings
      [SettingKey.SHOW_WELCOME]: true,
      [SettingKey.SHOW_DESCRIPTIONS]: true,
      [SettingKey.DARK_MODE]: true,
      [SettingKey.SHOW_CONSOLE_LOGS]: false,
      [SettingKey.SHOW_INFO_MESSAGES]: true,
      [SettingKey.LOG_RETENTION_TIME]: LogRetention.THREE_MONTHS,
    }

    const keys = Object.values(SettingKey)

    // Replace Setting value with default if needed
    const settings = await Promise.all(
      keys.map(async (key) => ({
        key,
        value: (await this.Settings.get(key))?.value ?? defaultSettings[key],
      }))
    )

    Dark.set(!!settings.find((s) => s.key === SettingKey.DARK_MODE)?.value)

    // Set all Settings in the database
    await Promise.all(settings.map((s) => this.setSetting(s.key, s.value)))
  }

  async getSettings() {
    return await this.Settings.toArray()
  }

  async getSetting(key: SettingKey) {
    return await this.Settings.get(key)
  }

  async setSetting(key: SettingKey, value: any) {
    // Set Quasar dark mode if the key is for dark mode
    if (key === SettingKey.DARK_MODE) {
      Dark.set(!!value) // Cast to boolean just in case
    }

    const setting: Setting = { key, value }
    const settingValue = await this.Settings.get(setting.key)

    if (!settingValue) {
      // Create Setting if it doesn't exist
      return await this.Settings.add(setting)
    } else {
      // Update Setting if it does exist
      return await this.Settings.update(setting.key, { value: setting.value })
    }
  }

  async resetSettings() {
    await this.Settings.clear()
    await this.initSettings()
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     PARENTS                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getParents() {
    return await this.Parents.toArray()
  }

  async getParentsByType(type: Type) {
    return await this.Parents.where(Field.TYPE).equals(type).toArray()
  }

  async getParent(id: string) {
    return await this.Parents.get(id)
  }

  async getParentChildren(parentId: string) {
    return await this.Children.where(Field.PARENT_ID).equals(parentId).sortBy(Field.TIMESTAMP)
  }

  async addParent(record: ParentRecord) {
    const recordValidator = DataSchema.getParentValidator(record?.type as Type)

    if (recordValidator && (await recordValidator.isValid(record))) {
      return await this.Parents.add(await recordValidator.validate(record))
    } else {
      throw new Error(`Invalid record or validator: ${JSON.stringify(record)}`)
    }
  }

  async importParents(records: ParentRecord[]) {
    const validRecords: ParentRecord[] = []
    const skippedRecords: ParentRecord[] = []

    for await (const r of records) {
      const recordValidator = DataSchema.getParentValidator(r?.type as Type)

      if (recordValidator && (await recordValidator.isValid(r))) {
        // Valid records get cleaned and pushed to valid records
        validRecords.push(await recordValidator.validate(r))
      } else {
        skippedRecords.push(r)
      }
    }

    await this.Parents.bulkAdd(validRecords) // Only valid records are imported

    if (skippedRecords.length > 0) {
      // Error for the frontend to report if any records were skipped
      throw new Error(
        `Records skipped due to validation failures (${
          skippedRecords.length
        }): ${skippedRecords.map((r) => String(r.id))}`
      )
    }
  }

  async updateParent(oldId: string, updatedRecord: ParentRecord) {
    const oldRecord = await this.Parents.get(oldId)

    if (!oldRecord) {
      throw new Error(`Record with old id ${oldId} does not exist.`)
    }

    const recordValidator = DataSchema.getParentValidator(updatedRecord?.type as Type)

    if (recordValidator && (await recordValidator.isValid(updatedRecord))) {
      return await this.Parents.update(oldId, await recordValidator.validate(updatedRecord))
    } else {
      throw new Error(`Invalid record or validator: ${JSON.stringify(updatedRecord)}`)
    }
  }

  async updateParentLastChild(parentId: string) {
    const lastChild = await this.getLastChild(parentId)
    return await this.Parents.update(parentId, { lastChild })
  }

  /**
   * Must call at the end of bulk imports to update the lastChild property of all parents
   */
  async updateAllParentLastChild() {
    const parents = await this.Parents.toArray()
    await Promise.all(parents.map((p) => this.updateParentLastChild(p.id as string)))
  }

  async deleteParent(id: string) {
    const recordToDelete = await this.getParent(id)

    if (!recordToDelete) {
      throw new Error(`Record with id ${id} does not exist.`)
    }

    await this.Parents.delete(id)
    await this.Children.where(Field.PARENT_ID).equals(id).delete()

    return recordToDelete
  }

  // Also deletes accompanying child records
  async clearParentsByType(type: Type) {
    await this.Parents.where(Field.TYPE).equals(type).delete()
    await this.Children.where(Field.TYPE).equals(type).delete()
  }

  async clearParents() {
    await this.Parents.clear()
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     CHILDREN                                                            //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getChildren() {
    return await this.Children.toArray()
  }

  async getChildrenByType(type: Type) {
    return await this.Children.where(Field.TYPE).equals(type).toArray()
  }

  async getChild(id: string) {
    return await this.Children.get(id)
  }

  async getLastChild(parentId: string) {
    return (
      await this.Children.where(Field.PARENT_ID).equals(parentId).sortBy(Field.TIMESTAMP)
    ).reverse()[0]
  }

  async addChild(record: ChildRecord) {
    const recordValidator = DataSchema.getChildValidator(record?.type as Type)

    if (recordValidator && (await recordValidator.isValid(record))) {
      const addResult = await this.Children.add(await recordValidator.validate(record))
      await this.updateParentLastChild(record.parentId as string)
      return addResult
    } else {
      throw new Error(`Invalid record or validator: ${JSON.stringify(record)}`)
    }
  }

  async importChildren(records: ChildRecord[]) {
    const validRecords: ChildRecord[] = []
    const skippedRecords: ChildRecord[] = []

    for await (const r of records) {
      const recordValidator = DataSchema.getChildValidator(r?.type as Type)

      if (recordValidator && (await recordValidator.isValid(r))) {
        // Valid records get cleaned and pushed to valid records
        validRecords.push(await recordValidator.validate(r))
      } else {
        skippedRecords.push(r)
      }
    }

    await this.Children.bulkAdd(validRecords) // Only valid records are imported

    if (skippedRecords.length > 0) {
      // Error for the frontend to report if any records were skipped
      throw new Error(
        `Records skipped due to validation failures (${
          skippedRecords.length
        }): ${skippedRecords.map((r) => String(r.id))}`
      )
    }
  }

  async updateChild(oldId: string, updatedRecord: ChildRecord) {
    const oldRecord = await this.Children.get(oldId)

    if (!oldRecord) {
      throw new Error(`Record with old id ${oldId} does not exist.`)
    }

    const recordValidator = DataSchema.getChildValidator(updatedRecord?.type as Type)

    if (recordValidator && (await recordValidator.isValid(updatedRecord))) {
      const updateResult = await this.Children.update(
        oldId,
        await recordValidator.validate(updatedRecord)
      )
      await this.updateParentLastChild(updatedRecord.parentId as string)
      return updateResult
    } else {
      throw new Error(`Invalid record or validator: ${JSON.stringify(updatedRecord)}`)
    }
  }

  async deleteChild(id: string) {
    const recordToDelete = await this.getChild(id)

    if (!recordToDelete) {
      throw new Error(`Record with id ${id} does not exist.`)
    }

    await this.Children.delete(id)
    await this.updateParentLastChild(recordToDelete.parentId as string)
    return recordToDelete
  }

  async clearChildrenByType(type: Type) {
    // Get all child records to be deleted
    const records = await this.Children.where(Field.TYPE).equals(type).toArray()
    // Delete all child records of the given type
    await this.Children.where(Field.TYPE).equals(type).delete()
    // Update parent records lastChild property to undefined
    await Promise.all(
      records.map((r) => this.Parents.update(r.parentId as string, { lastChild: undefined }))
    )
  }

  async clearChildren() {
    await this.Children.clear()
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     MISCELLANEOUS                                                       //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

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
