import { Type, type Field } from '@/types/database'
import type {
  Log,
  Setting,
  TestChild,
  TestParent,
  ExampleChild,
  ExampleParent,
} from '@/types/database'

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
 * Defines duration strings for log rentention.
 */
export enum LogRetention {
  ONE_WEEK = '7 Days',
  THREE_MONTHS = '90 Days',
  ONE_YEAR = 'One Year',
  FOREVER = 'Forever',
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
 * Format of the JSON file from an export.
 */
export type BackupData = {
  appName: string
  backupTimestamp: number
  [Type.LOG]: Log[]
  [Type.SETTING]: Setting[]
  [Type.EXAMPLE_PARENT]: ExampleParent[]
  [Type.EXAMPLE_CHILD]: ExampleChild[]
  [Type.TEST_PARENT]: TestParent[]
  [Type.TEST_CHILD]: TestChild[]
}

/**
 * Properties for parent cards on the Dashboard page.
 */
export type DashboardListCardProps = {
  type: Type
  [Field.ID]: string
  [Field.TIMESTAMP]: number
  [Field.NAME]: string
  [Field.DESC]: string
  [Field.FAVORITED]: boolean
  previousNote?: string
  previousTimestamp?: number
  // TODO -  Replace fields with these for simplicity???
  // parentRecord?: Record
  // previousChildRecord?: Record
}
