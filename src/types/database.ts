import type { InferType, ObjectSchema } from 'yup'
import type { Icon } from '@/types/icons'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import type {
  anyChildValidator,
  exampleChildValidator,
  exampleParentValidator,
  logValidator,
  anyParentValidator,
  settingValidator,
  testChildValidator,
  testParentValidator,
} from '@/services/validators'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATABASE                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Must be a URL friendly slug
export enum Type {
  EXAMPLE = 'example',
  TEST = 'test',
}

export enum LogField {
  AUTO_ID = 'autoId',
  TIMESTAMP = 'timestamp',
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
}

export enum SettingField {
  KEY = 'key',
  VALUE = 'value',
}

export enum RecordField {
  // CORE
  ID = 'id',
  TIMESTAMP = 'timestamp',
  TYPE = 'type',
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

export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export enum SettingKey {
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

// Infering data record types from the validators
export type Log = InferType<typeof logValidator>
export type Setting = InferType<typeof settingValidator>
// Partials
export type ParentRecord = Partial<InferType<typeof anyParentValidator>>
export type ChildRecord = Partial<InferType<typeof anyChildValidator>>
// Record Specific
export type ExampleParent = InferType<typeof exampleParentValidator>
export type ExampleChild = InferType<typeof exampleChildValidator>
export type TestParent = InferType<typeof testParentValidator>
export type TestChild = InferType<typeof testChildValidator>

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATA SCHMEA                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export type TypeSchema = {
  type: Type
  icon: Icon
  parentLabelSingular: string
  parentLabelPlural: string
  parentValidator: ObjectSchema<any, any, any>
  parentTableColumns: QTableColumn[]
  parentFieldProps: FieldProps[]
  parentChartProps: ChartProps[]
  childLabelSingular: string
  childLabelPlural: string
  childValidator: ObjectSchema<any, any, any>
  childTableColumns: QTableColumn[]
  childFieldProps: FieldProps[]
  childChartProps: ChartProps[]
}

export type FieldProps = {
  field: RecordField | SettingField | LogField
  label: string
  desc?: string // Optional
  getDefault: () => any
  validator: ObjectSchema<any, any, any>
  validationMessage: string
  inspectFormat: (val: any) => string
  component?: ReturnType<typeof defineAsyncComponent> // Optional = not rendered
}

export type ChartProps = {
  component: ReturnType<typeof defineAsyncComponent>
}
