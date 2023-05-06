// import { DatabaseCategory, DatabaseType } from '@/types/database'
// import { coreBlueprint } from '@/services/blueprints/core-blueprint'
// import type { DatabaseParentType } from '@/types/database'
// import type { DatabaseChildType } from '@/types/database'

// /*
// These functions are used to access the core blueprints for all database types.
// */

// /**
//  * Gets the slug for a database type.
//  * @param type
//  */
// export function getSlug(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.typeSlug
// }

// /**
//  * Gets the database type from a slug.
//  * @param databaseTypeSlug
//  */
// export function getTypeFromSlug(databaseTypeSlug: string) {
//   return coreBlueprint.find((cbp) => cbp.typeSlug === databaseTypeSlug)?.type
// }

// /**
//  * Gets all database types.
//  */
// export function getAllCategoryTypes() {
//   return Object.values(DatabaseType) ?? []
// }

// /**
//  * Gets all Internal category database types.
//  */
// export function getInternalCategoryTypes() {
//   return (
//     coreBlueprint
//       .filter((cbp) => cbp.category === DatabaseCategory.INTERNAL)
//       .map((cbp) => cbp.type) ?? []
//   )
// }

// /**
//  * Gets all Parent and Child category database types. I consider these the User types.
//  */
// export function getUserCategoryTypes() {
//   return (
//     coreBlueprint
//       .filter(
//         (cbp) => cbp.category === DatabaseCategory.PARENT || cbp.category === DatabaseCategory.CHILD
//       )
//       .map((cbp) => cbp.type) ?? []
//   )
// }

// /**
//  * Gets all Parent category database types.
//  */
// export function getParentCategoryTypes(): DatabaseParentType[] {
//   return (
//     (coreBlueprint
//       .filter((cbp) => cbp.category === DatabaseCategory.PARENT)
//       .map((cbp) => cbp.type) as DatabaseParentType[]) ?? []
//   )
// }

// /**
//  * Gets all Child category database types.
//  */
// export function getChildCategoryTypes(): DatabaseChildType[] {
//   return (
//     (coreBlueprint
//       .filter((cbp) => cbp.category === DatabaseCategory.CHILD)
//       .map((cbp) => cbp.type) as DatabaseChildType[]) ?? []
//   )
// }

// /**
//  * Gets the singular or plural label for a database type.
//  * @param type
//  * @param style
//  */
// export function getLabel(type: DatabaseType, style: 'singular' | 'plural') {
//   if (style === 'singular') {
//     return coreBlueprint.find((cbp) => cbp.type === type)?.singularLabel
//   } else {
//     return coreBlueprint.find((cbp) => cbp.type === type)?.pluralLabel
//   }
// }

// /**
//  * Gets the icon for a database type.
//  * @param type
//  */
// export function getIcon(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.icon
// }

// /**
//  * Gets the parent type (if any) for a database type.
//  * @param type
//  */
// export function getParentType(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.parentType
// }

// /**
//  * Gets the child type (if any) for a database type.
//  * @param type
//  */
// export function getChildType(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.childType
// }

// /**
//  * Gets the supported actions (CRUD) for a database type.
//  * @param type
//  */
// export function getSupportedActions(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.supportedActions ?? []
// }

// /**
//  * Gets the chart blueprints for a database type.
//  * @param type
//  */
// export function getChartBlueprints(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.chartBluprints ?? []
// }

// /**
//  * Gets the field blueprints for a database type.
//  * @param type
//  */
// export function getFieldBlueprints(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.fieldBlueprints ?? []
// }

// /**
//  * Gets the fields used by a database type.
//  * @param type
//  */
// export function getFields(type: DatabaseType) {
//   return (
//     coreBlueprint.find((cbp) => cbp.type === type)?.fieldBlueprints.map((fbp) => fbp.field) ?? []
//   )
// }

// /**
//  * Gets the field components used by a database type.
//  * @param type
//  */
// export function getFieldComponents(type: DatabaseType) {
//   return (
//     coreBlueprint.find((cbp) => cbp.type === type)?.fieldBlueprints.map((fbp) => fbp.component) ??
//     []
//   )
// }

// /**
//  * Gets the visible columns used by QTable for a database type.
//  * @param type
//  */
// export function getVisibleColumns(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.visibleColumns ?? []
// }

// /**
//  * Gets the table columns used by QTable for a database type.
//  * @param type
//  */
// export function getTableColumns(type: DatabaseType) {
//   return coreBlueprint.find((cbp) => cbp.type === type)?.tableColumns ?? []
// }
