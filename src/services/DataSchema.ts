import { type TypeSchema, Type, type FieldProps, type ChartProps } from '@/types/database'
import { Icon } from '@/types/icons'
import {
  exampleChildColumns,
  exampleParentColumns,
  testChildColumns,
  testParentColumns,
} from '@/services/table-columns'
import {
  exampleChildFields,
  exampleParentFields,
  testChildFields,
  testParentFields,
} from '@/services/field-props'
import {
  exampleChildValidator,
  exampleParentValidator,
  testChildValidator,
  testParentValidator,
} from '@/services/validators'
import type { AnySchema } from 'yup'
import type { QTableColumn } from 'quasar'
import { percentChart } from '@/services/chart-props'

export default class DataSchema {
  private static instance: DataSchema | null = null
  private static dataSchema: TypeSchema[] = [
    {
      type: Type.EXAMPLE,
      icon: Icon.EXAMPLES,
      parentLabelSingular: 'Example Parent',
      parentLabelPlural: 'Example Parents',
      parentValidator: exampleParentValidator,
      parentTableColumns: exampleParentColumns,
      parentFieldProps: exampleParentFields,
      parentChartProps: [],
      childLabelSingular: 'Example Child',
      childLabelPlural: 'Example Children',
      childValidator: exampleChildValidator,
      childTableColumns: exampleChildColumns,
      childFieldProps: exampleChildFields,
      childChartProps: [],
    },
    {
      type: Type.TEST,
      icon: Icon.TESTS,
      parentLabelSingular: 'Test Parent',
      parentLabelPlural: 'Test Parents',
      parentValidator: testParentValidator,
      parentTableColumns: testParentColumns,
      parentFieldProps: testParentFields,
      parentChartProps: [percentChart],
      childLabelSingular: 'Test Child',
      childLabelPlural: 'Test Children',
      childValidator: testChildValidator,
      childTableColumns: testChildColumns,
      childFieldProps: testChildFields,
      childChartProps: [],
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

  // static getLabelSingular(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.labelSingular as string
  // }

  // static getLabelPlural(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.labelPlural as string
  // }

  // static getTableColumns(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.tableColumns as QTableColumn[]
  // }

  // static getFieldProps(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.fieldProps as FieldProps[]
  // }

  // static getChartProps(type: Type) {
  //   return this.dataSchema.find((s) => s.type === type)?.chartProps as ChartProps[]
  // }

  static getTableOptions() {
    const options = [
      { value: ['internal', 'logs'], label: 'Logs' },
      { value: ['internal', 'settings'], label: 'Settings' },
    ]

    this.dataSchema.forEach((t) => {
      options.push({ value: ['parent', t.type], label: t.parentLabelPlural })
      options.push({ value: ['child', t.type], label: t.childLabelPlural })
    })

    return options
  }

  static getParentValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentValidator as AnySchema<any, any, any>
  }

  static getChildValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childValidator as AnySchema<any, any, any>
  }
}
