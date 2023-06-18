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
      chartProps: [],
      parentLabelSingular: 'Example Parent',
      parentLabelPlural: 'Example Parents',
      parentValidator: exampleParentValidator,
      parentTableColumns: exampleParentColumns,
      parentFieldProps: exampleParentFields,
      childLabelSingular: 'Example Child',
      childLabelPlural: 'Example Children',
      childValidator: exampleChildValidator,
      childTableColumns: exampleChildColumns,
      childFieldProps: exampleChildFields,
    },
    {
      type: Type.TEST,
      icon: Icon.TESTS,
      chartProps: [percentChart],
      parentLabelSingular: 'Test Parent',
      parentLabelPlural: 'Test Parents',
      parentValidator: testParentValidator,
      parentTableColumns: testParentColumns,
      parentFieldProps: testParentFields,
      childLabelSingular: 'Test Child',
      childLabelPlural: 'Test Children',
      childValidator: testChildValidator,
      childTableColumns: testChildColumns,
      childFieldProps: testChildFields,
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

  static getParentLabelSingular(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentLabelSingular as string
  }

  static getChildLabelSingular(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childLabelSingular as string
  }

  static getParentLabelPlural(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentLabelPlural as string
  }

  static getChildLabelPlural(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childLabelPlural as string
  }

  static getParentTypeOptions() {
    return this.dataSchema.map((s) => ({ value: s.type, label: s.parentLabelPlural, icon: s.icon }))
  }

  static getAllTypeOptions() {
    const options = [
      { value: ['internal', 'logs'], label: 'Logs', icon: Icon.LOGS },
      { value: ['internal', 'settings'], label: 'Settings', icon: Icon.SETTINGS },
    ]

    this.dataSchema.forEach((s) => {
      options.push({ value: ['parent', s.type], label: s.parentLabelPlural, icon: s.icon })
      options.push({ value: ['child', s.type], label: s.childLabelPlural, icon: s.icon })
    })

    return options
  }

  static getParentValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentValidator as AnySchema<any, any, any>
  }

  static getChildValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childValidator as AnySchema<any, any, any>
  }

  static getParentFieldProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentFieldProps as FieldProps[]
  }

  static getChildFieldProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childFieldProps as FieldProps[]
  }

  static getParentTableColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentTableColumns as QTableColumn[]
  }

  static getChildTableColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childTableColumns as QTableColumn[]
  }

  static getChartProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.chartProps as ChartProps[]
  }
}
