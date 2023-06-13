import Dexie, { liveQuery } from 'dexie'
import type { Log, Record, Setting } from '@/types/database'
import { Milliseconds, AppName, type DashboardListCardProps, LogRetention } from '@/types/general'
import { typeValidator, idValidator } from '@/services/validators'
import { Dark } from 'quasar'
import { Severity, Type, Field, Key } from '@/types/database'
import DataSchema from '@/services/DataSchema'

/**
 * Dexie wrapper that acts as a local database.
 */
class Database extends Dexie {
  constructor(name: string) {
    super(name)

    this.version(1).stores(
      Object.values(Type).reduce((acc, type) => {
        acc[type] = DataSchema.getDatabaseIndices(type)
        return acc
      }, {} as { [key in Type]: string })
    )
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     MISCELLANEOUS                                                       //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async initSettings() {
    const defaultSettings: Readonly<{
      [key in Key]: any
    }> = {
      // Can't use undefined or null as default values for settings
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
        value: (await this.table(Type.SETTING).get(key))?.value ?? defaultSettings[key],
      }))
    )

    Dark.set(!!settings.find((s) => s.key === Key.DARK_MODE)?.value)

    // Set all Settings in the database
    await Promise.all(settings.map((s) => this.setSetting(s.key, s.value)))
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     LIVE QUERIES                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  liveSettings() {
    return liveQuery(() => this.table(Type.SETTING).toArray())
  }

  liveLogs() {
    return liveQuery(() => this.table(Type.LOG).orderBy(Field.AUTO_ID).reverse().toArray())
  }

  /**
   * Observable of parent records. Used by the dashboard page to display parent list cards.
   */
  liveDashboard() {
    return liveQuery(async () => {
      const records = await Promise.all([
        await this.getDashboardParents(Type.EXAMPLE_PARENT),
        await this.getDashboardParents(Type.TEST_PARENT),
      ])

      const dashboardCards: { [key in Type]: DashboardListCardProps[] } = Object.values(
        Type
      ).reduce((acc, type) => {
        acc[type] = []
        return acc
      }, {} as { [key in Type]: DashboardListCardProps[] })

      dashboardCards[Type.EXAMPLE_PARENT] = records[0]
      dashboardCards[Type.TEST_PARENT] = records[1]

      return dashboardCards
    })
  }

  /**
   * Observable for data table with type defining the records to return.
   * @param type
   */
  liveDataTable(type: Type) {
    return liveQuery(async () => {
      return (await this.table(type).toCollection().sortBy(Field.TIMESTAMP)).reverse()
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     CREATE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Add new record to the database.
   * @param type
   * @param record
   */
  async addRecord(type: Type, record: Record) {
    if (!(await typeValidator.isValid(type))) {
      throw new Error(`Add record type ${type} is invalid`)
    }

    // Find record specific validator
    const recordValidator = DataSchema.getValidator(type)

    if (!recordValidator) {
      throw new Error('Add record validator not found')
    }
    if (!(await recordValidator.isValid(record))) {
      throw new Error(`Add record attempted to add invalid record: ${JSON.stringify(record)}`)
    }

    // Validate cleans record of unknown properties
    return await this.table(type).add(await recordValidator.validate(record))
  }

  /**
   * Import records into the database.
   * @param type
   * @param records
   */
  async importRecords(type: Type, records: Record[]) {
    if (!(await typeValidator.isValid(type))) {
      throw new Error(`Import records type ${type} is invalid`)
    }

    // Find record specific validator
    const recordValidator = DataSchema.getValidator(type)
    if (!recordValidator) {
      throw new Error('Import records validator not found')
    }

    const validRecords: Record[] = []
    const skippedRecords: Record[] = []

    for await (const r of records) {
      if (await recordValidator.isValid(r)) {
        // Valid records get cleaned and pushed to valid records
        validRecords.push(await recordValidator.validate(r))
      } else {
        skippedRecords.push(r)
      }
    }

    // Only importing the valid records
    await this.table(type).bulkAdd(validRecords)

    if (skippedRecords.length > 0) {
      // Error for the frontend to report if any records were skipped
      throw new Error(
        `Records skipped due to validation failures (${
          skippedRecords.length
        }): ${skippedRecords.map((r) => String(r.id))}`
      )
    }
  }

  /**
   * Add new Log with the provided severity, label, and optional details.
   * @param severity
   * @param label
   * @param details
   */
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

    return await this.addRecord(Type.LOG, log)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     READ                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Get exact record for type by id.
   * @param id
   * @param type
   */
  async getRecord(type: Type, id: string): Promise<Record | undefined> {
    if (type === Type.LOG) {
      return await this.table(type).get(Number(id))
    }
    return await this.table(type).get(id)
  }

  /**
   * Get exact Setting by its key.
   * @param key
   */
  async getSetting(key: Key): Promise<Setting | undefined> {
    return await this.table(Type.SETTING).get(key)
  }

  /**
   * Get all records of a type without sorting.
   * @param type
   */
  async getAll(type: Type): Promise<Record[]> {
    return await this.table(type).toArray()
  }

  /**
   * Get previous child record by type and parent id.
   * @param type
   * @param parentId
   */
  async getPreviousChild(type: Type, parentId: string) {
    return (await this.table(type).where(Field.PARENT_ID).equals(parentId).toArray()).reverse()[0]
  }

  /**
   * Get all child records for a parent id.
   * @param childType
   * @param parentId
   */
  async getParentChildren(childType: Type, parentId: string) {
    return await this.table(childType)
      .where(Field.PARENT_ID)
      .equals(parentId)
      .sortBy(Field.TIMESTAMP)
  }

  /**
   * To be used with live dashboard and parent types only.
   * @param type
   */
  async getDashboardParents(type: Type) {
    // Get enabled parent records
    const records = await this.table(type)
      .filter((r) => r.enabled === true)
      .sortBy(Field.NAME)

    const favorites: DashboardListCardProps[] = []
    const nonFavorites: DashboardListCardProps[] = []

    // Build dashboard list cards
    for await (const r of records) {
      const previous = (await this.getPreviousChild(
        DataSchema.getChildType(type) as Type,
        r.id
      )) as Record

      const dashboardCard: DashboardListCardProps = {
        type,
        id: r.id,
        timestamp: r.timestamp,
        name: r.name,
        desc: r.desc,
        favorited: r.favorited,
        previousNote: previous?.note,
        previousTimestamp: previous?.timestamp,
        // TODO - Just put the whole parent and previous child record in here
        // parent: r,
        // previousChild: previous,
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
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     UPDATE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Update exact Record by type and id with the properties you want to change.
   * @param type
   * @param id
   * @param changes
   */
  async updateRecord(type: Type, id: string, changes: { [key in Field]?: any }) {
    console.log('updateRecord', type, id, changes)
    if (!(await idValidator.isValid(id))) {
      throw new Error(`Update record id ${id} is invalid`)
    }
    if (!(await typeValidator.isValid(type))) {
      throw new Error(`Update record type ${type} is invalid`)
    }

    // Get the original record
    const record = await this.table(type).get(id)
    if (!record) {
      throw new Error('Update record cannot update non-existent record')
    }

    // Overwrite original fields with changes
    Object.keys(changes).forEach((k) => {
      record[k as Field] = changes[k as Field]
    })

    // Find record specific validator
    const recordValidator = DataSchema.getValidator(type)
    if (!recordValidator) {
      throw new Error('Update record validator not found')
    }

    if (!(await recordValidator.isValid(record))) {
      throw new Error('Update record found invalid record changes')
    }

    // Validate cleans record of unknown properties
    return await this.table(type).update(id, await recordValidator.validate(record))
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
    const settingValue = await this.table(Type.SETTING).get(setting.key)

    if (!settingValue) {
      // Add Setting if it doesn't exist
      return await this.addRecord(Type.SETTING, setting)
    } else {
      // Update Setting if it does exist
      return await this.table(Type.SETTING).update(setting.key, { value: setting.value })
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     DELETE                                                              //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  /**
   * Deletes all logs that are older than the log retention time Setting.
   * - Runs once every time the app starts
   */
  async deleteExpiredLogs() {
    const logRetentionTime = (await this.getSetting(Key.LOG_RETENTION_TIME))?.value as LogRetention

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

    const logs = (await this.getAll(Type.LOG)) as Log[]

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = log.timestamp ?? 0
        const logAgeMilliseconds = Date.now() - logTimestamp
        return logAgeMilliseconds > lookupMilliseconds[logRetentionTime]
      })
      .map((log: Log) => log.autoId as number) // Map remaining Log ids for removal

    await this.table(Type.LOG).bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  /**
   * Delete single or grouped records by id.
   * - Deleting parent deletes all associated children
   * - Deleting child only deletes that single record
   * @param type
   * @param id
   */
  async deleteRecord(type: Type, id: string) {
    if (!(await idValidator.isValid(id))) {
      throw new Error(`Delete record id ${id} is invalid`)
    }
    if (!(await typeValidator.isValid(type))) {
      throw new Error(`Delete record type ${type} is invalid`)
    }

    const recordToDelete = await this.getRecord(type, id)
    if (!recordToDelete) {
      throw new Error(`Delete record with id ${id} does not exist`)
    }

    // Delete the exact record first
    await this.table(type).delete(id)

    const childType = DataSchema.getChildType(type)

    if (childType) {
      // Delete children asscoiated with parent record
      await this.table(childType).where(Field.PARENT_ID).equals(id).delete()
    }

    return recordToDelete // Returns initial deleted record
  }

  /**
   * Delete all data of a specific type.
   * @param type
   */
  async clearByType(type: Type) {
    await this.table(type).clear()
    return await this.initSettings() // Re-initialize settings just in case
  }

  /**
   * Deletes all data from the database and resets settings.
   */
  async clearAllData() {
    await Promise.all(Object.values(Type).map((type) => this.table(type).clear()))
    return await this.resetSettings()
  }

  /**
   * Deletes and resets all settings.
   */
  async resetSettings() {
    await this.table(Type.SETTING).clear()
    await this.initSettings()
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
const DB = new Database(AppName)

export default DB
