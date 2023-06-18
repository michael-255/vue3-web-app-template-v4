import { Icon } from '@/types/icons'
import { SettingKey, Severity } from '@/types/database'
import useNotifications from '@/composables/useNotifications'
import Logger from '@/services/Logger'
import DB from '@/services/Database'

export default function useLogger() {
  const { notify } = useNotifications()

  const log = {
    print: (message: any, ...args: any) => {
      Logger.print(message, ...args)
    },
    silentDebug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${Severity.DEBUG}]`, name, details)
      }
    },
    debug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${Severity.DEBUG}]`, name, details)
        notify(name, Icon.DEBUG, 'accent')
      }
    },
    info: async (name: string, details?: any) => {
      const severity = Severity.INFO

      if ((await DB.getSetting(SettingKey.SHOW_CONSOLE_LOGS))?.value) {
        Logger.info(`[${severity}]`, name, details)
      }

      await DB.addLog(severity, name, details)

      if ((await DB.getSetting(SettingKey.SHOW_INFO_MESSAGES))?.value) {
        notify(name, Icon.INFO, 'info')
      }
    },
    warn: async (name: string, details?: any) => {
      const severity = Severity.WARN

      if ((await DB.getSetting(SettingKey.SHOW_CONSOLE_LOGS))?.value) {
        Logger.warn(`[${severity}]`, name, details)
      }

      await DB.addLog(severity, name, details)

      notify(name, Icon.WARN, 'warning')
    },
    error: async (name: string, details?: any) => {
      const severity = Severity.ERROR

      if ((await DB.getSetting(SettingKey.SHOW_CONSOLE_LOGS))?.value) {
        Logger.error(`[${severity}]`, name, details)
      }

      await DB.addLog(severity, name, details)

      notify(name, Icon.ERROR, 'negative')
    },
  }

  return { log }
}
