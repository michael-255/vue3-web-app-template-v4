/**
 * Database Version constant. Incrementing forces database recreation in the browser on next deployment.
 */
export const Version = 1 as const

/**
 * Database record Delimiter constant for the compound main index.
 * - Must be a URL friendly slug character like '-'
 */
export const Delimiter = '-' as const

/**
 * Database record Field enum defines all valid fields a Record model can have.
 */
export enum Field {
  // ALL
  PK = 'pk', // Primary Key (compound)
  SK = 'sk', // Secondary Key
  // LOGS
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  // SETTINGS
  VALUE = 'value',
  // PARENTS
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  // CHILDREN
  NOTE = 'note',
  // EXAMPLES
  PERCENTAGE = 'percentage',
  // TESTS
  TEST_NUMBER = 'testNumber',
}

/**
 * Database Records table indices for Dexie.
 * - Main index is the Primary Key (PK) and Secondary Key (SK) combination
 * - The '&' character means that value must be unique in the database
 */
export const RecordsIndices = `&[${Field.PK}+${Field.SK}], ${Field.PK}, ${Field.SK}` as const

/**
 * Database Categories enum defines Secondary Key (SK) literals that may also be used by the router.
 */
export enum Category {
  PARENT = 'parent',
  CHILD = 'child',
  // METADATA = 'metadata', // TODO
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PRIMARY KEY - COMPOUND PARTS                                          //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Type enum defines all valid Primary Key (PK) prefixes.
 * - Must be a URL friendly slug
 * - Don't create a Type that will match a startsWith() of another Type
 */
export enum Type {
  LOG = 'log', // Intentionally first in order for auto selection purposes
  SETTING = 'setting',
  EXAMPLE = 'example',
  TEST = 'test',
}

/**
 * Database record Id type used as a suffix for the Primary Key (PK). SettingId is also specified for clarity.
 * - Must be a URL friendly slug
 */
export type Id = string

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     ALL                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Primary Key (PK) type is the combination of the Type, Delimiter, and Id.
 * Settings and Logs use the Type alone.
 * - PK is used by all database records.
 * - Must be a URL friendly slug
 * @example const pk = `${type}${Delimiter}${id}`
 */
export type PK = string

/**
 * Database record Secondary Key (SK) type identifies a record using a Timestamp, SettingId, or Category.
 * - SK is used by all database records.
 * - Must be a URL friendly slug
 */
export type SK = number | SettingId | Category

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Severity enum for log records.
 */
export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Database record Label type for log records.
 */
export type Label = string

/**
 * Database record Details type for log records.
 * - Use care when accessing details since it is an 'any' type
 */
export type Details = any

/**
 * Database record Message type for log records should contain the message string from an error.
 */
export type Message = string

/**
 * Database record Message type for log records should contain the stack trace string from an error.
 */
export type Stack = string

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTINGS                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Value type for setting records. Settings can store many potential types.
 * - Update the supported types as you add new setting values
 */
export type Value = null | undefined | string | number | boolean | LogRetention

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENTS                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Name type is a required string for parent records.
 * - Must enforce a minimum length of 1
 */
export type Name = string

/**
 * Database record Description type for parent records.
 * - Must be at least an empty string
 */
export type Desc = string

/**
 * Database record Enabled type for parent records determines if the record displays on the dashboard.
 */
export type Enabled = boolean

/**
 * Database record Favorited type for parent records determines if the record is prioritized on the dashboard.
 */
export type Favorited = boolean

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILDREN                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Note type for child records allows users to add readable notes to their records.
 * - Must be at least an empty string
 */
export type Note = string

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     EXAMPLES                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Percentage type for example records.
 * - Must be between 0 and 100 with steps of 0.01
 */
export type Percentage = number

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     TESTS                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record TestNumber type for test records.
 * - Must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER with steps of 0.01
 */
export type TestNumber = number

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MISCELLANEOUS                                                         //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database SettingId enum defines all valid settings that the app supports.
 */
export enum SettingId {
  SHOW_INTRODUCTION = 'show-introduction',
  SHOW_DASHBOARD_DESCRIPTIONS = 'show-dashboard-descriptions',
  DARK_MODE = 'dark-mode',
  SHOW_ALL_DATA_COLUMNS = 'show-all-data-columns',
  SHOW_CONSOLE_LOGS = 'show-console-logs',
  SHOW_INFO_MESSAGES = 'show-info-messages',
  LOG_RETENTION_TIME = 'log-retention-time',
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
 * Database RecordIssue enum defines the detectable problems that the Record Curing tool can discover.
 * - None: None issue is used as a filter to be removed before displaying
 * - Unused: Parent record with no children records
 * - Orphaned: Child record with no parent record
 */
export enum RecordIssue {
  NONE = 'None',
  UNUSED = 'Unused',
  ORPHANED = 'Orphaned',
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
