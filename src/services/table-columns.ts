import { LogField, SettingField, RecordField, SettingKey, Severity } from '@/types/database'
import { truncateString, getDisplayDate } from '@/utils/common'
import type { QTableColumn } from 'quasar'

function makeStandardColumn(field: any, required: boolean = false) {
  return {
    name: field,
    align: 'left',
    sortable: true,
    required,
    field: (row: any) => row[field],
  } as QTableColumn
}

// For hidden required porperties
function makeHiddenColumn(field: any, name: string) {
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

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Access in QTable via props.cols[0]
const hiddenAutoIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(LogField.AUTO_ID, 'hiddenAutoId'),
}

const autoIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(LogField.AUTO_ID),
  label: 'Auto Id',
  format: (val: number) => `${val}`,
}

const severityColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(LogField.SEVERITY),
  label: 'Severity',
  format: (val: Severity) => `${val}`,
}

const labelColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(LogField.LABEL),
  label: 'Label',
  format: (val: string) => truncateString(val, 30, '...'),
}

const detailsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(LogField.DETAILS),
  label: 'Details',
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

const messageColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(LogField.MESSAGE),
  label: 'Message',
  format: (val: string) => truncateString(val, 30, '...'),
}

const stackColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(LogField.STACK),
  label: 'Stack',
  format: (val: string) => truncateString(val, 30, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const keyColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(SettingField.KEY),
  label: 'Setting',
  format: (val: SettingKey) => `${val}`,
}

const valueColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(SettingField.VALUE),
  label: 'Value',
  format: (val: SettingKey) => truncateString(JSON.stringify(val), 30, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Access in QTable via props.cols[0]
const hiddenIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(RecordField.ID, 'hiddenId'),
}

const idColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.ID),
  label: 'Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const timestampColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.TIMESTAMP),
  label: 'Created Date',
  format: (val: number) => getDisplayDate(val),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const nameColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.NAME),
  label: 'Name',
  format: (val: string) => truncateString(val, 30, '...'),
}

const descColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.DESC),
  label: 'Description',
  format: (val: string) => truncateString(val, 30, '...'),
}

const enabledColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.ENABLED),
  label: 'Enabled',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

const favoritedColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.FAVORITED),
  label: 'Favorited',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const parentIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.PARENT_ID),
  label: 'Parent Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const noteColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.NOTE),
  label: 'Note',
  format: (val: string) => truncateString(val, 30, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const testIdsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.TEST_IDS),
  label: 'Tests',
  format: (val: string[]) => truncateString(JSON.stringify(val), 30, '...'),
}

const percentColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(RecordField.PERCENT),
  label: 'Percentage',
  format: (val: number) => `${val}%`,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     TABLE COLUMNS                                                         //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const hiddenColumnNames: Readonly<string[]> = [hiddenIdColumn, hiddenAutoIdColumn].map(
  (c) => c.name
)

const coreColumns: Readonly<QTableColumn[]> = [idColumn, timestampColumn]
const parentColumns: Readonly<QTableColumn[]> = [
  nameColumn,
  descColumn,
  enabledColumn,
  favoritedColumn,
]
const childColumns: Readonly<QTableColumn[]> = [parentIdColumn, noteColumn]

export const logColumns: QTableColumn[] = [
  hiddenAutoIdColumn,
  autoIdColumn,
  timestampColumn,
  severityColumn,
  labelColumn,
  detailsColumn,
  messageColumn,
  stackColumn,
]
export const settingColumns: QTableColumn[] = [keyColumn, valueColumn]

export const exampleParentColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...parentColumns,
  testIdsColumn,
]
export const testParentColumns: QTableColumn[] = [hiddenIdColumn, ...coreColumns, ...parentColumns]

export const exampleChildColumns: QTableColumn[] = [hiddenIdColumn, ...coreColumns, ...childColumns]
export const testChildColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...childColumns,
  percentColumn,
]
