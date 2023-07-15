import { Child, childSchema } from '@/models/_Child'
import type { InspectionItem } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import type { z } from 'zod'

export const testResultSchema = childSchema.extend({})

const partialTestResultSchema = testResultSchema.deepPartial()
type TestResultParams = z.infer<typeof partialTestResultSchema>

export class TestResult extends Child {
  constructor({ id, createdTimestamp, activated, parentId, note }: TestResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Test Result' : 'Test Results'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldParentId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
    ]
  }

  static getInspectionItems(): InspectionItem[] {
    return [...Child.getInspectionItems()]
  }

  static getTableColumns(): QTableColumn[] {
    return [...Child.getTableColumns()]
  }
}
