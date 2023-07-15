import { DBField, type InspectionItem } from '@/types/database'
import type { z } from 'zod'
import { Parent, parentSchema } from '@/models/_Parent'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { idsSchema } from '@/models/_Entity'

export const exampleSchema = parentSchema.extend({
  [DBField.TEST_IDS]: idsSchema,
})

const partialExampleSchema = exampleSchema.deepPartial()
type ExampleParams = z.infer<typeof partialExampleSchema>

export class Example extends Parent {
  [DBField.TEST_IDS]?: string[]

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previousChild,
    testIds,
  }: ExampleParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previousChild })
    this.testIds = testIds
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Example' : 'Examples'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldTestIds.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue'))]
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Parent.getInspectionItems(),
      {
        field: DBField.TEST_IDS,
        label: 'Test Ids',
        output: 'list',
        format: (val: string[]) => val || [],
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Parent.getTableColumns(),
      {
        name: DBField.TEST_IDS,
        label: 'Test Ids',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.TEST_IDS],
        format: (val: string[]) => `${val?.length ? val.length : 0}`,
      },
    ]
  }
}
