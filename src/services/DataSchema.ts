import {
  type TypeSchema,
  Action,
  Field,
  Group,
  Type,
  type FieldProps,
  type ChartProps,
} from '@/types/database'
import { Icon } from '@/types/icons'
import {
  exampleChildColumns,
  exampleParentColumns,
  logColumns,
  settingColumns,
  testChildColumns,
  testParentColumns,
} from '@/services/table-columns'
import {
  exampleChildFields,
  exampleParentFields,
  logFields,
  settingFields,
  testChildFields,
  testParentFields,
} from '@/services/field-props'
import {
  exampleChildValidator,
  exampleParentValidator,
  logValidator,
  settingValidator,
  testChildValidator,
  testParentValidator,
} from '@/services/validators'
import type { MixedSchema } from 'yup'
import type { QTableColumn } from 'quasar'
import { percentChart } from './chart-props'

export default class DataSchema {
  private static instance: DataSchema | null = null
  private static dataSchema: TypeSchema[] = [
    {
      type: Type.LOG,
      databaseIndices: `++${Field.AUTO_ID}`,
      group: Group.INTERNAL,
      icon: Icon.LOGS,
      labelSingular: 'Log',
      labelPlural: 'Logs',
      validator: logValidator,
      supportedActions: [Action.INSPECT],
      visibleColumns: [Field.TIMESTAMP, Field.SEVERITY, Field.LABEL],
      tableColumns: logColumns,
      fieldProps: logFields,
      chartProps: [],
    },
    {
      type: Type.SETTING,
      databaseIndices: `&${Field.KEY}`,
      group: Group.INTERNAL,
      icon: Icon.SETTINGS,
      labelSingular: 'Setting',
      labelPlural: 'Settings',
      validator: settingValidator,
      supportedActions: [Action.INSPECT],
      visibleColumns: [Field.KEY, Field.VALUE],
      tableColumns: settingColumns,
      fieldProps: settingFields,
      chartProps: [],
    },
    {
      type: Type.EXAMPLE_PARENT,
      childType: Type.EXAMPLE_CHILD,
      databaseIndices: `&${Field.ID}`,
      group: Group.PARENT,
      icon: Icon.EXAMPLES,
      labelSingular: 'Example Parent',
      labelPlural: 'Example Parents',
      validator: exampleParentValidator,
      supportedActions: [Action.INSPECT, Action.CREATE, Action.EDIT, Action.DELETE, Action.CHARTS],
      visibleColumns: [Field.ID, Field.TIMESTAMP, Field.NAME],
      tableColumns: exampleParentColumns,
      fieldProps: exampleParentFields,
      chartProps: [],
    },
    {
      type: Type.EXAMPLE_CHILD,
      parentType: Type.EXAMPLE_PARENT,
      databaseIndices: `&${Field.ID}, ${Field.PARENT_ID}`,
      group: Group.CHILD,
      icon: Icon.EXAMPLES,
      labelSingular: 'Example Child',
      labelPlural: 'Example Children',
      validator: exampleChildValidator,
      supportedActions: [Action.INSPECT, Action.EDIT, Action.DELETE],
      visibleColumns: [Field.ID, Field.TIMESTAMP],
      tableColumns: exampleChildColumns,
      fieldProps: exampleChildFields,
      chartProps: [],
    },
    {
      type: Type.TEST_PARENT,
      childType: Type.TEST_CHILD,
      databaseIndices: `&${Field.ID}`,
      group: Group.PARENT,
      icon: Icon.TESTS,
      labelSingular: 'Test Parent',
      labelPlural: 'Test Parents',
      validator: testParentValidator,
      supportedActions: [Action.INSPECT, Action.CREATE, Action.EDIT, Action.DELETE, Action.CHARTS],
      visibleColumns: [Field.ID, Field.TIMESTAMP, Field.NAME],
      tableColumns: testParentColumns,
      fieldProps: testParentFields,
      chartProps: [percentChart],
    },
    {
      type: Type.TEST_CHILD,
      parentType: Type.TEST_PARENT,
      databaseIndices: `&${Field.ID}, ${Field.PARENT_ID}`,
      group: Group.CHILD,
      icon: Icon.TESTS,
      labelSingular: 'Test Child',
      labelPlural: 'Test Children',
      validator: testChildValidator,
      supportedActions: [Action.INSPECT, Action.EDIT, Action.DELETE],
      visibleColumns: [Field.ID, Field.TIMESTAMP],
      tableColumns: testChildColumns,
      fieldProps: testChildFields,
      chartProps: [],
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

  static getLabelSingular(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.labelSingular as string
  }

  static getLabelPlural(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.labelPlural as string
  }

  static getTableColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.tableColumns as QTableColumn[]
  }

  static getVisibleColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.visibleColumns as Field[]
  }

  static getSupportedActions(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.supportedActions as Action[]
  }

  static getFieldProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.fieldProps as FieldProps[]
  }

  static getChartProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.chartProps as ChartProps[]
  }

  static getTypeOptions() {
    return this.dataSchema.map((s) => ({ value: s.type, label: s.labelPlural })) as {
      value: Type
      label: string
    }[]
  }

  static getParentTypeOptions() {
    return this.dataSchema
      .filter((s) => s.group === Group.PARENT)
      .map((s) => ({ value: s.type, label: s.labelPlural })) as {
      value: Type
      label: string
    }[]
  }

  static getDatabaseIndices(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.databaseIndices as string
  }

  static getParentTypes() {
    return this.dataSchema.filter((s) => s.group === Group.PARENT).map((p) => p.type) as Type[]
  }

  static getParentType(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentType as Type | undefined
  }

  static getChildType(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childType as Type | undefined
  }

  static getValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.validator as MixedSchema<any, any, any>
  }

  static getParentSchemas() {
    return this.dataSchema.filter((s) => s.group === Group.PARENT) as TypeSchema[]
  }
}
