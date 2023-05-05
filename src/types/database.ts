/**
 * Database LogField enum defines all fields a Log model can have.
 */
export enum LogField {
  AUTO_ID = 'autoId',
  TIMESTAMP = 'timestamp', // match
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
}

/**
 * Database SettingField enum defines all fields a Setting model can have.
 */
export enum SettingField {
  KEY = 'key',
  VALUE = 'value',
}

/**
 * Database Field enum defines all fields a Record model can have.
 */
export enum Field {
  // RECORDS
  ID = 'id',
  TIMESTAMP = 'timestamp', // match
  TYPE = 'type',
  RELATION = 'relation',
  // PARENTS
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  // CHILDREN
  NOTE = 'note',
  // EXAMPLE PARENT
  TEST_IDS = 'testIds',
  // EXAMPLE CHILD
  // ...
  // TEST PARENT
  TEST_INPUTS = 'testInputs',
  // TEST CHILD
  PERCENT = 'percent',
  TEST_NUMBER = 'testNumber',
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATABASE INDICES                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database LogIndex uses an auto incrementing (++) auto id as its Primary Key.
 * - Logs Table
 */
export const LogIndex = `++${LogField.AUTO_ID}` as const

/**
 * Database SettingIndex uses key as its Primary Key.
 * - Settings Table
 */
export const SettingIndex = SettingField.KEY as const

/**
 * Database PrimaryCompoundIndex uses uniqueness enforced (&) compound id and timestamp.
 * - Records Table
 * - Used for exact record matches
 * - Should NEVER alter the id after creation
 * - Validate and provide warnings when altering the timestamp
 * @example
 * `id      timestamp   type     relation`
 * `ex-123  1234567890  example  parent`
 * `ex-123  1234567891  example  child`
 * `ex-123  1234567892  example  child`
 * `ex-123  1234567893  example  child`
 */
export const PrimaryCompoundIndex = `&[${Field.ID}+${Field.TIMESTAMP}]` as const

/**
 * Database IdIndex uses id.
 * - Records Table
 * - Used for Parent with Children queries
 * - Filter on relation to get Parent
 * - Filter on relation with reverse sorting to grab previous Child Record
 */
export const IdIndex = Field.ID as const

/**
 * Database RelationIndex uses relation.
 * - Records Table
 * - Used for Dashboard and Data view queries to get all records by relation
 */
export const RelationIndex = Field.RELATION as const

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Log AutoId type is an auto incrementing number used as the Primary Key for log records.
 */
export type AutoId = number

/**
 * Database Record Timestamp type is a required number for log and normal records.
 */
export type Timestamp = number

/**
 * Database Log Severity enum.
 */
export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Database Log Label type.
 */
export type Label = string

/**
 * Database Log Details type.
 * - Use care when accessing details since it is an 'any' type
 */
export type Details = any

/**
 * Database Log Message type should contain the message string from an error.
 */
export type Message = string

/**
 * Database Log Message type should contain the stack trace string from an error.
 */
export type Stack = string

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTINGS                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Setting Key enum defines all valid settings that the app supports.
 */
export enum Key {
  SHOW_INTRODUCTION = 'show-introduction',
  SHOW_DASHBOARD_DESCRIPTIONS = 'show-dashboard-descriptions',
  DARK_MODE = 'dark-mode',
  SHOW_ALL_DATA_COLUMNS = 'show-all-data-columns',
  SHOW_CONSOLE_LOGS = 'show-console-logs',
  SHOW_INFO_MESSAGES = 'show-info-messages',
  LOG_RETENTION_TIME = 'log-retention-time',
}

/**
 * Database Setting Value type. Settings can store many potential types.
 * - Update the supported types as you add new setting values
 */
export type Value = null | undefined | string | number | boolean | LogRetention

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORDS                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Record Id type should normally be a random uid.
 * - Must be a URL friendly slug
 */
export type Id = string

// Reusing Timestamp from Logs

/**
 * Database Record Type enum defines all types of data stored in the database.
 * - Must be a URL friendly slug
 */
export enum Type {
  LOG = 'log', // Intentionally first in order for auto selection purposes
  SETTING = 'setting',
  EXAMPLE = 'example',
  TEST = 'test',
}

/**
 * Database Record Relation enum defines the record relationship with its peer records.
 * - Must be a URL friendly slug
 * - Parent and Metadata records are the top level records (with a 0 timestamp to prevent duplication)
 * - Child records are the second level records which use a timestamp to ensure uniqueness
 */
export enum Relation {
  PARENT = 'parent',
  CHILD = 'child',
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENTS                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Parent Name type is a required string.
 * - Must enforce a minimum length of 1
 */
export type Name = string

/**
 * Database Parent Description type.
 * - Must be at least an empty string
 */
export type Desc = string

/**
 * Database Parent Enabled type for parent records determines if the record displays on the dashboard.
 */
export type Enabled = boolean

/**
 * Database Parent Favorited type for parent records determines if the record is prioritized on the dashboard.
 */
export type Favorited = boolean

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILDREN                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Child Note type allows users to add readable notes to their records.
 * - Must be at least an empty string
 */
export type Note = string

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     EXAMPLE CHILD                                                         //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Example Child Percentage type.
 * - Must be between 0 and 100 with steps of 0.01
 */
export type Percentage = number

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     TEST CHILD                                                            //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Test Child TestNumber type.
 * - Must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER with steps of 0.01
 */
export type TestNumber = number

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MISCELLANEOUS                                                         //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database Test Input enum defines the inputs that are selectable for the Test Parent.
 */
export enum TestInput {
  PERCENT = 'Percentage',
  TEST_NUMBER = 'Test Number',
}

/**
 * Database Actions enum defines the actions that a Type can support and helps with action page routing.
 */
export enum Action {
  INSPECT = 'Inspect',
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete',
  CHARTS = 'Charts',
}

/**
 * Database LogRetention enum duration strings.
 */
export enum LogRetention {
  ONE_WEEK = '7 Days',
  THREE_MONTHS = '90 Days',
  ONE_YEAR = 'One Year',
  FOREVER = 'Forever',
}
