import { DBField } from '@/types/database'
import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Child, childSchema } from '@/models/_Child'
import { Icon } from '@/types/general'

export const idsSchema = z.array(idSchema)
export const percentSchema = z.number().min(0).max(100)

export const exampleResultSchema = childSchema.extend({
  [DBField.PERCENT]: percentSchema,
})

export class ExampleResult extends Child {
  [DBField.PERCENT]: number

  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
    percent,
  }: {
    id: string
    createdTimestamp: number
    activated: boolean
    parentId: string
    note: string
    percent: number
  }) {
    super(id, createdTimestamp, activated, parentId, note)
    this.percent = percent
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Example Result' : 'Example Results'
  }
}
