import { Child, childSchema } from '@/models/_Child'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'

export const testResultSchema = childSchema.extend({})

export class TestResult extends Child {
  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
  }: {
    id: string
    createdTimestamp: number
    activated: boolean
    parentId: string
    note: string
  }) {
    super(id, createdTimestamp, activated, parentId, note)
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Test Result' : 'Test Results'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldParentId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldActivated.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return []
  }

  static getTableColumns(): QTableColumn[] {
    return [...Child.getTableColumns()]
  }
}