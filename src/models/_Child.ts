import { DBField } from '@/types/database'
import { Entity, entitySchema, idSchema } from '@/models/_Entity'
import { textAreaSchema } from '@/models/_Parent'

export const childSchema = entitySchema.extend({
  [DBField.PARENT_ID]: idSchema,
  [DBField.NOTE]: textAreaSchema,
})

export class Child extends Entity {
  [DBField.PARENT_ID]: string;
  [DBField.NOTE]: string

  constructor(
    id: string,
    createdTimestamp: number,
    active: boolean,
    parentId: string,
    note: string
  ) {
    super(id, createdTimestamp, active)
    this.parentId = parentId
    this.note = note
  }
}
