import { Group, Severity, Type, Field } from '@/types/database'
import { mixed, object, array, string, number, boolean } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const severityValidator = string().required().oneOf(Object.values(Severity))
export const labelValidator = string().required().trim()
export const detailsValidator = mixed()
export const messageValidator = string()
export const stackValidator = string()

const log = object({
  [Field.SEVERITY]: severityValidator,
  [Field.LABEL]: labelValidator,
  [Field.DETAILS]: detailsValidator,
  [Field.MESSAGE]: messageValidator,
  [Field.STACK]: stackValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const uidValidator = string().required().uuid()
export const timestampValidator = number().required().integer()
export const typeValidator = string().required().oneOf(Object.values(Type))
export const groupValidator = string().required().oneOf(Object.values(Group))

const core = object({
  [Field.UID]: uidValidator,
  [Field.GROUP_ID]: uidValidator,
  [Field.TYPE]: typeValidator,
  [Field.GROUP]: groupValidator,
  [Field.TIMESTAMP]: timestampValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const nameValidator = string().required().min(1).max(50).trim()
export const textAreaValidator = string().defined().max(500).trim()
export const enabledValidator = boolean().defined()
export const favoritedValidator = boolean().defined()

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

export const testPksValidator = array().of(uidValidator).defined()
export const percentValidator = number().required().min(0).max(100)

const exampleParent = object({
  [Field.TEST_UIDS]: array().of(uidValidator).defined(),
}).noUnknown()

const testChild = object({
  [Field.PERCENT]: percentValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODEL VALIDATORS                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const logValidator = mixed().concat(core).concat(log)
export const exampleParentValidator = mixed().concat(core).concat(parent).concat(exampleParent)
export const exampleChildValidator = mixed().concat(core).concat(child)
export const testParentValidator = mixed().concat(core).concat(parent)
export const testChildValidator = mixed().concat(core).concat(child).concat(testChild)
export const recordValidator = mixed()
  .concat(core)
  .concat(parent)
  .concat(child)
  .concat(exampleParent)
  .concat(testChild)
  .concat(log)
