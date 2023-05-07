import { Field, Key, LogField, SettingField, Severity } from '@/types/database'
import { truncateString } from '@/utils/common'
import { getDisplayDate } from '@/utils/common'
import type { QTableColumn } from 'quasar'

/**
 * Creates standard properties for a QTable column.
 * @param field
 * @param required
 */
function makeStandardColumn(field: any, required: boolean = false) {
  return {
    name: field,
    align: 'left',
    sortable: true,
    required,
    field: (row: any) => row[field],
  } as QTableColumn
}

/**
 * Creates required properties for a hidden QTable column.
 * @param field
 * @param name
 */
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
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

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
//     SETTINGS                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const keyColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(SettingField.KEY),
  label: 'Key',
  format: (val: Key) => `${val}`,
}

const valueColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(SettingField.VALUE),
  label: 'Value',
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Hidden id column (required). Saves horizontal space on the Data view by hiding from user.
 * - Required for row operations (inspect, edit, delete, etc.)
 * - Must be index 0 for Data Table props.cols[0]
 */
const hiddenIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.ID, 'hiddenId'),
}

/**
 * Hidden timestamp column (required). Saves horizontal space on the Data view by hiding from user.
 * - Required for row operations (inspect, edit, delete, etc.)
 * - Must be index 1 for Data Table props.cols[1]
 */
const hiddenTimestampColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.TIMESTAMP, 'hiddenTimestamp'),
}

const idColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.ID),
  label: 'Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const timestampColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.TIMESTAMP),
  label: 'Created Date',
  format: (val: number) => getDisplayDate(val),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const nameColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.NAME),
  label: 'Name',
  format: (val: string) => truncateString(val, 30, '...'),
}

const descColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.DESC),
  label: 'Description',
  format: (val: string) => truncateString(val, 30, '...'),
}

const enabledColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.ENABLED),
  label: 'Enabled',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

const favoritedColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.FAVORITED),
  label: 'Favorited',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const noteColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.NOTE),
  label: 'Note',
  format: (val: string) => truncateString(val, 30, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const testIdsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.TEST_IDS),
  label: 'Test Ids',
  format: (val: string[]) => truncateString(JSON.stringify(val), 30, '...'),
}

const percentColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.PERCENT),
  label: 'Percent',
  format: (val: number) => `${val}%`,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     APP SCHEMA TABLE COLUMNS                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const logColumns: QTableColumn[] = [
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
  hiddenTimestampColumn,
  idColumn,
  timestampColumn,
  nameColumn,
  descColumn,
  enabledColumn,
  favoritedColumn,
  testIdsColumn,
]

export const exampleChildColumns: QTableColumn[] = [
  hiddenIdColumn,
  hiddenTimestampColumn,
  idColumn,
  timestampColumn,
  noteColumn,
]

export const testParentColumns: QTableColumn[] = [
  hiddenIdColumn,
  hiddenTimestampColumn,
  idColumn,
  timestampColumn,
  nameColumn,
  descColumn,
  enabledColumn,
  favoritedColumn,
]

export const testChildColumns: QTableColumn[] = [
  hiddenIdColumn,
  hiddenTimestampColumn,
  idColumn,
  timestampColumn,
  noteColumn,
  percentColumn,
]
