import { DBField } from '@/types/database'
import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Parent, parentSchema } from '@/models/_Parent'

export const idsSchema = z.array(idSchema)

export const exampleSchema = parentSchema.extend({
  [DBField.EXAMPLE_IDS]: idsSchema,
})

export class Example extends Parent {
  [DBField.EXAMPLE_IDS]: string[]

  constructor(
    id: string,
    createdTimestamp: number,
    active: boolean,
    name: string,
    desc: string,
    enabled: boolean,
    favorited: boolean,
    exampleIds: string[]
  ) {
    super(id, createdTimestamp, active, name, desc, enabled, favorited)
    this.exampleIds = exampleIds
  }
}
