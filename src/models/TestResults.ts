import { Child, childSchema } from '@/models/_Child'
import { Icon } from '@/types/general'

export const testResultSchema = childSchema.extend({})

export class TestResult extends Child {
  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
  }: {
    id: string
    createdTimestamp: number
    activated: boolean
    parentId: string
    note: string
  }) {
    super(id, createdTimestamp, activated, parentId, note)
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Test Result' : 'Test Results'
  }
}
