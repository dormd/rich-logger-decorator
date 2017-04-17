import * as _ from 'lodash';
import { MethodLoggerOptions } from './interfaces';
import { defaultMethodOptions } from './default-options';
import { logMessage } from './messages.helper';

const methodLogger = function(options = defaultMethodOptions): Function {
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

export const getMonkeyPatchMethod = function (method: Function, methodName: string, options: MethodLoggerOptions): Function {
  return function(...args) {
    logMessage(true, this, methodName, method, args, options);
    method.apply(this, args);
    logMessage(false, this, methodName, method, args, options);
  };
};

export function MethodLogger(options = defaultMethodOptions): Function {
  return methodLogger(options);
}

export function MethodLoggerWithoutArgs(options = defaultMethodOptions): Function {
  options = _.extend({}, options, {
    withArgs: false
  });

  return MethodLogger(options);
}

export function DisableLogger(): Function {
  return disableMethodLogger();
}
