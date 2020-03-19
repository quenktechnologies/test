"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Invocation is a recording of method invocations stored by a Mock.
 */
var Invocation = /** @class */ (function () {
    function Invocation(name, args, value) {
        this.name = name;
        this.args = args;
        this.value = value;
    }
    return Invocation;
}());
exports.Invocation = Invocation;
/**
 * Return stores a value to be returned by a mocked method.
 */
var Return = /** @class */ (function () {
    function Return(name, value) {
        this.name = name;
        this.value = value;
    }
    Return.prototype.get = function () {
        return this.value;
    };
    return Return;
}());
exports.Return = Return;
/**
 * Mock is a class that can be used to keep track of the mocking of some
 * interface.
 *
 * It provides methods for recording the invocation of methods and setting
 * their return values. Generally, embedding a Mock instance is preffered to
 * extending the class.
 */
var Mock = /** @class */ (function () {
    function Mock(calls, returns) {
        if (calls === void 0) { calls = []; }
        if (returns === void 0) { returns = {}; }
        this.calls = calls;
        this.returns = returns;
    }
    /**
     * invoke records the invocation of a method.
     * @param method - The method name.
     * @param args   - An array of arguments the method is called with.
     * @param ret    - The return value of the method invocation.
     */
    Mock.prototype.invoke = function (method, args, ret) {
        this.calls.push(new Invocation(method, args, ret));
        return this.returns.hasOwnProperty(method) ?
            this.returns[method].get() : ret;
    };
    /**
     * setReturnValue so that invocation of a method always return the desired
     * result.
     */
    Mock.prototype.setReturnValue = function (method, value) {
        this.returns[method] = new Return(method, value);
        return this;
    };
    /**
     * getCalledList returns a list of methods that have been called so far.
     */
    Mock.prototype.getCalledList = function () {
        return this.calls.map(function (c) { return c.name; });
    };
    /**
     * wasCalled tests whether a method was called.
     */
    Mock.prototype.wasCalled = function (method) {
        return this.getCalledList().indexOf(method) > -1;
    };
    /**
     * wasCalledNTimes tests whether a method was called a certain amount of
     * times.
     */
    Mock.prototype.wasCalledNTimes = function (method, n) {
        return this.getCalledList().reduce(function (p, c) {
            return (c === method) ? p + 1 : p;
        }, 0) === n;
    };
    return Mock;
}());
exports.Mock = Mock;
//# sourceMappingURL=mock.js.map