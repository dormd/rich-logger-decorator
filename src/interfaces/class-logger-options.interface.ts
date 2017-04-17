import { MethodLoggerOptions } from './method-logger-options.interface';

export interface ClassLoggerOptions {
  methodOptions?: MethodLoggerOptions,
  loggedMethodsNames?: string[]
}