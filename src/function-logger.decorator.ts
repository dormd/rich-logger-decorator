import * as _ from 'lodash';
import { FunctionLoggerOptions } from './interfaces';
import { defaultFunctionOptions } from './default-options';
import { logMessage } from './messages.helper';

const logger = function(options = defaultFunctionOptions): Function {
  return function(target, methodName: string, descriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, methodName);
    }

    var originalMethod = descriptor.value;

    descriptor.value = getMonkeyPatchMethod(originalMethod, methodName, options);
    descriptor.value.__loggerMonkeyPatchCompleted = true;

    return descriptor;
  };
};

const disableMethodLogger = function(): Function {
  return function (target, methodName: string, descriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, methodName);
    }

    var originalMethod = descriptor.value;
    originalMethod.__loggerMonkeyPatchCompleted = true;

    return descriptor;
  };
};

export const getMonkeyPatchMethod = function (method: Function, methodName: string, options: FunctionLoggerOptions): Function {
  return function(...args) {
    logMessage(true, this, methodName, method, args, options);
    const result = method.apply(this, args);
    logMessage(false, this, methodName, method, args, options);
    
    return result;
  };
};

export function Logger(options = defaultFunctionOptions): Function {
  return logger(options);
}

export function LoggerWithoutArgs(options = defaultFunctionOptions): Function {
  options = _.extend({}, options, {
    withArgs: false
  });

  return Logger(options);
}

export function DisableMethodLogger(): Function {
  return disableMethodLogger();
}
