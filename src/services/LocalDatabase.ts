import Dexie, { liveQuery, type Table } from 'dexie'
import type { Log, Record, Setting } from '@/types/models'
import { Milliseconds, AppName } from '@/types/misc'
import { Dark, uid } from 'quasar'
import {
  SettingId,
  Severity,
  Version,
  RecordsIndices,
  Type,
  Delimiter,
  Field,
  type PK,
  type SK,
  type Id,
  type Label,
  type Details,
  type Value,
  LogRetention,
  Category,
} from '@/types/database'

/**
 * A Dexie wrapper class that acts as a local database.
 */
export class LocalDatabase extends Dexie {
  Records!: Table<Record>

  constructor(name: string) {
    super(`${name} v${Version}`)

    this.version(1).stores({
      Records: RecordsIndices,
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     MISCELLANEOUS                                                       //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Combine a type and id into a primary key separated by a delimiter.
   * @param type
   * @param id
   */
  createPK(type: Type, id: Id): PK {
    return `${type}${Delimiter}${id}`
  }

  /**
   * Determines if the SK is of the 'parent' category.
   * @param sk
   */
  isParent(sk: SK) {
    return sk === Category.PARENT
  }

  /**
   * Determines if the SK is a timestamp (child) category.
   * @param sk
   */
  isTimestamp(sk: SK) {
    return typeof sk === 'number'
  }

  /**
   * Initializes all settings with existing or default values.
   */
  async initSettings() {
    const lookupDefault: Readonly<{
      [key in SettingId]: Value
    }> = {
      [SettingId.SHOW_INTRODUCTION]: true,
      [SettingId.SHOW_DASHBOARD_DESCRIPTIONS]: true,
      [SettingId.DARK_MODE]: true,
      [SettingId.SHOW_ALL_DATA_COLUMNS]: false,
      [SettingId.SHOW_CONSOLE_LOGS]: false,
      [SettingId.SHOW_INFO_MESSAGES]: true,
      [SettingId.LOG_RETENTION_TIME]: LogRetention.THREE_MONTHS,
    }

    const settingIds = Object.values(SettingId)

    const settings = await Promise.all(
      settingIds.map(async (settingId) => {
        const setting = await this.getByPKSK(Type.SETTING, settingId)
        const value = setting?.value ?? lookupDefault[settingId]

        return {
          settingId,
          value,
        }
      })
    )

    // Set Quasar dark mode
    const darkMode = settings.find((s) => s.settingId === SettingId.DARK_MODE)?.value
    Dark.set(!!darkMode) // Cast to boolean

    // Set all Settings in the database
    await Promise.all(settings.map((s) => this.setSetting(s.settingId, s.value)))
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     LIVE QUERIES                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Observable of the Settings database type.
   */
  liveSettings() {
    return liveQuery(() => this.Records.where(Field.PK).equals(Type.SETTING).sortBy(Field.SK))
  }

  /**
   * Observable of the Settings, Examples, and Tests database types sorted by name.
   */
  liveDashboard() {
    return liveQuery(() =>
      this.Records.where(Field.PK)
        .startsWithAnyOf(Type.SETTING, Type.EXAMPLE, Type.TEST)
        .sortBy(Field.NAME)
    )
  }

  /**
   * Observable of the provided database type with preferred sorting.
   * @param type
   * @param category
   */
  liveDataType(type: Type, category: Category) {
    // Setting and Log queries have no parent or child SK categories
    if (type === Type.SETTING) {
      // Settings must match exactly on the PK and use SettingId as the SK
      return liveQuery(() => this.Records.where(Field.PK).equals(Type.SETTING).sortBy(Field.SK))
    } else if (type === Type.LOG) {
      // Logs must start with 'log' as the PK (they also have a uid after) and use a timestamp as the SK
      return liveQuery(() =>
        this.Records.where(Field.PK).startsWithIgnoreCase(Type.LOG).reverse().sortBy(Field.SK)
      )
    }

    // Queries that must seperate parent and child SK categories (parent and timestamp)
    const userDataQueries = {
      [Type.EXAMPLE]: {
        [Category.PARENT]: () =>
          this.Records.where(Field.PK)
            .startsWithIgnoreCase(Type.EXAMPLE)
            .filter((r) => this.isParent(r.sk))
            .sortBy(Field.NAME),
        [Category.CHILD]: () =>
          this.Records.where(Field.PK)
            .startsWithIgnoreCase(Type.EXAMPLE)
            .filter((r) => this.isTimestamp(r.sk))
            .reverse()
            .sortBy(Field.SK),
      },
      [Type.TEST]: {
        [Category.PARENT]: () =>
          this.Records.where(Field.PK)
            .startsWithIgnoreCase(Type.TEST)
            .filter((r) => this.isParent(r.sk))
            .sortBy(Field.NAME),
        [Category.CHILD]: () =>
          this.Records.where(Field.PK)
            .startsWithIgnoreCase(Type.TEST)
            .filter((r) => this.isTimestamp(r.sk))
            .reverse()
            .sortBy(Field.SK),
      },
    }

    const query = userDataQueries[type][category]

    if (query) {
      return liveQuery(query)
    }
  }

  /**
   * Observable of all Parent and Child records that the user interacts with sorted by SK.
   * These are the Records that are displayed in the Curing page if there is an issue.
   */
  liveRecordCuring() {
    return liveQuery(() =>
      this.Records.where(Field.PK).startsWithAnyOf(Type.EXAMPLE, Type.TEST).sortBy(Field.SK)
    )
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
  async blukAdd(records: Record[]) {
    return await this.Records.bulkAdd(records, { allKeys: true }) // allKeys returns the new record ids
  }

  /**
   * Add new Log record with the provided severity, label, and optional details.
   * @param severity
   * @param label
   * @param details
   */
  async addLog(severity: Severity, label: Label, details?: Details) {
    const log: Log = {
      pk: this.createPK(Type.LOG, uid()),
      sk: Date.now(),
      severity,
      label,
      // Remaining properties are determined by details
    }

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
   * Get exact Record by its primary key and secondary key.
   * @param pk
   * @param sk
   */
  async getByPKSK(pk: PK, sk: SK) {
    return await this.Records.get([pk, sk])
  }

  /**
   * Get all Records.
   */
  async getAll() {
    return await this.Records.toArray()
  }

  /**
   * Get all Records with a matching primary key.
   * @param pk
   */
  async getAllByPK(pk: PK) {
    return await this.Records.where(Field.PK).equals(pk).toArray()
  }

  /**
   * Get all Records with a matching secondary key.
   * @param sk
   */
  async getAllBySK(sk: SK) {
    return await this.Records.where(Field.SK).equals(sk).toArray()
  }

  /**
   * Get all Records with a matching Type prefix on the primary key.
   * @param type
   */
  async getAllByType(type: Type) {
    return await this.Records.where(Field.PK).startsWithIgnoreCase(type).toArray()
  }

  /**
   * Get all enabled parent Records with a matching Type prefix on the primary key.
   * @param type
   */
  async getEnabledParentsByType(type: Type) {
    return await this.Records.where(Field.PK)
      .startsWithIgnoreCase(type)
      .filter((r) => this.isParent(r.sk) && r.enabled === true)
      .toArray()
  }

  /**
   * Get previous child Record by primary key.
   * @param pk
   */
  async getPreviousChildByPk(pk: PK) {
    return (await this.Records.where(Field.PK).equals(pk).sortBy(Field.SK))
      .filter((r) => this.isTimestamp(r.sk))
      .reverse()[0]
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     UPDATE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Update Record by its primary key and secondary key with the properties you want to change.
   * @param pk
   * @param sk
   * @param changes
   */
  async update(pk: PK, sk: SK, changes: Partial<Record>) {
    return await this.Records.update([pk, sk], changes)
  }

  /**
   * Set Setting to a specific value (creates or updates).
   * @param settingId - Setting Secondary Key (SK)
   * @param value
   */
  async setSetting(settingId: SettingId, value: Value) {
    // Set Quasar dark mode if the key is for dark mode
    if (settingId === SettingId.DARK_MODE) {
      Dark.set(!!value) // Cast to boolean just in case
    }

    const setting: Setting = {
      pk: Type.SETTING,
      sk: settingId,
      value,
    }

    if (!(await this.getByPKSK(setting.pk, setting.sk))) {
      // Add Setting if it doesn't exist
      return await this.Records.add(setting)
    } else {
      // Update Setting if it does exist
      return await this.Records.update([setting.pk, setting.sk], { value: setting.value })
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
    const logRetentionTime = (await this.getByPKSK(Type.SETTING, SettingId.LOG_RETENTION_TIME))
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

    const logs = (await this.getAllByType(Type.LOG)) as Log[]

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = (log.sk as number) ?? 0 // Log SK should be a timestamp
        const logAgeMilliseconds = Date.now() - logTimestamp
        return logAgeMilliseconds > lookupMilliseconds[logRetentionTime]
      })
      .map((log: Log) => [log.pk, log.sk] as [PK, SK]) // Map remaining Log keys for removal

    await this.Records.bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  /**
   * Delete specific record by primary key and secondary key.
   * @param pk
   * @param sk
   */
  async deleteRecord(pk: PK, sk: SK) {
    return await this.Records.delete([pk, sk])
  }

  /**
   * Delete all Records of a specific Type.
   * @param type
   */
  async clearByType(type: Type) {
    await this.Records.where(Field.PK).startsWithIgnoreCase(type).delete()
  }

  /**
   * Delete the entire database. This will require an app reload.
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
