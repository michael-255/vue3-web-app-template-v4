import { DatabaseField, DatabaseType } from '@/types/database'
import { Icon } from '@/types/icons'
import type { DatabaseRecord, Example, ExampleResult, Test } from '@/types/models'
import { uid } from 'quasar'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'

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
          const randomGreekLetter = () => {
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

          let initialTimestamp = new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 2 // minus two year

          const addDay = (timestamp: number) => {
            const date = new Date(timestamp)
            date.setDate(date.getDate() + 1)
            return date.getTime()
          }

          const records: DatabaseRecord[] = []

          const createExamples = (count: number) => {
            for (let i = 0; i < count; i++) {
              records.push({
                [DatabaseField.TYPE]: DatabaseType.EXAMPLE,
                [DatabaseField.ID]: uid(),
                [DatabaseField.NAME]: `Example ${randomGreekLetter()}`,
                [DatabaseField.DESCRIPTION]: `Example description ${i}`,
                [DatabaseField.IS_FAVORITED]: randomBoolean(),
                [DatabaseField.IS_ENABLED]: true,
              } as Example)

              initialTimestamp = addDay(initialTimestamp)
            }
          }

          const createExampleResults = (count: number, parent?: Example) => {
            for (let i = 0; i < count; i++) {
              records.push({
                [DatabaseField.TYPE]: DatabaseType.EXAMPLE_RESULT,
                [DatabaseField.ID]: uid(),
                [DatabaseField.CREATED_TIMESTAMP]: initialTimestamp,
                [DatabaseField.PARENT_ID]: parent?.id || `orphaned-record-id-${i}`,
                [DatabaseField.NOTE]: randomBoolean() ? `Previous note ${parent?.id}` : '',
                [DatabaseField.NUMBER]: randomInt(1, 100) + i / 2,
              } as ExampleResult)

              initialTimestamp = addDay(initialTimestamp)
            }
          }

          // Creating demo data
          createExamples(1)
          records.map((example) => createExampleResults(725, example)) // about 2 years of records
          // Unused parents and orphaned results
          createExamples(2)
          createExampleResults(2)

          records.push({
            [DatabaseField.TYPE]: DatabaseType.TEST,
            [DatabaseField.ID]: uid(),
            [DatabaseField.NAME]: `Lonely Test ${randomGreekLetter()}`,
            [DatabaseField.DESCRIPTION]: 'Test description X',
            [DatabaseField.IS_FAVORITED]: false,
            [DatabaseField.IS_ENABLED]: true,
          } as Test)

          await DB.bulkAddRecords(records)

          log.info('Defaults loaded', { count: records.length })
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaults }
}
