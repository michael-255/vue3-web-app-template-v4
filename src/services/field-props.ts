import { Limit } from '@/types/general'
import { getDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'
import { uid } from 'quasar'
import {
  type FieldProps,
  type LogLevel,
  allFields,
  autoIdSchema,
  logLevels,
  textSchema,
  idSchema,
  timestampSchema,
  nameSchema,
  textAreaSchema,
  booleanSchema,
  percentSchema,
} from '@/types/database'
import { z } from 'zod'

//
// LOG
//

const autoIdField: Readonly<FieldProps> = {
  field: allFields.Values.autoId,
  label: 'Auto Id',
  getDefault: () => undefined,
  validator: autoIdSchema,
  validationMessage: 'Invalid',
  inspectFormat: (val: number) => `${val || '-'}`,
  // Not rendered
}

const logLevelField: Readonly<FieldProps> = {
  field: allFields.Values.logLevel,
  label: 'Log Level',
  getDefault: () => undefined,
  validator: logLevels,
  validationMessage: 'Invalid',
  inspectFormat: (val: LogLevel) => `${val || '-'}`,
  // Not rendered
}

const labelField: Readonly<FieldProps> = {
  field: allFields.Values.label,
  label: 'Label',
  getDefault: () => undefined,
  validator: textSchema,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const detailsField: Readonly<FieldProps> = {
  field: allFields.Values.details,
  label: 'Details',
  getDefault: () => undefined,
  validator: z.any(),
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
  field: allFields.Values.message,
  label: 'Message',
  getDefault: () => undefined,
  validator: textSchema.optional(),
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const stackField: Readonly<FieldProps> = {
  field: allFields.Values.stack,
  label: 'Stack',
  getDefault: () => undefined,
  validator: textSchema.optional(),
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

//
// BASE
//

const idField: Readonly<FieldProps> = {
  field: allFields.Values.id,
  label: 'Id',
  getDefault: () => uid(),
  validator: idSchema,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const timestampField: Readonly<FieldProps> = {
  field: allFields.Values.timestamp,
  label: 'Created Date',
  getDefault: () => Date.now(),
  validator: timestampSchema,
  validationMessage: 'Must be a valid number',
  inspectFormat: (val: number) => getDisplayDate(val) || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTimestamp.vue')),
}

//
// CORE RECORD
//

const nameField: Readonly<FieldProps> = {
  field: allFields.Values.name,
  label: 'Name',
  getDefault: () => '',
  validator: nameSchema,
  validationMessage: `Name must be between ${Limit.MIN_NAME_LENGTH} and ${Limit.MAX_NAME_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputName.vue')),
}

const descField: Readonly<FieldProps> = {
  field: allFields.Values.desc,
  label: 'Description',
  getDefault: () => '',
  validator: textAreaSchema,
  validationMessage: `Description cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

const enabledField: Readonly<FieldProps> = {
  field: allFields.Values.enabled,
  label: 'Enabled',
  desc: 'Whether the record is enabled and shows up on the Dashboard and in other lists.',
  getDefault: () => true,
  validator: booleanSchema,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

const favoritedField: Readonly<FieldProps> = {
  field: allFields.Values.favorited,
  label: 'Favorited',
  desc: 'Whether the record is favorited and is prioritized on the Dashboard.',
  getDefault: () => false,
  validator: booleanSchema,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

//
// SUB RECORD
//

const coreIdField: Readonly<FieldProps> = {
  field: allFields.Values.coreId,
  label: 'Core Id',
  getDefault: () => undefined,
  validator: idSchema,
  validationMessage: `Invalid`,
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const noteField: Readonly<FieldProps> = {
  field: allFields.Values.note,
  label: 'Note',
  desc: 'Text note about the record that can be viewed on the Dashboard.',
  getDefault: () => '',
  validator: textAreaSchema,
  validationMessage: `Note cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

//
// RECORD SPECIFIC
//

const testIdsField: Readonly<FieldProps> = {
  field: allFields.Values.testIds,
  label: 'Tests',
  desc: 'Tests that are associated with the Example record.',
  getDefault: () => [],
  validator: z.array(idSchema),
  validationMessage: '* Required',
  inspectFormat: (val: string[]) => val?.join(', ') || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTestIds.vue')),
}

const percentField: Readonly<FieldProps> = {
  field: allFields.Values.percent,
  label: 'Percentage',
  getDefault: () => 0,
  validator: percentSchema,
  validationMessage: 'Percent must be between 0 and 100',
  inspectFormat: (val: number) => `${val}%`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputPercent.vue')),
}

//
// FIELD PROPS
//

const baseFieldProps: FieldProps[] = [idField, timestampField]
const coreFieldProps: FieldProps[] = [nameField, descField, enabledField, favoritedField]
const subFieldProps: FieldProps[] = [coreIdField, noteField]

export const logFieldProps: FieldProps[] = [
  autoIdField,
  timestampField,
  logLevelField,
  labelField,
  detailsField,
  messageField,
  stackField,
]

export const exampleCoreFieldProps: FieldProps[] = [
  ...baseFieldProps,
  ...coreFieldProps,
  testIdsField,
]
export const testCoreFieldProps: FieldProps[] = [...baseFieldProps, ...coreFieldProps]

export const exampleSubFieldProps: FieldProps[] = [...baseFieldProps, ...subFieldProps]
export const testSubFieldProps: FieldProps[] = [...baseFieldProps, ...subFieldProps, percentField]
