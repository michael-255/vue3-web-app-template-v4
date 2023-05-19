import type { InferType, MixedSchema } from 'yup'
import type { Icon } from '@/types/icons'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import type {
  exampleChildValidator,
  exampleParentValidator,
  logValidator,
  recordValidator,
  settingValidator,
  testChildValidator,
  testParentValidator,
} from '@/services/validators'
import type { ChartOptions } from 'chart.js'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATABASE                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODELS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Infering user record types from the validators
export type Log = InferType<typeof logValidator>
export type Setting = InferType<typeof settingValidator>
export type ExampleParent = InferType<typeof exampleParentValidator>
export type ExampleChild = InferType<typeof exampleChildValidator>
export type TestParent = InferType<typeof testParentValidator>
export type TestChild = InferType<typeof testChildValidator>
export type Record = Partial<InferType<typeof recordValidator>>

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATA SCHMEA                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * How data in the app is set up for display and use.
 */
export type TypeSchema = {
  type: Type
  childType?: Type
  parentType?: Type
  databaseIndices: string
  group: Group
  icon: Icon
  labelSingular: string
  labelPlural: string
  validator: MixedSchema<any, any, any>
  supportedActions: Action[]
  visibleColumns: Field[]
  tableColumns: QTableColumn[]
  fieldProps: FieldProps[]
  chartProps: ChartProps[]
}

/**
 * Defined properties for each field.
 * - Component can be omitted for non-rendered fields
 */
export type FieldProps = {
  field: Field
  label: string
  desc: string
  getDefault: () => any
  validator: MixedSchema<any, any, any>
  validationMessage: string
  inspectFormat: (val: any) => string
  component?: ReturnType<typeof defineAsyncComponent>
}

/**
 * Defines properties for each chart.
 */
export type ChartProps = {
  component: ReturnType<typeof defineAsyncComponent>
}

/**
 * Defines actions that a database type can perform on the data view.
 */
export enum Action {
  INSPECT = 'Inspect',
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete',
  CHARTS = 'Charts',
}

/**
 * Defines the groups that a database type can belong to.
 */
export enum Group {
  PARENT = 'parent',
  CHILD = 'child',
  INTERNAL = 'internal',
}
