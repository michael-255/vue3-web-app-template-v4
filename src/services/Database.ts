import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark } from 'quasar'
import { Duration } from '@/types/general'
import { AppDatabaseVersion, AppName } from '@/constants/global'
import { DBTable, type AnyDBRecord, DBField, InternalTable, InternalField } from '@/types/database'
import { Setting, SettingKey, settingSchema, type SettingValue } from '@/models/Setting'
import { Log, LogLevel, logSchema, type LogDetails } from '@/models/Log'
import { Example, exampleSchema } from '@/models/Example'
import { ExampleResult, exampleResultSchema } from '@/models/ExampleResults'
import { Test, testSchema } from '@/models/Test'
import { TestResult, testResultSchema } from '@/models/TestResults'

class Database extends Dexie {
  // Required for easier TypeScript usage
  [InternalTable.SETTINGS]!: Table<Setting>;
  [InternalTable.LOGS]!: Table<Log>;
  [DBTable.EXAMPLES]!: Table<Example>;
  [DBTable.EXAMPLE_RESULTS]!: Table<ExampleResult>;
  [DBTable.TESTS]!: Table<Test>;
  [DBTable.TEST_RESULTS]!: Table<TestResult>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      [InternalTable.SETTINGS]: `&${InternalField.KEY}`,
      [InternalTable.LOGS]: `++${InternalField.AUTO_ID}`,
      [DBTable.EXAMPLES]: `&${DBField.ID}`,
      [DBTable.EXAMPLE_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}`,
      [DBTable.TESTS]: `&${DBField.ID}`,
      [DBTable.TEST_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}`,
    })

    // Required
    this[InternalTable.SETTINGS].mapToClass(Setting)
    this[InternalTable.LOGS].mapToClass(Log)
    this[DBTable.EXAMPLES].mapToClass(Example)
    this[DBTable.EXAMPLE_RESULTS].mapToClass(ExampleResult)
    this[DBTable.TESTS].mapToClass(Test)
    this[DBTable.TEST_RESULTS].mapToClass(TestResult)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Settings (internal)                                                 //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  liveSettings() {
    return liveQuery(() => this.Settings.toArray())
  }

  async getSettings() {
    return await this.Settings.toArray()
  }

  async getSetting(key: SettingKey) {
    return await this.Settings.get(key)
  }

  async getSettingValue(key: SettingKey) {
    return (await this.Settings.get(key))?.value
  }

  async initSettings() {
    const defaultSettings: Readonly<{
      [key in SettingKey]: SettingValue
    }> = {
      [SettingKey.WELCOME_OVERLAY]: true,
      [SettingKey.DASHBOARD_DESCRIPTIONS]: true,
      [SettingKey.DARK_MODE]: true,
      [SettingKey.CONSOLE_LOGS]: false,
      [SettingKey.INFO_MESSAGES]: true,
      [SettingKey.LOG_RETENTION_DURATION]: Duration['Three Months'],
    }

    const keys = Object.values(SettingKey)

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

    Dark.set(Boolean(settings.find((s) => s.key === SettingKey.DARK_MODE)?.value))

    await Promise.all(settings.map((s) => this.setSetting(s.key, s.value)))
  }

  async setSetting(key: SettingKey, value: SettingValue) {
    if (key === SettingKey.DARK_MODE) {
      Dark.set(Boolean(value))
    }
    return await this.Settings.put(settingSchema.parse({ key, value }))
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Logs (internal)                                                     //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  liveLogs() {
    return liveQuery(() => this.Logs.orderBy(InternalField.AUTO_ID).reverse().toArray())
  }

  async getLogs() {
    return await this.Logs.toArray()
  }

  async getLog(autoId: number) {
    return await this.Logs.get(autoId)
  }

  async addLog(logLevel: LogLevel, logLabel: string, details?: LogDetails) {
    const log = new Log(logLevel, logLabel, details)
    return await this.Logs.add(logSchema.parse(log))
  }

  async purgeLogs() {
    const logDuration = (await this.Settings.get(SettingKey.LOG_RETENTION_DURATION))
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
      .map((log: Log) => log.autoId) // Map remaining Log ids for removal

    await this.Logs.bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Live Queries                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  private organizeDashboardData<T extends AnyDBRecord>(records: T[]) {
    const active: T[] = []
    const favorites: T[] = []
    const nonFavorites: T[] = []

    records.forEach((i) => {
      if (i.active) {
        active.push(i)
      } else if (i.favorited === true) {
        favorites.push(i)
      } else {
        nonFavorites.push(i)
      }
    })

    return [...active, ...favorites, ...nonFavorites]
  }

  liveDashboard() {
    return liveQuery(async () => {
      const Examples = this.organizeDashboardData(
        await this.Examples.filter((i) => i.enabled === true).sortBy(DBField.NAME)
      )
      const Tests = this.organizeDashboardData(
        await this.Tests.filter((i) => i.enabled === true).sortBy(DBField.NAME)
      )
      return { Examples, Tests }
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Gets                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getRecord<T>(table: DBTable, id: string): Promise<T | undefined> {
    return {
      [DBTable.EXAMPLES]: await this.table(DBTable.EXAMPLES).get(id),
      [DBTable.EXAMPLE_RESULTS]: await this.table(DBTable.EXAMPLE_RESULTS).get(id),
      [DBTable.TESTS]: await this.table(DBTable.TESTS).get(id),
      [DBTable.TEST_RESULTS]: await this.table(DBTable.TEST_RESULTS).get(id),
    }[table]
  }

  async getAll<T>(table: DBTable): Promise<T[]> {
    return {
      [DBTable.EXAMPLES]: await this.table(DBTable.EXAMPLES).orderBy(DBField.NAME).toArray(),
      [DBTable.EXAMPLE_RESULTS]: (
        await this.table(DBTable.EXAMPLE_RESULTS).orderBy(DBField.CREATED_TIMESTAMP).toArray()
      ).reverse(),
      [DBTable.TESTS]: await this.table(DBTable.TESTS).orderBy(DBField.NAME).toArray(),
      [DBTable.TEST_RESULTS]: (
        await this.table(DBTable.TEST_RESULTS).orderBy(DBField.CREATED_TIMESTAMP).toArray()
      ).reverse(),
    }[table]
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Creates                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async addRecord(table: DBTable, record: AnyDBRecord) {
    return {
      [DBTable.EXAMPLES]: await this.table(DBTable.EXAMPLES).add(exampleSchema.parse(record)),
      [DBTable.EXAMPLE_RESULTS]: await this.table(DBTable.EXAMPLE_RESULTS).add(
        exampleResultSchema.parse(record)
      ),
      [DBTable.TESTS]: await this.table(DBTable.TESTS).add(testSchema.parse(record)),
      [DBTable.TEST_RESULTS]: await this.table(DBTable.TEST_RESULTS).add(
        testResultSchema.parse(record)
      ),
    }[table]
  }

  async importRecords(table: DBTable, records: AnyDBRecord[]) {
    // TODO
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Updates                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async putRecord(table: DBTable, record: AnyDBRecord) {
    return {
      [DBTable.EXAMPLES]: await this.table(DBTable.EXAMPLES).put(exampleSchema.parse(record)),
      [DBTable.EXAMPLE_RESULTS]: await this.table(DBTable.EXAMPLE_RESULTS).put(
        exampleResultSchema.parse(record)
      ),
      [DBTable.TESTS]: await this.table(DBTable.TESTS).put(testSchema.parse(record)),
      [DBTable.TEST_RESULTS]: await this.table(DBTable.TEST_RESULTS).put(
        testResultSchema.parse(record)
      ),
    }[table]
  }

  async updatePrevious() {
    // TODO
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Deletes                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async deleteRecord(table: DBTable, id: string) {
    return {
      [DBTable.EXAMPLES]: async () => {
        await this.table(DBTable.EXAMPLES).delete(id)
        return await this.table(DBTable.EXAMPLE_RESULTS)
          .where(DBField.PARENT_ID)
          .equals(id)
          .delete()
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        return await this.table(DBTable.EXAMPLE_RESULTS).delete(id)
        // TODO - update previous data
      },
      [DBTable.TESTS]: async () => {
        await this.table(DBTable.TESTS).delete(id)
        return await this.table(DBTable.TEST_RESULTS).where(DBField.PARENT_ID).equals(id).delete()
      },
      [DBTable.TEST_RESULTS]: async () => {
        return await this.table(DBTable.TEST_RESULTS).delete(id)
        // TODO - update previous data
      },
    }[table]()
  }

  async clearLogs() {
    return await this.Logs.clear()
  }

  async clearSettings() {
    await this.Settings.clear()
    return await this.initSettings()
  }

  async clearAll() {
    await Promise.all([
      Object.values(InternalTable).map(async (table) => await this.table(table).clear()),
      Object.values(DBTable).map(async (table) => await this.table(table).clear()),
    ])
    return await this.initSettings()
  }

  /**
   * Deletes entire database. Require app reload to reinitialize the database.
   */
  async deleteDatabase() {
    return await this.delete()
  }
}

/**
 * Use this preconfigured Database instance. Do NOT create another one!
 */
const DB = new Database(`${AppName} v${AppDatabaseVersion}`)

export default DB
