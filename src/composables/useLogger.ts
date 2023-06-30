import { Icon } from '@/types/general'
import { logLevels, settingkeys } from '@/types/database'
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
        Logger.debug(`[${logLevels.Values.DEBUG}]`, name, details)
      }
    },

    debug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${logLevels.Values.DEBUG}]`, name, details)
        notify(name, Icon.DEBUG, 'accent')
      }
    },

    info: async (name: string, details?: any) => {
      if ((await DB.getSetting(settingkeys.Values['console-logs']))?.value) {
        Logger.info(`[${logLevels.Values.INFO}]`, name, details)
      }

      await DB.addLog(logLevels.Values.INFO, name, details)

      if ((await DB.getSetting(settingkeys.Values['info-messages']))?.value) {
        notify(name, Icon.INFO, 'info')
      }
    },

    warn: async (name: string, details?: any) => {
      if ((await DB.getSetting(settingkeys.Values['console-logs']))?.value) {
        Logger.warn(`[${logLevels.Values.WARN}]`, name, details)
      }

      await DB.addLog(logLevels.Values.WARN, name, details)

      notify(name, Icon.WARN, 'warning')
    },

    error: async (name: string, details?: any) => {
      if ((await DB.getSetting(settingkeys.Values['console-logs']))?.value) {
        Logger.error(`[${logLevels.Values.ERROR}]`, name, details)
      }

      await DB.addLog(logLevels.Values.ERROR, name, details)

      notify(name, Icon.ERROR, 'negative')
    },
  }

  return { log }
}
