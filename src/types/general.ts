import { z } from 'zod'

export const routeNames = z.enum([
  'Dashboard',
  'DataLogs',
  'DataRecords',
  'Create',
  'Edit',
  'Charts',
  'Settings',
  'FAQ',
  'About',
  'Donate',
  'NotFound',
])

export enum Limit {
  MAX_FILE_SIZE = 1_000_000,
  MAX_TEXT_AREA = 500,
  MAX_NAME = 50,
  MIN_NAME = 1,
}

export enum Duration {
  Now = 1,
  'One Second' = 1_000,
  'One Minute' = 60_000,
  'One Hour' = 3_600_000,
  'One Day' = 86_400_000,
  'One Week' = 604_800_000,
  'One Month' = 2_592_000_000,
  'Three Months' = 7_776_000_000,
  'Six Months' = 15_552_000_000,
  'One Year' = 31_536_000_000,
  'All Time' = Number.MAX_SAFE_INTEGER,
  'Forever' = Number.MAX_SAFE_INTEGER,
}

/**
 * @see https://fonts.google.com/icons
 */
export enum Icon {
  // Severity
  DEBUG = 'bug_report',
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error',
  // Actions
  NONE = 'select',
  SAVE = 'save',
  CLOSE = 'close',
  ADD = 'add',
  REMOVE = 'remove',
  EDIT = 'edit',
  INSPECT = 'manage_search',
  DELETE = 'delete',
  CREATE = 'add_circle',
  NEW = 'add_box',
  CLEAR = 'delete_sweep',
  // Pages
  DONATE = 'redeem',
  DASHBOARD = 'dashboard',
  SETTINGS = 'settings',
  LOGS = 'plagiarism',
  CHARTS = 'bar_chart',
  RECORDS = 'storage',
  EXAMPLES = 'smart_toy',
  TESTS = 'cruelty_free',
  PERF = 'speed',
  // Misc
  LOCK = 'lock',
  NOTE = 'sticky_note_2',
  ADD_NOTE = 'post_add',
  DESCRIPTION = 'description',
  HELP = 'help_center',
  LIST = 'view_list',
  TABLE = 'table_chart',
  OPTIONS = 'tune',
  RECOMMEND = 'recommend',
  REMINDER = 'notifications_active',
  STOPWATCH = 'timer',
  CLOCK = 'access_time',
  CALENDAR_DATE = 'event',
  CALENDAR_CHECK = 'event_available',
  CALENDAR_CLEAR = 'event_busy',
  EXIT = 'exit_to_app',
  BACK = 'arrow_back',
  REFRESH = 'refresh',
  PREVIOUS = 'undo',
  CODE = 'code',
  WEB = 'language',
  MENU_STANDARD = 'menu',
  MENU_VERTICAL = 'more_vert',
  TOP_OF_PAGE = 'keyboard_arrow_up',
  FAVORITE_ON = 'star',
  FAVORITE_OFF = 'star_border',
}
