/**
 * Defines both the Dexie table and record type.
 * - Must be a URL friendly slug
 */
export enum Type {
  LOG = 'log',
  SETTING = 'setting',
  EXAMPLE_PARENT = 'example-parent',
  EXAMPLE_CHILD = 'example-child',
  TEST_PARENT = 'test-parent',
  TEST_CHILD = 'test-child',
}

/**
 * Defines all potential record fields used by all types.
 */
export enum Field {
  // SHARED
  ID = 'id', // Parent, Child
  TIMESTAMP = 'timestamp', // Parent, Child, Log
  // LOG
  AUTO_ID = 'autoId',
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  // SETTING
  KEY = 'key',
  VALUE = 'value',
  // PARENT
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  // CHILD
  PARENT_ID = 'parentId',
  NOTE = 'note',
  // RECORD SPECIFIC
  TEST_IDS = 'testIds',
  PERCENT = 'percent',
}

/**
 * Defines log severity levels.
 */
export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Defines key strings for all valid settings the app supports.
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
 * Defines actions that a database type can perform.
 */
export enum Action {
  INSPECT = 'Inspect',
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete',
  CHARTS = 'Charts',
}

/**
 * Defines duration strings for log rentention.
 */
export enum LogRetention {
  ONE_WEEK = '7 Days',
  THREE_MONTHS = '90 Days',
  ONE_YEAR = 'One Year',
  FOREVER = 'Forever',
}

/**
 * Defines the groups that a database type can belong to.
 */
export enum Group {
  PARENT = 'parent',
  CHILD = 'child',
  INTERNAL = 'internal',
}
