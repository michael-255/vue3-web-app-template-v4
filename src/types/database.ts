import type { InferType, ObjectSchema, AnySchema } from 'yup'
import type { Icon } from '@/types/icons'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import type {
  anyChildValidator,
  logValidator,
  anyParentValidator,
  settingValidator,
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

export enum Field {
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
  // CORE
  ID = 'id',
  TIMESTAMP = 'timestamp',
  TYPE = 'type',
  // PARENT
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  LAST_CHILD = 'lastChild',
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

// Infering record types from validators
export type Log = InferType<typeof logValidator>
export type Setting = InferType<typeof settingValidator>
export type ParentRecord = Partial<InferType<typeof anyParentValidator>>
export type ChildRecord = Partial<InferType<typeof anyChildValidator>>

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATA SCHMEA                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export type TypeSchema = {
  type: Type
  icon: Icon
  chartProps: ChartProps[]
  parentLabelSingular: string
  parentLabelPlural: string
  parentValidator: ObjectSchema<any, any, any>
  parentTableColumns: QTableColumn[]
  parentFieldProps: FieldProps[]
  childLabelSingular: string
  childLabelPlural: string
  childValidator: ObjectSchema<any, any, any>
  childTableColumns: QTableColumn[]
  childFieldProps: FieldProps[]
}

export type FieldProps = {
  field: Field
  label: string
  desc?: string // Optional
  getDefault: () => any
  validator: AnySchema<any, any, any>
  validationMessage: string
  inspectFormat: (val: any) => string
  component?: ReturnType<typeof defineAsyncComponent> // Optional = not rendered
}

export type ChartProps = {
  component: ReturnType<typeof defineAsyncComponent>
}
