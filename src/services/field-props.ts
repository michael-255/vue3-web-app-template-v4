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
import { Field, Key, Severity, type FieldProps } from '@/types/database'
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
  field: Field.AUTO_ID,
  label: 'Auto Id',
  desc: 'Auto generated id.',
  getDefault: () => undefined,
  validator: autoIdValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: number) => `${val || '-'}`,
  // Not rendered
}

const severityField: Readonly<FieldProps> = {
  field: Field.SEVERITY,
  label: 'Severity',
  desc: 'Severity of the log.',
  getDefault: () => undefined,
  validator: severityValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: Severity) => `${val || '-'}`,
  // Not rendered
}

const labelField: Readonly<FieldProps> = {
  field: Field.LABEL,
  label: 'Label',
  desc: 'Label of the log.',
  getDefault: () => undefined,
  validator: labelValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const detailsField: Readonly<FieldProps> = {
  field: Field.DETAILS,
  label: 'Details',
  desc: 'Details of the log.',
  getDefault: () => undefined,
  validator: anyValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: any) => (val ? JSON.stringify(val) : '-'),
  // Not rendered
}

const messageField: Readonly<FieldProps> = {
  field: Field.MESSAGE,
  label: 'Message',
  desc: 'Message of the log.',
  getDefault: () => undefined,
  validator: textValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const stackField: Readonly<FieldProps> = {
  field: Field.STACK,
  label: 'Stack',
  desc: 'Stack trace of the log.',
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
  field: Field.KEY,
  label: 'Key',
  desc: 'Setting key identifies a valid setting.',
  getDefault: () => undefined,
  validator: keyValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: Key) => `${val || '-'}`,
  // Not rendered
}

const valueField: Readonly<FieldProps> = {
  field: Field.VALUE,
  label: 'Value',
  desc: 'Value assoicated with the setting key.',
  getDefault: () => undefined,
  validator: valueValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: any) => `${val || '-'}`,
  // Not rendered
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const idField: Readonly<FieldProps> = {
  field: Field.ID,
  label: 'Id',
  desc: 'Unique id for the record.',
  getDefault: () => uid(),
  validator: idValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const timestampField: Readonly<FieldProps> = {
  field: Field.TIMESTAMP,
  label: 'Created Date',
  desc: 'Date the record was created.',
  getDefault: () => Date.now(),
  validator: timestampValidator,
  validationMessage: 'Must be a valid number',
  inspectFormat: (val: number) => getDisplayDate(val),
  component: defineAsyncComponent(() => import('@/components/inputs/TimestampInput.vue')),
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
  validator: nameValidator,
  validationMessage: `Name must be between ${Limit.MIN_NAME_LENGTH} and ${Limit.MAX_NAME_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/NameInput.vue')),
}

const descField: Readonly<FieldProps> = {
  field: Field.DESC,
  label: 'Description',
  desc: 'Description of the record.',
  getDefault: () => '',
  validator: textAreaValidator,
  validationMessage: `Description cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TextAreaInput.vue')),
}

const enabledField: Readonly<FieldProps> = {
  field: Field.ENABLED,
  label: 'Enabled',
  desc: 'Whether the record is enabled and shows up on the Dashboard.',
  getDefault: () => true,
  validator: booleanValidator,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/ToggleInput.vue')),
}

const favoritedField: Readonly<FieldProps> = {
  field: Field.FAVORITED,
  label: 'Favorited',
  desc: 'Whether the record is favorited and is prioritized on the Dashboard.',
  getDefault: () => false,
  validator: booleanValidator,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/ToggleInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const parentIdField: Readonly<FieldProps> = {
  field: Field.PARENT_ID,
  label: 'Parent Id',
  desc: 'Parent this child record is associated with.',
  getDefault: () => undefined,
  validator: idValidator,
  validationMessage: `Invalid`,
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const noteField: Readonly<FieldProps> = {
  field: Field.NOTE,
  label: 'Note',
  desc: 'Customizable note about the child record.',
  getDefault: () => '',
  validator: textAreaValidator,
  validationMessage: `Note cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TextAreaInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const testIdsField: Readonly<FieldProps> = {
  field: Field.TEST_IDS,
  label: 'Tests',
  desc: 'Tests that are associated with the record.',
  getDefault: () => [],
  validator: testIdsValidator,
  validationMessage: '* Required',
  inspectFormat: (val: string[]) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/TestUidsInput.vue')),
}

const percentField: Readonly<FieldProps> = {
  field: Field.PERCENT,
  label: 'Percent',
  desc: 'Percentage value.',
  getDefault: () => 0,
  validator: percentValidator,
  validationMessage: 'Percent must be between 0 and 100',
  inspectFormat: (val: number) => `${val}%`,
  component: defineAsyncComponent(() => import('@/components/inputs/PercentInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     APP SCHEMA FIELD CARDS                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const coreFields: FieldProps[] = [idField, timestampField]

const parentFields: FieldProps[] = [nameField, descField, enabledField, favoritedField]

const childFields: FieldProps[] = [parentIdField, noteField] // TODO - Add ParentInfoField component???

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

export const exampleChildFields: FieldProps[] = [...coreFields, ...childFields]

export const testParentFields: FieldProps[] = [...coreFields, ...parentFields]

export const testChildFields: FieldProps[] = [...coreFields, ...childFields, percentField]
