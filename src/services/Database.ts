import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark } from 'quasar'
import type { ChildRecord, Log, ParentRecord, Setting } from '@/types/database'
import { Milliseconds, AppName, LogRetention } from '@/types/general'
import { typeValidator, idValidator } from '@/services/validators'
import { Severity, Type, LogField, SettingField, RecordField, SettingKey } from '@/types/database'
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
      Logs: `++${LogField.AUTO_ID}`,
      Settings: `&${SettingField.KEY}`,
      Parents: `&${RecordField.ID}, ${RecordField.TYPE}`,
      Children: `&${RecordField.ID}, ${RecordField.PARENT_ID}, ${RecordField.TYPE}`,
    })
  }

  async testType(type: Type) {}

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     LIVE QUERIES                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  liveSettings() {
    return liveQuery(() => this.Settings.toArray())
  }

  liveLogs() {
    return liveQuery(() => this.Logs.orderBy(LogField.AUTO_ID).reverse().toArray())
  }

  liveDashboard() {
    return liveQuery(async () => {
      const parents = await this.Parents.filter((p) => p.enabled === true).sortBy(RecordField.NAME)

      const favorites: ParentRecord[] = []
      const nonFavorites: ParentRecord[] = []

      parents.forEach((p) => {
        if (p.favorited === true) {
          favorites.push(p)
        } else {
          nonFavorites.push(p)
        }
      })

      return [...favorites, ...nonFavorites]
    })
  }

  // liveDataTable(type: Type) {
  //   return liveQuery(async () => {
  //     return (await this.table(type).toCollection().sortBy(Field.TIMESTAMP)).reverse()
  //   })
  // }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     LOGS                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getLogs() {
    return await this.Logs.toArray()
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

  async getParent(id: string) {
    return await this.Parents.get(id)
  }

  async getParentChildren(parentId: string) {
    return await this.Children.where(RecordField.PARENT_ID)
      .equals(parentId)
      .sortBy(RecordField.TIMESTAMP)
  }

  async addParent(record: ParentRecord) {
    await typeValidator.validate(record?.type)

    // if (!(await typeValidator.isValid(record?.type))) {
    //   throw new Error(
    //     `Must have a valid type to add a parent record. The type ${record?.type} is invalid.`
    //   )
    // }

    const recordValidator = DataSchema.getParentValidator(record.type as Type)
    if (!recordValidator) {
      throw new Error('Must have a record validator to add a parent record.')
    }

    await recordValidator.validate(record)

    // if (!(await recordValidator.isValid(record))) {
    //   throw new Error(
    //     `Must have a valid record to add a parent record. The following record is invalid: ${JSON.stringify(
    //       record
    //     )}`
    //   )
    // }

    return await this.Parents.add(await recordValidator.validate(record))
  }

  async importParents(records: ParentRecord[]) {
    // if (!(await typeValidator.isValid(type))) {
    //   throw new Error(`Import records type ${type} is invalid`)
    // }
    // // Find record specific validator
    // const recordValidator = DataSchema.getValidator(type)
    // if (!recordValidator) {
    //   throw new Error('Import records validator not found')
    // }
    // const validRecords: Record[] = []
    // const skippedRecords: Record[] = []
    // for await (const r of records) {
    //   if (await recordValidator.isValid(r)) {
    //     // Valid records get cleaned and pushed to valid records
    //     validRecords.push(await recordValidator.validate(r))
    //   } else {
    //     skippedRecords.push(r)
    //   }
    // }
    // // Only importing the valid records
    // await this.table(type).bulkAdd(validRecords)
    // if (skippedRecords.length > 0) {
    //   // Error for the frontend to report if any records were skipped
    //   throw new Error(
    //     `Records skipped due to validation failures (${
    //       skippedRecords.length
    //     }): ${skippedRecords.map((r) => String(r.id))}`
    //   )
    // }
  }

  async updateParent(oldId: string, updatedRecord: ParentRecord) {
    await idValidator.validate(oldId)

    // if (!(await idValidator.isValid(oldId))) {
    //   throw new Error(`Update record id ${oldId} is invalid`)
    // }

    await typeValidator.validate(updatedRecord?.type)

    // if (!(await typeValidator.isValid(updatedRecord?.type))) {
    //   throw new Error(`Update record type ${updatedRecord?.type} is invalid`)
    // }

    const record = await this.Parents.get(oldId)
    if (!record) {
      throw new Error('Update record cannot update non-existent record')
    }

    const recordValidator = DataSchema.getParentValidator(updatedRecord.type as Type)
    if (!recordValidator) {
      throw new Error('Update record validator not found')
    }

    await recordValidator.validate(record)

    // if (!(await recordValidator.isValid(record))) {
    //   throw new Error('Update record found invalid record changes')
    // }

    return await this.Parents.update(oldId, await recordValidator.validate(record))
  }

  async deleteParent(id: string) {
    await idValidator.validate(id)

    // if (!(await idValidator.isValid(id))) {
    //   throw new Error(`Delete record id ${id} is invalid`)
    // }

    const recordToDelete = await this.getParent(id)
    if (!recordToDelete) {
      throw new Error(`Delete record with id ${id} does not exist`)
    }

    await this.Parents.delete(id)
    await this.Children.where(RecordField.PARENT_ID).equals(id).delete()

    return recordToDelete
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

  async getChild(id: string) {
    return await this.Children.get(id)
  }

  async getLastChild(parentId: string) {
    return (
      await this.Children.where(RecordField.PARENT_ID).equals(parentId).toArray()
    ).reverse()[0]
  }

  async addChild(record: ChildRecord) {
    await typeValidator.validate(record?.type)

    // if (!(await typeValidator.isValid(record?.type))) {
    //   throw new Error(
    //     `Must have a valid type to add a parent record. The type ${record?.type} is invalid.`
    //   )
    // }

    const recordValidator = DataSchema.getChildValidator(record.type as Type)
    if (!recordValidator) {
      throw new Error('Must have a record validator to add a parent record.')
    }

    await recordValidator.validate(record)

    // if (!(await recordValidator.isValid(record))) {
    //   throw new Error(
    //     `Must have a valid record to add a parent record. The following record is invalid: ${JSON.stringify(
    //       record
    //     )}`
    //   )
    // }

    return await this.Children.add(await recordValidator.validate(record))
    // TODO: Update parent lastChild
  }

  async importChildren(records: ParentRecord[]) {
    // if (!(await typeValidator.isValid(type))) {
    //   throw new Error(`Import records type ${type} is invalid`)
    // }
    // // Find record specific validator
    // const recordValidator = DataSchema.getValidator(type)
    // if (!recordValidator) {
    //   throw new Error('Import records validator not found')
    // }
    // const validRecords: Record[] = []
    // const skippedRecords: Record[] = []
    // for await (const r of records) {
    //   if (await recordValidator.isValid(r)) {
    //     // Valid records get cleaned and pushed to valid records
    //     validRecords.push(await recordValidator.validate(r))
    //   } else {
    //     skippedRecords.push(r)
    //   }
    // }
    // // Only importing the valid records
    // await this.table(type).bulkAdd(validRecords)
    // if (skippedRecords.length > 0) {
    //   // Error for the frontend to report if any records were skipped
    //   throw new Error(
    //     `Records skipped due to validation failures (${
    //       skippedRecords.length
    //     }): ${skippedRecords.map((r) => String(r.id))}`
    //   )
    // }
    // TODO: Update parents lastChildren
  }

  async updateChild(oldId: string, updatedRecord: ChildRecord) {
    await idValidator.validate(oldId)

    // if (!(await idValidator.isValid(oldId))) {
    //   throw new Error(`Update record id ${oldId} is invalid`)
    // }

    await typeValidator.validate(updatedRecord?.type)

    // if (!(await typeValidator.isValid(updatedRecord?.type))) {
    //   throw new Error(`Update record type ${updatedRecord?.type} is invalid`)
    // }

    const record = await this.Parents.get(oldId)
    if (!record) {
      throw new Error('Update record cannot update non-existent record')
    }

    const recordValidator = DataSchema.getChildValidator(updatedRecord.type as Type)
    if (!recordValidator) {
      throw new Error('Update record validator not found')
    }

    await recordValidator.validate(record)

    // if (!(await recordValidator.isValid(record))) {
    //   throw new Error('Update record found invalid record changes')
    // }

    // TODO: Update parent lastChild
    return await this.Children.update(oldId, await recordValidator.validate(record))
  }

  async deleteChild(id: string) {
    await idValidator.validate(id)

    // if (!(await idValidator.isValid(id))) {
    //   throw new Error(`Delete record id ${id} is invalid`)
    // }

    const recordToDelete = await this.getChild(id)
    if (!recordToDelete) {
      throw new Error(`Delete record with id ${id} does not exist`)
    }

    await this.Children.delete(id)

    // TODO: Update parent lastChild
    return recordToDelete
  }

  async clearChildren() {
    await this.Children.clear()
    // TODO: Update parent lastChild to undefined for all parents
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
