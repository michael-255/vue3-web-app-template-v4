import type { Icon } from '@/types/icons'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import { z } from 'zod'

//
// SCHEMAS
//

export const recordTypeSchema = z.enum(['example', 'test']) // URL friendly slug
export type RecordType = z.infer<typeof recordTypeSchema>

export const recordGroupSchema = z.enum(['core-record', 'sub-record']) // URL friendly slug
export type RecordGroup = z.infer<typeof recordGroupSchema>

export const logLevelSchema = z.enum(['DEBUG', 'INFO', 'WARN', 'ERROR'])
export type LogLevel = z.infer<typeof logLevelSchema>

export const settingkeySchema = z.enum([
  'welcome-overlay',
  'dashboard-descriptions',
  'dark-mode',
  'console-logs',
  'info-messages',
  'log-retention-time',
])
export type SettingKey = z.infer<typeof settingkeySchema>

export const autoIdSchema = z.number().int().positive().optional() // Handled by Dexie
export const textSchema = z.string().trim()
export const idSchema = z.string().uuid()
export const timestampSchema = z.number().int()
export const nameSchema = z.string().min(1).max(50).trim()
export const textAreaSchema = z.string().max(500).trim().optional()
export const booleanSchema = z.boolean()
export const percentSchema = z.number().min(0).max(100)

export const settingSchema = z.object({
  key: settingkeySchema,
  value: z.any(),
})

export const settingFieldsSchema = settingSchema.keyof()
export type SettingField = z.infer<typeof settingFieldsSchema>

export const logSchema = z.object({
  autoId: autoIdSchema,
  timestamp: timestampSchema,
  logLevel: logLevelSchema,
  label: textSchema,
  details: z.any(),
  message: textSchema.optional(),
  stack: textSchema.optional(),
})

export const logFieldsSchema = logSchema.keyof()
export type LogField = z.infer<typeof logFieldsSchema>

export const exampleCoreSchema = z.object({
  type: z.literal(recordTypeSchema.Values.example),
  group: z.literal(recordGroupSchema.Values['core-record']),
  id: idSchema,
  timestamp: timestampSchema,
  name: nameSchema,
  desc: textAreaSchema,
  enable: booleanSchema,
  favorite: booleanSchema,
  lastSub: z.any(),
  testIds: z.array(idSchema),
})

export const exampleCoreFieldsSchema = exampleCoreSchema.keyof()
export type ExampleCoreField = z.infer<typeof exampleCoreFieldsSchema>

export const exampleSubSchema = z.object({
  type: z.literal(recordTypeSchema.Values.example),
  group: z.literal(recordGroupSchema.Values['sub-record']),
  id: idSchema,
  timestamp: timestampSchema,
  coreId: idSchema,
  note: textAreaSchema,
})

export const exampleSubFieldsSchema = exampleSubSchema.keyof()
export type ExampleSubField = z.infer<typeof exampleSubFieldsSchema>

export const testCoreSchema = z.object({
  type: z.literal(recordTypeSchema.Values.test),
  group: z.literal(recordGroupSchema.Values['core-record']),
  id: idSchema,
  timestamp: timestampSchema,
  name: nameSchema,
  desc: textAreaSchema,
  enable: booleanSchema,
  favorite: booleanSchema,
  lastSub: z.any(),
})

export const testCoreFieldsSchema = testCoreSchema.keyof()
export type TestCoreField = z.infer<typeof testCoreFieldsSchema>

export const testSubSchema = z.object({
  type: z.literal(recordTypeSchema.Values.test),
  group: z.literal(recordGroupSchema.Values['sub-record']),
  id: idSchema,
  timestamp: timestampSchema,
  coreId: idSchema,
  note: textAreaSchema,
  percent: percentSchema,
})

export const testSubFieldsSchema = testSubSchema.keyof()
export type TestSubField = z.infer<typeof testSubFieldsSchema>

export const anyRecordSchema = exampleCoreSchema
  .merge(exampleSubSchema)
  .merge(testCoreSchema)
  .merge(testSubSchema)

export const recordFieldsSchema = anyRecordSchema.keyof()
export type RecordField = z.infer<typeof recordFieldsSchema>

//
// MODELS
//

export type Log = z.infer<typeof logSchema>
export type Setting = z.infer<typeof settingSchema>

export type AnyRecord = z.infer<typeof anyRecordSchema>
export type AnyCoreRecord = z.infer<typeof exampleCoreSchema | typeof testCoreSchema>
export type AnySubRecord = z.infer<typeof exampleSubSchema | typeof testSubSchema>

export type ExampleCoreRecord = z.infer<typeof exampleCoreSchema>
export type ExampleSubRecord = z.infer<typeof exampleSubSchema>

export type TestCoreRecord = z.infer<typeof testCoreSchema>
export type TestSubRecord = z.infer<typeof testSubSchema>

//
// MISCELLANEOUS
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
  tableColumns: QTableColumn[]
  fields: RecordField[]
  schema: z.ZodObject<any, any, any>
}
