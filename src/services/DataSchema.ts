import { Icon } from '@/types/icons'
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
} from '@/types/database'
import {
  exampleCoreColumns,
  exampleSubColumns,
  testCoreColumns,
  testSubColumns,
} from '@/services/table-columns'
import {
  exampleCoreFieldProps,
  exampleSubFieldProps,
  testCoreFieldProps,
  testSubFieldProps,
} from '@/services/field-props'

export default class DataSchema {
  private static instance: DataSchema | null = null
  private static recordProps: RecordProps[] = [
    {
      type: recordTypes.Values.example,
      group: recordGroups.Values.core,
      icon: Icon.EXAMPLES,
      singular: 'Core Example',
      plural: 'Core Examples',
      charts: [],
      tableColumns: exampleCoreColumns,
      fields: exampleCoreFieldProps,
      // fields: exampleCoreFields.options,
      schema: exampleCoreSchema,
    },
    {
      type: recordTypes.Values.example,
      group: recordGroups.Values.sub,
      icon: Icon.EXAMPLES,
      singular: 'Sub Example',
      plural: 'Sub Examples',
      charts: [],
      tableColumns: exampleSubColumns,
      fields: exampleSubFieldProps,
      // fields: exampleSubFields.options,
      schema: exampleSubSchema,
    },
    {
      type: recordTypes.Values.test,
      group: recordGroups.Values.core,
      icon: Icon.TESTS,
      singular: 'Core Test',
      plural: 'Core Tests',
      charts: [],
      tableColumns: testCoreColumns,
      fields: testCoreFieldProps,
      // fields: testCoreFields.options,
      schema: testCoreSchema,
    },
    {
      type: recordTypes.Values.test,
      group: recordGroups.Values.sub,
      icon: Icon.TESTS,
      singular: 'Sub Test',
      plural: 'Sub Tests',
      charts: [defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue'))],
      tableColumns: testSubColumns,
      fields: testSubFieldProps,
      // fields: testSubFields.options,
      schema: testSubSchema,
    },
  ]

  static getAllOptions() {
    return this.recordProps.map((p) => ({
      value: {
        type: p.type,
        group: p.group,
      },
      label: p.plural,
      icon: p.icon,
    }))
  }

  static getGroupOptions(group: RecordGroup) {
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

  static getDashboardOptions() {
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
    return this.recordProps.find((p) => p.group === group && p.type === type)?.tableColumns
  }

  static getFields(group: RecordGroup, type: RecordType) {
    return this.recordProps.find((p) => p.group === group && p.type === type)?.fields
  }

  static getSchema(group: RecordGroup, type: RecordType) {
    return this.recordProps.find((p) => p.group === group && p.type === type)?.schema
  }

  // TODO - TEMP
  static getFieldProps(group: RecordGroup, type: RecordType) {
    return this.recordProps.find((p) => p.group === group && p.type === type)?.fields
  }

  static getCharts(type: RecordType) {
    return (
      this.recordProps.find((p) => p.group === recordGroups.Values.core && p.type === type)
        ?.charts ?? []
    )
  }
}
