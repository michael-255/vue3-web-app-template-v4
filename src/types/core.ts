import { Limit, Icon } from '@/types//general'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import { z } from 'zod'

//
// DATABASE TYPES
//

export const recordTypes = z.enum(['example', 'test']) // URL friendly slug
export type RecordType = z.infer<typeof recordTypes>

export const recordGroups = z.enum(['core', 'sub']) // URL friendly slug
export type RecordGroup = z.infer<typeof recordGroups>

export const logLevels = z.enum(['DEBUG', 'INFO', 'WARN', 'ERROR'])
export type LogLevel = z.infer<typeof logLevels>

export const settingkeys = z.enum([
  'welcome-overlay',
  'dashboard-descriptions',
  'dark-mode',
  'console-logs',
  'info-messages',
  'log-retention-duration',
])
export type SettingKey = z.infer<typeof settingkeys>

export const settingValueSchema = z.boolean().or(z.string()).or(z.number()).optional()
export const autoIdSchema = z.number().int().positive().optional() // Handled by Dexie
export const timestampSchema = z.number().int()
export const logLabelSchema = z.string().trim()
export const textSchema = z.string().trim().optional()
export const detailsSchema = z.record(z.any()).optional()
export type Details = z.infer<typeof detailsSchema>

export const idSchema = z.string().uuid()
export const nameSchema = z.string().min(Limit.MIN_NAME).max(Limit.MAX_NAME).trim()
export const textAreaSchema = z.string().max(Limit.MAX_TEXT_AREA).trim()
export const booleanSchema = z.boolean()
export const percentSchema = z.number().min(0).max(100)
export const testIdsSchema = z.array(idSchema)

// Non-exported schemas
const settingSchema = z.object({
  key: settingkeys,
  value: settingValueSchema,
})

const logSchema = z.object({
  autoId: autoIdSchema,
  timestamp: timestampSchema,
  logLevel: logLevels,
  logLabel: logLabelSchema,
  details: detailsSchema,
  errorMessage: textSchema,
  stackTrace: textSchema,
})

const baseSchema = z.object({
  type: recordTypes,
  id: idSchema,
  timestamp: timestampSchema,
})

const subSchema = baseSchema.merge(
  z.object({
    coreId: idSchema,
    note: textAreaSchema,
  })
)

const coreSchema = baseSchema.merge(
  z.object({
    name: nameSchema,
    desc: textAreaSchema,
    enabled: booleanSchema,
    favorited: booleanSchema,
    lastSub: subSchema.optional(),
  })
)

// Example
export const exampleSubSchema = subSchema.merge(
  z.object({
    type: z.literal(recordTypes.Values.example),
    percent: percentSchema,
  })
)

export const exampleCoreSchema = coreSchema.merge(
  z.object({
    type: z.literal(recordTypes.Values.example),
    lastSub: exampleSubSchema.optional(),
    testIds: testIdsSchema,
  })
)

// Test
export const testSubSchema = subSchema.merge(
  z.object({
    type: z.literal(recordTypes.Values.test),
  })
)

export const testCoreSchema = coreSchema.merge(
  z.object({
    type: z.literal(recordTypes.Values.test),
    lastSub: testSubSchema.optional(),
  })
)

/**
 * - Use this schema to collect all fields from all schemas
 */
const allSchema = settingSchema
  .merge(logSchema)
  .merge(exampleCoreSchema)
  .merge(exampleSubSchema)
  .merge(testCoreSchema)
  .merge(testSubSchema)

export const allFields = allSchema.keyof()
export type AnyField = z.infer<typeof allFields>

//
// MODELS
//

export type Log = z.infer<typeof logSchema>
export type Setting = z.infer<typeof settingSchema>

export type AnyDatabaseRecord = {
  [key: string]: any
}

export type AnyRecord = z.infer<typeof baseSchema> & AnyDatabaseRecord
export type AnySubRecord = z.infer<typeof subSchema> & AnyDatabaseRecord
export type AnyCoreRecord = z.infer<typeof coreSchema> & AnyDatabaseRecord

export type ExampleCoreRecord = z.infer<typeof exampleCoreSchema>
export type ExampleSubRecord = z.infer<typeof exampleSubSchema>

export type TestCoreRecord = z.infer<typeof testCoreSchema>
export type TestSubRecord = z.infer<typeof testSubSchema>

//
// MISCELLANEOUS TYPES
//

export type BackupData = {
  appName: string
  backupTimestamp: number
  logs: Log[]
  settings: Setting[]
  coreRecords: AnyCoreRecord[]
  subRecords: AnySubRecord[]
}

export type RecordProps = {
  type: RecordType
  group: RecordGroup
  icon: Icon
  singular: string
  plural: string
  charts: ReturnType<typeof defineAsyncComponent>[]
  fields: ReturnType<typeof defineAsyncComponent>[]
  tableColumns: QTableColumn[]
  schema: z.ZodObject<any, any, any>
}
