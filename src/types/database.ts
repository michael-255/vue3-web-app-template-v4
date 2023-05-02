import type { LogRetention, Optional } from '@/types/misc'

/**
 * Current database version. Change this to force a new database to be created for users.
 * Cannot use records from the previous database without importing it through the Settings if version changes.
 */
export const DatabaseVersion = 1

/**
 * All database types that separate the different types of records.
 * Using compound indices instead of splitting records by table.
 * The order here determines the order when retrieving these types.
 * Use the plural version of the type for the value.
 */
export enum DatabaseType {
  LOG = 'Logs', // First in order
  SETTING = 'Settings',
  EXAMPLE = 'Examples',
  EXAMPLE_RESULT = 'Example Results',
  TEST = 'Tests',
  TEST_RESULT = 'Test Results',
}

/**
 * Parent types in the database.
 */
export type DatabaseParentType = DatabaseType.EXAMPLE | DatabaseType.TEST

/**
 * Child types to parent types in the database.
 */
export type DatabaseChildType = DatabaseType.EXAMPLE_RESULT | DatabaseType.TEST_RESULT

/**
 * Each database type has a category. These determine how certain parts of the app treat them.
 */
export enum DatabaseCategory {
  INTERNAL = 'Internal',
  PARENT = 'Parent',
  CHILD = 'Child',
}

/**
 * All field names used by database records.
 * Update database models and database constants when adding new fields.
 */
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

/**
 * Setting values are restricted to the types needed.
 */
export type SettingValue = Optional<string | number | boolean | DatabaseType | LogRetention>

/**
 * The only valid setting ids.
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
 * Log severity levels.
 */
export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Actions that a database type can support. Used for action and routing controls.
 */
export enum DatabaseAction {
  INSPECT = 'Inspect',
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete',
  CHARTS = 'Charts',
}

/**
 * Record issues for record curing.
 * None: None issue is used as a filter to be removed before displaying.
 * Unused: Parent record with no child records.
 * Orphaned: Child record with no parent record.
 */
export enum RecordIssue {
  NONE = 'None',
  UNUSED = 'Unused',
  ORPHANED = 'Orphaned',
}
