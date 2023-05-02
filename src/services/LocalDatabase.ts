import Dexie, { liveQuery, type Table } from 'dexie'
import type { DatabaseRecord, Log, Setting } from '@/types/models'
import { LogRetention, Milliseconds, AppName } from '@/types/misc'
import { Dark, uid } from 'quasar'
import {
  DatabaseVersion,
  DatabaseField,
  DatabaseType,
  SettingId,
  Severity,
  type DatabaseParentType,
  type DatabaseChildType,
  type SettingValue,
} from '@/types/database'
import {
  getChildCategoryTypes,
  getParentCategoryTypes,
  getUserCategoryTypes,
} from '@/services/Blueprints'
import { SettingDefault } from '@/services/Defaults'

/**
 * A Dexie wrapper class that acts as a local database.
 */
export class LocalDatabase extends Dexie {
  Records!: Table<DatabaseRecord>

  constructor(name: string) {
    super(`${name} v${DatabaseVersion}`)

    this.version(1).stores({
      Records: `&[${DatabaseField.TYPE}+${DatabaseField.ID}], [${DatabaseField.TYPE}+${DatabaseField.PARENT_ID}]`,
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // MISCELLANEOUS                                                           //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes all settings with existing or default values.
   */
  async initSettings() {
    // Defaults are set after the nullish coalescing operator, which means no setting data was found
    const showIntroduction =
      (await this.getRecord(DatabaseType.SETTING, SettingId.SHOW_INTRODUCTION))?.[
        DatabaseField.VALUE
      ] ?? SettingDefault[SettingId.SHOW_INTRODUCTION]
    const showDashboardDescriptions =
      (await this.getRecord(DatabaseType.SETTING, SettingId.SHOW_DASHBOARD_DESCRIPTIONS))?.[
        DatabaseField.VALUE
      ] ?? SettingDefault[SettingId.SHOW_DASHBOARD_DESCRIPTIONS]
    const darkMode =
      (await this.getRecord(DatabaseType.SETTING, SettingId.DARK_MODE))?.[DatabaseField.VALUE] ??
      SettingDefault[SettingId.DARK_MODE]
    const showAllDataColumns =
      (await this.getRecord(DatabaseType.SETTING, SettingId.SHOW_ALL_DATA_COLUMNS))?.[
        DatabaseField.VALUE
      ] ?? SettingDefault[SettingId.SHOW_ALL_DATA_COLUMNS]
    const showConsoleLogs =
      (await this.getRecord(DatabaseType.SETTING, SettingId.SHOW_CONSOLE_LOGS))?.[
        DatabaseField.VALUE
      ] ?? SettingDefault[SettingId.SHOW_CONSOLE_LOGS]
    const showInfoMessages =
      (await this.getRecord(DatabaseType.SETTING, SettingId.SHOW_INFO_MESSAGES))?.[
        DatabaseField.VALUE
      ] ?? SettingDefault[SettingId.SHOW_INFO_MESSAGES]
    const logRetentionTime =
      (await this.getRecord(DatabaseType.SETTING, SettingId.LOG_RETENTION_TIME))?.[
        DatabaseField.VALUE
      ] ?? SettingDefault[SettingId.LOG_RETENTION_TIME]

    // Set Quasar dark mode
    Dark.set(!!darkMode) // Cast to boolean

    // Set all settings before continuing
    await Promise.all([
      this.setSetting(SettingId.SHOW_INTRODUCTION, showIntroduction),
      this.setSetting(SettingId.SHOW_DASHBOARD_DESCRIPTIONS, showDashboardDescriptions),
      this.setSetting(SettingId.DARK_MODE, darkMode),
      this.setSetting(SettingId.SHOW_ALL_DATA_COLUMNS, showAllDataColumns),
      this.setSetting(SettingId.SHOW_CONSOLE_LOGS, showConsoleLogs),
      this.setSetting(SettingId.SHOW_INFO_MESSAGES, showInfoMessages),
      this.setSetting(SettingId.LOG_RETENTION_TIME, logRetentionTime),
    ])
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // LIVE QUERIES                                                            //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Observable of the Settings database type.
   */
  liveSettings() {
    return liveQuery(() =>
      this.Records.where(DatabaseField.TYPE).equals(DatabaseType.SETTING).sortBy(DatabaseField.ID)
    )
  }

  /**
   * Observable of the Settings, Examples, and Tests database types sorted by name (when present).
   */
  liveDashboard() {
    return liveQuery(() =>
      this.Records.where(DatabaseField.TYPE)
        .anyOf(DatabaseType.SETTING, DatabaseType.EXAMPLE, DatabaseType.TEST)
        .sortBy(DatabaseField.NAME)
    )
  }

  /**
   * Observable of the provided database type with preferred sorting.
   * @param type
   */
  liveDataType(type: DatabaseType) {
    if (getParentCategoryTypes().includes(type as DatabaseParentType)) {
      // Parent types are sorted by name
      return liveQuery(() =>
        this.Records.where(DatabaseField.TYPE).equals(type).sortBy(DatabaseField.NAME)
      )
    } else if (
      getChildCategoryTypes().includes(type as DatabaseChildType) ||
      type === DatabaseType.LOG
    ) {
      // Child types and Logs are sorted by created timestamp in reverse order (desc).
      return liveQuery(() =>
        this.Records.where(DatabaseField.TYPE)
          .equals(type)
          .reverse()
          .sortBy(DatabaseField.CREATED_TIMESTAMP)
      )
    } else if (type === DatabaseType.SETTING) {
      // Settings are sorted by id
      return liveQuery(() =>
        this.Records.where(DatabaseField.TYPE).equals(type).sortBy(DatabaseField.ID)
      )
    } else {
      // Everything else is not sorted
      return liveQuery(() => this.Records.where(DatabaseField.TYPE).equals(type).toArray())
    }
  }

  /**
   * Observable of the Parent and Child category database types.
   */
  liveRecordCuring() {
    return liveQuery(() =>
      this.Records.where(DatabaseField.TYPE).anyOf(getUserCategoryTypes()).toArray()
    )
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // CREATE                                                                  //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Create a new log record with the provided severity, label, and details.
   * @param severity
   * @param label
   * @param details
   */
  async addLog(severity: Severity, label: string, details?: any) {
    const log = {
      [DatabaseField.TYPE]: DatabaseType.LOG,
      [DatabaseField.ID]: uid(),
      [DatabaseField.CREATED_TIMESTAMP]: new Date().getTime(),
      [DatabaseField.SEVERITY]: severity,
      [DatabaseField.LABEL]: label,
      // Remaining properties are determined by details
    } as Log

    // It's an error type if it has a message or stack
    // This separation is required to prevent circular errors
    if (
      typeof details === 'object' &&
      details !== null &&
      ('message' in details || 'stack' in details)
    ) {
      log[DatabaseField.MESSAGE] = details.message
      log[DatabaseField.STACK] = details.stack
    } else {
      log[DatabaseField.DETAILS] = JSON.stringify(details)
    }

    return await this.Records.add(log as DatabaseRecord)
  }

  /**
   * Create a new record.
   * @param record
   */
  async addRecord(record: DatabaseRecord) {
    return await this.Records.add(record)
  }

  /**
   * Bulk add records to the database. The new record ids will be returned.
   * @param records
   */
  async bulkAddRecords(records: DatabaseRecord[]) {
    return await this.Records.bulkAdd(records, { allKeys: true }) // allKeys returns the new record ids
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // READ                                                                    //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Gets ALL records from the database.
   */
  async getAllRecords() {
    return await this.Records.toArray()
  }

  /**
   * Get specific record by database type and id.
   * @param type
   * @param id
   */
  async getRecord(type: DatabaseType, id: string | SettingId) {
    return await this.Records.get([type, id])
  }

  /**
   * Get all records by database type.
   * @param type
   */
  async getRecordsByType(type: DatabaseType) {
    return await this.Records.where(DatabaseField.TYPE).equals(type).toArray()
  }

  /**
   * Get all enabled records by database parent type.
   * @param parentType
   */
  async getEnabledParentRecords(parentType: DatabaseParentType) {
    return await this.Records.where(DatabaseField.TYPE)
      .equals(parentType)
      .filter((r) => r[DatabaseField.IS_ENABLED] === true)
      .sortBy(DatabaseField.NAME)
  }

  /**
   * Gets the most recent child record by database child type and parent id.
   * @param childType
   * @param parentId
   */
  async getPreviousChildRecord(childType: DatabaseChildType, parentId: string) {
    return (
      await this.Records.where({
        [DatabaseField.TYPE]: childType,
        [DatabaseField.PARENT_ID]: parentId,
      }).sortBy(DatabaseField.CREATED_TIMESTAMP)
    ).reverse()[0]
  }

  /**
   * Gets all child records by database child type and parent id.
   * @param childType
   * @param parentId
   */
  async getChildRecordsByParentId(childType: DatabaseChildType, parentId: string) {
    return await this.Records.where({
      [DatabaseField.TYPE]: childType,
      [DatabaseField.PARENT_ID]: parentId,
    }).sortBy(DatabaseField.CREATED_TIMESTAMP)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // UPDATE                                                                  //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Updates a setting record by id and value or creates a new one if it doesn't exist.
   * @param id
   * @param value
   */
  async setSetting(id: SettingId, value: SettingValue) {
    const existingSetting = await this.getRecord(DatabaseType.SETTING, id)

    // Set Quasar dark mode if the key is for dark mode
    if (id === SettingId.DARK_MODE) {
      Dark.set(!!value) // Cast to boolean just in case
    }

    const setting: Setting = {
      [DatabaseField.TYPE]: DatabaseType.SETTING,
      [DatabaseField.ID]: id,
      [DatabaseField.VALUE]: value,
    }

    // Add or Update depending on if the Setting already exists
    if (!existingSetting) {
      return await this.Records.add(setting as DatabaseRecord)
    } else {
      return await this.Records.update([DatabaseType.SETTING, id], { value })
    }
  }

  /**
   * Updates a record by providing the database type, original id, and any properties you want to change.
   * @param type
   * @param originalId
   * @param updateProps
   */
  async updateRecord(
    type: DatabaseType,
    originalId: string | SettingId,
    updateProps: Partial<DatabaseRecord>
  ) {
    return await this.Records.update([type, originalId], updateProps)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // DELETE                                                                  //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Deletes all logs that are older than the log retention time setting.
   */
  async purgeExpiredLogs() {
    const logRetentionTime = (
      await this.getRecord(DatabaseType.SETTING, SettingId.LOG_RETENTION_TIME)
    )?.value

    if (!logRetentionTime || logRetentionTime === LogRetention.FOREVER) {
      return 0 // No logs purged
    }

    const getLogRetentionMilliseconds = (logRetention: LogRetention): number => {
      return {
        [LogRetention.ONE_WEEK]: Milliseconds.PER_WEEK,
        [LogRetention.ONE_MONTH]: Milliseconds.PER_MONTH,
        [LogRetention.THREE_MONTHS]: Milliseconds.PER_THREE_MONTHS,
        [LogRetention.SIX_MONTHS]: Milliseconds.PER_SIX_MONTHS,
        [LogRetention.ONE_YEAR]: Milliseconds.PER_YEAR,
        [LogRetention.FOREVER]: Milliseconds.FOREVER, // This should never happen
      }[logRetention]
    }

    const logRetentionMilliseconds = getLogRetentionMilliseconds(logRetentionTime as LogRetention)

    // Get all logs
    const logs = (await this.Records.where(DatabaseField.TYPE)
      .equals(DatabaseType.LOG)
      .toArray()) as Log[]

    const logsToDelete = logs.filter((log: Log) => {
      const logCreatedTimestamp = log[DatabaseField.CREATED_TIMESTAMP] ?? 0
      const logAgeMilliseconds = new Date().getTime() - logCreatedTimestamp
      return logAgeMilliseconds > logRetentionMilliseconds
    })

    // Delete all logs that are older than the retention time
    await this.Records.bulkDelete(logsToDelete.map((log: Log) => log[DatabaseField.ID]))

    // Return the number of logs deleted
    return logsToDelete.length
  }

  /**
   * Delete specific record by database type and id.
   * @param type
   * @param id
   */
  async deleteRecord(type: DatabaseType, id: string | SettingId) {
    return await this.Records.delete([type, id])
  }

  /**
   * Delete all records by database type.
   * @param type
   */
  async clearRecordsByType(type: DatabaseType) {
    await this.Records.where(DatabaseField.TYPE).equals(type).delete()
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
