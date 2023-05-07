import {
  autoIdValidator,
  descValidator,
  detailsValidator,
  enabledValidator,
  favoritedValidator,
  keyValidator,
  labelValidator,
  messageValidator,
  nameValidator,
  noteValidator,
  percentValidator,
  severityValidator,
  stackValidator,
  testPksValidator,
  timestampValidator,
  valueValidator,
} from '@/services/Validators'
import { Field, Key, LogField, SettingField, Severity } from '@/types/database'
import type { FieldProps } from '@/types/misc'
import { getDisplayDate } from '@/utils/common'
// import { defineAsyncComponent } from 'vue'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const autoIdField: Readonly<FieldProps> = {
  name: LogField.AUTO_ID,
  label: 'Auto Id',
  default: () => autoIdValidator.default(() => undefined),
  booleanValidator: (val: number) => autoIdValidator.isValid(val),
  strictValidator: (val: number) => autoIdValidator.validate(val),
  inspectFormat: (val: number) => `${val}`,
  component: null,
}

const severityField: Readonly<FieldProps> = {
  name: LogField.SEVERITY,
  label: 'Severity',
  default: () => severityValidator.default(() => undefined),
  booleanValidator: (val: Severity) => severityValidator.isValid(val),
  strictValidator: (val: Severity) => severityValidator.validate(val),
  inspectFormat: (val: Severity) => `${val}`,
  component: null,
}

const labelField: Readonly<FieldProps> = {
  name: LogField.LABEL,
  label: 'Label',
  default: () => labelValidator.default(() => undefined),
  booleanValidator: (val: string) => labelValidator.isValid(val),
  strictValidator: (val: string) => labelValidator.validate(val),
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

const detailsField: Readonly<FieldProps> = {
  name: LogField.DETAILS,
  label: 'Details',
  default: () => detailsValidator.default(() => undefined),
  booleanValidator: (val: any) => detailsValidator.isValid(val),
  strictValidator: (val: any) => detailsValidator.validate(val),
  inspectFormat: (val: any) => JSON.stringify(val),
  component: null,
}

const messageField: Readonly<FieldProps> = {
  name: LogField.MESSAGE,
  label: 'Message',
  default: () => messageValidator.default(() => undefined),
  booleanValidator: (val: string) => messageValidator.isValid(val),
  strictValidator: (val: string) => messageValidator.validate(val),
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

const stackField: Readonly<FieldProps> = {
  name: LogField.STACK,
  label: 'Stack',
  default: () => stackValidator.default(() => undefined),
  booleanValidator: (val: string) => stackValidator.isValid(val),
  strictValidator: (val: string) => stackValidator.validate(val),
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTINGS                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const keyField: Readonly<FieldProps> = {
  name: SettingField.KEY,
  label: 'Key',
  default: () => keyValidator.default(() => undefined),
  booleanValidator: (val: Key) => keyValidator.isValid(val),
  strictValidator: (val: Key) => keyValidator.validate(val),
  inspectFormat: (val: Key) => `${val}`,
  component: null,
}

const valueField: Readonly<FieldProps> = {
  name: SettingField.VALUE,
  label: 'Value',
  default: () => valueValidator.default(() => undefined),
  booleanValidator: (val: any) => valueValidator.isValid(val),
  strictValidator: (val: any) => valueValidator.validate(val),
  inspectFormat: (val: any) => `${val}`,
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * TODO: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputId.vue')),
 */
const timestampField: Readonly<FieldProps> = {
  name: Field.TIMESTAMP,
  label: 'Created Date',
  default: () => timestampValidator.default(() => Date.now()),
  booleanValidator: (val: number) => timestampValidator.isValid(val),
  strictValidator: (val: number) => timestampValidator.validate(val),
  inspectFormat: (val: number) => getDisplayDate(val),
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const nameField: Readonly<FieldProps> = {
  name: Field.NAME,
  label: 'Name',
  default: () => nameValidator.default(() => ''),
  booleanValidator: (val: string) => nameValidator.isValid(val),
  strictValidator: (val: string) => nameValidator.validate(val),
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

const descField: Readonly<FieldProps> = {
  name: Field.DESC,
  label: 'Description',
  default: () => descValidator.default(() => ''),
  booleanValidator: (val: string) => descValidator.isValid(val),
  strictValidator: (val: string) => descValidator.validate(val),
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

const enabledField: Readonly<FieldProps> = {
  name: Field.ENABLED,
  label: 'Enabled',
  default: () => enabledValidator.default(() => true),
  booleanValidator: (val: string) => enabledValidator.isValid(val),
  strictValidator: (val: string) => enabledValidator.validate(val),
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: null,
}

const favoritedField: Readonly<FieldProps> = {
  name: Field.FAVORITED,
  label: 'Favorited',
  default: () => favoritedValidator.default(() => false),
  booleanValidator: (val: string) => favoritedValidator.isValid(val),
  strictValidator: (val: string) => favoritedValidator.validate(val),
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const noteField: Readonly<FieldProps> = {
  name: Field.NOTE,
  label: 'Note',
  default: () => noteValidator.default(() => ''),
  booleanValidator: (val: string) => noteValidator.isValid(val),
  strictValidator: (val: string) => noteValidator.validate(val),
  inspectFormat: (val: string) => `${val}`,
  component: null,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const testPksField: Readonly<FieldProps> = {
  name: Field.TEST_PKS,
  label: 'Tests',
  default: () => testPksValidator.default(() => []),
  booleanValidator: (val: string[]) => testPksValidator.isValid(val),
  strictValidator: (val: string[]) => testPksValidator.validate(val),
  inspectFormat: (val: string[]) => `${val}`,
  component: null,
}

const percentField: Readonly<FieldProps> = {
  name: Field.PERCENT,
  label: 'Percent',
  default: () => percentValidator.default(() => 0),
  booleanValidator: (val: number) => percentValidator.isValid(val),
  strictValidator: (val: number) => percentValidator.validate(val),
  inspectFormat: (val: number) => `${val}%`,
  component: null,
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
