import { Field, Severity } from '@/types/database'
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
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Hidden Type column (required). Saves horizontal space on the Data view by hiding from user.
 * - Required for some row operations
 * - Must be index 0 (props.cols[index])
 * @example
 * action(props.cols[0])
 */
const hiddenTypeColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.TYPE, 'hiddenType'),
}

/**
 * Hidden Group column (required). Saves horizontal space on the Data view by hiding from user.
 * - Required for some row operations
 * - Must be index 1 (props.cols[index])
 * @example
 * action(props.cols[1])
 */
const hiddenGroupColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.GROUP, 'hiddenGroup'),
}

/**
 * Hidden Group Id column (required). Saves horizontal space on the Data view by hiding from user.
 * - Required for some row operations
 * - Must be index 2 (props.cols[index])
 * @example
 * action(props.cols[2])
 */
const hiddenGroupIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.GROUP_ID, 'hiddenGroupId'),
}

/**
 * Hidden UID column (required). Saves horizontal space on the Data view by hiding from user.
 * - Required for some row operations
 * - Must be index 3 (props.cols[index])
 * @example
 * action(props.cols[3])
 */
const hiddenUidColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.UID, 'hiddenUid'),
}

const hiddenColumns: Readonly<QTableColumn[]> = [
  hiddenTypeColumn,
  hiddenGroupColumn,
  hiddenGroupIdColumn,
  hiddenUidColumn,
]

const uidColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.UID),
  label: 'Unique Id',
  format: (val: string) => truncateString(val, 8, '*'),
}

const groupIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.GROUP_ID),
  label: 'Group Id',
  format: (val: string) => truncateString(val, 8, '*'),
}

const timestampColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.TIMESTAMP),
  label: 'Created Date',
  format: (val: number) => getDisplayDate(val),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const severityColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.SEVERITY),
  label: 'Severity',
  format: (val: Severity) => `${val}`,
}

const labelColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.LABEL),
  label: 'Label',
  format: (val: string) => truncateString(val, 30, '...'),
}

const detailsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.DETAILS),
  label: 'Details',
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

const messageColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.MESSAGE),
  label: 'Message',
  format: (val: string) => truncateString(val, 30, '...'),
}

const stackColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.STACK),
  label: 'Stack',
  format: (val: string) => truncateString(val, 30, '...'),
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

const testPksColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.TEST_UIDS),
  label: 'Tests',
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
  ...hiddenColumns,
  uidColumn,
  groupIdColumn,
  timestampColumn,
  severityColumn,
  labelColumn,
  detailsColumn,
  messageColumn,
  stackColumn,
]

export const exampleParentColumns: QTableColumn[] = [
  ...hiddenColumns,
  uidColumn,
  groupIdColumn,
  timestampColumn,
  nameColumn,
  descColumn,
  enabledColumn,
  favoritedColumn,
  testPksColumn,
]

export const exampleChildColumns: QTableColumn[] = [
  ...hiddenColumns,
  uidColumn,
  groupIdColumn,
  timestampColumn,
  noteColumn,
]

export const testParentColumns: QTableColumn[] = [
  ...hiddenColumns,
  uidColumn,
  groupIdColumn,
  timestampColumn,
  nameColumn,
  descColumn,
  enabledColumn,
  favoritedColumn,
]

export const testChildColumns: QTableColumn[] = [
  ...hiddenColumns,
  uidColumn,
  groupIdColumn,
  timestampColumn,
  noteColumn,
  percentColumn,
]
