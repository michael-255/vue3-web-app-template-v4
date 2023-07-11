import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Parent, parentSchema, type Previous } from '@/models/_Parent'
import { Icon } from '@/types/general'

export const idsSchema = z.array(idSchema)

export const testSchema = parentSchema.extend({})

export class Test extends Parent {
  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previous,
  }: {
    id: string
    createdTimestamp: number
    activated: boolean
    name: string
    desc: string
    enabled: boolean
    favorited: boolean
    previous: Previous
  }) {
    super(id, createdTimestamp, activated, name, desc, enabled, favorited, previous)
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Test' : 'Tests'
  }
}
