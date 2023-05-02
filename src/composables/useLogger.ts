import { Icon } from '@/types/icons'
import { DatabaseType, SettingId, Severity } from '@/types/database'
import useNotifications from '@/composables/useNotifications'
import Logger from '@/services/Logger'
import DB from '@/services/LocalDatabase'

/**
 * Composable with utilities for logging that include notifications and database entries.
 */
export default function useLogger() {
  const { notify } = useNotifications()

  /**
   * Log object with functions attached.
   */
  const log = {
    /**
     * Print always outputs to the console. Ignores DB settings. Does NOT save DB logs during call.
     * @param message
     * @param args
     */
    print: (message: any, ...args: any) => {
      Logger.print(message, ...args)
    },
    /**
     * Debug without a notify popup. Does NOT save DB logs during call.
     * Only works in DEV mode.
     * @param message
     * @param args
     */
    silentDebug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${Severity.DEBUG}]`, name, details)
      }
    },
    /**
     * Debug with suppressable console logs and notifications. Does NOT save DB logs during call.
     * Only works in DEV mode.
     * @param name
     * @param details
     */
    debug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${Severity.DEBUG}]`, name, details)
        notify(name, Icon.DEBUG, 'accent')
      }
    },
    /**
     * Info with suppressable console logs and notifications.
     * @param name
     * @param details
     */
    info: async (name: string, details?: any) => {
      const severity = Severity.INFO

      if ((await DB.getRecord(DatabaseType.SETTING, SettingId.SHOW_CONSOLE_LOGS))?.value) {
        Logger.info(`[${severity}]`, name, details)
      }

      await DB.addLog(severity, name, details)

      if ((await DB.getRecord(DatabaseType.SETTING, SettingId.SHOW_INFO_MESSAGES))?.value) {
        notify(name, Icon.INFO, 'info')
      }
    },
    /**
     * Warn with suppressable console logs and notifications.
     * @param name
     * @param details
     */
    warn: async (name: string, details?: any) => {
      const severity = Severity.WARN

      if ((await DB.getRecord(DatabaseType.SETTING, SettingId.SHOW_CONSOLE_LOGS))?.value) {
        Logger.warn(`[${severity}]`, name, details)
      }

      await DB.addLog(severity, name, details)

      notify(name, Icon.WARN, 'warning')
    },
    /**
     * Error with suppressable console logs and notifications.
     * @param name
     * @param details
     */
    error: async (name: string, details?: any) => {
      const severity = Severity.ERROR

      if ((await DB.getRecord(DatabaseType.SETTING, SettingId.SHOW_CONSOLE_LOGS))?.value) {
        Logger.error(`[${severity}]`, name, details)
      }

      await DB.addLog(severity, name, details)

      notify(name, Icon.ERROR, 'negative')
    },
  }

  return { log }
}
