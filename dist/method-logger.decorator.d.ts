import { MethodLoggerOptions } from './interfaces';
export declare const getMonkeyPatchMethod: (method: Function, methodName: string, options: MethodLoggerOptions) => Function;
export declare function MethodLogger(options?: MethodLoggerOptions): Function;
export declare function MethodLoggerWithoutArgs(options?: MethodLoggerOptions): Function;
export declare function DisableLogger(): Function;
