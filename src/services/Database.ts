import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark } from 'quasar'
import { Duration } from '@/types/general'
import { AppDatabaseVersion, AppName } from '@/constants/global'
import {
  DBTable,
  type AnyDBRecord,
  DBField,
  InternalTable,
  InternalField,
  type ParentTable,
  type ChildTable,
} from '@/types/database'
import { Setting, SettingKey, settingSchema, type SettingValue } from '@/models/Setting'
import { Log, LogLevel, logSchema, type LogDetails } from '@/models/Log'
import { Example, exampleSchema } from '@/models/Example'
import { ExampleResult, exampleResultSchema } from '@/models/ExampleResults'
import { Test, testSchema } from '@/models/Test'
import { TestResult, testResultSchema } from '@/models/TestResults'
import type { z } from 'zod'
import type { Previous } from '@/models/_Parent'

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
      [DBTable.EXAMPLES]: `&${DBField.ID}, ${DBField.NAME}`,
      [DBTable.EXAMPLE_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}, ${DBField.CREATED_TIMESTAMP}`,
      [DBTable.TESTS]: `&${DBField.ID}, ${DBField.NAME}`,
      [DBTable.TEST_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}, ${DBField.CREATED_TIMESTAMP}`,
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
  //     Data Properties                                                     //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  getParentTable(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: DBTable.EXAMPLES,
      [DBTable.EXAMPLE_RESULTS]: DBTable.EXAMPLES,
      [DBTable.TESTS]: DBTable.TESTS,
      [DBTable.TEST_RESULTS]: DBTable.TESTS,
    }[table]
  }

  getChildTable(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: DBTable.EXAMPLE_RESULTS,
      [DBTable.EXAMPLE_RESULTS]: DBTable.EXAMPLE_RESULTS,
      [DBTable.TESTS]: DBTable.TEST_RESULTS,
      [DBTable.TEST_RESULTS]: DBTable.TEST_RESULTS,
    }[table]
  }

  getLabel(table: DBTable, style: 'singular' | 'plural') {
    return {
      [DBTable.EXAMPLES]: Example.getLabel(style),
      [DBTable.EXAMPLE_RESULTS]: ExampleResult.getLabel(style),
      [DBTable.TESTS]: Test.getLabel(style),
      [DBTable.TEST_RESULTS]: TestResult.getLabel(style),
    }[table]
  }

  getFieldComponents(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: Example.getFieldComponents(),
      [DBTable.EXAMPLE_RESULTS]: ExampleResult.getFieldComponents(),
      [DBTable.TESTS]: Test.getFieldComponents(),
      [DBTable.TEST_RESULTS]: TestResult.getFieldComponents(),
    }[table]
  }

  getChartComponents(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: Example.getChartComponents(),
      [DBTable.EXAMPLE_RESULTS]: Example.getChartComponents(),
      [DBTable.TESTS]: Test.getChartComponents(),
      [DBTable.TEST_RESULTS]: Test.getChartComponents(),
    }[table]
  }

  getTableColumns(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: Example.getTableColumns(),
      [DBTable.EXAMPLE_RESULTS]: ExampleResult.getTableColumns(),
      [DBTable.TESTS]: Test.getTableColumns(),
      [DBTable.TEST_RESULTS]: TestResult.getTableColumns(),
    }[table]
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Settings (internal)                                                 //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

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

  liveSettings() {
    return liveQuery(() => this.Settings.toArray())
  }

  liveLogs() {
    return liveQuery(() => this.Logs.orderBy(InternalField.AUTO_ID).reverse().toArray())
  }

  private sortDashboardData<T extends AnyDBRecord>(records: T[]) {
    const active: T[] = []
    const favorites: T[] = []
    const nonFavorites: T[] = []

    records.forEach((i) => {
      if (i.activated) {
        active.push(i)
      } else if (i.favorited === true) {
        favorites.push(i)
      } else {
        nonFavorites.push(i)
      }
    })

    return [...active, ...favorites, ...nonFavorites]
  }

  private async getDashboardParentData<T extends AnyDBRecord>(table: ParentTable): Promise<T[]> {
    return this.sortDashboardData<T>(
      await this.table(table)
        .orderBy(DBField.NAME)
        .filter((i) => i.enabled === true)
        .toArray()
    )
  }

  liveDashboardData<T extends AnyDBRecord>(table: ParentTable) {
    return liveQuery(async () => {
      return {
        [DBTable.EXAMPLES]: this.getDashboardParentData<T>(DBTable.EXAMPLES),
        [DBTable.TESTS]: this.getDashboardParentData<T>(DBTable.TESTS),
      }[table]
    })
  }

  private async getParentDataTable<T extends AnyDBRecord>(table: ParentTable): Promise<T[]> {
    return await this.table(table)
      .orderBy(DBField.NAME)
      .filter((i) => i.activated !== true)
      .toArray()
  }

  private async getChildDataTable<T extends AnyDBRecord>(table: ChildTable): Promise<T[]> {
    return await this.table(table)
      .orderBy(DBField.CREATED_TIMESTAMP)
      .reverse()
      .filter((i) => i.activated !== true)
      .toArray()
  }

  liveDataTable(table: DBTable) {
    return liveQuery(async () => {
      return {
        [DBTable.EXAMPLES]: this.getParentDataTable<Example>(DBTable.EXAMPLES),
        [DBTable.EXAMPLE_RESULTS]: this.getChildDataTable<ExampleResult>(DBTable.EXAMPLE_RESULTS),
        [DBTable.TESTS]: this.getParentDataTable<Test>(DBTable.TESTS),
        [DBTable.TEST_RESULTS]: this.getChildDataTable<TestResult>(DBTable.TEST_RESULTS),
      }[table]
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Gets                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getRecord<T extends AnyDBRecord>(table: DBTable, id: string): Promise<T | undefined> {
    return await this.table(table).get(id)
  }

  private async getParents<T extends AnyDBRecord>(table: ParentTable): Promise<T[]> {
    return await this.table(table).orderBy(DBField.NAME).toArray()
  }

  private async getChildren<T extends AnyDBRecord>(table: ChildTable): Promise<T[]> {
    return await this.table(table).orderBy(DBField.CREATED_TIMESTAMP).reverse().toArray()
  }

  async getAll(table: DBTable) {
    return await {
      [DBTable.EXAMPLES]: this.getParents<Example>(DBTable.EXAMPLES),
      [DBTable.EXAMPLE_RESULTS]: this.getChildren<ExampleResult>(DBTable.EXAMPLE_RESULTS),
      [DBTable.TESTS]: this.getParents<Test>(DBTable.TESTS),
      [DBTable.TEST_RESULTS]: this.getChildren<TestResult>(DBTable.TEST_RESULTS),
    }[table]
  }

  async getPreviousRecord(table: DBTable, parentId: string) {
    return await {
      [DBTable.EXAMPLES]: async () => {
        return (
          await this.table(DBTable.EXAMPLES)
            .where(DBField.ID)
            .equals(parentId)
            .sortBy(DBField.CREATED_TIMESTAMP)
        ).reverse()[0]
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        return (
          await this.table(DBTable.EXAMPLE_RESULTS)
            .where(DBField.PARENT_ID)
            .equals(parentId)
            .sortBy(DBField.CREATED_TIMESTAMP)
        ).reverse()[0]
      },
      [DBTable.TESTS]: async () => {
        return (
          await this.table(DBTable.TESTS)
            .where(DBField.ID)
            .equals(parentId)
            .sortBy(DBField.CREATED_TIMESTAMP)
        ).reverse()[0]
      },
      [DBTable.TEST_RESULTS]: async () => {
        return (
          await this.table(DBTable.TEST_RESULTS)
            .where(DBField.PARENT_ID)
            .equals(parentId)
            .sortBy(DBField.CREATED_TIMESTAMP)
        ).reverse()[0]
      },
    }[table]()
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Creates                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async addRecord(table: DBTable, record: AnyDBRecord) {
    return await {
      [DBTable.EXAMPLES]: async () => {
        const newParentRecord = exampleSchema.parse(record)
        const result = await this.table(DBTable.EXAMPLES).add(newParentRecord)
        await this.updatePrevious(DBTable.EXAMPLES, record.parentId)
        return result
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        const newChildRecord = exampleResultSchema.parse(record)
        const result = await this.table(DBTable.EXAMPLE_RESULTS).add(newChildRecord)
        await this.updatePrevious(DBTable.EXAMPLES, newChildRecord.parentId)
        return result
      },
      [DBTable.TESTS]: async () => {
        const newParentRecord = testSchema.parse(record)
        const result = await this.table(DBTable.TESTS).add(newParentRecord)
        await this.updatePrevious(DBTable.TESTS, record.parentId)
        return result
      },
      [DBTable.TEST_RESULTS]: async () => {
        const newChildRecord = testResultSchema.parse(record)
        const result = await this.table(DBTable.TEST_RESULTS).add(newChildRecord)
        await this.updatePrevious(DBTable.TESTS, newChildRecord.parentId)
        return result
      },
    }[table]()
  }

  private async processImport(
    table: DBTable,
    records: AnyDBRecord[],
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    const validRecords: AnyDBRecord[] = []
    const skippedRecords: AnyDBRecord[] = []

    records.forEach((r) => {
      if (schema.safeParse(r).success) {
        validRecords.push(schema.parse(r))
      } else {
        skippedRecords.push(r)
      }
    })

    await this.table(table).bulkAdd(validRecords)
    await this.updateAllPrevious(table)

    return skippedRecords
  }

  async importRecords(table: DBTable, records: AnyDBRecord[]) {
    const skippedRecords = await {
      [DBTable.EXAMPLES]: async () => {
        return await this.processImport(DBTable.EXAMPLES, records, exampleSchema)
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        return await this.processImport(DBTable.EXAMPLE_RESULTS, records, exampleResultSchema)
      },
      [DBTable.TESTS]: async () => {
        return await this.processImport(DBTable.TESTS, records, testSchema)
      },
      [DBTable.TEST_RESULTS]: async () => {
        return await this.processImport(DBTable.TEST_RESULTS, records, testResultSchema)
      },
    }[table]()

    if (skippedRecords.length > 0) {
      // Error for the frontend to report if any records were skipped
      throw new Error(
        `Records skipped due to validation failures (${
          skippedRecords.length
        }): ${skippedRecords.map((r) => String(r.id))}`
      )
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Updates                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async putRecord(table: DBTable, record: AnyDBRecord) {
    return await {
      [DBTable.EXAMPLES]: async () => {
        const result = await this.table(DBTable.EXAMPLES).put(exampleSchema.parse(record))
        await this.updatePrevious(DBTable.EXAMPLES, record.id)
        return result
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        const result = await this.table(DBTable.EXAMPLE_RESULTS).put(
          exampleResultSchema.parse(record)
        )
        await this.updatePrevious(DBTable.EXAMPLES, record.parentId)
        return result
      },
      [DBTable.TESTS]: async () => {
        const result = await this.table(DBTable.TESTS).put(testSchema.parse(record))
        await this.updatePrevious(DBTable.TESTS, record.id)
        return result
      },
      [DBTable.TEST_RESULTS]: async () => {
        const result = await this.table(DBTable.TEST_RESULTS).put(testResultSchema.parse(record))
        await this.updatePrevious(DBTable.TESTS, record.parentId)
        return result
      },
    }[table]()
  }

  async toggleFavorite(table: DBTable, id: string) {
    const record = (await this.getRecord(table, id)) as AnyDBRecord | undefined

    if (record && record.favorited !== undefined) {
      record.favorited = !record.favorited
      return await this.putRecord(table, record)
    }
  }

  async updatePrevious(table: DBTable, parentId: string) {
    return await {
      [DBTable.EXAMPLES]: async () => {
        const previousChild = (await this.getPreviousRecord(DBTable.EXAMPLE_RESULTS, parentId)) as
          | AnyDBRecord
          | undefined
        const previous: Previous = {}

        if (previousChild) {
          previous.createdTimestamp = previousChild.createdTimestamp
          previous.note = previousChild.note
        }

        return await this.table(DBTable.EXAMPLES).update(parentId, { previous })
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        const previousChild = (await this.getPreviousRecord(DBTable.EXAMPLE_RESULTS, parentId)) as
          | AnyDBRecord
          | undefined
        const previous: Previous = {}

        if (previousChild) {
          previous.createdTimestamp = previousChild.createdTimestamp
          previous.note = previousChild.note
        }

        return await this.table(DBTable.EXAMPLES).update(parentId, { previous })
      },
      [DBTable.TESTS]: async () => {
        const previousChild = (await this.getPreviousRecord(DBTable.TEST_RESULTS, parentId)) as
          | AnyDBRecord
          | undefined
        const previous: Previous = {}

        if (previousChild) {
          previous.createdTimestamp = previousChild.createdTimestamp
          previous.note = previousChild.note
        }

        return await this.table(DBTable.TESTS).update(parentId, { previous })
      },
      [DBTable.TEST_RESULTS]: async () => {
        const previousChild = (await this.getPreviousRecord(DBTable.TEST_RESULTS, parentId)) as
          | AnyDBRecord
          | undefined
        const previous: Previous = {}

        if (previousChild) {
          previous.createdTimestamp = previousChild.createdTimestamp
          previous.note = previousChild.note
        }

        return await this.table(DBTable.TESTS).update(parentId, { previous })
      },
    }[table]()
  }

  async updateAllPrevious(table: DBTable) {
    return await {
      [DBTable.EXAMPLES]: async () => {
        const examples = await this.table(DBTable.EXAMPLES).toArray()
        return await Promise.all(examples.map((i) => this.updatePrevious(DBTable.EXAMPLES, i.id)))
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        const examples = await this.table(DBTable.EXAMPLES).toArray()
        return await Promise.all(examples.map((i) => this.updatePrevious(DBTable.EXAMPLES, i.id)))
      },
      [DBTable.TESTS]: async () => {
        const tests = await this.table(DBTable.TESTS).toArray()
        return await Promise.all(tests.map((i) => this.updatePrevious(DBTable.TESTS, i.id)))
      },
      [DBTable.TEST_RESULTS]: async () => {
        const tests = await this.table(DBTable.TESTS).toArray()
        return await Promise.all(tests.map((i) => this.updatePrevious(DBTable.TESTS, i.id)))
      },
    }[table]()
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Deletes                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async deleteRecord(table: DBTable, id: string) {
    const recordToDelete = (await this.getRecord(table, id)) as AnyDBRecord | undefined

    if (!recordToDelete) {
      throw new Error(`No record to delete in table ${table} for id ${id}`)
    }

    return await {
      [DBTable.EXAMPLES]: async () => {
        await this.table(DBTable.EXAMPLES).delete(id)
        return await this.table(DBTable.EXAMPLE_RESULTS)
          .where(DBField.PARENT_ID)
          .equals(id)
          .delete()
      },
      [DBTable.EXAMPLE_RESULTS]: async () => {
        await this.table(DBTable.EXAMPLE_RESULTS).delete(id)
        return await this.updatePrevious(DBTable.EXAMPLES, recordToDelete.parentId)
      },
      [DBTable.TESTS]: async () => {
        await this.table(DBTable.TESTS).delete(id)
        return await this.table(DBTable.TEST_RESULTS).where(DBField.PARENT_ID).equals(id).delete()
      },
      [DBTable.TEST_RESULTS]: async () => {
        await this.table(DBTable.TEST_RESULTS).delete(id)
        return await this.updatePrevious(DBTable.TESTS, recordToDelete.parentId)
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
