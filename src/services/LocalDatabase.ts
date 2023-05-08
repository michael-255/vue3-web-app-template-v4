import Dexie, { liveQuery, type Table } from 'dexie'
import type { Log, Record, Setting } from '@/types/models'
import { Milliseconds, AppName, type DashboardCard } from '@/types/misc'
import { Dark, uid } from 'quasar'
import {
  Severity,
  Type,
  Field,
  LogRetention,
  Group,
  Key,
  UniqueIdIndex,
  GroupIdIndex,
  GroupIndex,
  TypeIndex,
  SettingField,
} from '@/types/database'
import { appSchema } from './AppSchema'

/**
 * A Dexie wrapper class that acts as a local database.
 */
export class LocalDatabase extends Dexie {
  Settings!: Table<Setting>
  Records!: Table<Partial<Record>>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      Settings: SettingField.KEY,
      Records: `${UniqueIdIndex}, ${GroupIdIndex}, ${TypeIndex}, ${GroupIndex}`,
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
      [key in Key]: any
    }> = {
      [Key.SHOW_WELCOME]: true,
      [Key.SHOW_DESCRIPTIONS]: true,
      [Key.DARK_MODE]: true,
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
   * Observable of Settings table.
   */
  liveSettings() {
    return liveQuery(() => this.Settings.toArray())
  }

  /**
   * Observable of dashboard cards for the Dashboard page.
   */
  liveDashboard() {
    return liveQuery(async () => {
      // Initial Records query for parent and enabled records sorted by name
      const records = await this.Records.where(Field.GROUP)
        .equals(Group.PARENT)
        .filter((r) => r.enabled === true)
        .sortBy(Field.NAME)

      const favorites: DashboardCard[] = []
      const nonFavorites: DashboardCard[] = []

      // Build Dashboard Cards from Records and the previous child record
      for await (const r of records) {
        const previous = await this.getPreviousChild(r.groupId as string)

        const dashboardCard: DashboardCard = {
          labelPlural: appSchema.find((i) => i.type === r.type && i.group === Group.PARENT)
            ?.labelPlural,
          uid: r.uid as string,
          groupId: r.groupId as string,
          type: r.type as Type,
          group: r.group as Group,
          timestamp: r.timestamp as number,
          name: r.name as string,
          desc: r.desc as string,
          favorited: r.favorited as boolean,
          previousNote: previous ? previous.note : undefined,
          previousTimestamp: previous ? previous.timestamp : undefined,
        }

        // Add to favorites or non-favorites
        if (r.favorited === true) {
          favorites.push(dashboardCard)
        } else {
          nonFavorites.push(dashboardCard)
        }
      }

      // Return with favorites prioritized
      return [...favorites, ...nonFavorites]
    })
  }

  /**
   * Observable for Data Table View with any table with Type and Group to control results.
   * @param type
   * @param group
   */
  liveDataTable(type: Type, group: Group) {
    return liveQuery(async () => {
      // Records sorted by timestamp
      return await this.Records.where(Field.TYPE)
        .equals(type)
        .filter((r) => r.group === group)
        .sortBy(Field.TIMESTAMP)
    })
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
   * Bulk add records to the database. The new record ids will be returned in an array.
   * @param records
   */
  async bulkAdd(records: Record[]) {
    return await this.Records.bulkAdd(records, { allKeys: true }) // allKeys returns the new record ids
  }

  /**
   * Add new Log with the provided severity, label, and optional details.
   * @param severity
   * @param label
   * @param details
   */
  async addLog(severity: Severity, label: string, details?: any) {
    const log: Log = {
      uid: uid(),
      groupId: uid(),
      type: Type.LOG,
      group: Group.INTERNAL,
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

    return await this.Records.add(log)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     READ                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Get exact Setting by its key.
   * @param key
   */
  async getSetting(key: Key) {
    return await this.Settings.get(key)
  }

  /**
   * Get all logs from database without sorting.
   */
  async getAllLogs() {
    return await this.Records.where(Field.TYPE).equals(Type.LOG).toArray()
  }

  /**
   * Get all settings from database without sorting.
   */
  async getAllSettings() {
    return await this.Settings.toArray()
  }

  /**
   * Get all records from database without sorting.
   */
  async getAllRecords() {
    return await this.Records.toArray()
  }

  /**
   * Get exact record by UID.
   * @param uid
   */
  async getRecord(uid: string) {
    return await this.Records.get(uid)
  }

  /**
   * Get all parent records by type.
   */
  async getAllParentTypes(type: Type) {
    return (await this.Records.where(Field.GROUP).equals(Group.PARENT).toArray()).filter(
      (r) => r.type === type
    )
  }

  /**
   * Get the parent record by group id.
   * @param groupId
   */
  async getParent(groupId: string) {
    return (await this.Records.where(Field.GROUP_ID).equals(groupId).toArray()).find(
      (r) => r.group === Group.PARENT
    )
  }

  /**
   * Get all child records by group id.
   * @param groupId
   */
  async getChildren(groupId: string) {
    return (await this.Records.where(Field.GROUP_ID).equals(groupId).toArray()).filter(
      (r) => r.group === Group.CHILD
    )
  }

  /**
   * Get previous child record by group id.
   * @param groupId
   */
  async getPreviousChild(groupId: string) {
    return (await this.Records.where(Field.GROUP_ID).equals(groupId).toArray())
      .filter((r) => r.group === Group.CHILD)
      .reverse()[0]
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     UPDATE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Update exact Record by UID with the properties you want to change.
   * @param uid
   * @param changes
   */
  async update(uid: string, changes: Partial<Record>) {
    return await this.Records.update(uid, changes)
  }

  /**
   * Set Setting to a specific value (creates or updates).
   * @param key
   * @param value
   */
  async setSetting(key: Key, value: any) {
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
   * - Should run once every time the app starts
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

    const logs = (await this.getAllLogs()) as Log[]

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = log.timestamp ?? 0
        const logAgeMilliseconds = Date.now() - logTimestamp
        return logAgeMilliseconds > lookupMilliseconds[logRetentionTime]
      })
      .map((log: Log) => log.uid) // Map remaining Log keys for removal

    await this.Records.bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  /**
   * Delete parent and children or exact Record by UID.
   * @param uid
   */
  async deleteRecord(uid: string) {
    const record = (await this.Records.get(uid)) as Record

    if (record) {
      if (record.group === Group.PARENT) {
        // Delete parent and child records
        return await this.Records.where(Field.GROUP_ID).equals(record.groupId).delete()
      } else {
        // Delete single record
        return await this.Records.delete(uid)
      }
    } else {
      new Error(`Record with UID ${uid} does not exist`)
    }
  }

  /**
   * Deletes and resets all settings.
   */
  async resetSettings() {
    await this.Settings.clear()
    await this.initSettings()
  }

  /**
   * Delete all data of a specific type.
   * @param type
   */
  async clearByType(type: Type) {
    return await this.Records.where(Field.TYPE).equals(type).delete()
  }

  /**
   * Deletes all data from the database.
   */
  async clearAllData() {
    return Promise.all([this.Settings.clear(), this.Records.clear()])
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
