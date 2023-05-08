import {
  detailsValidator,
  enabledValidator,
  favoritedValidator,
  labelValidator,
  messageValidator,
  nameValidator,
  textAreaValidator,
  percentValidator,
  severityValidator,
  stackValidator,
  testPksValidator,
  timestampValidator,
} from '@/services/Validators'
import { Field, Severity } from '@/types/database'
import { Limit, type FieldProps } from '@/types/misc'
import { getDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'

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
  component: defineAsyncComponent(() => import('@/components/inputs/TimestampInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const severityField: Readonly<FieldProps> = {
  field: Field.SEVERITY,
  label: 'Severity',
  desc: 'Issue severity level.',
  getDefault: () => undefined,
  validator: (val: Severity) => severityValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: Severity) => `${val || '-'}`,
}

const labelField: Readonly<FieldProps> = {
  field: Field.LABEL,
  label: 'Label',
  desc: 'Label or error code message.',
  getDefault: () => undefined,
  validator: (val: string) => labelValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: string) => `${val || '-'}`,
}

const detailsField: Readonly<FieldProps> = {
  field: Field.DETAILS,
  label: 'Details',
  desc: 'Customizable additional details about the issue.',
  getDefault: () => undefined,
  validator: (val: any) => detailsValidator.isValid(val),
  validationMessage: '',
  inspectFormat: (val: any) => (val ? JSON.stringify(val) : '-'),
}

const messageField: Readonly<FieldProps> = {
  field: Field.MESSAGE,
  label: 'Message',
  desc: 'Error message.',
  getDefault: () => undefined,
  validator: (val: string) => messageValidator.isValid(val),
  validationMessage: '',
  inspectFormat: (val: string) => `${val || '-'}`,
}

const stackField: Readonly<FieldProps> = {
  field: Field.STACK,
  label: 'Stack',
  desc: 'Error stack trace.',
  getDefault: () => undefined,
  validator: (val: string) => stackValidator.isValid(val),
  validationMessage: '',
  inspectFormat: (val: string) => `${val || '-'}`,
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
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/NameInput.vue')),
}

const descField: Readonly<FieldProps> = {
  field: Field.DESC,
  label: 'Description',
  desc: 'Description of the record.',
  getDefault: () => '',
  validator: (val: string) => textAreaValidator.isValid(val),
  validationMessage: `Description cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
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
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TextAreaInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const testPksField: Readonly<FieldProps> = {
  field: Field.TEST_UIDS,
  label: 'Tests',
  desc: 'Tests that are associated with the record.',
  getDefault: () => [],
  validator: (val: string[]) => testPksValidator.isValid(val),
  validationMessage: '* Required',
  inspectFormat: (val: string[]) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TestUidsInput.vue')),
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
  timestampField,
  severityField,
  labelField,
  detailsField,
  messageField,
  stackField,
]

export const exampleParentFields: FieldProps[] = [
  nameField,
  descField,
  timestampField,
  enabledField,
  favoritedField,
  testPksField,
]

export const exampleChildFields: FieldProps[] = [timestampField, noteField]

export const testParentFields: FieldProps[] = [
  nameField,
  descField,
  timestampField,
  enabledField,
  favoritedField,
]

export const testChildFields: FieldProps[] = [timestampField, noteField, percentField]
