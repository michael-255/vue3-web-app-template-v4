import { describe, test, expect, beforeEach, vi } from 'vitest'
import { DatabaseType } from '@/types/database'
import { Severity } from '@/types/database'
import { DatabaseField } from '@/types/database'
import DB, { LocalDatabase } from '@/services/LocalDatabase'

const databaseDeleteMock = vi.fn()
const databaseRecordsMock = {
  toArray: vi.fn(),
  get: vi.fn(),
  add: vi.fn(),
  bulkAdd: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  where: vi.fn().mockReturnValue({
    sortBy: vi.fn().mockReturnValue({
      reverse: vi.fn(),
    }),
    equals: vi.fn().mockReturnValue({
      delete: vi.fn(),
      toArray: vi.fn(),
      filter: vi.fn().mockReturnValue({
        toArray: vi.fn(),
      }),
    }),
  }),
}

describe('LocalDatabase service', () => {
  let db: any
  const settingMock = {
    [DatabaseField.TYPE]: DatabaseType.SETTING,
    [DatabaseField.ID]: 'setting-id',
    [DatabaseField.VALUE]: 'setting-value',
  }
  const logMock = {
    [DatabaseField.TYPE]: DatabaseType.LOG,
    [DatabaseField.ID]: 'log-id',
    [DatabaseField.CREATED_TIMESTAMP]: 1234567890,
    [DatabaseField.SEVERITY]: Severity.DEBUG,
    [DatabaseField.LABEL]: 'Log Label',
    [DatabaseField.DETAILS]: { stuff: 'abc', test: '123' },
  }
  const exampleMock = {
    [DatabaseField.TYPE]: DatabaseType.EXAMPLE,
    [DatabaseField.ID]: 'example-id',
    [DatabaseField.NAME]: 'example-name',
    [DatabaseField.DESCRIPTION]: 'example-description',
    [DatabaseField.IS_FAVORITED]: true,
    [DatabaseField.IS_ENABLED]: true,
  }
  const exampleResultMock1 = {
    [DatabaseField.TYPE]: DatabaseType.EXAMPLE_RESULT,
    [DatabaseField.ID]: 'example-result-id-1',
    [DatabaseField.CREATED_TIMESTAMP]: 1234567890,
    [DatabaseField.PARENT_ID]: exampleMock[DatabaseField.ID],
    [DatabaseField.NOTE]: 'example-result-note-1',
    [DatabaseField.NUMBER]: 1,
  }
  const exampleResultMock2 = {
    [DatabaseField.TYPE]: DatabaseType.EXAMPLE_RESULT,
    [DatabaseField.ID]: 'example-result-id-2',
    [DatabaseField.CREATED_TIMESTAMP]: 12345,
    [DatabaseField.PARENT_ID]: exampleMock[DatabaseField.ID],
    [DatabaseField.NOTE]: 'example-result-note-2',
    [DatabaseField.NUMBER]: 2,
  }

  beforeEach(() => {
    db = new LocalDatabase('TestDatabase')
    db.Records = databaseRecordsMock
    db.delete = databaseDeleteMock
    vi.clearAllMocks()
  })

  test('DB is an instance of LocalDatabase', () => {
    expect(DB).toBeInstanceOf(LocalDatabase)
  })

  test('DB primary key and indices have the expected values', () => {
    const primaryKey = {
      name: '[type+id]',
      keyPath: ['type', 'id'],
      unique: true,
      multi: false,
      auto: false,
      compound: true,
      src: '[type+id]',
    }
    const indices = [
      {
        name: '[type+parentId]',
        keyPath: ['type', 'parentId'],
        unique: false,
        multi: false,
        auto: false,
        compound: true,
        src: '[type+parentId]',
      },
    ]
    expect(DB.Records.schema.primKey).toEqual(primaryKey)
    expect(DB.Records.schema.indexes).toEqual(indices)
  })

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // CREATE                                                                  //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  test('addRecord inserts the given record into the database', async () => {
    db.Records.add = vi.fn().mockReturnValue(logMock[DatabaseField.ID]) // Returns id
    const result = await db.addRecord(logMock)

    expect(db.Records.add).toHaveBeenCalledWith(logMock)
    expect(result).toBe(logMock[DatabaseField.ID]) // Returns id
  })

  test('bulkAddRecords inserts given array of records into the database', async () => {
    db.Records.bulkAdd = vi
      .fn()
      .mockReturnValue([
        settingMock[DatabaseField.ID],
        logMock[DatabaseField.ID],
        exampleMock[DatabaseField.ID],
      ]) // Returns ids
    const result = await db.bulkAddRecords([settingMock, logMock, exampleMock])

    expect(db.Records.bulkAdd).toHaveBeenCalledWith([settingMock, logMock, exampleMock], {
      allKeys: true,
    })
    expect(result).toEqual(expect.arrayContaining([logMock[DatabaseField.ID]])) // Returns ids
  })

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // READ                                                                    //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  test('getAllRecords returns all records', async () => {
    db.Records.toArray = vi.fn().mockReturnValue([settingMock, logMock])
    const result = await db.getAllRecords()

    expect(db.Records.toArray).toHaveBeenCalled()
    expect(result).toEqual(expect.arrayContaining([settingMock, logMock]))
  })

  test('getRecord returns a single record', async () => {
    db.Records.get = vi.fn().mockReturnValue(settingMock)
    const result = await db.getRecord([DatabaseType.SETTING, 'setting-id'])

    expect(db.Records.get).toHaveBeenCalled()
    expect(result).toEqual(settingMock)
  })

  test('getRecordsByType returns records of a given type', async () => {
    db.Records.where().equals().toArray = vi.fn().mockReturnValue([settingMock])
    const result = await db.getRecordsByType(DatabaseType.SETTING)

    expect(db.Records.where).toHaveBeenCalledWith(DatabaseField.TYPE)
    expect(db.Records.where().equals).toHaveBeenCalledWith(DatabaseType.SETTING)
    expect(db.Records.where().equals().toArray).toHaveBeenCalled()
    expect(result).toEqual(expect.arrayContaining([settingMock]))
  })

  test('getEnabledParentRecords returns enabled parent records of a given type', async () => {
    db.Records.where().equals().filter().sortBy = vi.fn().mockReturnValue([exampleMock])
    const result = await db.getEnabledParentRecords(DatabaseType.EXAMPLE)

    expect(db.Records.where).toHaveBeenCalledWith(DatabaseField.TYPE)
    expect(db.Records.where().equals).toHaveBeenCalledWith(DatabaseType.EXAMPLE)
    expect(db.Records.where().equals().filter).toHaveBeenCalled()
    expect(db.Records.where().equals().filter().sortBy).toHaveBeenCalledWith(DatabaseField.NAME)
    expect(result).toEqual(expect.arrayContaining([exampleMock]))
  })

  test('getPreviousChildRecord returns most recent child record of a given type', async () => {
    db.Records.where().sortBy().reverse = vi
      .fn()
      .mockReturnValue([exampleResultMock1, exampleResultMock2])
    const result = await db.getPreviousChildRecord(DatabaseType.EXAMPLE_RESULT, 'example-id')

    expect(db.Records.where).toHaveBeenCalledWith({
      [DatabaseField.TYPE]: DatabaseType.EXAMPLE_RESULT,
      [DatabaseField.PARENT_ID]: 'example-id',
    })
    expect(db.Records.where().sortBy).toHaveBeenCalledWith(DatabaseField.CREATED_TIMESTAMP)
    expect(db.Records.where().sortBy().reverse).toHaveBeenCalled()
    expect(result).toBe([exampleResultMock1, exampleResultMock2][0]) // Takes first result only
  })

  test('getChildRecordsByParentId returns child records of a given type and parent id', async () => {
    db.Records.where().sortBy = vi.fn().mockReturnValue([exampleResultMock1, exampleResultMock2])
    const result = await db.getChildRecordsByParentId(DatabaseType.EXAMPLE_RESULT, 'example-id')

    expect(db.Records.where).toHaveBeenCalledWith({
      [DatabaseField.TYPE]: DatabaseType.EXAMPLE_RESULT,
      [DatabaseField.PARENT_ID]: 'example-id',
    })
    expect(db.Records.where().sortBy).toHaveBeenCalledWith(DatabaseField.CREATED_TIMESTAMP)
    expect(result).toEqual(expect.arrayContaining([exampleResultMock1, exampleResultMock2]))
  })

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // UPDATE                                                                  //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  test('updateRecord updates record with given props', async () => {
    db.Records.update = vi.fn().mockReturnValue(1) // 1 equals success for updates
    const results = await db.updateRecord(DatabaseType.SETTING, 'setting-id', {
      [DatabaseField.VALUE]: 'new-value',
    })

    expect(db.Records.update).toHaveBeenCalledWith([DatabaseType.SETTING, 'setting-id'], {
      [DatabaseField.VALUE]: 'new-value',
    })
    expect(results).toBe(1) // 1 equals success for updates
  })

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  // DELETE                                                                  //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  test('deleteRecord deletes the record from the database', async () => {
    db.Records.delete = vi.fn().mockReturnValue(undefined)
    const results = await db.deleteRecord(DatabaseType.SETTING, 'setting-id')

    expect(db.Records.delete).toHaveBeenCalledWith([DatabaseType.SETTING, 'setting-id'])
    expect(results).toBe(undefined)
  })

  test('clearRecordsByType deletes all records of a given type', async () => {
    db.Records.where().equals().delete = vi.fn().mockReturnValue(undefined)
    const results = await db.clearRecordsByType(DatabaseType.SETTING)

    expect(db.Records.where).toHaveBeenCalledWith(DatabaseField.TYPE)
    expect(db.Records.where().equals).toHaveBeenCalledWith(DatabaseType.SETTING)
    expect(db.Records.where().equals().delete).toHaveBeenCalled()
    expect(results).toBe(undefined)
  })

  test('deleteDatabase deletes the database from the browser application', async () => {
    await db.deleteDatabase()
    expect(databaseDeleteMock).toHaveBeenCalled()
  })
})
