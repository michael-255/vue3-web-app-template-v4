export const AppName = 'Web App Template'

export const AppDescription = `
${AppName} is a Vue 3 Typescript project created by michael-255 on GitHub.
This project was built to be the foundation for many web applications.
It is publicly available using the MIT License.
`

/**
 * @see https://quasar.dev/style/color-palette
 */
export const AppHeaderColor = 'primary'

export enum Limit {
  MAX_FILE_SIZE = 1_000_000,
  MAX_TEXT_AREA_LENGTH = 500,
  MAX_NAME_LENGTH = 50,
  MIN_NAME_LENGTH = 1,
}

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

export enum LogRetention {
  ONE_WEEK = '7 Days',
  THREE_MONTHS = '90 Days',
  ONE_YEAR = 'One Year',
  FOREVER = 'Forever',
}

export enum ChartTime {
  ONE_MONTH = '1 Month',
  THREE_MONTHS = '3 Months',
  SIX_MONTHS = '6 Months',
  ONE_YEAR = 'One Year',
  ALL_TIME = 'All Time',
}
