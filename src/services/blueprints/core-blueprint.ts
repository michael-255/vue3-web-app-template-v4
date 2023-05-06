// import { Icon } from '@/types/icons'
// import type { CoreBlueprint } from '@/types/misc'
// import { slugify } from '@/utils/common'
// import { numberChart } from '@/services/blueprints/chart-blueprints'
// import { DatabaseAction, DatabaseCategory, DatabaseField, DatabaseType } from '@/types/database'
// import {
//   idField,
//   valueField,
//   createdTimestampField,
//   severityField,
//   labelField,
//   detailsField,
//   enabledField,
//   favoritedField,
//   descriptionField,
//   nameField,
//   parentIdField,
//   noteField,
//   numberField,
//   typeField,
//   messageField,
//   stackField,
// } from '@/services/blueprints/field-blueprints'
// import {
//   requiredTypeColumn,
//   requiredIdColumn,
//   createdTimestampColumn,
//   descriptionColumn,
//   detailsColumn,
//   enabledColumn,
//   favoritedColumn,
//   idColumn,
//   labelColumn,
//   nameColumn,
//   noteColumn,
//   numberColumn,
//   parentIdColumn,
//   partialIdColumn,
//   severityColumn,
//   valueColumn,
//   messageColumn,
//   stackColumn,
// } from '@/services/blueprints/table-columns'

// /*
// This file contains the core blueprints for all database types.
// Do NOT mutate these objects as they are used by multiple components.
// */

