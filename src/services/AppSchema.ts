import { Relation, Type } from '@/types/database'
import { Icon } from '@/types/icons'
import type { AppSchema } from '@/types/misc'

export const appSchema: Readonly<AppSchema[]> = [
  {
    type: Type.LOG,
    labelSingular: 'Log',
    labelPlural: 'Logs',
    icon: Icon.LOGS,
    supportedActions: [],
    visibleColumns: [],
    tableColumns: [],
    fieldCards: [],
    chartCards: [],
  },
  {
    type: Type.SETTING,
    labelSingular: 'Setting',
    labelPlural: 'Settings',
    icon: Icon.SETTINGS,
    supportedActions: [],
    visibleColumns: [],
    tableColumns: [],
    fieldCards: [],
    chartCards: [],
  },
  {
    type: Type.EXAMPLE,
    relation: Relation.PARENT,
    labelSingular: 'Example Parent',
    labelPlural: 'Example Parents',
    icon: Icon.EXAMPLES,
    supportedActions: [],
    visibleColumns: [],
    tableColumns: [],
    fieldCards: [],
    chartCards: [],
  },
  {
    type: Type.EXAMPLE,
    relation: Relation.CHILD,
    labelSingular: 'Example Child',
    labelPlural: 'Example Children',
    icon: Icon.EXAMPLES,
    supportedActions: [],
    visibleColumns: [],
    tableColumns: [],
    fieldCards: [],
    chartCards: [],
  },
  {
    type: Type.TEST,
    relation: Relation.PARENT,
    labelSingular: 'Test Parent',
    labelPlural: 'Test Parents',
    icon: Icon.TESTS,
    supportedActions: [],
    visibleColumns: [],
    tableColumns: [],
    fieldCards: [],
    chartCards: [],
  },
  {
    type: Type.TEST,
    relation: Relation.CHILD,
    labelSingular: 'Test Child',
    labelPlural: 'Test Children',
    icon: Icon.TESTS,
    supportedActions: [],
    visibleColumns: [],
    tableColumns: [],
    fieldCards: [],
    chartCards: [],
  },
]
