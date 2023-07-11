import { DBField } from '@/types/database'
import { z } from 'zod'
import { Entity, booleanSchema, entitySchema } from '@/models/_Entity'
import { Limit } from '@/types/general'

export const nameSchema = z.string().min(Limit.MIN_NAME).max(Limit.MAX_NAME).trim()
export const textAreaSchema = z.string().max(Limit.MAX_TEXT_AREA).trim()
export const previousSchema = z.record(z.nativeEnum(DBField), z.any()).optional()
export type Previous = z.infer<typeof previousSchema>

export const parentSchema = entitySchema.extend({
  [DBField.NAME]: nameSchema,
  [DBField.DESC]: textAreaSchema,
  [DBField.ENABLED]: booleanSchema,
  [DBField.FAVORITED]: booleanSchema,
  [DBField.PREVIOUS]: previousSchema,
})

export class Parent extends Entity {
  [DBField.NAME]: string;
  [DBField.DESC]: string;
  [DBField.ENABLED]: boolean;
  [DBField.FAVORITED]: boolean;
  [DBField.PREVIOUS]: Previous

  constructor(
    id: string,
    createdTimestamp: number,
    active: boolean,
    name: string,
    desc: string,
    enabled: boolean,
    favorited: boolean,
    previous: Previous
  ) {
    super(id, createdTimestamp, active)
    this.name = name
    this.desc = desc
    this.enabled = enabled
    this.favorited = favorited
    this.previous = previous
  }
}
