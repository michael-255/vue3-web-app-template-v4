import { DatabaseField, DatabaseType, Severity } from '@/types/database'
import type { AppObject } from '@/types/misc'
import { truncateString } from '@/utils/common'
import { getDisplayDate } from '@/utils/common'
import type { QTableColumn } from 'quasar'

/*
This file contains table column objects used by the Data view for the QTable component.
Do NOT mutate these objects as they are used by multiple components.
*/

/**
 * Hidden Type column (required).
 * Used for data table row operations. User doesn't need to see this which saves horizontal space on the Data view.
 * (Must be at position 0 for Data Table props.cols[0])
 */
export const requiredTypeColumn: QTableColumn = {
  name: 'hiddenType',
  label: '',
  align: 'left',
  sortable: false,
  required: true,
  field: (row: any) => row[DatabaseField.TYPE],
  format: (val: DatabaseType) => `${val}`,
  style: 'display: none', // Hide column in QTable
}

/**
 * Hidden Id column (required).
 * Used for data table row operations. User doesn't need to see this which saves horizontal space on the Data view.
 * (Must be at position 1 for Data Table props.cols[1])
 */
export const requiredIdColumn: QTableColumn = {
  name: 'hiddenId',
  label: '',
  align: 'left',
  sortable: false,
  required: true,
  field: (row: any) => row[DatabaseField.ID],
  format: (val: string) => `${val}`,
  style: 'display: none', // Hide column in QTable
}

/**
 * Type column used by all records.
 */
export const typeColumn: QTableColumn = {
  name: DatabaseField.TYPE,
  label: 'Type',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.TYPE],
  format: (val: DatabaseType) => `${val}`,
}

/**
 * Partial Id column used by all records. Format truncates id to provide more horizontal space on Data view.
 */
export const partialIdColumn: QTableColumn = {
  name: DatabaseField.ID,
  label: 'Id*',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.ID],
  format: (val: string) => truncateString(val, 8, '*'),
}

/**
 * Full Id column used by Settings since setting ids are short readable slugs.
 */
export const idColumn: QTableColumn = {
  name: DatabaseField.ID,
  label: 'Id',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.ID],
  format: (val: string) => `${val}`,
}

/**
 * Created Date column used by Logs and child records. Format converts the timestamp to a readable date.
 */
export const createdTimestampColumn: QTableColumn = {
  name: DatabaseField.CREATED_TIMESTAMP,
  label: 'Created Date',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.CREATED_TIMESTAMP],
  format: (val: number) => getDisplayDate(val),
}

/**
 * Setting Value column used by Settings. Format truncates value in case it is to large.
 */
export const valueColumn: QTableColumn = {
  name: DatabaseField.VALUE,
  label: 'Setting Value',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.VALUE],
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Severity column used by Logs.
 */
export const severityColumn: QTableColumn = {
  name: DatabaseField.SEVERITY,
  label: 'Severity',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.SEVERITY],
  format: (val: Severity) => `${val}`,
}

/**
 * Label column used by Logs. Format truncates value in case it is to large.
 */
export const labelColumn: QTableColumn = {
  name: DatabaseField.LABEL,
  label: 'Label',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.LABEL],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Details column used by Logs. Format truncates value in case it is to large.
 */
export const detailsColumn: QTableColumn = {
  name: DatabaseField.DETAILS,
  label: 'Details',
  align: 'left',
  sortable: false,
  required: false,
  field: (row: any) => row[DatabaseField.DETAILS],
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Message column used by Logs. Format truncates value in case it is to large.
 */
export const messageColumn: QTableColumn = {
  name: DatabaseField.MESSAGE,
  label: 'Message',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.MESSAGE],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Stack column used by Logs. Format truncates value in case it is to large.
 */
export const stackColumn: QTableColumn = {
  name: DatabaseField.STACK,
  label: 'Stack',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.STACK],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Name column used by parent records. Format truncates value in case it is to large.
 */
export const nameColumn: QTableColumn = {
  name: DatabaseField.NAME,
  label: 'Name',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.NAME],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Description column used by parent records. Format truncates value in case it is to large.
 */
export const descriptionColumn: QTableColumn = {
  name: DatabaseField.DESCRIPTION,
  label: 'Description',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.DESCRIPTION],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Favorite column used by parent records. Format converts boolean to Yes/No.
 */
export const favoritedColumn: QTableColumn = {
  name: DatabaseField.IS_FAVORITED,
  label: 'Favorited',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.IS_FAVORITED],
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

/**
 * Enabled column used by parent records. Format converts boolean to Yes/No.
 */
export const enabledColumn: QTableColumn = {
  name: DatabaseField.IS_ENABLED,
  label: 'Enabled',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.IS_ENABLED],
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

/**
 * Parent Id column used by child records. Format truncates id to provide more horizontal space on Data view.
 */
export const parentIdColumn: QTableColumn = {
  name: DatabaseField.PARENT_ID,
  label: 'Parent Id*',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.PARENT_ID],
  format: (val: string) => truncateString(val, 8, '*'),
}

/**
 * Note column used by child records. Format truncates value in case it is to large.
 */
export const noteColumn: QTableColumn = {
  name: DatabaseField.NOTE,
  label: 'Note',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.NOTE],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Number column used by child records.
 */
export const numberColumn: QTableColumn = {
  name: DatabaseField.NUMBER,
  label: 'Number',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.NUMBER],
  format: (val: number) => `${val}`,
}
