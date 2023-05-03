import { DatabaseField, SettingId } from '@/types/database'
import { LogRetention, type Optional } from '@/types/misc'
import { uid } from 'quasar'

// TODO - Move these to field-blueprints.ts
/**
 * Default functions for each field.
 */
export const FieldDefault = Object.freeze({
  [DatabaseField.ID]: (): string => uid(),
  [DatabaseField.NAME]: (): string => 'Example',
  [DatabaseField.DESCRIPTION]: (): string => '',
  [DatabaseField.IS_FAVORITED]: (): boolean => false,
  [DatabaseField.IS_ENABLED]: (): boolean => true,
  [DatabaseField.NOTE]: (): string => '',
  // Result Defaults
  [DatabaseField.NUMBER]: (): Optional<number> => null,
})
