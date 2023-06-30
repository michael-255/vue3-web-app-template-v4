import { Limit } from '@/types/general'
import { getDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'
import {
  type FieldProps,
  type LogLevel,
  allFields,
  idSchema,
  timestampSchema,
  nameSchema,
  textAreaSchema,
  booleanSchema,
  percentSchema,
} from '@/types/core'
import { z } from 'zod'

//
// LOG
//

const autoIdField: FieldProps = {
  field: allFields.Values.autoId,
  label: 'Auto Id',
  inspectFormat: (val: number) => `${val || '-'}`,
}

const logLevelField: FieldProps = {
  field: allFields.Values.logLevel,
  label: 'Log Level',
  inspectFormat: (val: LogLevel) => `${val || '-'}`,
}

const labelField: FieldProps = {
  field: allFields.Values.label,
  label: 'Label',
  inspectFormat: (val: string) => `${val || '-'}`,
}

const detailsField: FieldProps = {
  field: allFields.Values.details,
  label: 'Details',
  inspectFormat: (val: any) =>
    val
      ? Object.entries(val)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      : '-',
}

const messageField: FieldProps = {
  field: allFields.Values.message,
  label: 'Message',
  inspectFormat: (val: string) => `${val || '-'}`,
}

const stackField: FieldProps = {
  field: allFields.Values.stack,
  label: 'Stack',
  inspectFormat: (val: string) => `${val || '-'}`,
}

//
// BASE
//

const idField: FieldProps = {
  field: allFields.Values.id,
  label: 'Id',
  inspectFormat: (val: string) => `${val || '-'}`,
}

const timestampField: FieldProps = {
  field: allFields.Values.timestamp,
  label: 'Created Date',
  inspectFormat: (val: number) => getDisplayDate(val) || '-',
  getDefault: () => Date.now(),
  schema: timestampSchema,
  message: 'Must be a valid number',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTimestamp.vue')),
}

//
// CORE RECORD
//

const nameField: FieldProps = {
  field: allFields.Values.name,
  label: 'Name',
  inspectFormat: (val: string) => `${val || '-'}`,
  getDefault: () => '',
  schema: nameSchema,
  message: `Name must be between ${Limit.MIN_NAME} and ${Limit.MAX_NAME} characters`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputName.vue')),
}

const descField: FieldProps = {
  field: allFields.Values.desc,
  label: 'Description',
  inspectFormat: (val: string) => `${val || '-'}`,
  getDefault: () => '',
  schema: textAreaSchema,
  message: `Description cannot exceed ${Limit.MAX_TEXT_AREA} characters`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

const enabledField: FieldProps = {
  field: allFields.Values.enabled,
  label: 'Enabled',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  getDefault: () => true,
  desc: 'Whether the record is enabled and shows up on the Dashboard and in other lists.',
  schema: booleanSchema,
  message: '* Required',
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

const favoritedField: FieldProps = {
  field: allFields.Values.favorited,
  label: 'Favorited',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  getDefault: () => false,
  desc: 'Whether the record is favorited and is prioritized on the Dashboard.',
  schema: booleanSchema,
  message: '* Required',
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

//
// SUB RECORD
//

const coreIdField: FieldProps = {
  field: allFields.Values.coreId,
  label: 'Core Id',
  inspectFormat: (val: string) => `${val || '-'}`,
  getDefault: () => undefined,
  schema: idSchema,
  message: `Invalid`,
  // TODO
}

const noteField: FieldProps = {
  field: allFields.Values.note,
  label: 'Note',
  desc: 'Text note about the record that can be viewed on the Dashboard.',
  inspectFormat: (val: string) => `${val || '-'}`,
  getDefault: () => '',
  schema: textAreaSchema,
  message: `Note cannot exceed ${Limit.MAX_TEXT_AREA} characters`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

//
// RECORD SPECIFIC
//

const testIdsField: FieldProps = {
  field: allFields.Values.testIds,
  label: 'Tests',
  inspectFormat: (val: string[]) => val?.join(', ') || '-',
  getDefault: () => [],
  desc: 'Tests that are associated with the Example record.',
  schema: z.array(idSchema),
  message: '* Required',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTestIds.vue')),
}

const percentField: FieldProps = {
  field: allFields.Values.percent,
  label: 'Percentage',
  inspectFormat: (val: number) => `${val}%`,
  getDefault: () => 0,
  schema: percentSchema,
  message: 'Percent must be between 0 and 100',
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
