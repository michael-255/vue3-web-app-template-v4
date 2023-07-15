import { DBField, type InspectionItem } from '@/types/database'
import { z } from 'zod'
import { Child, childSchema } from '@/models/_Child'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'

export const percentSchema = z.number().min(0).max(100)

export const exampleResultSchema = childSchema.extend({
  [DBField.PERCENT]: percentSchema,
})

const partialExampleResultSchema = exampleResultSchema.deepPartial()
type ExampleResultParams = z.infer<typeof partialExampleResultSchema>

export class ExampleResult extends Child {
  [DBField.PERCENT]?: number

  constructor({ id, createdTimestamp, activated, parentId, note, percent }: ExampleResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
    this.percent = percent
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Example Result' : 'Example Results'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldParentId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldPercent.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
    ]
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Child.getInspectionItems(),
      {
        field: DBField.PERCENT,
        label: 'Percentage',
        output: 'single',
        format: (val: number | undefined) => (val ? `${val}%` : ''),
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Child.getTableColumns(),
      {
        name: DBField.PERCENT,
        label: 'Percentage',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.PERCENT],
        format: (val: number | undefined) => (val ? `${val}%` : ''),
      },
    ]
  }
}
