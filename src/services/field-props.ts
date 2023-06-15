import {
  nameValidator,
  textAreaValidator,
  percentValidator,
  timestampValidator,
  idValidator,
  booleanValidator,
  autoIdValidator,
  severityValidator,
  labelValidator,
  anyValidator,
  textValidator,
  keyValidator,
  valueValidator,
  testIdsValidator,
} from '@/services/validators'
import {
  Severity,
  type FieldProps,
  LogField,
  SettingField,
  SettingKey,
  RecordField,
} from '@/types/database'
import { Limit } from '@/types/general'
import { getDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'
import { uid } from 'quasar'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const autoIdField: Readonly<FieldProps> = {
  field: LogField.AUTO_ID,
  label: 'Auto Id',
  getDefault: () => undefined,
  validator: autoIdValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: number) => `${val || '-'}`,
  // Not rendered
}

const severityField: Readonly<FieldProps> = {
  field: LogField.SEVERITY,
  label: 'Severity',
  getDefault: () => undefined,
  validator: severityValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: Severity) => `${val || '-'}`,
  // Not rendered
}

const labelField: Readonly<FieldProps> = {
  field: LogField.LABEL,
  label: 'Label',
  getDefault: () => undefined,
  validator: labelValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const detailsField: Readonly<FieldProps> = {
  field: LogField.DETAILS,
  label: 'Details',
  getDefault: () => undefined,
  validator: anyValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: any) =>
    val
      ? Object.entries(val)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      : '-',
  // Not rendered
}

const messageField: Readonly<FieldProps> = {
  field: LogField.MESSAGE,
  label: 'Message',
  getDefault: () => undefined,
  validator: textValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const stackField: Readonly<FieldProps> = {
  field: LogField.STACK,
  label: 'Stack',
  getDefault: () => undefined,
  validator: textValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const keyField: Readonly<FieldProps> = {
  field: SettingField.KEY,
  label: 'Key',
  getDefault: () => undefined,
  validator: keyValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: SettingKey) => `${val || '-'}`,
  // Not rendered
}

const valueField: Readonly<FieldProps> = {
  field: SettingField.VALUE,
  label: 'Value',
  getDefault: () => undefined,
  validator: valueValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: any) => `${val ?? '-'}`, // ?? so booleans won't be '-' when false
  // Not rendered
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const idField: Readonly<FieldProps> = {
  field: RecordField.ID,
  label: 'Id',
  getDefault: () => uid(),
  validator: idValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const timestampField: Readonly<FieldProps> = {
  field: RecordField.TIMESTAMP,
  label: 'Created Date',
  getDefault: () => Date.now(),
  validator: timestampValidator,
  validationMessage: 'Must be a valid number',
  inspectFormat: (val: number) => getDisplayDate(val) || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTimestamp.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const nameField: Readonly<FieldProps> = {
  field: RecordField.NAME,
  label: 'Name',
  getDefault: () => '',
  validator: nameValidator,
  validationMessage: `Name must be between ${Limit.MIN_NAME_LENGTH} and ${Limit.MAX_NAME_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputName.vue')),
}

const descField: Readonly<FieldProps> = {
  field: RecordField.DESC,
  label: 'Description',
  getDefault: () => '',
  validator: textAreaValidator,
  validationMessage: `Description cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

const enabledField: Readonly<FieldProps> = {
  field: RecordField.ENABLED,
  label: 'Enabled',
  desc: 'Whether the record is enabled and shows up on the Dashboard and in other lists.',
  getDefault: () => true,
  validator: booleanValidator,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

const favoritedField: Readonly<FieldProps> = {
  field: RecordField.FAVORITED,
  label: 'Favorited',
  desc: 'Whether the record is favorited and is prioritized on the Dashboard.',
  getDefault: () => false,
  validator: booleanValidator,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const parentIdField: Readonly<FieldProps> = {
  field: RecordField.PARENT_ID,
  label: 'Parent Id',
  getDefault: () => undefined,
  validator: idValidator,
  validationMessage: `Invalid`,
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const noteField: Readonly<FieldProps> = {
  field: RecordField.NOTE,
  label: 'Note',
  desc: 'Text note about the record that can be viewed on the Dashboard.',
  getDefault: () => '',
  validator: textAreaValidator,
  validationMessage: `Note cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const testIdsField: Readonly<FieldProps> = {
  field: RecordField.TEST_IDS,
  label: 'Tests',
  desc: 'Tests that are associated with the Example record.',
  getDefault: () => [],
  validator: testIdsValidator,
  validationMessage: '* Required',
  inspectFormat: (val: string[]) => val?.join(', ') || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTestIds.vue')),
}

const percentField: Readonly<FieldProps> = {
  field: RecordField.PERCENT,
  label: 'Percentage',
  getDefault: () => 0,
  validator: percentValidator,
  validationMessage: 'Percent must be between 0 and 100',
  inspectFormat: (val: number) => `${val}%`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputPercent.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     APP SCHEMA FIELD CARDS                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const coreFields: FieldProps[] = [idField, timestampField]
const parentFields: FieldProps[] = [nameField, descField, enabledField, favoritedField]
const childFields: FieldProps[] = [parentIdField, noteField]

export const logFields: FieldProps[] = [
  autoIdField,
  timestampField,
  severityField,
  labelField,
  detailsField,
  messageField,
  stackField,
]
export const settingFields: FieldProps[] = [keyField, valueField]

export const exampleParentFields: FieldProps[] = [...coreFields, ...parentFields, testIdsField]
export const testParentFields: FieldProps[] = [...coreFields, ...parentFields]

export const exampleChildFields: FieldProps[] = [...coreFields, ...childFields]
export const testChildFields: FieldProps[] = [...coreFields, ...childFields, percentField]
