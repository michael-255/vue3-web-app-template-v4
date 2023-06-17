import { Type, Severity, LogField, SettingField, RecordField } from '@/types/database'
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
  [RecordField.ID]: idValidator,
  [RecordField.TIMESTAMP]: timestampValidator,
  [RecordField.TYPE]: typeValidator,
}).noUnknown()

const parent = object({
  [RecordField.NAME]: nameValidator,
  [RecordField.DESC]: textAreaValidator,
  [RecordField.ENABLED]: booleanValidator,
  [RecordField.FAVORITED]: booleanValidator,
  [RecordField.LAST_CHILD]: core.concat(
    object({
      [RecordField.PARENT_ID]: idValidator,
      [RecordField.NOTE]: textAreaValidator,
    }).noUnknown()
  ),
}).noUnknown()

const child = object({
  [RecordField.PARENT_ID]: idValidator,
  [RecordField.NOTE]: textAreaValidator,
}).noUnknown()

const exampleParent = object({
  [RecordField.TEST_IDS]: testIdsValidator,
}).noUnknown()

const testChild = object({
  [RecordField.PERCENT]: percentValidator,
}).noUnknown()

export const logValidator = object({
  [LogField.AUTO_ID]: autoIdValidator,
  [LogField.TIMESTAMP]: timestampValidator,
  [LogField.SEVERITY]: severityValidator,
  [LogField.LABEL]: labelValidator,
  [LogField.DETAILS]: anyValidator,
  [LogField.MESSAGE]: textValidator,
  [LogField.STACK]: textValidator,
}).noUnknown()

export const settingValidator = object({
  [SettingField.KEY]: keyValidator,
  [SettingField.VALUE]: valueValidator,
}).noUnknown()

export const anyParentValidator = core.concat(parent).concat(exampleParent)
export const anyChildValidator = core.concat(child).concat(testChild)

export const exampleParentValidator = core.concat(parent).concat(exampleParent)
export const testParentValidator = core.concat(parent)

export const exampleChildValidator = core.concat(child)
export const testChildValidator = core.concat(child).concat(testChild)
