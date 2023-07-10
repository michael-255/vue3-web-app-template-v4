import { DBField } from '@/types/database'
import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Child, childSchema } from '@/models/_Child'

export const idsSchema = z.array(idSchema)
export const percentSchema = z.number().min(0).max(100)

export const exampleResultSchema = childSchema.extend({
  [DBField.PERCENT]: percentSchema,
})

export class ExampleResult extends Child {
  [DBField.PERCENT]: number

  constructor(
    id: string,
    createdTimestamp: number,
    active: boolean,
    parentId: string,
    note: string,
    percent: number
  ) {
    super(id, createdTimestamp, active, parentId, note)
    this.percent = percent
  }
}
