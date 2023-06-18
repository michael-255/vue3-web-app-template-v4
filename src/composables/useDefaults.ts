import { Icon } from '@/types/icons'
import { uid } from 'quasar'
import { Type, type ParentRecord, type ChildRecord } from '@/types/database'
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

          const parentRecords: ParentRecord[] = []
          const childRecords: ChildRecord[] = []

          const buildExampleRecords = (count: number) => {
            const parentId = uid()
            const name = `${randomGreekAlpha()} ${randomEnglishAlpha()}`

            parentRecords.push({
              id: parentId,
              type: Type.EXAMPLE,
              timestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              lastChild: undefined,
              testIds: [uid(), uid(), uid()], // Not linked to any real child records
            } as ParentRecord)

            for (let i = 0; i < count; i++) {
              childRecords.push({
                id: uid(),
                type: Type.EXAMPLE,
                parentId,
                timestamp: previousDateMilliseconds() + Milliseconds.PER_DAY * i,
                note: `Note ${i}`,
              } as ChildRecord)
            }
          }

          const buildTestRecords = (count: number) => {
            const parentId = uid()
            const name = `${randomGreekAlpha()} ${randomEnglishAlpha()}`

            parentRecords.push({
              id: parentId,
              type: Type.TEST,
              timestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              lastChild: undefined,
            } as ParentRecord)

            for (let i = 0; i < count; i++) {
              childRecords.push({
                id: uid(),
                type: Type.TEST,
                parentId,
                timestamp: previousDateMilliseconds() + Milliseconds.PER_DAY * i,
                note: `Note ${i}`,
                percent: randomPercent(),
              } as ChildRecord)
            }
          }

          buildExampleRecords(360)
          buildTestRecords(360)

          await Promise.all([DB.importParents(parentRecords), DB.importChildren(childRecords)])
          await DB.updateAllParentLastChild()

          log.info('Defaults loaded')
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaults }
}