// /**
//  * Core blueprints for all database types.
//  */
// export const coreBlueprint: readonly CoreBlueprint[] = [
//   /**
//    * Logs Blueprint
//    */
//   {
//     type: DatabaseType.LOG,
//     typeSlug: slugify(DatabaseType.LOG),
//     category: DatabaseCategory.INTERNAL,
//     singularLabel: 'Log',
//     pluralLabel: 'Logs',
//     icon: Icon.LOGS,
//     parentType: null,
//     childType: null,
//     supportedActions: [DatabaseAction.INSPECT, DatabaseAction.DELETE],
//     chartBluprints: [],
//     fieldBlueprints: [
//       typeField,
//       idField,
//       createdTimestampField,
//       severityField,
//       labelField,
//       detailsField,
//       messageField,
//       stackField,
//     ],
//     visibleColumns: [
//       DatabaseField.ID,
//       DatabaseField.CREATED_TIMESTAMP,
//       DatabaseField.SEVERITY,
//       DatabaseField.LABEL,
//     ],
//     tableColumns: [
//       requiredTypeColumn,
//       requiredIdColumn,
//       partialIdColumn,
//       createdTimestampColumn,
//       severityColumn,
//       labelColumn,
//       detailsColumn,
//       messageColumn,
//       stackColumn,
//     ],
//   },
//   /**
//    * Settings Blueprint
//    */
//   {
//     type: DatabaseType.SETTING,
//     typeSlug: slugify(DatabaseType.SETTING),
//     category: DatabaseCategory.INTERNAL,
//     singularLabel: 'Setting',
//     pluralLabel: 'Settings',
//     icon: Icon.SETTINGS,
//     parentType: null,
//     childType: null,
//     supportedActions: [DatabaseAction.INSPECT],
//     chartBluprints: [],
//     fieldBlueprints: [typeField, idField, valueField],
//     visibleColumns: [DatabaseField.ID, DatabaseField.VALUE],
//     tableColumns: [requiredTypeColumn, requiredIdColumn, idColumn, valueColumn],
//   },
//   /**
//    * Example Blueprint
//    */
//   {
//     type: DatabaseType.EXAMPLE,
//     typeSlug: slugify(DatabaseType.EXAMPLE),
//     category: DatabaseCategory.PARENT,
//     singularLabel: 'Example',
//     pluralLabel: 'Examples',
//     icon: Icon.EXAMPLES,
//     parentType: null,
//     childType: DatabaseType.EXAMPLE_RESULT,
//     supportedActions: [
//       DatabaseAction.INSPECT,
//       DatabaseAction.CREATE,
//       DatabaseAction.EDIT,
//       DatabaseAction.DELETE,
//       DatabaseAction.CHARTS,
//     ],
//     chartBluprints: [numberChart],
//     fieldBlueprints: [
//       typeField,
//       idField,
//       nameField,
//       descriptionField,
//       favoritedField,
//       enabledField,
//     ],
//     visibleColumns: [DatabaseField.ID, DatabaseField.NAME],
//     tableColumns: [
//       requiredTypeColumn,
//       requiredIdColumn,
//       partialIdColumn,
//       nameColumn,
//       descriptionColumn,
//       favoritedColumn,
//       enabledColumn,
//     ],
//   },
//   /**
//    * Example Results Blueprint
//    */
//   {
//     type: DatabaseType.EXAMPLE_RESULT,
//     typeSlug: slugify(DatabaseType.EXAMPLE_RESULT),
//     category: DatabaseCategory.CHILD,
//     singularLabel: 'Example Result',
//     pluralLabel: 'Example Results',
//     icon: Icon.RECORDS,
//     parentType: DatabaseType.EXAMPLE,
//     childType: null,
//     supportedActions: [
//       DatabaseAction.INSPECT,
//       DatabaseAction.CREATE,
//       DatabaseAction.EDIT,
//       DatabaseAction.DELETE,
//     ],
//     chartBluprints: [],
//     fieldBlueprints: [
//       typeField,
//       idField,
//       createdTimestampField,
//       parentIdField,
//       noteField,
//       numberField,
//     ],
//     visibleColumns: [DatabaseField.ID, DatabaseField.CREATED_TIMESTAMP, DatabaseField.PARENT_ID],
//     tableColumns: [
//       requiredTypeColumn,
//       requiredIdColumn,
//       partialIdColumn,
//       createdTimestampColumn,
//       parentIdColumn,
//       noteColumn,
//       numberColumn,
//     ],
//   },
//   /**
//    * Test Blueprint
//    */
//   {
//     type: DatabaseType.TEST,
//     typeSlug: slugify(DatabaseType.TEST),
//     category: DatabaseCategory.PARENT,
//     singularLabel: 'Test',
//     pluralLabel: 'Tests',
//     icon: Icon.TESTS,
//     parentType: null,
//     childType: DatabaseType.TEST_RESULT,
//     supportedActions: [
//       DatabaseAction.INSPECT,
//       DatabaseAction.CREATE,
//       DatabaseAction.EDIT,
//       DatabaseAction.DELETE,
//       DatabaseAction.CHARTS,
//     ],
//     chartBluprints: [numberChart],
//     fieldBlueprints: [
//       typeField,
//       idField,
//       nameField,
//       descriptionField,
//       favoritedField,
//       enabledField,
//     ],
//     visibleColumns: [DatabaseField.ID, DatabaseField.NAME],
//     tableColumns: [
//       requiredTypeColumn,
//       requiredIdColumn,
//       partialIdColumn,
//       nameColumn,
//       descriptionColumn,
//       favoritedColumn,
//       enabledColumn,
//     ],
//   },
//   /**
//    * Test Results Blueprint
//    */
//   {
//     type: DatabaseType.TEST_RESULT,
//     typeSlug: slugify(DatabaseType.TEST_RESULT),
//     category: DatabaseCategory.CHILD,
//     singularLabel: 'Test Result',
//     pluralLabel: 'Test Results',
//     icon: Icon.RECORDS,
//     parentType: DatabaseType.TEST,
//     childType: null,
//     supportedActions: [
//       DatabaseAction.INSPECT,
//       DatabaseAction.CREATE,
//       DatabaseAction.EDIT,
//       DatabaseAction.DELETE,
//     ],
//     chartBluprints: [],
//     fieldBlueprints: [
//       typeField,
//       idField,
//       createdTimestampField,
//       parentIdField,
//       noteField,
//       numberField,
//     ],
//     visibleColumns: [DatabaseField.ID, DatabaseField.CREATED_TIMESTAMP, DatabaseField.PARENT_ID],
//     tableColumns: [
//       requiredTypeColumn,
//       requiredIdColumn,
//       partialIdColumn,
//       createdTimestampColumn,
//       parentIdColumn,
//       noteColumn,
//       numberColumn,
//     ],
//   },
// ]
