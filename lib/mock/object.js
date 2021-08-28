"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockObject = exports.ReturnCallback = exports.ReturnValue = void 0;
var deepEqual = require("deep-equal");
var _1 = require("./");
/**
 * ReturnValue stores a value to be returned by a mocked method.
 */
var ReturnValue = /** @class */ (function () {
    function ReturnValue(name, value) {
        this.name = name;
        this.value = value;
    }
    ReturnValue.prototype.get = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i] = arguments[_i];
        }
        return this.value;
    };
    return ReturnValue;
}());
exports.ReturnValue = ReturnValue;
/**
 * ReturnCallback allows a function to be used to provide a ReturnValue.
 */
var ReturnCallback = /** @class */ (function () {
    function ReturnCallback(name, value) {
        this.name = name;
        this.value = value;
    }
    ReturnCallback.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.value.apply(undefined, args);
    };
    return ReturnCallback;
}());
exports.ReturnCallback = ReturnCallback;
/**
 * MockObject is a class that can be used to keep track of the mocking of some
 * interface.
 *
 * It provides methods for recording the invocation of methods and setting
 * their return values. Generally, embedding a MockObject instance is preffered
 * to extending the class.
 */
var MockObject = /** @class */ (function () {
    function MockObject() {
        this.calls = [];
        this.returns = {};
    }
    /**
     * getCalledCount provides the number of times a method was called.
     */
    MockObject.prototype.getCalledCount = function (method) {
        return this.calls.reduce(function (p, c) { return (c.name === method) ? p + 1 : p; }, 0);
    };
    /**
     * getCalledArgs provides the first set of arguments a method was called
     * with.
     *
     * The array is empty if the method was never called.
     */
    MockObject.prototype.getCalledArgs = function (name) {
        return this.calls.reduce(function (p, c) {
            return (p.length > 0) ? p : (c.name === name) ?
                c.args : p;
        }, []);
    };
    /**
     * getCalledList returns a list of methods that have been called so far.
     */
    MockObject.prototype.getCalledList = function () {
        return this.calls.map(function (c) { return c.name; });
    };
    /**
     * setReturnValue so that invocation of a method always return the desired
     * result.
     */
    MockObject.prototype.setReturnValue = function (method, value) {
        this.returns[method] = new ReturnValue(method, value);
        return this;
    };
    /**
     * setReturnCallback allows a function to provide the return value
     * of a method on invocation.
     */
    MockObject.prototype.setReturnCallback = function (method, value) {
        this.returns[method] =
            new ReturnCallback(method, value);
        return this;
    };
    /**
     * invoke records the invocation of a method.
     * @param method - The method name.
     * @param args   - An array of arguments the method is called with.
     * @param ret    - The return value of the method invocation.
     */
    MockObject.prototype.invoke = function (method, args, ret) {
        this.calls.push(new _1.Invocation(method, args, ret));
        return this.returns.hasOwnProperty(method) ?
            this.returns[method].get.apply(this.returns[method], args) : ret;
    };
    /**
     * wasCalledWith tests whether a method was called with the specified args.
     *
     * Compared using === .
     */
    MockObject.prototype.wasCalledWith = function (name, args) {
        return this.calls.some(function (c) { return (c.name === name) &&
            c.args.every(function (a, i) { return a === args[i]; }); });
    };
    /**
     * wasCalledWithDeep tests whether a method was called with the specified
     * args.
     *
     * Compared using deepEqual.
     */
    MockObject.prototype.wasCalledWithDeep = function (name, args) {
        return this.calls.some(function (c) {
            return (c.name === name) && deepEqual(c.args, args);
        });
    };
    /**
     * wasCalled tests whether a method was called.
     */
    MockObject.prototype.wasCalled = function (method) {
        return this.getCalledList().indexOf(method) > -1;
    };
    /**
     * wasCalledNTimes tests whether a method was called a certain amount of
     * times.
     */
    MockObject.prototype.wasCalledNTimes = function (method, n) {
        console.warn('wasCalledNTimes: deprecated, use getCalledCount() instead.');
        return this.getCalledList().reduce(function (p, c) {
            return (c === method) ? p + 1 : p;
        }, 0) === n;
    };
    return MockObject;
}());
exports.MockObject = MockObject;
//# sourceMappingURL=object.js.map