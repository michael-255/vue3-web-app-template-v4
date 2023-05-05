import Dexie, { liveQuery, type PromiseExtended, type Table } from 'dexie'
import type { Log, Record, Setting } from '@/types/models'
import { Milliseconds, AppName } from '@/types/misc'
import { Dark } from 'quasar'
import {
  type Id,
  type Label,
  type Details,
  type Value,
  type AutoId,
  type Timestamp,
  Severity,
  Type,
  Field,
  LogRetention,
  LogIndex,
  SettingIndex,
  PrimaryCompoundIndex,
  IdIndex,
  RelationIndex,
  Relation,
  Key,
  SettingField,
} from '@/types/database'

/**
 * A Dexie wrapper class that acts as a local database.
 */
export class LocalDatabase extends Dexie {
  Logs!: Table<Log>
  Settings!: Table<Setting>
  Records!: Table<Record>

  constructor(name: string) {
    super(name)

    // TODO - Try incrementing schema to rebuild DB
    this.version(1).stores({
      Logs: LogIndex,
      Settings: SettingIndex,
      Records: `${PrimaryCompoundIndex}, ${IdIndex}, ${RelationIndex}`,
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     MISCELLANEOUS                                                       //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes all settings with existing or default values.
   */
  async initSettings() {
    const defaultSettings: Readonly<{
      [key in Key]: Value
    }> = {
      [Key.SHOW_INTRODUCTION]: true,
      [Key.SHOW_DASHBOARD_DESCRIPTIONS]: true,
      [Key.DARK_MODE]: true,
      [Key.SHOW_ALL_DATA_COLUMNS]: false,
      [Key.SHOW_CONSOLE_LOGS]: false,
      [Key.SHOW_INFO_MESSAGES]: true,
      [Key.LOG_RETENTION_TIME]: LogRetention.THREE_MONTHS,
    }

    const keys = Object.values(Key)

    // Replace Setting value with default if needed
    const settings = await Promise.all(
      keys.map(async (key) => ({
        key,
        value: (await this.Settings.get(key))?.value ?? defaultSettings[key],
      }))
    )

    // Set Quasar dark mode - Casting to a boolean just in case
    Dark.set(!!settings.find((s) => s.key === Key.DARK_MODE)?.value)

    // Set all Settings in the database
    await Promise.all(settings.map((s) => this.setSetting(s.key, s.value)))
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     LIVE QUERIES                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Observable of Logs table with newest logs first.
   */
  liveLogs() {
    return liveQuery(() => this.Logs.reverse().toArray())
  }

  /**
   * Observable of Settings table sorted by KEY.
   */
  liveSettings() {
    return liveQuery(() => this.Settings.toCollection().sortBy(SettingField.KEY))
  }

  /**
   * Observable of Records table with newest records first.
   */
  liveRecords() {
    return liveQuery(() => this.Records.toCollection().sortBy(Field.TIMESTAMP))
  }

  /**
   * Observable of Records table with enabled Parent Types sorted by name for the Dasboard.
   */
  liveDashboard() {
    return liveQuery(() =>
      this.Records.where({ relation: Relation.PARENT })
        .filter((r) => r.enabled === true)
        .sortBy(Field.NAME)
    )
  }

  /**
   * Observable for Data View with any table with Type and Relation to control results.
   * @param relation
   * @param type
   */
  liveData(relation: Relation, type: Type) {
    if (type === Type.LOG) {
      return this.liveLogs()
    } else if (type === Type.SETTING) {
      return this.liveSettings()
    } else {
      return liveQuery(() =>
        this.Records.where({ relation })
          .filter((r) => r.type === type)
          .sortBy(Field.TIMESTAMP)
      )
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     CREATE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Add new Record to the database.
   * @param record
   */
  async add(record: Record) {
    return await this.Records.add(record)
  }

  /**
   * - Look at Record `type` to determine valid fields
   * - Record must have required fields that pass minimum validity rules (Regex?)
   * - Record must NOT already exist in the Database
   * - Auto remediate small issues like undefined notes and descriptions
   * @param record
   */
  // async addRecord(record: Record) {
  //   const addCommand: Readonly<{
  //     [key in Type]: () => any
  //   }> = {
  //     [Type.LOG]: () => {
  //       throw new Error(`Invalid Record type: ${record.type}`)
  //     },
  //     [Type.SETTING]: () => {
  //       throw new Error(`Invalid Record type: ${record.type}`)
  //     },
  //     [Type.EXAMPLE]: () =>
  //       this.Records.toCollection()
  //         .filter((r) => r.type === Type.EXAMPLE)
  //         .delete(),
  //     [Type.TEST]: () =>
  //       this.Records.toCollection()
  //         .filter((r) => r.type === Type.TEST)
  //         .delete(),
  //   }

  //   return await this.Records.add(record)
  // }

  /**
   * Bulk add records to the database. The new record ids will be returned in an array.
   * @param records
   */
  async blukAdd(records: Record[]) {
    return await this.Records.bulkAdd(records, { allKeys: true }) // allKeys returns the new record ids
  }

  /**
   * Add new Log with the provided severity, label, and optional details.
   * @param severity
   * @param label
   * @param details
   */
  async addLog(severity: Severity, label: Label, details?: Details) {
    // AutoId is handled by Dexie
    const log: Log = {
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
        // Should be safe to stringify most other objects into the details property
        log.details = JSON.stringify(details)
      }
    }

    return await this.Logs.add(log)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     READ                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Get exact Log by its autoId.
   * @param autoId
   */
  async getLog(autoId: AutoId) {
    return await this.Logs.get(autoId)
  }

  /**
   * Get exact Setting by its key.
   * @param key
   */
  async getSetting(key: Key) {
    return await this.Settings.get(key)
  }

  /**
   * Get all Records.
   */
  async getAllRecords() {
    return await this.Records.toArray()
  }

  /**
   * Get exact Record by id and timestamp.
   * @param id
   * @param timestamp
   */
  async getRecord(id: Id, timestamp: Timestamp) {
    return await this.Records.get([id, timestamp])
  }

  /**
   * Get the parent record by id only.
   * @param id
   */
  async getParent(id: Id) {
    return (await this.Records.where({ id }).toArray()).find((r) => r.relation === Relation.PARENT)
  }

  /**
   * Get all Child Records for an id.
   * @param id
   */
  async getChildren(id: Id) {
    return (await this.Records.where({ id }).toArray()).filter((r) => r.relation === Relation.CHILD)
  }

  /**
   * Get previous child Record by Type.
   * @param id
   */
  async getPreviousChild(id: Id) {
    return (await this.Records.where({ id }).toArray())
      .filter((r) => r.relation === Relation.CHILD)
      .reverse()[0]
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     UPDATE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Update exact Record by id and timestamp with the properties you want to change.
   * @param id
   * @param timestamp
   * @param changes
   */
  async update(id: Id, timestamp: Timestamp, changes: Partial<Record>) {
    return await this.Records.update([id, timestamp], changes)
  }

  /**
   * Set Setting to a specific value (creates or updates).
   * @param key
   * @param value
   */
  async setSetting(key: Key, value: Value) {
    // Set Quasar dark mode if the key is for dark mode
    if (key === Key.DARK_MODE) {
      Dark.set(!!value) // Cast to boolean just in case
    }

    const setting: Setting = { key, value }

    if (!(await this.Settings.get(setting.key))) {
      // Add Setting if it doesn't exist
      return await this.Settings.add(setting)
    } else {
      // Update Setting if it does exist
      return await this.Settings.update(setting.key, { value: setting.value })
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     DELETE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Deletes all logs that are older than the log retention time Setting.
   * Should run once every time the app starts.
   */
  async deleteExpiredLogs() {
    const logRetentionTime = (await this.Settings.get(Key.LOG_RETENTION_TIME))
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

    const logs = await this.Logs.toArray()

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = log.timestamp ?? 0
        const logAgeMilliseconds = Date.now() - logTimestamp
        return logAgeMilliseconds > lookupMilliseconds[logRetentionTime]
      })
      .map((log: Log) => [log.autoId, log.timestamp] as [AutoId, Timestamp]) // Map remaining Log keys for removal

    await this.Records.bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  /**
   * Delete exact Record by id and timestamp.
   * @param id
   * @param timestamp
   */
  async deleteRecord(id: Id, timestamp: Timestamp) {
    return await this.Records.delete([id, timestamp])
  }

  /**
   * Delete all data of a specific Type.
   * @param type
   */
  async clearByType(type: Type) {
    const clearCommand: Readonly<{
      [key in Type]: () => PromiseExtended<void | number>
    }> = {
      [Type.LOG]: () => this.Logs.clear(),
      [Type.SETTING]: () => this.Settings.clear(),
      [Type.EXAMPLE]: () =>
        this.Records.toCollection()
          .filter((r) => r.type === Type.EXAMPLE)
          .delete(),
      [Type.TEST]: () =>
        this.Records.toCollection()
          .filter((r) => r.type === Type.TEST)
          .delete(),
    }

    // Run the clear command for the given type
    return await clearCommand[type]()
  }

  /**
   * Deletes all data from the database.
   */
  async clearAllData() {
    return Promise.all([this.Logs.clear(), this.Settings.clear(), this.Records.clear()])
  }

  /**
   * Delete the entire database. Require an app reload to reinitialize the database.
   */
  async deleteDatabase() {
    return await this.delete()
  }
}

/**
 * Preconfigured LocalDatabase instance.
 */
const DB = new LocalDatabase(AppName)

export default DB
