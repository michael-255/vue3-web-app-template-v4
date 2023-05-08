///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     FIELDS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

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
  UID = 'uid',
  GROUP_ID = 'groupId',
  TYPE = 'type',
  GROUP = 'group',
  TIMESTAMP = 'timestamp',
  // LOGS
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  // PARENTS
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  // CHILDREN
  NOTE = 'note',
  // EXAMPLE PARENT
  TEST_UIDS = 'testUids',
  // EXAMPLE CHILD
  // ...
  // TEST PARENT
  // ...
  // TEST CHILD
  PERCENT = 'percent',
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD INDICES                                                        //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Database UniqueIdIndex uses uniqueness enforced uid.
 * - Used for exact record matches
 * - NEVER alter uid after creation
 * @example
 * `uid     groupId  type     group`
 * `abc-123 ex-12345 example  parent`
 * `efg-456 ex-12345 example  child`
 * `hij-789 ex-12345 example  child`
 * `klm-012 ex-12345 example  child`
 */
export const UniqueIdIndex = `&${Field.UID}` as const

/**
 * Database GroupIdIndex uses a repeatable uid.
 * - NEVER alter uid after creation
 */
export const GroupIdIndex = Field.GROUP_ID as const

/**
 * Database TypeIndex uses type to separate records.
 * - Used for any type specific query
 */
export const TypeIndex = Field.TYPE as const

/**
 * Database GroupIndex uses group parent, child, or internal to separate records.
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
  INTERNAL = 'internal',
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
