import type {
  logValidator,
  exampleParentValidator,
  exampleChildValidator,
  testParentValidator,
  testChildValidator,
  recordValidator,
} from '@/services/Validators'
import type { InferType } from 'yup'
import type { SettingField } from './database'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODELS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export type Setting = {
  [SettingField.KEY]: string
  [SettingField.VALUE]: string
}

export type Log = InferType<typeof logValidator>
export type ExampleParent = InferType<typeof exampleParentValidator>
export type ExampleChild = InferType<typeof exampleChildValidator>
export type TestParent = InferType<typeof testParentValidator>
export type TestChild = InferType<typeof testChildValidator>
export type Record = InferType<typeof recordValidator>
