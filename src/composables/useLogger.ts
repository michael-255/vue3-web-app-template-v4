import { Icon } from '@/types/icons'
import { logLevelSchema, settingkeySchema } from '@/types/database'
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
        Logger.debug(`[${logLevelSchema.Values.DEBUG}]`, name, details)
      }
    },

    debug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${logLevelSchema.Values.DEBUG}]`, name, details)
        notify(name, Icon.DEBUG, 'accent')
      }
    },

    info: async (name: string, details?: any) => {
      if ((await DB.getSetting(settingkeySchema.Values['console-logs']))?.value) {
        Logger.info(`[${logLevelSchema.Values.INFO}]`, name, details)
      }

      await DB.addLog(logLevelSchema.Values.INFO, name, details)

      if ((await DB.getSetting(settingkeySchema.Values['info-messages']))?.value) {
        notify(name, Icon.INFO, 'info')
      }
    },

    warn: async (name: string, details?: any) => {
      if ((await DB.getSetting(settingkeySchema.Values['console-logs']))?.value) {
        Logger.warn(`[${logLevelSchema.Values.WARN}]`, name, details)
      }

      await DB.addLog(logLevelSchema.Values.WARN, name, details)

      notify(name, Icon.WARN, 'warning')
    },

    error: async (name: string, details?: any) => {
      if ((await DB.getSetting(settingkeySchema.Values['console-logs']))?.value) {
        Logger.error(`[${logLevelSchema.Values.ERROR}]`, name, details)
      }

      await DB.addLog(logLevelSchema.Values.ERROR, name, details)

      notify(name, Icon.ERROR, 'negative')
    },
  }

  return { log }
}
