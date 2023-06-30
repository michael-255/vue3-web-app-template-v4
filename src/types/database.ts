import type { Icon } from '@/types/icons'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import { z } from 'zod'

//
// SCHEMAS
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
  'log-retention-time',
])
export type SettingKey = z.infer<typeof settingkeys>

export const autoIdSchema = z.number().int().positive().optional() // Handled by Dexie
export const textSchema = z.string().trim()
export const idSchema = z.string().uuid()
export const timestampSchema = z.number().int()
export const nameSchema = z.string().min(1).max(50).trim()
export const textAreaSchema = z.string().max(500).trim().optional()
export const booleanSchema = z.boolean()
export const percentSchema = z.number().min(0).max(100)

export const settingSchema = z.object({
  key: settingkeys,
  value: z.any(),
})

export const logSchema = z.object({
  autoId: autoIdSchema,
  timestamp: timestampSchema,
  logLevel: logLevels,
  label: textSchema,
  details: z.any(),
  message: textSchema.optional(),
  stack: textSchema.optional(),
})

// Base, Sub, and Core
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
  })
)

export const exampleCoreSchema = coreSchema.merge(
  z.object({
    type: z.literal(recordTypes.Values.example),
    lastSub: exampleSubSchema.optional(),
    testIds: z.array(idSchema),
  })
)

// Test
export const testSubSchema = subSchema.merge(
  z.object({
    type: z.literal(recordTypes.Values.test),
    percent: percentSchema,
  })
)

export const testCoreSchema = coreSchema.merge(
  z.object({
    type: z.literal(recordTypes.Values.test),
    lastSub: testSubSchema.optional(),
  })
)

//
// Fields
//

// Use this schema to collect all fields from all schemas
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
  fields: FieldProps[]
  // fields: RecordField[]
  schema: z.ZodObject<any, any, any>
}

export type FieldProps = {
  field: AnyField
  label: string
  desc?: string
  getDefault: () => any
  validator: z.ZodType<any, any, any>
  validationMessage: string
  inspectFormat: (val: any) => string
  component?: ReturnType<typeof defineAsyncComponent>
}
