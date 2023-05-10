import { Icon } from '@/types/icons'
import { uid } from 'quasar'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'
import type { ExampleChild, ExampleParent, Record } from '@/types/models'
import { Type } from '@/types/database'
import { dataSchema } from '@/services/data-schema'

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

          const recordTypes: { [key in Type]: Record[] } = Object.values(Type).reduce(
            (acc, type) => {
              acc[type] = []
              return acc
            },
            {} as { [key in Type]: Record[] }
          )

          const createRecords = (
            childCount: number,
            type: Type.EXAMPLE_PARENT | Type.TEST_PARENT
          ) => {
            const parentId = uid()
            const name = randomGreekAlpha()

            // Create Parent (1)
            recordTypes[type].push({
              id: parentId,
              timestamp: Date.now(),
              name,
              desc: `${name} ${type} description.`,
              enabled: true,
              favorited: randomBoolean(),
              testIds: type === Type.EXAMPLE_PARENT ? [uid()] : undefined,
            } as Record)

            if (childCount > 0) {
              const childType = dataSchema.find((s) => s.type === type)?.childType
              // Create Children (childCount)
              for (let i = 0; i < childCount; i++) {
                recordTypes[childType as Type].push({
                  id: uid(),
                  parentId,
                  timestamp: Date.now(),
                  note: `Note ${i}`,
                  percent: type === Type.TEST_PARENT ? 75 : undefined,
                } as Record)
              }
            }
          }

          createRecords(3, Type.EXAMPLE_PARENT)
          createRecords(2, Type.EXAMPLE_PARENT)
          createRecords(0, Type.EXAMPLE_PARENT)
          createRecords(0, Type.EXAMPLE_PARENT)
          createRecords(1, Type.TEST_PARENT)
          createRecords(0, Type.TEST_PARENT)

          log.silentDebug('recordTypes:', recordTypes)

          await Promise.all(
            Object.entries(recordTypes).map(([k, v]) => DB.importRecords(k as Type, v))
          )

          log.info('Defaults loaded')
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaults }
}
