import { InternalField } from '@/types/database'
import { createdTimestampSchema } from '@/models/_Entity'
import { z } from 'zod'
import { Icon } from '@/types/general'

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export const logDetailsSchema = z.record(z.any()).optional()
export type LogDetails = z.infer<typeof logDetailsSchema>

export const logSchema = z.object({
  [InternalField.AUTO_ID]: z.any().optional(), // Dexie handles the auto incrementing id
  [InternalField.TIMESTAMP]: createdTimestampSchema,
  [InternalField.LOG_LEVEL]: z.nativeEnum(LogLevel),
  [InternalField.LABEL]: z.string().trim(),
  [InternalField.DETAILS]: logDetailsSchema,
  [InternalField.ERROR_MESSAGE]: z.string().trim().optional(),
  [InternalField.STACK_TRACE]: z.string().trim().optional(),
})

export class Log {
  [InternalField.AUTO_ID]?: any; // Dexie handles the auto incrementing id
  [InternalField.TIMESTAMP]: number;
  [InternalField.LOG_LEVEL]: LogLevel;
  [InternalField.LABEL]: string;
  [InternalField.DETAILS]?: LogDetails;
  [InternalField.ERROR_MESSAGE]?: string;
  [InternalField.STACK_TRACE]?: string

  constructor(logLevel: LogLevel, label: string, details: LogDetails) {
    this.timestamp = Date.now()
    this.logLevel = logLevel
    this.label = label

    if (details && typeof details === 'object') {
      if ('message' in details || 'stack' in details) {
        // An object with a message or stack property is a JS Error
        this.errorMessage = details.message
        this.stackTrace = details.stack
        this.details = undefined
      } else {
        // Should be safe to store most other objects into the details property
        // Details only used with non-error logs
        this.details = details
      }
    }
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Log' : 'Logs'
  }
}
