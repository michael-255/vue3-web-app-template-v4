import type {
  DatabaseField,
  DatabaseType,
  Description,
  Details,
  Field,
  IsEnabled,
  IsFavorited,
  Label,
  Message,
  Name,
  Note,
  PK,
  Percentage,
  SK,
  SettingId,
  SettingValue,
  Severity,
  Stack,
  TestNumber,
  Value,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Database Record interface. Contains all potential fields for a database record.
 * @note Cast the result to a more specific tpye if known. Cast back when saving or updating the database.
 */
export interface Record {
  // ALL
  [Field.PK]: PK
  [Field.SK]: SK
  // LOGS
  [Field.SEVERITY]?: Severity
  [Field.LABEL]?: Label
  [Field.DETAILS]?: Details
  [Field.MESSAGE]?: Message
  [Field.STACK]?: Stack
  // SETTINGS
  [Field.VALUE]?: Value
  // PARENTS
  [Field.NAME]?: Name
  [Field.DESCRIPTION]?: Description
  [Field.IS_ENABLED]?: IsEnabled
  [Field.IS_FAVORITED]?: IsFavorited
  // CHILDREN
  [Field.NOTE]?: Note
  // EXAMPLES
  [Field.TEST_NUMBER]?: TestNumber
  // TESTS
  [Field.PERCENTAGE]?: Percentage
}

// /**
//  * TODO
//  */
// export type Log = Pick<
//   Record,
//   Field.PK | Field.SK | Field.SEVERITY | Field.LABEL | Field.DETAILS | Field.MESSAGE | Field.STACK
// >

// /**
//  * TODO
//  */
// export type Setting = Pick<Record, Field.PK | Field.SK | Field.VALUE>

// /**
//  * TODO
//  */
// export type ExampleParent = Pick<
//   Record,
//   Field.PK | Field.SK | Field.NAME | Field.DESCRIPTION | Field.IS_ENABLED | Field.IS_FAVORITED
// >

// /**
//  * TODO
//  */
// export type TestParent = Pick<
//   Record,
//   Field.PK | Field.SK | Field.NAME | Field.DESCRIPTION | Field.IS_ENABLED | Field.IS_FAVORITED
// >

// /**
//  * TODO
//  */
// export type ExampleChild = Pick<Record, Field.PK | Field.SK | Field.NOTE | Field.TEST_NUMBER>

// /**
//  * TODO
//  */
// export type TestChild = Pick<Record, Field.PK | Field.SK | Field.NOTE | Field.PERCENTAGE>
