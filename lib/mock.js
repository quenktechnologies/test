"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Call records the application of a function or method.
 */
var Call = /** @class */ (function () {
    function Call(name, args, ret) {
        this.name = name;
        this.args = args;
        this.ret = ret;
    }
    return Call;
}());
exports.Call = Call;
/**
 * Data recorded during testing.
 */
var Data = /** @class */ (function () {
    function Data(calls) {
        if (calls === void 0) { calls = []; }
        this.calls = calls;
    }
    /**
     * record the application of a method.
     */
    Data.prototype.record = function (name, args, ret) {
        this.calls.push(new Call(name, args, ret));
        return ret;
    };
    /**
     * called returns a list of methods that have been called so far.
     */
    Data.prototype.called = function () {
        return this.calls.map(function (c) { return c.name; });
    };
    return Data;
}());
exports.Data = Data;
/**
 * Mock can be extended to satisfy an interface for which we are only interested
 * in recording information about method application.
 */
var Mock = /** @class */ (function () {
    function Mock() {
        this.MOCK = new Data();
    }
    return Mock;
}());
exports.Mock = Mock;
//# sourceMappingURL=mock.js.map