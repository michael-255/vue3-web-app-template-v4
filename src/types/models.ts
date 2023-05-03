import type {
  Severity,
  Desc,
  Details,
  Enabled,
  Favorited,
  Field,
  Label,
  Message,
  Name,
  Note,
  PK,
  Percentage,
  SK,
  Stack,
  TestNumber,
  Value,
} from '@/types/database'

/**
 * Database Record interface. Contains all potential fields for a database record.
 * - Cast the result to a more specific type if known after fetching from the database
 * - Cast back to a generic Record when saving or updating the database record if necessary
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
  [Field.DESC]?: Desc
  [Field.ENABLED]?: Enabled
  [Field.FAVORITED]?: Favorited
  // CHILDREN
  [Field.NOTE]?: Note
  // EXAMPLES
  [Field.PERCENTAGE]?: Percentage
  // TESTS
  [Field.TEST_NUMBER]?: TestNumber
}

/**
 * Database Log record type.
 * - pk: log-uid
 * - sk: timestamp
 */
export type Log = RequiredLog & OptionalLog

type RequiredLog = Required<Pick<Record, Field.PK | Field.SK | Field.SEVERITY | Field.LABEL>>
type OptionalLog = Partial<Pick<Record, Field.DETAILS | Field.MESSAGE | Field.STACK>>

/**
 * Database Setting record type.
 * - pk: setting
 * - sk: SettingId
 */
export type Setting = RequiredSetting & OptionalSetting

type RequiredSetting = Required<Pick<Record, Field.PK | Field.SK>>
type OptionalSetting = Partial<Pick<Record, Field.VALUE>>

/**
 * Database ExampleParent record type.
 * - pk: example-uid
 * - sk: parent
 */
export type ExampleParent = RequiredExampleParent

type RequiredExampleParent = Required<
  Pick<Record, Field.PK | Field.SK | Field.NAME | Field.DESC | Field.ENABLED | Field.FAVORITED>
>

/**
 * Database TestParent record type.
 * - pk: test-uid
 * - sk: parent
 */
export type TestParent = RequiredTestParent

type RequiredTestParent = Required<
  Pick<Record, Field.PK | Field.SK | Field.NAME | Field.DESC | Field.ENABLED | Field.FAVORITED>
>

/**
 * Database ExampleChild record type.
 * - pk: example-uid
 * - sk: timestamp
 */
export type ExampleChild = RequiredExampleChild

type RequiredExampleChild = Required<
  Pick<Record, Field.PK | Field.SK | Field.NOTE | Field.TEST_NUMBER>
>

/**
 * Database TestChild record type.
 * - pk: test-uid
 * - sk: timestamp
 */
export type TestChild = RequiredTestChild

type RequiredTestChild = Required<Pick<Record, Field.PK | Field.SK | Field.NOTE | Field.PERCENTAGE>>
