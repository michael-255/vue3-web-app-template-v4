import { Icon } from '@/types/icons'
import { defineAsyncComponent } from 'vue'
import {
  type RecordProps,
  type RecordGroup,
  type RecordType,
  recordGroupSchema,
  recordTypeSchema,
  exampleCoreFieldsSchema,
  exampleCoreSchema,
  exampleSubFieldsSchema,
  exampleSubSchema,
  testCoreFieldsSchema,
  testCoreSchema,
  testSubFieldsSchema,
  testSubSchema,
} from '@/types/database'
import {
  exampleCoreColumns,
  exampleSubColumns,
  testCoreColumns,
  testSubColumns,
} from './table-columns'

export default class DataSchema {
  private static instance: DataSchema | null = null
  private static recordProps: RecordProps[] = [
    {
      type: recordTypeSchema.Values.example,
      group: recordGroupSchema.Values['core-record'],
      icon: Icon.EXAMPLES,
      singular: 'Core Example',
      plural: 'Core Examples',
      charts: [],
      tableColumns: exampleCoreColumns,
      fields: exampleCoreFieldsSchema.options,
      schema: exampleCoreSchema,
    },
    {
      type: recordTypeSchema.Values.example,
      group: recordGroupSchema.Values['sub-record'],
      icon: Icon.EXAMPLES,
      singular: 'Sub Example',
      plural: 'Sub Examples',
      charts: [],
      tableColumns: exampleSubColumns,
      fields: exampleSubFieldsSchema.options,
      schema: exampleSubSchema,
    },
    {
      type: recordTypeSchema.Values.test,
      group: recordGroupSchema.Values['core-record'],
      icon: Icon.TESTS,
      singular: 'Core Test',
      plural: 'Core Tests',
      charts: [],
      tableColumns: testCoreColumns,
      fields: testCoreFieldsSchema.options,
      schema: testCoreSchema,
    },
    {
      type: recordTypeSchema.Values.test,
      group: recordGroupSchema.Values['sub-record'],
      icon: Icon.TESTS,
      singular: 'Sub Test',
      plural: 'Sub Tests',
      charts: [defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue'))],
      tableColumns: testSubColumns,
      fields: testSubFieldsSchema.options,
      schema: testSubSchema,
    },
  ]

  constructor() {
    // Singleton
    if (DataSchema.instance) {
      return DataSchema.instance
    } else {
      DataSchema.instance = this
    }
  }

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
      .filter((p) => p.group === recordGroupSchema.Values['core-record'])
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

  // static getParentTypeOptions() {
  //   return this.dataSchema.map((s) => ({ value: s.type, label: s.parentLabelPlural, icon: s.icon }))
  // }

  // static getAllTypeOptions() {
  //   const options = [
  //     { value: ['internal', 'logs'], label: 'Logs', icon: Icon.LOGS },
  //     { value: ['internal', 'settings'], label: 'Settings', icon: Icon.SETTINGS },
  //   ]

  //   this.dataSchema.forEach((s) => {
  //     options.push({ value: ['parent', s.type], label: s.parentLabelPlural, icon: s.icon })
  //     options.push({ value: ['child', s.type], label: s.childLabelPlural, icon: s.icon })
  //   })

  //   return options
  // }

  // static getParentValidator(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.parentValidator as AnySchema<any, any, any>
  // }

  // static getChildValidator(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.childValidator as AnySchema<any, any, any>
  // }

  // static getParentFieldProps(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.parentFieldProps as FieldProps[]
  // }

  // static getChildFieldProps(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.childFieldProps as FieldProps[]
  // }

  // static getParentTableColumns(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.parentTableColumns as QTableColumn[]
  // }

  // static getChildTableColumns(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.childTableColumns as QTableColumn[]
  // }

  // static getChartProps(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.chartProps as ChartProps[]
  // }
}
