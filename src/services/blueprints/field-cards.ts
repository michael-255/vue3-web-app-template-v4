import { uid } from 'quasar'
import { idValidator } from '@/services/Validators'
import { Field } from '@/types/database'
// import { defineAsyncComponent } from 'vue'

export const idCard: Readonly<any> = {
  name: Field.ID,
  label: 'Id',
  default: () => idValidator.default(() => uid()),
  booleanValidator: (val: string) => idValidator.isValid(val),
  strictValidator: (val: string) => idValidator.validate(val),
  inspectFormat: (val: string) => `${val}`,
  createBehavior: null, // ?
  updateBehavior: null, // ?
  // component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputId.vue')),
}
