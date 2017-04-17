import { MethodLoggerOptions } from '../interfaces/method-logger-options.interface';

export const defaultMethodOptions: MethodLoggerOptions = {
  withArgs: true,
  withTime: false,
  withClassProperties: true,
  logFunction: console.log
};
