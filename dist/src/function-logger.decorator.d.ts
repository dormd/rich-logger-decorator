import { FunctionLoggerOptions } from './interfaces';
export declare const getMonkeyPatchMethod: (method: Function, methodName: string, options: FunctionLoggerOptions) => Function;
export declare function Logger(options?: FunctionLoggerOptions): Function;
export declare function LoggerWithoutArgs(options?: FunctionLoggerOptions): Function;
export declare function DisableMethodLogger(): Function;
