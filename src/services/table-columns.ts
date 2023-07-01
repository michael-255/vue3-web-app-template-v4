import type { QTableColumn } from 'quasar'
import { truncateString, getDisplayDate } from '@/utils/common'
import { type LogLevel, type AnyField, allFields } from '@/types/core'

function makeStandardColumn(field: AnyField, required: boolean = false) {
  return {
    name: field,
    align: 'left',
    sortable: true,
    required,
    field: (row: any) => row[field],
  } as QTableColumn
}

// For hidden required porperties
function makeHiddenColumn(field: AnyField, name: string) {
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
  ...makeHiddenColumn(allFields.Values.autoId, 'hiddenAutoId'),
}

const autoIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.autoId),
  label: 'Auto Id',
  format: (val: number) => `${val}`,
}

const logLevelColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.logLevel),
  label: 'Log Level',
  format: (val: LogLevel) => `${val}`,
}

const labelColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.logLabel),
  label: 'Log Label',
  format: (val: string) => truncateString(val, 30, '...'),
}

const detailsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.details),
  label: 'Details',
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

const messageColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.errorMessage),
  label: 'Message',
  format: (val: string) => truncateString(val, 30, '...'),
}

const stackColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.stackTrace),
  label: 'Stack',
  format: (val: string) => truncateString(val, 30, '...'),
}

//
// ALL RECORDS
//

// Access in QTable via props.cols[0]
const hiddenIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(allFields.Values.id, 'hiddenId'),
}

const idColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.id),
  label: 'Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const timestampColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.timestamp),
  label: 'Created Date',
  format: (val: number) => getDisplayDate(val),
}

//
// CORE RECORDS
//

const nameColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.name),
  label: 'Name',
  format: (val: string) => truncateString(val, 30, '...'),
}

const descColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.desc),
  label: 'Description',
  format: (val: string) => truncateString(val, 30, '...'),
}

const enabledColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.enabled),
  label: 'Enabled',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

const favoritedColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.favorited),
  label: 'Favorited',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

//
// SUB RECORDS
//

const coreIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.coreId),
  label: 'Core Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const noteColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.note),
  label: 'Note',
  format: (val: string) => truncateString(val, 30, '...'),
}

//
// RECORD SPECIFIC
//

const testIdsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.testIds),
  label: 'Tests',
  format: (val: string[]) => truncateString(JSON.stringify(val), 30, '...'),
}

const percentColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(allFields.Values.percent),
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
