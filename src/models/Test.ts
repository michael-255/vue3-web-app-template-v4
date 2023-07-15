import type { z } from 'zod'
import { Parent, parentSchema } from '@/models/_Parent'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'

export const testSchema = parentSchema.extend({})

const partialTestSchema = testSchema.deepPartial()
type TestParams = z.infer<typeof partialTestSchema>

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
  }: TestParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previous })
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Test' : 'Tests'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldActivated.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return []
  }

  static getTableColumns(): QTableColumn[] {
    return [...Parent.getTableColumns()]
  }
}
