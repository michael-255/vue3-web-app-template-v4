import type { Icon } from '@/types/icons'
import type { Log, Record, Setting } from '@/types/models'
import type { QTableColumn } from 'quasar'
import type { Action, Field, Group, Type } from '@/types/database'

/**
 * App display name.
 */
export const AppName = 'Web App Template'

/**
 * App description used in useMeta and About page.
 */
export const AppDescription = `
${AppName} is a Vue 3 Typescript project created by michael-255 on GitHub.
This project was built to be the foundation for many web applications.
It is publicly available using the MIT License.
`

/**
 * App header color. Must be a valid Quasar color.
 * @see https://quasar.dev/style/color-palette
 */
export const AppHeaderColor = 'primary'

/**
 * Limits for various fields, inputs, and rules in the app.
 */
export enum Limit {
  MAX_FILE_SIZE = 1_000_000,
  MAX_TEXT_AREA_LENGTH = 500,
  MAX_NAME_LENGTH = 50,
  MIN_NAME_LENGTH = 1,
}

/**
 * Type that allows for a value to be null or undefined.
 */
export type Optional<T> = T | null | undefined

/**
 * Generic type for an object with string based properties storing any value.
 */
export type AppObject = { [x: string]: any }

/**
 * Milliseconds per time value.
 */
export enum Milliseconds {
  FOREVER = Number.MAX_SAFE_INTEGER,
  PER_YEAR = 31_536_000_000,
  PER_SIX_MONTHS = 15_552_000_000,
  PER_THREE_MONTHS = 7_776_000_000,
  PER_MONTH = 2_592_000_000,
  PER_WEEK = 604_800_000,
  PER_DAY = 86_400_000,
  PER_HOUR = 3_600_000,
  PER_MINUTE = 60_000,
  PER_SECOND = 1_000,
}

/**
 * Chart graphing time options.
 */
export enum ChartTime {
  ONE_MONTH = '1 Month',
  THREE_MONTHS = '3 Months',
  SIX_MONTHS = '6 Months',
  ONE_YEAR = 'One Year',
  ALL_TIME = 'All Time',
}

/**
 * Format of the JSON file from an export. Any table can be exported.
 */
export type ExportData = {
  appName: string
  exportedTimestamp: number
  logs: Log[]
  settings: Setting[]
  records: Record[]
}

/**
 * Card properties for Dashboard items.
 */
export type DashboardCard = {
  labelPlural?: string // Use as key on Dashboard page
  [Field.UID]: string
  [Field.GROUP_ID]: string
  [Field.TYPE]: Type
  [Field.GROUP]: Group
  [Field.TIMESTAMP]: number
  [Field.NAME]: string
  [Field.DESC]: string
  [Field.FAVORITED]: boolean
  previousNote?: string
  previousTimestamp?: number
}

/**
 * How data in the app is set up for display and use.
 */
export type AppSchema = {
  [Field.TYPE]: Type
  [Field.GROUP]: Group
  labelSingular: string
  labelPlural: string
  icon: Icon
  supportedActions: Action[]
  visibleColumns: Field[]
  tableColumns: QTableColumn[]
  fieldProps: FieldProps[]
  chartProps: ChartProps[]
}

/**
 * TODO
 */
export type FieldProps = {
  field: Field
  label: string
  desc: string
  getDefault: () => any
  validator: (val: any) => Promise<boolean>
  validationMessage: string
  inspectFormat: (val: any) => string
  component?: any // Vue component used when rendering, can be omitted
}

/**
 * TODO
 */
export type ChartProps = {
  label: string
  chartOptions: AppObject // TODO
  component: any // Vue component used when rendering
}
