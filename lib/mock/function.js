"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockFunction = void 0;
var deepEqual = require("deep-equal");
var _1 = require("./");
/**
 * MockFunction provides an object used to mock a function.
 *
 * Calls to the function are recorded internally and can be queried after the
 * fact. Use the [[toFunction]] method in places where an actual function is
 * accepted.
 */
var MockFunction = /** @class */ (function () {
    function MockFunction(value) {
        this.value = value;
        this.calls = [];
    }
    MockFunction.create = function (value) {
        return new MockFunction(value);
    };
    /**
     * getCalledCount provides the number of times the function was called.
     */
    MockFunction.prototype.getCalledCount = function () {
        return this.calls.length;
    };
    /**
     * wasCalled tests whether a method was called.
     */
    MockFunction.prototype.wasCalled = function () {
        return this.getCalledCount() > 0;
    };
    /**
     * wasCalledWith tests whether the function was called with the specified
     * argumentsa
     *
     * Compared using === .
     */
    MockFunction.prototype.wasCalledWith = function (args) {
        return this.calls.some(function (c) { return c.args.every(function (a, i) { return a === args[i]; }); });
    };
    /**
     * wasCalledWithDeep tests whether a method was called with the specified
     * args.
     *
     * Compared using deepEqual.
     */
    MockFunction.prototype.wasCalledWithDeep = function (args) {
        return this.calls.some(function (c) { return deepEqual(c.args, args); });
    };
    /**
     * invoke records the invocation of this function.
     * @param args   - An array of arguments the function is called with.
     */
    MockFunction.prototype.invoke = function (_this, args) {
        if (args === void 0) { args = []; }
        var ret = (typeof this.value === 'function') ?
            this.value.apply(_this, args) :
            this.value;
        this.calls.push(new _1.Invocation('', args, ret));
        return ret;
    };
    /**
     * call this MockFunction.
     */
    MockFunction.prototype.call = function () {
        var allArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allArgs[_i] = arguments[_i];
        }
        var _this = allArgs[0];
        var args = allArgs.slice(1);
        return this.invoke(_this, args);
    };
    /**
     * apply this MockFunction.
     */
    MockFunction.prototype.apply = function (_this, args) {
        if (args === void 0) { args = []; }
        return this.invoke(_this, args);
    };
    /**
     * toFunction provides a callable function that can be used in place of this
     * instance.
     *
     * Calls to the function will be forwarded to the MockFunction instance.
     */
    MockFunction.prototype.toFunction = function () {
        var that = this;
        return function () {
            //@ts-ignore: 2683
            return that.apply(this, Array.prototype.slice.call(arguments));
        };
    };
    return MockFunction;
}());
exports.MockFunction = MockFunction;
//# sourceMappingURL=function.js.map