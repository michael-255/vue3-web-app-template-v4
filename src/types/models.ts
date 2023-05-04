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
  Percentage,
  Stack,
  TestNumber,
  Id,
  Type,
  Timestamp,
  Relation,
  SettingField,
  LogField,
  Key,
  Value,
} from '@/types/database'

/**
 * Database Log table interface. Contains all potential fields for a database Log.
 */
export interface Log {
  [LogField.AUTO_ID]?: number // Handled by Dexie
  [LogField.TIMESTAMP]: number
  [LogField.SEVERITY]: Severity
  [LogField.LABEL]: Label
  [LogField.DETAILS]?: Details
  [LogField.MESSAGE]?: Message
  [LogField.STACK]?: Stack
}

/**
 * Database Setting table interface. Contains all potential fields for a database Setting.
 */
export interface Setting {
  [SettingField.KEY]: Key
  [SettingField.VALUE]: Value
}

/**
 * Database Record table interface. Contains all potential fields for a database Record.
 * - Cast the result to a more specific type if known after fetching from the database
 * - Cast back to a generic Record when saving or updating the database record if necessary
 */
export interface Record {
  // RECORDS
  [Field.ID]: Id
  [Field.TIMESTAMP]: Timestamp
  [Field.TYPE]: Type
  [Field.RELATION]: Relation
  // PARENTS
  [Field.NAME]?: Name
  [Field.DESC]?: Desc
  [Field.ENABLED]?: Enabled
  [Field.FAVORITED]?: Favorited
  // CHILDREN
  [Field.NOTE]?: Note
  // EXAMPLE PARENT
  // ...
  // TEST CHILD
  // ...
  // EXAMPLE CHILD
  [Field.PERCENTAGE]?: Percentage
  // TEST CHILD
  [Field.TEST_NUMBER]?: TestNumber
}

type MandatoryFields = Required<
  Pick<Record, Field.ID | Field.TIMESTAMP | Field.TYPE | Field.RELATION>
>
type RequiredParentFields = Required<
  Pick<Record, Field.NAME | Field.DESC | Field.ENABLED | Field.FAVORITED>
>
type RequiredChildFields = Required<Pick<Record, Field.NOTE>>

export type ExampleParent = MandatoryFields & RequiredParentFields // ...
export type ExampleChild = MandatoryFields &
  RequiredChildFields &
  Partial<Pick<Record, Field.PERCENTAGE>>

export type TestParent = MandatoryFields & RequiredParentFields // ...
export type TestChild = MandatoryFields &
  RequiredChildFields &
  Partial<Pick<Record, Field.TEST_NUMBER>>
