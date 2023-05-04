import type {
  DatabaseField,
  DatabaseAction,
  DatabaseCategory,
  DatabaseChildType,
  DatabaseParentType,
  DatabaseType,
  RecordIssue,
} from '@/types/database'
import type { Icon } from '@/types/icons'
import type { DatabaseRecord, Log, Record, Setting } from '@/types/models'
import type { QTableColumn } from 'quasar'

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
  MAX_ID_LENGTH = 50,
  MIN_ID_LENGTH = 1,
  MAX_NAME_LENGTH = 50,
  MIN_NAME_LENGTH = 1,
  MAX_DESCRIPTION_LENGTH = 500,
  MAX_NOTE_LENGTH = 500,
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
 * Used to display data from parent types on the dashboard.
 */
export type DashboardParent = {
  [DatabaseField.TYPE]: DatabaseParentType
  [DatabaseField.ID]: string
  [DatabaseField.NAME]: string
  [DatabaseField.DESCRIPTION]: Optional<string>
  [DatabaseField.IS_FAVORITED]: boolean
  previousNote?: string
  previousCreatedTimestamp?: number
  previousNumber?: number
}

/**
 * A core blueprint defines the properties of a database type and how the app can use them.
 */
export type CoreBlueprint = {
  readonly type: DatabaseType
  readonly typeSlug: string
  readonly category: DatabaseCategory
  readonly singularLabel: string
  readonly pluralLabel: string
  readonly icon: Icon
  readonly parentType: Optional<DatabaseParentType>
  readonly childType: Optional<DatabaseChildType>
  readonly supportedActions: DatabaseAction[]
  readonly chartBluprints: ChartBlueprint[]
  readonly fieldBlueprints: FieldBlueprint[]
  readonly visibleColumns: DatabaseField[]
  readonly tableColumns: QTableColumn[]
}

/**
 * Field properties commonly used together by app components.
 * Any field with no component doesn't support rendering for operations like create and update.
 */
export type FieldBlueprint = {
  readonly field: DatabaseField
  readonly label: string
  readonly inspectFormat: (val: any) => string
  readonly component?: any // Vue component used when rendering (if any)
}

/**
 * Chart properties required for chart components.
 */
export type ChartBlueprint = {
  readonly label: string
  readonly chartOptions: AppObject
  readonly component: any // Vue component used when rendering
}

/**
 * Record Curing page data item.
 */
export type CurableRecord = {
  [DatabaseField.TYPE]: DatabaseType
  [DatabaseField.ID]: string
  recordIssue: RecordIssue
}
