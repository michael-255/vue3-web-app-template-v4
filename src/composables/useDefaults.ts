import { Icon } from '@/types/general'
import { uid } from 'quasar'
import {
  recordGroups,
  recordTypes,
  type ExampleCoreRecord,
  type ExampleSubRecord,
  type TestCoreRecord,
  type TestSubRecord,
} from '@/types/database'
import { Duration } from '@/types/general'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

export default function useDefaults() {
  const { log } = useLogger()
  const { confirmDialog } = useDialogs()

  function randomGreekAlpha() {
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

  function randomEnglishAlpha() {
    const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    return englishLetters[Math.floor(Math.random() * englishLetters.length)]
  }

  function randomBoolean() {
    return Math.random() >= 0.5
  }

  function randomPercent() {
    return Math.floor(Math.random() * 100)
  }

  function previousDateMilliseconds() {
    return Date.now() - Duration['One Year']
  }

  async function onDefaultExamples() {
    confirmDialog(
      'Load Default Examples',
      `Would you like the load default Examples into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const coreRecords: ExampleCoreRecord[] = []
          const subRecords: ExampleSubRecord[] = []

          const buildRecords = (count: number) => {
            const coreId = uid()
            const name = `Example - ${randomGreekAlpha()} ${randomEnglishAlpha()}`

            coreRecords.push({
              type: recordTypes.Values.example,
              id: coreId,
              timestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              lastSub: undefined,
              testIds: [uid(), uid(), uid()], // Fake test ids
            })

            for (let i = 0; i < count; i++) {
              subRecords.push({
                type: recordTypes.Values.example,
                id: uid(),
                coreId,
                timestamp: previousDateMilliseconds() + Duration['One Day'] * i,
                note: `Example sub-record note ${i}`,
                percent: randomPercent(),
              })
            }
          }

          buildRecords(360)

          await Promise.all([
            DB.importRecords(recordGroups.Values.core, coreRecords),
            DB.importRecords(recordGroups.Values.sub, subRecords),
          ])

          log.info('Default examples loaded')
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  async function onDefaultTests() {
    confirmDialog(
      'Load Default Tests',
      `Would you like the load default Tests into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const coreRecords: TestCoreRecord[] = []
          const subRecords: TestSubRecord[] = []

          const buildRecords = (count: number) => {
            const coreId = uid()
            const name = `Test - ${randomGreekAlpha()} ${randomEnglishAlpha()}`

            coreRecords.push({
              type: recordTypes.Values.test,
              id: coreId,
              timestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              lastSub: undefined,
            })

            for (let i = 0; i < count; i++) {
              subRecords.push({
                type: recordTypes.Values.test,
                id: uid(),
                coreId,
                timestamp: previousDateMilliseconds() + Duration['One Day'] * i,
                note: `Test sub-record note ${i}`,
              })
            }
          }

          buildRecords(0)

          await Promise.all([
            DB.importRecords(recordGroups.Values.core, coreRecords),
            DB.importRecords(recordGroups.Values.sub, subRecords),
          ])

          log.info('Default tests loaded')
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaultExamples, onDefaultTests }
}
