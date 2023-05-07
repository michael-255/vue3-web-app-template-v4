import { Key, Group, Severity, Type } from '@/types/database'
import { mixed, array, string, number, boolean } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOGS                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const autoIdValidator = number().integer()
export const severityValidator = string().required().oneOf(Object.values(Severity))
export const labelValidator = string().required().trim()
export const detailsValidator = mixed()
export const messageValidator = string()
export const stackValidator = string()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTINGS                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const keyValidator = string().required().oneOf(Object.values(Key))
export const valueValidator = mixed().required()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const uidValidator = string().required().uuid() // Auto generated for user, so no changing (NO button to regenerate)
export const timestampValidator = number().required().integer() // Controled via buttons by user + auto generated (Date, Time, Now)
export const typeValidator = string().required().oneOf(Object.values(Type)) // Pre-selected, not changable by user
export const groupValidator = string().required().oneOf(Object.values(Group)) // Pre-selected, not changable by user

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const nameValidator = string().required().min(1).max(50).trim() // BLANK, user MUST enter name to continue
export const enabledValidator = boolean().defined() // true
export const favoritedValidator = boolean().defined() // false

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const textAreaValidator = string().defined().max(500).trim()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const testPksValidator = array().of(uidValidator).defined()
export const percentValidator = number().required().min(0).max(100)
