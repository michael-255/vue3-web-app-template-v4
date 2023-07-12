import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Parent, parentSchema, type Previous } from '@/models/_Parent'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'

export const idsSchema = z.array(idSchema)

export const testSchema = parentSchema.extend({})

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
  }: {
    id: string
    createdTimestamp: number
    activated: boolean
    name: string
    desc: string
    enabled: boolean
    favorited: boolean
    previous: Previous
  }) {
    super(id, createdTimestamp, activated, name, desc, enabled, favorited, previous)
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Test' : 'Tests'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
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
