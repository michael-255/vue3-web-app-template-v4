///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     FIELDS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database LogField enum defines all fields a Log model can have.
 */
export enum LogField {
  AUTO_ID = 'autoId',
  TIMESTAMP = 'timestamp',
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
  PK = 'pk',
  SK = 'sk',
  TYPE = 'type',
  GROUP = 'group',
  TIMESTAMP = 'timestamp',
  // PARENTS
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  // CHILDREN
  NOTE = 'note',
  // EXAMPLE PARENT
  TEST_PKS = 'testPks',
  // EXAMPLE CHILD
  // ...
  // TEST PARENT
  // ...
  // TEST CHILD
  PERCENT = 'percent',
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
 * Database PrimaryKeyIndex uses uniqueness enforced uid.
 * - Records Table
 * - Used for exact record matches
 * - NEVER alter uid after creation
 * @example
 * `pk      sk     type     group`
 * `abc-123 ex-123 example  parent`
 * `efg-456 ex-123 example  child`
 * `hij-789 ex-123 example  child`
 * `klm-012 ex-123 example  child`
 */
export const PrimaryKeyIndex = `&${Field.PK}` as const

/**
 * Database SecondaryKeyIndex uses a repeatable uid.
 * - Records Table
 * - NEVER alter uid after creation
 */
export const SecondaryKeyIndex = Field.SK as const

/**
 * Database GroupIndex uses group 'parent' or 'child' to separate records.
 * - Records Table
 * - Used for Dashboard and Data view queries to get all records by a group
 */
export const GroupIndex = Field.GROUP as const

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MISCELLANEOUS                                                         //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

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
 * Database Setting Key enum defines all valid settings that the app supports.
 */
export enum Key {
  SHOW_WELCOME = 'show-welcome-overlay',
  SHOW_DESCRIPTIONS = 'show-dashboard-descriptions',
  DARK_MODE = 'dark-mode',
  SHOW_CONSOLE_LOGS = 'show-console-logs',
  SHOW_INFO_MESSAGES = 'show-info-messages',
  LOG_RETENTION_TIME = 'log-retention-time',
}

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
 * Database Record Group enum defines the record relationship with its peer records.
 * - Must be a URL friendly slug
 */
export enum Group {
  PARENT = 'parent',
  CHILD = 'child',
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
