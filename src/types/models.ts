import { Field, Key, LogField, SettingField, Severity } from '@/types/database'
import {
  descValidator,
  enabledValidator,
  favoritedValidator,
  uidValidator,
  nameValidator,
  noteValidator,
  percentValidator,
  groupValidator,
  timestampValidator,
  typeValidator,
} from '@/services/Validators'
import { mixed, array, string, number, object, type InferType } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const logSchema = object({
  [LogField.AUTO_ID]: number().integer(),
  [LogField.TIMESTAMP]: number().required().integer(),
  [LogField.SEVERITY]: string().required().oneOf(Object.values(Severity)),
  [LogField.LABEL]: string().required().trim(),
  [LogField.DETAILS]: mixed(),
  [LogField.MESSAGE]: string(),
  [LogField.STACK]: string(),
})

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTINGS                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const settingSchema = object({
  [SettingField.KEY]: string().required().oneOf(Object.values(Key)),
  [SettingField.VALUE]: mixed(),
})

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const coreSchema = object({
  [Field.PK]: uidValidator,
  [Field.SK]: uidValidator,
  [Field.TYPE]: typeValidator,
  [Field.GROUP]: groupValidator,
  [Field.TIMESTAMP]: timestampValidator,
})

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const parentSchema = object({
  [Field.NAME]: nameValidator,
  [Field.DESC]: descValidator,
  [Field.ENABLED]: enabledValidator,
  [Field.FAVORITED]: favoritedValidator,
})

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const childSchema = object({
  [Field.NOTE]: noteValidator,
})

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const exampleParentSchema = object({
  [Field.TEST_PKS]: array().of(uidValidator).defined(),
})

const testChildSchema = object({
  [Field.PERCENT]: percentValidator,
})

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODELS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const exampleParent = mixed().concat(coreSchema).concat(parentSchema).concat(exampleParentSchema)
const exampleChild = mixed().concat(coreSchema).concat(childSchema)
const testParent = mixed().concat(coreSchema).concat(parentSchema)
const testChild = mixed().concat(coreSchema).concat(childSchema).concat(testChildSchema)
const record = mixed()
  .concat(coreSchema)
  .concat(parentSchema)
  .concat(childSchema)
  .concat(exampleParentSchema)
  .concat(testChildSchema)

export type ExampleParent = InferType<typeof exampleParent>
export type ExampleChild = InferType<typeof exampleChild>
export type TestParent = InferType<typeof testParent>
export type TestChild = InferType<typeof testChild>
export type Record = InferType<typeof record>
export type Log = InferType<typeof logSchema>
export type Setting = InferType<typeof settingSchema>
