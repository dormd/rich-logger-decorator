import { FunctionLoggerOptions } from './function-logger-options.interface';

export interface ClassLoggerOptions {
  methodOptions?: FunctionLoggerOptions,
  loggedMethodsNames?: string[]
}