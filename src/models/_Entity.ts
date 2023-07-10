import { DBField } from '@/types/database'
import { z } from 'zod'

export const idSchema = z.string().uuid()
export const createdTimestampSchema = z.number().int()
export const booleanSchema = z.boolean()

export const entitySchema = z.object({
  [DBField.ID]: idSchema,
  [DBField.CREATED_TIMESTAMP]: createdTimestampSchema,
  [DBField.ACTIVATED]: booleanSchema,
})

export class Entity {
  [DBField.ID]: string;
  [DBField.CREATED_TIMESTAMP]: number;
  [DBField.ACTIVATED]: boolean

  constructor(id: string, createdTimestamp: number, activated: boolean) {
    this.id = id
    this.createdTimestamp = createdTimestamp
    this.activated = activated
  }

  static getFieldSFCs() {
    // ReturnType<typeof defineAsyncComponent>[]
  }

  static getChartSFCs() {
    // ReturnType<typeof defineAsyncComponent>[]
  }

  static getTableColumns() {
    // QTableColumn[]
  }
}
