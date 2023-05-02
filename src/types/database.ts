import type { LogRetention, Optional } from '@/types/misc'

export const DatabaseVersion = 1

export enum DatabaseAction {
  INSPECT = 'Inspect',
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete',
  CHARTS = 'Charts',
}

export enum DatabaseType {
  LOG = 'Logs', // First in order
  SETTING = 'Settings',
  EXAMPLE = 'Examples',
  EXAMPLE_RESULT = 'Example Results',
  TEST = 'Tests',
  TEST_RESULT = 'Test Results',
}

export type DatabaseParentType = DatabaseType.EXAMPLE | DatabaseType.TEST

export type DatabaseChildType = DatabaseType.EXAMPLE_RESULT | DatabaseType.TEST_RESULT

export enum DatabaseCategory {
  INTERNAL = 'Internal',
  PARENT = 'Parent',
  CHILD = 'Child',
}

export enum DatabaseField {
  // All
  TYPE = 'type',
  ID = 'id',
  // Settings
  VALUE = 'value',
  // Logs
  CREATED_TIMESTAMP = 'createdTimestamp',
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  // Parent
  NAME = 'name',
  DESCRIPTION = 'description',
  IS_FAVORITED = 'isFavorited',
  IS_ENABLED = 'isEnabled',
  // Child
  PARENT_ID = 'parentId',
  NOTE = 'note',
  // Example & Test Results
  NUMBER = 'number',
}

export type SettingValue = Optional<string | number | boolean | DatabaseType | LogRetention>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Database Version constant. Incrementing forces database recreation in the browser on next deployment.
 */
export const Version = 1 as const

/**
 * Database record Delimiter constant for Primary Key (PK).
 * @note Must NOT be a slugified character (like '-') so it can be string split
 * @example
 * const pk = `test-str${Delimiter}abc-123` // -> 'test-str abc-123'
 * const arr = pk.split(Delimiter) // -> ['test-str', 'abc-123']
 */
export const Delimiter = ' ' as const

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
  DESCRIPTION = 'description',
  IS_ENABLED = 'isEnabled',
  IS_FAVORITED = 'isFavorited',
  // CHILDREN
  NOTE = 'note',
  // EXAMPLES
  NUMBER = 'number',
  // TESTS
  PERCENTAGE = 'percentage',
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PRIMARY KEY - COMPOUND PARTS                                          //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Type enum defines all valid Primary Key (PK) prefixes.
 * @note Must be a URL friendly slug
 */
export enum Type {
  LOG = 'log', // Intentionally first in order for auto selection purposes
  SETTING = 'setting',
  EXAMPLE = 'example',
  TEST = 'test',
}

/**
 * Database record Id type used as a suffix for the Primary Key (PK). SettingId is also specified for clarity.
 * @note Must be a URL friendly slug
 */
export type Id = SettingId | string

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     ALL                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Primary Key (PK) type is the combination of the Type, Delimiter, and Id.
 * Used by all database records.
 * @example const pk = `${type}${Delimiter}${id}`
 */
export type PK = string

/**
 * Database record Secondary Key (SK) type identifies a record using a Timestamp or the internal, metadata, or parent literals.
 * Internal, metadata, and parent records are unique, and don't require a Timestamp to further identify them.
 * Used by all database records.
 * @note Must be a URL friendly slug
 */
export type SK = number | 'internal' | 'metadata' | 'parent'

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
 * @note Use care when accessing details since it is an any type.
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
 * @note Update the supported types as you add new setting values
 */
export type Value = Optional<string | number | boolean | DatabaseType | LogRetention>

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENTS                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Name type is a required string for parent records.
 * @note Must enforce a minimum length of 1
 */
export type Name = string

/**
 * Database record Description type for parent records.
 * @note Must be at least an empty string
 */
export type Description = string

/**
 * Database record IsEnabled type for parent records.
 */
export type IsEnabled = boolean

/**
 * Database record IsFavorited type for parent records.
 */
export type IsFavorited = boolean

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILDREN                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Note type for child records.
 * @note Must be at least an empty string
 */
export type Note = string

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     EXAMPLES                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Number type for example records.
 * @note Must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER with steps of 0.01
 */
export type Number = number

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     TESTS                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database record Percentage type for test records.
 * @note Must be between 0 and 100 with steps of 0.01
 */
export type Percentage = number

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
 * Database Actions enum defines the actions that a Type can support and helps with routing controls.
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
