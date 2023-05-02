import type {
  DatabaseField,
  DatabaseType,
  SettingId,
  SettingValue,
  Severity,
} from '@/types/database'
import type { Optional } from '@/types/misc'

/**
 * All database record types. Cast your result to the one you are currently working with if known.
 * Cast back to this type when saving or updating the database.
 */
export interface DatabaseRecord {
  // All
  [DatabaseField.TYPE]: DatabaseType
  [DatabaseField.ID]: string | SettingId
  // Settings
  [DatabaseField.VALUE]?: SettingValue
  // Logs
  [DatabaseField.CREATED_TIMESTAMP]?: number
  [DatabaseField.SEVERITY]?: Severity
  [DatabaseField.LABEL]?: string
  [DatabaseField.DETAILS]?: Optional<any>
  [DatabaseField.MESSAGE]?: Optional<string>
  [DatabaseField.STACK]?: Optional<string>
  // Parent
  [DatabaseField.NAME]?: string
  [DatabaseField.DESCRIPTION]?: Optional<string>
  [DatabaseField.IS_FAVORITED]?: boolean
  [DatabaseField.IS_ENABLED]?: boolean
  // Child
  [DatabaseField.PARENT_ID]?: string
  [DatabaseField.NOTE]?: Optional<string>
  // Examples & Tests
  [DatabaseField.NUMBER]?: Optional<number>
}

/**
 * Core app setting type.
 */
export type Setting = Pick<
  DatabaseRecord,
  DatabaseField.TYPE | DatabaseField.ID | DatabaseField.VALUE
>

/**
 * Core app log type.
 */
export type Log = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.CREATED_TIMESTAMP
  | DatabaseField.SEVERITY
  | DatabaseField.LABEL
  | DatabaseField.DETAILS
  | DatabaseField.MESSAGE
  | DatabaseField.STACK
>

/**
 * Example parent type.
 */
export type Example = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.NAME
  | DatabaseField.DESCRIPTION
  | DatabaseField.IS_FAVORITED
  | DatabaseField.IS_ENABLED
>

/**
 * Example child type.
 */
export type ExampleResult = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.CREATED_TIMESTAMP
  | DatabaseField.PARENT_ID
  | DatabaseField.NOTE
  | DatabaseField.NUMBER
>

/**
 * Test parent type.
 */
export type Test = Example

/**
 * Test child type.
 */
export type TestResult = ExampleResult
