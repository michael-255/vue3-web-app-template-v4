import { Icon } from '@/types/icons'
import { uid } from 'quasar'
import { type AnyCoreRecord, type AnySubRecord, recordGroups, recordTypes } from '@/types/database'
import { Milliseconds } from '@/types/general'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

export default function useDefaults() {
  const { log } = useLogger()
  const { confirmDialog } = useDialogs()

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

          const randomEnglishAlpha = () => {
            const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            return englishLetters[Math.floor(Math.random() * englishLetters.length)]
          }

          const randomBoolean = () => {
            return Math.random() >= 0.5
          }

          const randomPercent = () => {
            return Math.floor(Math.random() * 100)
          }

          const previousDateMilliseconds = () => {
            return Date.now() - Milliseconds.PER_YEAR
          }

          const coreRecords: any[] = []
          const subRecords: any[] = []

          const buildExampleRecords = (count: number) => {
            const coreId = uid()
            const name = `${randomGreekAlpha()} ${randomEnglishAlpha()}`

            coreRecords.push({
              type: recordTypes.Values.example,
              group: recordGroups.Values.core,
              id: coreId,
              timestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              lastSub: undefined,
              testIds: [uid(), uid(), uid()], // Not linked to any real child records
            } as AnyCoreRecord)

            for (let i = 0; i < count; i++) {
              subRecords.push({
                type: recordTypes.Values.example,
                group: recordGroups.Values.sub,
                id: uid(),
                coreId,
                timestamp: previousDateMilliseconds() + Milliseconds.PER_DAY * i,
                note: `Note ${i}`,
              } as AnySubRecord)
            }
          }

          const buildTestRecords = (count: number) => {
            const coreId = uid()
            const name = `${randomGreekAlpha()} ${randomEnglishAlpha()}`

            coreRecords.push({
              type: recordTypes.Values.test,
              group: recordGroups.Values.core,
              id: coreId,
              timestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              lastSub: undefined,
            } as AnyCoreRecord)

            for (let i = 0; i < count; i++) {
              subRecords.push({
                type: recordTypes.Values.test,
                group: recordGroups.Values.sub,
                id: uid(),
                coreId,
                timestamp: previousDateMilliseconds() + Milliseconds.PER_DAY * i,
                note: `Note ${i}`,
                percent: randomPercent(),
              } as AnySubRecord)
            }
          }

          buildExampleRecords(1)
          buildTestRecords(360)

          await Promise.all([
            DB.importRecords(recordGroups.Values.core, coreRecords),
            DB.importRecords(recordGroups.Values.sub, subRecords),
          ])

          log.info('Defaults loaded')
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaults }
}
