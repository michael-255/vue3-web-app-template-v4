import { InternalField } from '@/types/database'
import { createdTimestampSchema } from '@/models/_Entity'
import { z } from 'zod'

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
    this.details = details

    if (this.details && typeof this.details === 'object') {
      if ('message' in this.details || 'stack' in this.details) {
        // An object with a message or stack property is a JS Error
        this.errorMessage = this.details.message
        this.stackTrace = this.details.stack
      } else {
        // Should be safe to store most other objects into the details property
        // Details only used with non-error logs
        this.details = details
      }
    }
  }
}
