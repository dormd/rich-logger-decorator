import * as _ from 'lodash';

import { ClassLoggerOptions } from './interfaces';
import { defaultFunctionOptions, defaultClassOptions } from './default-options';
import { getMonkeyPatchMethod } from './function-logger.decorator';

export function ClassLogger(options = defaultClassOptions): Function {
  options.methodOptions = options.methodOptions || defaultFunctionOptions; 
  
  return function(target) {
    _.keys(target.prototype).filter(function (methodName: string): boolean {
      return !options.loggedMethodsNames || options.loggedMethodsNames.indexOf(methodName) !== -1;
    }).forEach(function (methodName: string): void {
      const originalMethod = target.prototype[methodName];

      // set by method logger decorator for disabling the method log
      if (typeof(originalMethod) !== "function" || originalMethod.__loggerMonkeyPatchCompleted === true) {
        return;
      }

      target.prototype[methodName] = getMonkeyPatchMethod(originalMethod, methodName, options.methodOptions);      
    });
  };
}

export function ClassLoggerWithoutArgs(): Function {
  const options: ClassLoggerOptions = _.extend({ methodOptions: {} }, defaultClassOptions);
  options.methodOptions.withArgs = false;

  return ClassLogger(options);  
}
