import { Field, Key, LogField, SettingField, Severity } from '@/types/database'
import {
  enabledValidator,
  favoritedValidator,
  uidValidator,
  nameValidator,
  textAreaValidator,
  percentValidator,
  groupValidator,
  timestampValidator,
  typeValidator,
} from '@/services/Validators'
import { mixed, array, string, number, object, type InferType } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const core = object({
  [Field.PK]: uidValidator,
  [Field.SK]: uidValidator,
  [Field.TYPE]: typeValidator,
  [Field.GROUP]: groupValidator,
  [Field.TIMESTAMP]: timestampValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const parent = object({
  [Field.NAME]: nameValidator,
  [Field.DESC]: textAreaValidator,
  [Field.ENABLED]: enabledValidator,
  [Field.FAVORITED]: favoritedValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const child = object({
  [Field.NOTE]: textAreaValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const exampleParent = object({
  [Field.TEST_PKS]: array().of(uidValidator).defined(),
}).noUnknown()

const testChild = object({
  [Field.PERCENT]: percentValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SCHEMAS                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const logSchema = object({
  [LogField.AUTO_ID]: number().integer(),
  [LogField.TIMESTAMP]: number().required().integer(),
  [LogField.SEVERITY]: string().required().oneOf(Object.values(Severity)),
  [LogField.LABEL]: string().required().trim(),
  [LogField.DETAILS]: mixed(),
  [LogField.MESSAGE]: string(),
  [LogField.STACK]: string(),
}).noUnknown()

export const settingSchema = object({
  [SettingField.KEY]: string().required().oneOf(Object.values(Key)),
  [SettingField.VALUE]: mixed(),
}).noUnknown()

export const exampleParentSchema = mixed().concat(core).concat(parent).concat(exampleParent)
export const exampleChildSchema = mixed().concat(core).concat(child)
export const testParentSchema = mixed().concat(core).concat(parent)
export const testChildSchema = mixed().concat(core).concat(child).concat(testChild)
export const recordSchema = mixed()
  .concat(core)
  .concat(parent)
  .concat(child)
  .concat(exampleParent)
  .concat(testChild)

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODELS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export type ExampleParent = InferType<typeof exampleParentSchema>
export type ExampleChild = InferType<typeof exampleChildSchema>
export type TestParent = InferType<typeof testParentSchema>
export type TestChild = InferType<typeof testChildSchema>
export type Record = InferType<typeof recordSchema>
export type Log = InferType<typeof logSchema>
export type Setting = InferType<typeof settingSchema>
