import { Key, Relation, Severity, Type } from '@/types/database'
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

export const idValidator = string().required().uuid() // Auto generated for user, so no changing (NO button to regenerate)
export const timestampValidator = number().required().integer() // Controled via buttons by user + auto generated (Date, Time, Now)
export const typeValidator = string().required().oneOf(Object.values(Type)) // Pre-selected, not changable by user
export const relationValidator = string().required().oneOf(Object.values(Relation)) // Pre-selected, not changable by user

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const nameValidator = string().required().min(1).max(50).trim() // BLANK, user MUST enter name to continue
export const descValidator = string().required().max(500).trim() // BLANK
export const enabledValidator = boolean().defined() // true
export const favoritedValidator = boolean().defined() // false

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const noteValidator = string().required().max(500).trim() // BLANK

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const testIdsValidator = array().of(idValidator).defined()
export const percentValidator = number().required().min(0).max(100) // BLANK
