import { Type, Field, Severity } from '@/types/database'
import { mixed, object, array, string, number, boolean } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const autoIdValidator = number().integer()
export const timestampValidator = number().required().integer()
export const severityValidator = string().required().oneOf(Object.values(Severity))
export const labelValidator = string().required().trim()
export const anyValidator = mixed()
export const textValidator = string().trim()

const log = object({
  [Field.AUTO_ID]: autoIdValidator,
  [Field.TIMESTAMP]: timestampValidator,
  [Field.SEVERITY]: severityValidator,
  [Field.LABEL]: labelValidator,
  [Field.DETAILS]: anyValidator,
  [Field.MESSAGE]: textValidator,
  [Field.STACK]: textValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const keyValidator = string().required().trim()
export const valueValidator = mixed().required()

const setting = object({
  [Field.KEY]: keyValidator,
  [Field.VALUE]: valueValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const idValidator = string().required().uuid()
export const typeValidator = string().required().oneOf(Object.values(Type))

const core = object({
  [Field.ID]: idValidator,
  [Field.TIMESTAMP]: timestampValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const nameValidator = string().required().min(1).max(50).trim()
export const textAreaValidator = string().defined().max(500).trim()
export const booleanValidator = boolean().defined()

const parent = object({
  [Field.NAME]: nameValidator,
  [Field.DESC]: textAreaValidator,
  [Field.ENABLED]: booleanValidator,
  [Field.FAVORITED]: booleanValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const child = object({
  [Field.PARENT_ID]: idValidator,
  [Field.NOTE]: textAreaValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const testIdsValidator = array().of(idValidator).required()
export const percentValidator = number().required().min(0).max(100)

const exampleParent = object({
  [Field.TEST_IDS]: testIdsValidator,
}).noUnknown()

const testChild = object({
  [Field.PERCENT]: percentValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODEL VALIDATORS                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const logValidator = mixed().concat(log)
export const settingValidator = mixed().concat(setting)

export const exampleParentValidator = mixed().concat(core).concat(parent).concat(exampleParent)
export const testParentValidator = mixed().concat(core).concat(parent)

export const exampleChildValidator = mixed().concat(core).concat(child)
export const testChildValidator = mixed().concat(core).concat(child).concat(testChild)

export const recordValidator = mixed()
  .concat(log)
  .concat(setting)
  .concat(core)
  .concat(parent)
  .concat(child)
  .concat(exampleParent)
  .concat(testChild)
