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

          const randomInt = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1) + min)
          }

          let initialTimestamp = Date.now() - 1000 * 60 * 60 * 24 * 365 * 2 // minus two year

          const addDay = (timestamp: number) => {
            const date = new Date(timestamp)
            date.setDate(date.getDate() + 1)
            return date.getTime()
          }

          const records: Partial<Record>[] = []

          const groupId = uid()

          const createExamples = (count: number) => {
            for (let i = 0; i < count; i++) {
              records.push({
                id: groupId,
                timestamp: initialTimestamp,
                type: Type.EXAMPLE,
                relation: Relation.PARENT,
                name: randomGreekAlpha(),
                desc: `Example description ${i}`,
                enabled: true,
                favorited: randomBoolean(),
                testIds: [],
              } as ExampleParent)

              initialTimestamp = addDay(initialTimestamp)
            }
          }

          const createExampleResults = (count: number) => {
            for (let i = 0; i < count; i++) {
              records.push({
                id: groupId,
                timestamp: initialTimestamp,
                type: Type.EXAMPLE,
                relation: Relation.CHILD,
                note: '',
              } as ExampleChild)

              initialTimestamp = addDay(initialTimestamp)
            }
          }

          // Creating demo data
          createExamples(1)
          records.map(() => createExampleResults(725)) // about 2 years of records
          // Unused parents and orphaned results
          createExamples(2)
          createExampleResults(2)

          await DB.blukAdd(records as Record[])

          log.info('Defaults loaded', { count: records.length })
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaults }
}
