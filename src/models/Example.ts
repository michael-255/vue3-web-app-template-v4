import { DBField } from '@/types/database'
import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Parent, parentSchema, type Previous } from '@/models/_Parent'
import { Icon } from '@/types/general'

export const idsSchema = z.array(idSchema)

export const exampleSchema = parentSchema.extend({
  [DBField.TEST_IDS]: idsSchema,
})

export class Example extends Parent {
  [DBField.TEST_IDS]: string[]

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previous,
    testIds,
  }: {
    id: string
    createdTimestamp: number
    activated: boolean
    name: string
    desc: string
    enabled: boolean
    favorited: boolean
    previous: Previous
    testIds: string[]
  }) {
    super(id, createdTimestamp, activated, name, desc, enabled, favorited, previous)
    this.testIds = testIds
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Example' : 'Examples'
  }
}
