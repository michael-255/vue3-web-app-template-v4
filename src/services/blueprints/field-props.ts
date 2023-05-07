import {
  autoIdValidator,
  detailsValidator,
  enabledValidator,
  favoritedValidator,
  keyValidator,
  labelValidator,
  messageValidator,
  nameValidator,
  textAreaValidator,
  percentValidator,
  severityValidator,
  stackValidator,
  testPksValidator,
  timestampValidator,
  valueValidator,
} from '@/services/Validators'
import { Field, Key, LogField, SettingField, Severity } from '@/types/database'
import { Limit, type FieldProps } from '@/types/misc'
import { getDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const autoIdField: Readonly<FieldProps> = {
  field: LogField.AUTO_ID,
  label: 'Auto Id',
  desc: 'Auto-generated integer id.',
  getDefault: () => undefined,
  validator: (val: number) => autoIdValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: number) => `${val}`,
  component: null,
}

const severityField: Readonly<FieldProps> = {
  field: LogField.SEVERITY,
  label: 'Severity',
  desc: 'Issue severity level.',
  getDefault: () => undefined,
  validator: (val: Severity) => severityValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: Severity) => `${val}`,
  component: null,
}

const labelField: Readonly<FieldProps> = {
  field: LogField.LABEL,
  label: 'Label',
  desc: 'Label or error code message.',
  getDefault: () => undefined,
  validator: (val: string) => labelValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

const detailsField: Readonly<FieldProps> = {
  field: LogField.DETAILS,
  label: 'Details',
  desc: 'Customizable additional details about the issue.',
  getDefault: () => undefined,
  validator: (val: any) => detailsValidator.isValid(val),
  validationMessage: '',
  inspectFormat: (val: any) => JSON.stringify(val),
  component: null,
}

const messageField: Readonly<FieldProps> = {
  field: LogField.MESSAGE,
  label: 'Message',
  desc: 'Error message.',
  getDefault: () => undefined,
  validator: (val: string) => messageValidator.isValid(val),
  validationMessage: '',
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

const stackField: Readonly<FieldProps> = {
  field: LogField.STACK,
  label: 'Stack',
  desc: 'Error stack trace.',
  getDefault: () => undefined,
  validator: (val: string) => stackValidator.isValid(val),
  validationMessage: '',
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTINGS                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const keyField: Readonly<FieldProps> = {
  field: SettingField.KEY,
  label: 'Key',
  desc: 'Key of the setting.',
  getDefault: () => undefined,
  validator: (val: Key) => keyValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: Key) => `${val}`,
  component: null,
}

const valueField: Readonly<FieldProps> = {
  field: SettingField.VALUE,
  label: 'Value',
  desc: 'Value of the setting.',
  getDefault: () => undefined,
  validator: (val: any) => valueValidator.isValid(val),
  validationMessage: '',
  inspectFormat: (val: any) => `${val}`,
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const timestampField: Readonly<FieldProps> = {
  field: Field.TIMESTAMP,
  label: 'Created Date',
  desc: 'Date the record was created.',
  getDefault: () => Date.now(),
  validator: (val: number) => timestampValidator.isValid(val),
  validationMessage: 'Must be valid numeric timestamp',
  inspectFormat: (val: number) => getDisplayDate(val),
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const nameField: Readonly<FieldProps> = {
  field: Field.NAME,
  label: 'Name',
  desc: 'Name of the record.',
  getDefault: () => '',
  validator: (val: string) => nameValidator.isValid(val),
  validationMessage: `Name must be between ${Limit.MIN_NAME_LENGTH} and ${Limit.MAX_NAME_LENGTH} characters`,
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/inputs/NameInput.vue')),
}

const descField: Readonly<FieldProps> = {
  field: Field.DESC,
  label: 'Description',
  desc: 'Description of the record.',
  getDefault: () => '',
  validator: (val: string) => textAreaValidator.isValid(val),
  validationMessage: `Description cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TextAreaInput.vue')),
}

const enabledField: Readonly<FieldProps> = {
  field: Field.ENABLED,
  label: 'Enabled',
  desc: 'Whether the record is enabled and shows up on the Dashboard.',
  getDefault: () => true,
  validator: (val: string) => enabledValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/ToggleInput.vue')),
}

const favoritedField: Readonly<FieldProps> = {
  field: Field.FAVORITED,
  label: 'Favorited',
  desc: 'Whether the record is favorited and is prioritized on the Dashboard.',
  getDefault: () => false,
  validator: (val: string) => favoritedValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/ToggleInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const noteField: Readonly<FieldProps> = {
  field: Field.NOTE,
  label: 'Note',
  desc: 'Customizable note about the record.',
  getDefault: () => '',
  validator: (val: string) => textAreaValidator.isValid(val),
  validationMessage: `Note cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TextAreaInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const testPksField: Readonly<FieldProps> = {
  field: Field.TEST_PKS,
  label: 'Tests',
  desc: 'Tests that are associated with the record.',
  getDefault: () => [],
  validator: (val: string[]) => testPksValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: string[]) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TestPksInput.vue')),
}

const percentField: Readonly<FieldProps> = {
  field: Field.PERCENT,
  label: 'Percent',
  desc: 'Percentage value.',
  getDefault: () => 0,
  validator: (val: number) => percentValidator.isValid(val),
  validationMessage: 'Percent must be between 0 and 100',
  inspectFormat: (val: number) => `${val}%`,
  component: defineAsyncComponent(() => import('@/components/inputs/PercentInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     APP SCHEMA FIELD CARDS                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

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

export const exampleParentFields: FieldProps[] = [
  timestampField,
  nameField,
  descField,
  enabledField,
  favoritedField,
  testPksField,
]

export const exampleChildFields: FieldProps[] = [timestampField, noteField]

export const testParentFields: FieldProps[] = [
  timestampField,
  nameField,
  descField,
  enabledField,
  favoritedField,
]

export const testChildFields: FieldProps[] = [timestampField, noteField, percentField]
