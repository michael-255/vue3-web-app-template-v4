import { Icon } from '@/types/icons'
import { uid } from 'quasar'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'
import type { ExampleChild, ExampleParent, Record } from '@/types/models'
import { Relation, Type } from '@/types/database'

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

          const timestampOffset = (i: number) => 1 + i

          const records: Partial<Record>[] = []

          const createRecords = (
            count: number,
            type: Type.EXAMPLE | Type.TEST,
            id: string = uid()
          ) => {
            // Create Parent (1)
            records.push({
              id,
              timestamp: Date.now(),
              type,
              relation: Relation.PARENT,
              name: randomGreekAlpha(),
              desc: `${type} description...`,
              enabled: true,
              favorited: randomBoolean(),
              testIds: [],
            } as ExampleParent)

            // Create Children (count)
            for (let i = 0; i < count; i++) {
              records.push({
                id,
                timestamp: Date.now() + timestampOffset(i), // TODO - This okay?
                type,
                relation: Relation.CHILD,
                note: `Note ${i}`,
              } as ExampleChild)
            }
          }

          createRecords(3, Type.EXAMPLE)
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
