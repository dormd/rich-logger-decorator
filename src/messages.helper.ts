import * as _ from 'lodash';
import { FunctionLoggerOptions } from './interfaces';

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

const getClassName = function(instance): string {
  return instance.constructor ? instance.constructor.name : null;
};

const getArgsStrings = function(argValues: any[], func: Function, options: FunctionLoggerOptions): string[] {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let argNames: string[] | null = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(argNames === null)
    return [];

  const requiredArgNames = (options.withArgs instanceof Array) ? options.withArgs : argNames; 
  
  return requiredArgNames.map(function (argName: string): number {
    return argNames.indexOf(argName);
  }).map(function (argNameIndex: number): string {
    if (argNameIndex === -1 || argNameIndex >= argValues.length) return '';

    return `[${argNames[argNameIndex]}=${argValues[argNameIndex]}]`
  });
};

const getPropertiesStrings = function(withClassProperties: boolean | string[], targetInstance): string[] {
  const allProps = _.keys(targetInstance);
  const requiredProps = (withClassProperties instanceof Array) ? _.intersection(allProps, withClassProperties) : allProps; 

  return requiredProps.map(function (propName: string): string {
    return `[${propName}=${targetInstance[propName]}]`
  });
};

const getTime = function(): string {
  const timeStr = (new Date()).toLocaleString().replace(',', '');
  return timeStr;
};

export const logMessage = function(isStart: boolean, targetInstance, functionName, originalFunction, functionArgsVals, options: FunctionLoggerOptions): void {
  const time = options.withTime ? `[${getTime()}` : ''

  const className = getClassName(targetInstance);
  const classNameStr = className ? `${className}::` : '';
  
  const logFunction = options.logFunction || console.info;

  const args = options.withArgs ? getArgsStrings(functionArgsVals, originalFunction, options) : null;
  const props = options.withClassProperties ? getPropertiesStrings(options.withClassProperties, targetInstance) : null;

  if (options.formatAndLogFunction) {
    options.formatAndLogFunction(time, classNameStr, functionName, isStart, args, props);
    return;
  }

  const startEndStr = isStart ? 'start' : 'end';
  logFunction(`${time}\t${classNameStr}${functionName}\t${startEndStr}`);

  args && logFunction(`\tFunction arguments:\t${args.join(' ')}`);
  props && logFunction(`\tClass properties:\t${props.join(' ')}`);
};