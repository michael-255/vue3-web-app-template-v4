import { Type, Severity, Field } from '@/types/database'
import { mixed, object, array, string, number, boolean } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const autoIdValidator = number().integer().positive()
export const severityValidator = string().required().oneOf(Object.values(Severity))
export const labelValidator = string().required().trim()
export const anyValidator = mixed()
export const textValidator = string().trim()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const keyValidator = string().required().trim()
export const valueValidator = mixed().required()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const idValidator = string().required().uuid()
export const timestampValidator = number().required().integer()
export const typeValidator = string().required().oneOf(Object.values(Type))

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const nameValidator = string().required().min(1).max(50).trim()
export const textAreaValidator = string().defined().max(500).trim()
export const booleanValidator = boolean().defined()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// None yet...

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const testIdsValidator = array().of(idValidator).required()
export const percentValidator = number().required().min(0).max(100)

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODEL VALIDATORS                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const core = object({
  [Field.ID]: idValidator,
  [Field.TIMESTAMP]: timestampValidator,
  [Field.TYPE]: typeValidator,
}).noUnknown()

const parent = object({
  [Field.NAME]: nameValidator,
  [Field.DESC]: textAreaValidator,
  [Field.ENABLED]: booleanValidator,
  [Field.FAVORITED]: booleanValidator,
  [Field.LAST_CHILD]: object({
    [Field.ID]: idValidator.optional(),
    [Field.TYPE]: typeValidator.optional(),
    [Field.TIMESTAMP]: timestampValidator.optional(),
    [Field.PARENT_ID]: idValidator.optional(),
    [Field.NOTE]: textAreaValidator.optional(),
  }),
}).noUnknown()

const child = object({
  [Field.PARENT_ID]: idValidator,
  [Field.NOTE]: textAreaValidator,
}).noUnknown()

const exampleParent = object({
  [Field.TEST_IDS]: testIdsValidator,
}).noUnknown()

const testChild = object({
  [Field.PERCENT]: percentValidator,
}).noUnknown()

export const logValidator = object({
  [Field.AUTO_ID]: autoIdValidator,
  [Field.TIMESTAMP]: timestampValidator,
  [Field.SEVERITY]: severityValidator,
  [Field.LABEL]: labelValidator,
  [Field.DETAILS]: anyValidator,
  [Field.MESSAGE]: textValidator,
  [Field.STACK]: textValidator,
}).noUnknown()

export const settingValidator = object({
  [Field.KEY]: keyValidator,
  [Field.VALUE]: valueValidator,
}).noUnknown()

export const anyParentValidator = core.concat(parent).concat(exampleParent)
export const anyChildValidator = core.concat(child).concat(testChild)

export const exampleParentValidator = core.concat(parent).concat(exampleParent)
export const testParentValidator = core.concat(parent)

export const exampleChildValidator = core.concat(child)
export const testChildValidator = core.concat(child).concat(testChild)
