import * as _ from 'lodash';
import { defaultMethodOptions } from './default-options';
import { logMessage } from './messages.helper';
var methodLogger = function (options) {
    if (options === void 0) { options = defaultMethodOptions; }
    return function (target, methodName, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, methodName);
        }
        var originalMethod = descriptor.value;
        descriptor.value = getMonkeyPatchMethod(originalMethod, methodName, options);
        descriptor.value.__loggerMonkeyPatchCompleted = true;
        return descriptor;
    };
};
var disableMethodLogger = function () {
    return function (target, methodName, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, methodName);
        }
        var originalMethod = descriptor.value;
        originalMethod.__loggerMonkeyPatchCompleted = true;
        return descriptor;
    };
};
export var getMonkeyPatchMethod = function (method, methodName, options) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logMessage(true, this, methodName, method, args, options);
        method.apply(this, args);
        logMessage(false, this, methodName, method, args, options);
    };
};
export function MethodLogger(options) {
    if (options === void 0) { options = defaultMethodOptions; }
    return methodLogger(options);
}
export function MethodLoggerWithoutArgs(options) {
    if (options === void 0) { options = defaultMethodOptions; }
    options = _.extend({}, options, {
        withArgs: false
    });
    return MethodLogger(options);
}
export function DisableLogger() {
    return disableMethodLogger();
}
//# sourceMappingURL=method-logger.decorator.js.map