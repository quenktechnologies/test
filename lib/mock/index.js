"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invocation = exports.Mock = void 0;
// Legacy export (deprecated).
var object_1 = require("./object");
Object.defineProperty(exports, "Mock", { enumerable: true, get: function () { return object_1.MockObject; } });
/**
 * Invocation is a recording of method invocations stored by a MockObject.
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
//# sourceMappingURL=index.js.map