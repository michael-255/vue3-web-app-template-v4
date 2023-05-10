import type {
  exampleParentValidator,
  exampleChildValidator,
  testParentValidator,
  testChildValidator,
  recordValidator,
  logValidator,
  settingValidator,
} from '@/services/validators'
import type { InferType } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODELS (Infering from `yup` validators)                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Infering user record types from the validators
export type Log = InferType<typeof logValidator>
export type Setting = InferType<typeof settingValidator>
export type ExampleParent = InferType<typeof exampleParentValidator>
export type ExampleChild = InferType<typeof exampleChildValidator>
export type TestParent = InferType<typeof testParentValidator>
export type TestChild = InferType<typeof testChildValidator>
export type Record = Partial<InferType<typeof recordValidator>>
