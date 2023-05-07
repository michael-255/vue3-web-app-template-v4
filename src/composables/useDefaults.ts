import { Icon } from '@/types/icons'
import { uid } from 'quasar'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'
import type { ExampleChild, ExampleParent, Record } from '@/types/models'
import { Group, Type } from '@/types/database'

/**
 * Composable with functions for generating default data for the app.
 */
export default function useDefaults() {
  const { log } = useLogger()
  const { confirmDialog } = useDialogs()

  /**
   * Generate default demostration data for the template app.
   */
  async function onDefaults() {
    confirmDialog(
      'Load Defaults',
      `Would you like the load defaults into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const randomGreekAlpha = () => {
            const greekLetters = [
              'Alpha',
              'Beta',
              'Gamma',
              'Delta',
              'Epsilon',
              'Zeta',
              'Eta',
              'Theta',
              'Iota',
              'Kappa',
              'Lambda',
              'Mu',
              'Nu',
              'Xi',
              'Omicron',
              'Pi',
              'Rho',
              'Sigma',
              'Tau',
              'Upsilon',
              'Phi',
              'Chi',
              'Psi',
              'Omega',
            ]
            return greekLetters[Math.floor(Math.random() * greekLetters.length)]
          }

          const randomBoolean = () => {
            return Math.random() >= 0.5
          }

          const records: Partial<Record>[] = []

          const createRecords = (count: number, type: Type.EXAMPLE | Type.TEST) => {
            const groupId = uid()

            // Create Parent (1)
            records.push({
              pk: uid(),
              sk: groupId,
              type,
              group: Group.PARENT,
              timestamp: Date.now(),
              name: randomGreekAlpha(),
              desc: `${type} description...`,
              enabled: true,
              favorited: randomBoolean(),
              testPks: [],
            } as ExampleParent)

            // Create Children (count)
            for (let i = 0; i < count; i++) {
              records.push({
                pk: uid(),
                sk: groupId,
                type,
                group: Group.CHILD,
                timestamp: Date.now(),
                note: `Note ${i}`,
              } as ExampleChild)
            }
          }

          createRecords(3, Type.EXAMPLE)
          createRecords(3, Type.EXAMPLE)
          createRecords(3, Type.EXAMPLE)
          createRecords(3, Type.EXAMPLE)
          createRecords(3, Type.TEST)
          createRecords(3, Type.TEST)

          await DB.bulkAdd(records as Record[])

          log.info('Defaults loaded', { count: records.length })
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaults }
}
