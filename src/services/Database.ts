import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark, uid } from 'quasar'
import { Duration } from '@/types/general'
import { AppDatabaseVersion, AppName } from '@/constants/global'
import {
  type ParentTable,
  type ChildTable,
  type AnyDBRecord,
  DBTable,
  DBField,
  InternalTable,
  InternalField,
  type BackupData,
} from '@/types/database'
import { Setting, SettingKey, settingSchema, type SettingValue } from '@/models/Setting'
import { Log, LogLevel, logSchema, type LogDetails } from '@/models/Log'
import { Example, exampleSchema } from '@/models/Example'
import { ExampleResult, exampleResultSchema } from '@/models/ExampleResults'
import { Test, testSchema } from '@/models/Test'
import { TestResult, testResultSchema } from '@/models/TestResults'
import type { z } from 'zod'
import { truncateString } from '@/utils/common'

class Database extends Dexie {
  // Required for easier TypeScript usage
  [InternalTable.SETTINGS]!: Table<Setting>;
  [InternalTable.LOGS]!: Table<Log>;
  [DBTable.EXAMPLES]!: Table<Example>;
  [DBTable.TESTS]!: Table<Test>;
  [DBTable.EXAMPLE_RESULTS]!: Table<ExampleResult>;
  [DBTable.TEST_RESULTS]!: Table<TestResult>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      [InternalTable.SETTINGS]: `&${InternalField.KEY}`,
      [InternalTable.LOGS]: `++${InternalField.AUTO_ID}`,
      [DBTable.EXAMPLES]: `&${DBField.ID}, ${DBField.NAME}`,
      [DBTable.TESTS]: `&${DBField.ID}, ${DBField.NAME}`,
      [DBTable.EXAMPLE_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}, ${DBField.CREATED_TIMESTAMP}`,
      [DBTable.TEST_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}, ${DBField.CREATED_TIMESTAMP}`,
    })

    // Required
    this[InternalTable.SETTINGS].mapToClass(Setting)
    this[InternalTable.LOGS].mapToClass(Log)
    this[DBTable.EXAMPLES].mapToClass(Example)
    this[DBTable.TESTS].mapToClass(Test)
    this[DBTable.EXAMPLE_RESULTS].mapToClass(ExampleResult)
    this[DBTable.TEST_RESULTS].mapToClass(TestResult)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Data Properties                                                     //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  getParentTable(table: DBTable): ParentTable {
    return {
      [DBTable.EXAMPLES]: DBTable.EXAMPLES as ParentTable,
      [DBTable.TESTS]: DBTable.TESTS as ParentTable,
      [DBTable.EXAMPLE_RESULTS]: DBTable.EXAMPLES as ParentTable,
      [DBTable.TEST_RESULTS]: DBTable.TESTS as ParentTable,
    }[table]
  }

  getChildTable(table: DBTable): ChildTable {
    return {
      [DBTable.EXAMPLES]: DBTable.EXAMPLE_RESULTS as ChildTable,
      [DBTable.TESTS]: DBTable.TEST_RESULTS as ChildTable,
      [DBTable.EXAMPLE_RESULTS]: DBTable.EXAMPLE_RESULTS as ChildTable,
      [DBTable.TEST_RESULTS]: DBTable.TEST_RESULTS as ChildTable,
    }[table]
  }

  getLabel(table: DBTable, style: 'singular' | 'plural') {
    return {
      [DBTable.EXAMPLES]: Example.getLabel(style),
      [DBTable.TESTS]: Test.getLabel(style),
      [DBTable.EXAMPLE_RESULTS]: ExampleResult.getLabel(style),
      [DBTable.TEST_RESULTS]: TestResult.getLabel(style),
    }[table]
  }

  getFieldComponents(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: Example.getFieldComponents(),
      [DBTable.TESTS]: Test.getFieldComponents(),
      [DBTable.EXAMPLE_RESULTS]: ExampleResult.getFieldComponents(),
      [DBTable.TEST_RESULTS]: TestResult.getFieldComponents(),
    }[table]
  }

  getChartComponents(parentTable: ParentTable) {
    return {
      [DBTable.EXAMPLES]: Example.getChartComponents(),
      [DBTable.TESTS]: Test.getChartComponents(),
    }[parentTable]
  }

  getInspectionItems(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: Example.getInspectionItems(),
      [DBTable.TESTS]: Test.getInspectionItems(),
      [DBTable.EXAMPLE_RESULTS]: ExampleResult.getInspectionItems(),
      [DBTable.TEST_RESULTS]: TestResult.getInspectionItems(),
    }[table]
  }

  getTableColumns(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: Example.getTableColumns(),
      [DBTable.TESTS]: Test.getTableColumns(),
      [DBTable.EXAMPLE_RESULTS]: ExampleResult.getTableColumns(),
      [DBTable.TEST_RESULTS]: TestResult.getTableColumns(),
    }[table]
  }

  getDefaultActionRecord(table: DBTable) {
    return {
      [DBTable.EXAMPLES]: new Example({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        name: '',
        desc: '',
        enabled: true,
        favorited: false,
        previousChild: undefined,
        testIds: [],
      }),
      [DBTable.TESTS]: new Test({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        name: '',
        desc: '',
        enabled: true,
        favorited: false,
        previousChild: undefined,
      }),
      [DBTable.EXAMPLE_RESULTS]: new ExampleResult({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        parentId: undefined,
        note: '',
        percent: undefined,
      }),
      [DBTable.TEST_RESULTS]: new TestResult({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        parentId: undefined,
        note: '',
      }),
    }[table]
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Settings (internal)                                                 //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getSetting(key: SettingKey) {
    return await this.table(InternalTable.SETTINGS).get(key)
  }

  async getSettingValue(key: SettingKey) {
    return (await this.table(InternalTable.SETTINGS).get(key))?.value
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
        const setting = await this.table(InternalTable.SETTINGS).get(key)

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
    return await this.table(InternalTable.SETTINGS).put(settingSchema.parse({ key, value }))
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Logs (internal)                                                     //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getLog(autoId: number) {
    return await this.table(InternalTable.LOGS).get(autoId)
  }

  async addLog(logLevel: LogLevel, logLabel: string, details?: LogDetails) {
    const log = new Log(logLevel, logLabel, details)
    return await this.table(InternalTable.LOGS).add(logSchema.parse(log))
  }

  async purgeLogs() {
    const logDuration = (
      await this.table(InternalTable.SETTINGS).get(SettingKey.LOG_RETENTION_DURATION)
    )?.value as Duration

    if (!logDuration || logDuration === Duration.Forever) {
      return 0 // No logs purged
    }

    const logs = await this.table(InternalTable.LOGS).toArray()

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = log.timestamp ?? 0
        const logAge = Date.now() - logTimestamp
        return logAge > logDuration
      })
      .map((log: Log) => log.autoId) // Map remaining Log ids for removal

    await this.table(InternalTable.LOGS).bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Live Queries                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  liveSettings() {
    return liveQuery(() => this.table(InternalTable.SETTINGS).toArray())
  }

  liveLogs() {
    return liveQuery(() =>
      this.table(InternalTable.LOGS).orderBy(InternalField.AUTO_ID).reverse().toArray()
    )
  }

  private _sortDashboardData<T extends AnyDBRecord>(records: T[]) {
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

  liveDashboardData<T extends AnyDBRecord>(parentTable: ParentTable) {
    return liveQuery(async () => {
      return this._sortDashboardData<T>(
        await this.table(parentTable)
          .orderBy(DBField.NAME)
          .filter((i) => i.enabled === true)
          .toArray()
      )
    })
  }

  private async _getParentDataTable<T extends AnyDBRecord>(parentTable: ParentTable): Promise<T[]> {
    return await this.table(parentTable)
      .orderBy(DBField.NAME)
      .filter((i) => i.activated !== true)
      .toArray()
  }

  private async _getChildDataTable<T extends AnyDBRecord>(childTable: ChildTable): Promise<T[]> {
    return await this.table(childTable)
      .orderBy(DBField.CREATED_TIMESTAMP)
      .reverse()
      .filter((i) => i.activated !== true)
      .toArray()
  }

  liveDataTable(table: DBTable) {
    return liveQuery(async () => {
      return {
        [DBTable.EXAMPLES]: async () => this._getParentDataTable<Example>(DBTable.EXAMPLES),
        [DBTable.TESTS]: async () => this._getParentDataTable<Test>(DBTable.TESTS),
        [DBTable.EXAMPLE_RESULTS]: async () =>
          this._getChildDataTable<ExampleResult>(DBTable.EXAMPLE_RESULTS),
        [DBTable.TEST_RESULTS]: async () =>
          this._getChildDataTable<TestResult>(DBTable.TEST_RESULTS),
      }[table]()
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

  async getAll<T extends AnyDBRecord>(table: DBTable): Promise<T[]> {
    return await this.table(table).toArray()
  }

  async getSortedChildren<T extends AnyDBRecord>(
    childTable: ChildTable,
    parentId: string
  ): Promise<T[]> {
    return await this.table(childTable)
      .where(DBField.PARENT_ID)
      .equals(parentId)
      .sortBy(DBField.CREATED_TIMESTAMP)
  }

  private async _getLastParentChild<T extends AnyDBRecord>(
    childTable: ChildTable,
    id: string
  ): Promise<T | undefined> {
    return (
      await this.table(childTable)
        .where(DBField.PARENT_ID)
        .equals(id)
        .sortBy(DBField.CREATED_TIMESTAMP)
    ).reverse()[0]
  }

  async getLastChild(parentTable: ParentTable, id: string) {
    return await {
      [DBTable.EXAMPLES]: async () =>
        this._getLastParentChild<ExampleResult>(DBTable.EXAMPLE_RESULTS, id),
      [DBTable.TESTS]: async () => this._getLastParentChild<TestResult>(DBTable.TEST_RESULTS, id),
    }[parentTable]()
  }

  private cleanParents<T extends AnyDBRecord>(records: T[]) {
    return records.map((r) => {
      delete r.previousChild
      delete r.activated
      return r
    })
  }

  private cleanChildren<T extends AnyDBRecord>(records: T[]) {
    return records.map((r) => {
      delete r.activated
      return r
    })
  }

  async getBackupData() {
    const backupData: BackupData = {
      appName: AppName,
      databaseVersion: AppDatabaseVersion,
      createdTimestamp: Date.now(),
      [InternalTable.SETTINGS]: await this.table(InternalTable.SETTINGS).toArray(),
      [InternalTable.LOGS]: await this.table(InternalTable.LOGS).toArray(),
      [DBTable.EXAMPLES]: this.cleanParents<Example>(await this.table(DBTable.EXAMPLES).toArray()),
      [DBTable.TESTS]: this.cleanParents<Test>(await this.table(DBTable.TESTS).toArray()),
      [DBTable.EXAMPLE_RESULTS]: this.cleanChildren<ExampleResult>(
        await this.table(DBTable.EXAMPLE_RESULTS).toArray()
      ),
      [DBTable.TEST_RESULTS]: this.cleanChildren<TestResult>(
        await this.table(DBTable.TEST_RESULTS).toArray()
      ),
    }

    return backupData
  }

  async getParentIdOptions(
    parentTable: ParentTable
  ): Promise<{ value: string; label: string; disable: boolean }[]> {
    const records = await this.table(parentTable).orderBy(DBField.NAME).toArray()

    return records.map((r: AnyDBRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 8, '*')})`,
      disable: r.activated,
    }))
  }

  async getTestIdsOptions(): Promise<{ value: string; label: string; disable: boolean }[]> {
    const tests = await this.table(DBTable.TESTS).orderBy(DBField.NAME).toArray()

    return tests.map((r: AnyDBRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 8, '*')})`,
      disable: r.activated,
    }))
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Creates                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  private async _addParent(
    parentTable: ParentTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(parentTable).add(schema.parse(record))
    return await this.updatePrevious(parentTable, record.id)
  }

  private async _addChild(
    childTable: ChildTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(childTable).add(schema.parse(record))
    const parentTable = this.getParentTable(childTable)
    return await this.updatePrevious(parentTable, record.parentId)
  }

  async addRecord(table: DBTable, record: AnyDBRecord) {
    return await {
      [DBTable.EXAMPLES]: async () => this._addParent(DBTable.EXAMPLES, record, exampleSchema),
      [DBTable.TESTS]: async () => this._addParent(DBTable.TESTS, record, testSchema),
      [DBTable.EXAMPLE_RESULTS]: async () =>
        this._addChild(DBTable.EXAMPLE_RESULTS, record, exampleResultSchema),
      [DBTable.TEST_RESULTS]: async () =>
        this._addChild(DBTable.TEST_RESULTS, record, testResultSchema),
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
    const parentTable = this.getParentTable(table)
    await this.updateAllPrevious(parentTable)

    return skippedRecords
  }

  async importRecords(table: DBTable, records: AnyDBRecord[]) {
    const skippedRecords = await {
      [DBTable.EXAMPLES]: async () => this.processImport(DBTable.EXAMPLES, records, exampleSchema),
      [DBTable.TESTS]: async () => this.processImport(DBTable.TESTS, records, testSchema),
      [DBTable.EXAMPLE_RESULTS]: async () =>
        this.processImport(DBTable.EXAMPLE_RESULTS, records, exampleResultSchema),
      [DBTable.TEST_RESULTS]: async () =>
        this.processImport(DBTable.TEST_RESULTS, records, testResultSchema),
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

  private async _putParent(
    parentTable: ParentTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(parentTable).put(schema.parse(record))
    return await this.updatePrevious(parentTable, record.id)
  }

  private async _putChild(
    childTable: ChildTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(childTable).put(schema.parse(record))
    const parentTable = this.getParentTable(childTable)
    return await this.updatePrevious(parentTable, record.parentId)
  }

  async putRecord(table: DBTable, record: AnyDBRecord) {
    return await {
      [DBTable.EXAMPLES]: async () =>
        await this._putParent(DBTable.EXAMPLES, record, exampleSchema),
      [DBTable.TESTS]: async () => await this._putParent(DBTable.TESTS, record, testSchema),
      [DBTable.EXAMPLE_RESULTS]: async () =>
        await this._putChild(DBTable.EXAMPLE_RESULTS, record, exampleResultSchema),
      [DBTable.TEST_RESULTS]: async () =>
        await this._putChild(DBTable.TEST_RESULTS, record, testResultSchema),
    }[table]()
  }

  async updatePrevious(parentTable: ParentTable, id: string) {
    const childTable = this.getChildTable(parentTable)

    const previousChild = (
      await this.table(childTable)
        .where(DBField.PARENT_ID)
        .equals(id)
        .sortBy(DBField.CREATED_TIMESTAMP)
    ).reverse()[0] as AnyDBRecord | undefined

    return await this.table(parentTable).update(id, { previousChild })
  }

  async updateAllPrevious(parentTable: ParentTable) {
    const records = await this.table(parentTable).toArray()
    return await Promise.all(records.map((i) => this.updatePrevious(parentTable, i.id)))
  }

  async toggleFavorite(parentTable: ParentTable, id: string) {
    const record = (await this.getRecord(parentTable, id)) as AnyDBRecord | undefined

    if (record && record.favorited !== undefined) {
      record.favorited = !record.favorited
      return await this.putRecord(parentTable, record)
    }
  }

  async toggleActive(table: DBTable, id: string) {
    const record = (await this.getRecord(table, id)) as AnyDBRecord | undefined

    if (record && record.activated !== undefined) {
      record.activated = !record.activated
      return await this.putRecord(table, record)
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Deletes                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  private async _deleteParent(parentTable: ParentTable, id: string) {
    await this.table(parentTable).delete(id)
    const childTable = this.getChildTable(parentTable)
    return await this.table(childTable).where(DBField.PARENT_ID).equals(id).delete()
  }

  private async _deleteChild(childTable: ChildTable, id: string, recordToDelete: AnyDBRecord) {
    await this.table(childTable).delete(id)
    const parentTable = this.getParentTable(childTable)
    return await this.updatePrevious(parentTable, recordToDelete.parentId)
  }

  async deleteRecord(table: DBTable, id: string) {
    const recordToDelete = (await this.getRecord(table, id)) as AnyDBRecord | undefined

    if (!recordToDelete) {
      throw new Error(`No record to delete in table ${table} for id ${id}`)
    }

    return await {
      [DBTable.EXAMPLES]: async () => this._deleteParent(DBTable.EXAMPLES, id),
      [DBTable.TESTS]: async () => this._deleteParent(DBTable.TESTS, id),
      [DBTable.EXAMPLE_RESULTS]: async () =>
        this._deleteChild(DBTable.EXAMPLE_RESULTS, id, recordToDelete),
      [DBTable.TEST_RESULTS]: async () =>
        this._deleteChild(DBTable.TEST_RESULTS, id, recordToDelete),
    }[table]()
  }

  async clearLogs() {
    return await this.table(InternalTable.LOGS).clear()
  }

  async clearSettings() {
    await this.table(InternalTable.SETTINGS).clear()
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
