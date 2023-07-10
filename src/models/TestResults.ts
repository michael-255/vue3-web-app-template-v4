import { Child, childSchema } from '@/models/_Child'

export const testResultSchema = childSchema.extend({})

export class TestResult extends Child {
  constructor(
    id: string,
    createdTimestamp: number,
    active: boolean,
    parentId: string,
    note: string
  ) {
    super(id, createdTimestamp, active, parentId, note)
  }
}
