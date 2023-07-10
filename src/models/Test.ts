import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Parent, parentSchema } from '@/models/_Parent'

export const idsSchema = z.array(idSchema)

export const testSchema = parentSchema.extend({})

export class Test extends Parent {
  constructor(
    id: string,
    createdTimestamp: number,
    activated: boolean,
    name: string,
    desc: string,
    enabled: boolean,
    favorited: boolean
  ) {
    super(id, createdTimestamp, activated, name, desc, enabled, favorited)
  }
}
