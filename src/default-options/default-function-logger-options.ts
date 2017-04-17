import { FunctionLoggerOptions } from '../interfaces/function-logger-options.interface';

export const defaultFunctionOptions: FunctionLoggerOptions = {
  withArgs: true,
  withTime: false,
  withClassProperties: true,
  logFunction: console.log
};
