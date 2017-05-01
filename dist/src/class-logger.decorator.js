import * as _ from 'lodash';
import { defaultFunctionOptions, defaultClassOptions } from './default-options';
import { getMonkeyPatchMethod } from './function-logger.decorator';
export function ClassLogger(options) {
    if (options === void 0) { options = defaultClassOptions; }
    options.methodOptions = options.methodOptions || defaultFunctionOptions;
    return function (target) {
        _.keys(target.prototype).filter(function (methodName) {
            return !options.loggedMethodsNames || options.loggedMethodsNames.indexOf(methodName) !== -1;
        }).forEach(function (methodName) {
            var originalMethod = target.prototype[methodName];
            // set by method logger decorator for disabling the method log
            if (typeof (originalMethod) !== "function" || originalMethod.__loggerMonkeyPatchCompleted === true) {
                return;
            }
            target.prototype[methodName] = getMonkeyPatchMethod(originalMethod, methodName, options.methodOptions);
        });
    };
}
export function ClassLoggerWithoutArgs() {
    var options = _.extend({ methodOptions: {} }, defaultClassOptions);
    options.methodOptions.withArgs = false;
    return ClassLogger(options);
}
//# sourceMappingURL=class-logger.decorator.js.map