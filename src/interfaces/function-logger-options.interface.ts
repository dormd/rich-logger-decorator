export interface LogFunction {
  (message: string): void
}

export interface FormatAndLogFunction {
  (time: string, className: string, functionName: string, isStartLog: boolean, args: string[], props: string[]): void
}

export interface FunctionLoggerOptions {
  withArgs?: boolean | string[],
  withTime?: boolean,
  withClassProperties?: boolean | string[],
  logFunction?: LogFunction,
  formatAndLogFunction?: FormatAndLogFunction
}