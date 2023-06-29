import type { QTableColumn } from 'quasar'
import { truncateString, getDisplayDate } from '@/utils/common'
import {
  logFieldsSchema,
  type LogField,
  type RecordField,
  type LogLevel,
  recordFieldsSchema,
} from '@/types/database'

function makeStandardColumn(field: LogField | RecordField, required: boolean = false) {
  return {
    name: field,
    align: 'left',
    sortable: true,
    required,
    field: (row: any) => row[field],
  } as QTableColumn
}

// For hidden required porperties
function makeHiddenColumn(field: LogField | RecordField, name: string) {
  return {
    name,
    label: '',
    align: 'left',
    sortable: false,
    required: true,
    field: (row: any) => row[field],
    format: (val: any) => `${val}`,
    style: 'display: none', // Hide column in QTable
  } as QTableColumn
}

//
// LOG
//

// Access in QTable via props.cols[0]
const hiddenAutoIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(logFieldsSchema.Values.autoId, 'hiddenAutoId'),
}

const autoIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(logFieldsSchema.Values.autoId),
  label: 'Auto Id',
  format: (val: number) => `${val}`,
}

const logLevelColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(logFieldsSchema.Values.logLevel),
  label: 'Log Level',
  format: (val: LogLevel) => `${val}`,
}

const labelColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(logFieldsSchema.Values.label),
  label: 'Label',
  format: (val: string) => truncateString(val, 30, '...'),
}

const detailsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(logFieldsSchema.Values.details),
  label: 'Details',
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

const messageColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(logFieldsSchema.Values.message),
  label: 'Message',
  format: (val: string) => truncateString(val, 30, '...'),
}

const stackColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(logFieldsSchema.Values.stack),
  label: 'Stack',
  format: (val: string) => truncateString(val, 30, '...'),
}

//
// ALL RECORDS
//

// Access in QTable via props.cols[0]
const hiddenIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(recordFieldsSchema.Values.id, 'hiddenId'),
}

const idColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.id),
  label: 'Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const timestampColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.timestamp),
  label: 'Created Date',
  format: (val: number) => getDisplayDate(val),
}

//
// CORE RECORDS
//

const nameColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.name),
  label: 'Name',
  format: (val: string) => truncateString(val, 30, '...'),
}

const descColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.desc),
  label: 'Description',
  format: (val: string) => truncateString(val, 30, '...'),
}

const enabledColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.enable),
  label: 'Enabled',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

const favoritedColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.favorite),
  label: 'Favorited',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

//
// SUB RECORDS
//

const coreIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.coreId),
  label: 'Core Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const noteColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.note),
  label: 'Note',
  format: (val: string) => truncateString(val, 30, '...'),
}

//
// RECORD SPECIFIC
//

const testIdsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.testIds),
  label: 'Tests',
  format: (val: string[]) => truncateString(JSON.stringify(val), 30, '...'),
}

const percentColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(recordFieldsSchema.Values.percent),
  label: 'Percentage',
  format: (val: number) => `${val}%`,
}

//
// TABLE COLUMNS
//

export const hiddenColumnNames: Readonly<string[]> = [hiddenIdColumn, hiddenAutoIdColumn].map(
  (c) => c.name
)

const baseColumns: Readonly<QTableColumn[]> = [idColumn, timestampColumn]
const coreColumns: Readonly<QTableColumn[]> = [
  ...baseColumns,
  nameColumn,
  descColumn,
  enabledColumn,
  favoritedColumn,
]
const subColumns: Readonly<QTableColumn[]> = [...baseColumns, coreIdColumn, noteColumn]

export const logColumns: QTableColumn[] = [
  hiddenAutoIdColumn,
  autoIdColumn,
  timestampColumn,
  logLevelColumn,
  labelColumn,
  detailsColumn,
  messageColumn,
  stackColumn,
]

export const exampleCoreColumns: QTableColumn[] = [hiddenIdColumn, ...coreColumns, testIdsColumn]
export const testCoreColumns: QTableColumn[] = [hiddenIdColumn, ...coreColumns]

export const exampleSubColumns: QTableColumn[] = [hiddenIdColumn, ...subColumns]
export const testSubColumns: QTableColumn[] = [hiddenIdColumn, ...subColumns, percentColumn]
