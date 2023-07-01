import { Icon } from '@/types/general'
import { defineAsyncComponent } from 'vue'
import {
  type RecordProps,
  type RecordGroup,
  type RecordType,
  recordGroups,
  recordTypes,
  exampleCoreSchema,
  exampleSubSchema,
  testCoreSchema,
  testSubSchema,
} from '@/types/core'
import {
  exampleCoreColumns,
  exampleSubColumns,
  testCoreColumns,
  testSubColumns,
} from '@/services/table-columns'

export default class DataSchema {
  private static recordProps: RecordProps[] = [
    {
      type: recordTypes.Values.example,
      group: recordGroups.Values.core,
      icon: Icon.EXAMPLES,
      singular: 'Core Example',
      plural: 'Core Examples',
      charts: [defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue'))],
      fields: [
        defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldTimestamp.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldTestIds.vue')),
      ],
      tableColumns: exampleCoreColumns,
      schema: exampleCoreSchema,
    },
    {
      type: recordTypes.Values.example,
      group: recordGroups.Values.sub,
      icon: Icon.EXAMPLES,
      singular: 'Sub Example',
      plural: 'Sub Examples',
      charts: [],
      fields: [
        defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldTimestamp.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldCoreId.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldPercent.vue')),
      ],
      tableColumns: exampleSubColumns,
      schema: exampleSubSchema,
    },
    {
      type: recordTypes.Values.test,
      group: recordGroups.Values.core,
      icon: Icon.TESTS,
      singular: 'Core Test',
      plural: 'Core Tests',
      charts: [],
      fields: [
        defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldTimestamp.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
      ],
      tableColumns: testCoreColumns,
      schema: testCoreSchema,
    },
    {
      type: recordTypes.Values.test,
      group: recordGroups.Values.sub,
      icon: Icon.TESTS,
      singular: 'Sub Test',
      plural: 'Sub Tests',
      charts: [],
      fields: [
        defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldTimestamp.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldCoreId.vue')),
        defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      ],
      tableColumns: testSubColumns,
      schema: testSubSchema,
    },
  ]

  private static logFields: ReturnType<typeof defineAsyncComponent>[] = [
    defineAsyncComponent(() => import('@/components/fields/FieldAutoId.vue')),
    defineAsyncComponent(() => import('@/components/fields/FieldTimestamp.vue')),
    defineAsyncComponent(() => import('@/components/fields/FieldLogLevel.vue')),
    defineAsyncComponent(() => import('@/components/fields/FieldLogLabel.vue')),
    defineAsyncComponent(() => import('@/components/fields/FieldDetails.vue')),
    defineAsyncComponent(() => import('@/components/fields/FieldErrorMessage.vue')),
    defineAsyncComponent(() => import('@/components/fields/FieldStackTrace.vue')),
  ]

  static getLogFields() {
    return this.logFields
  }

  static getAllOptions(): {
    value: { type: RecordType; group: RecordGroup }
    label: string
    icon: Icon
  }[] {
    return this.recordProps.map((p) => ({
      value: {
        type: p.type,
        group: p.group,
      },
      label: p.plural,
      icon: p.icon,
    }))
  }

  static getGroupOptions(group: RecordGroup): {
    value: { type: RecordType; group: RecordGroup }
    label: string
    icon: Icon
  }[] {
    return this.recordProps
      .filter((p) => p.group === group)
      .map((p) => ({
        value: {
          type: p.type,
          group: p.group,
        },
        label: p.plural,
        icon: p.icon,
      }))
  }

  static getDashboardOptions(): {
    value: RecordType
    label: string
    icon: Icon
  }[] {
    return this.recordProps
      .filter((p) => p.group === recordGroups.Values.core)
      .map((p) => ({
        value: p.type,
        label: p.plural,
        icon: p.icon,
      }))
  }

  static getLabel(group: RecordGroup, type: RecordType, style: 'singular' | 'plural') {
    return this.recordProps.find((p) => p.group === group && p.type === type)?.[style]
  }

  static getTableColumns(group: RecordGroup, type: RecordType) {
    return this.recordProps.find((p) => p.group === group && p.type === type)?.tableColumns ?? []
  }

  static getSchema(group: RecordGroup, type: RecordType) {
    return this.recordProps.find((p) => p.group === group && p.type === type)?.schema
  }

  static getFields(group: RecordGroup, type: RecordType) {
    return this.recordProps.find((p) => p.group === group && p.type === type)?.fields ?? []
  }

  static getCharts(type: RecordType) {
    return (
      this.recordProps.find((p) => p.group === recordGroups.Values.core && p.type === type)
        ?.charts ?? []
    )
  }
}
