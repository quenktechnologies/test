"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.toString = exports.Failed = exports.Negative = exports.Positive = void 0;
var stringify = require("json-stringify-safe");
var deepEqual = require("deep-equal");
/**
 * Positive value matcher.
 */
var Positive = /** @class */ (function () {
    function Positive(name, value, throwErrors) {
        this.name = name;
        this.value = value;
        this.throwErrors = throwErrors;
        this.prefix = 'must';
    }
    Object.defineProperty(Positive.prototype, "be", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "is", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "not", {
        get: function () {
            return new Negative(this.name, this.value, this.throwErrors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Positive.prototype, "instance", {
        get: function () {
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Positive.prototype.assert = function (ok, condition) {
        if (!ok) {
            if (this.throwErrors)
                throw new Error(this.name + " " + this.prefix + " " + condition + "!");
            return new Failed(this.name, this.value, this.throwErrors);
        }
        return this;
    };
    Positive.prototype.of = function (cons) {
        return this.assert((this.value instanceof cons), "be instanceof " + cons.name);
    };
    Positive.prototype.object = function () {
        return this.assert(((typeof this.value === 'object') &&
            (this.value !== null)), 'be typeof object');
    };
    Positive.prototype.array = function () {
        return this.assert(Array.isArray(this.value), 'be an array');
    };
    Positive.prototype.string = function () {
        return this.assert((typeof this.value === 'string'), 'be typeof string');
    };
    Positive.prototype.number = function () {
        return this.assert((typeof this.value === 'number'), 'be typeof number');
    };
    Positive.prototype.boolean = function () {
        return this.assert((typeof this.value === 'boolean'), 'be typeof boolean');
    };
    Positive.prototype.true = function () {
        return this.assert((this.value === true), 'be true');
    };
    Positive.prototype.false = function () {
        return this.assert((this.value === false), 'be false');
    };
    Positive.prototype.null = function () {
        return this.assert(this.value === null, 'be null');
    };
    Positive.prototype.undefined = function () {
        return this.assert((this.value === undefined), 'be undefined');
    };
    Positive.prototype.equal = function (b) {
        return this.assert(this.value === b, "equal " + (0, exports.toString)(b));
    };
    Positive.prototype.equate = function (b) {
        return this.assert(deepEqual(this.value, b), "equate " + (0, exports.toString)(b));
    };
    Positive.prototype.throw = function (message) {
        var ok = false;
        try {
            this.value();
        }
        catch (e) {
            if (message != null) {
                ok = e.message === message;
            }
            else {
                ok = true;
            }
        }
        return this.assert(ok, "throw " + ((message != null) ? message : ''));
    };
    return Positive;
}());
exports.Positive = Positive;
/**
 * Negative value matcher.
 */
var Negative = /** @class */ (function (_super) {
    __extends(Negative, _super);
    function Negative() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = 'must not';
        return _this;
    }
    Negative.prototype.assert = function (ok, condition) {
        return _super.prototype.assert.call(this, !ok, condition);
    };
    Object.defineProperty(Negative.prototype, "not", {
        get: function () {
            // not not == true
            return new Positive(this.name, this.value, this.throwErrors);
        },
        enumerable: false,
        configurable: true
    });
    return Negative;
}(Positive));
exports.Negative = Negative;
/**
 * Failed matcher.
 */
var Failed = /** @class */ (function (_super) {
    __extends(Failed, _super);
    function Failed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Failed.prototype.assert = function (_, __) {
        return this;
    };
    return Failed;
}(Positive));
exports.Failed = Failed;
/**
 * @private
 */
var toString = function (value) {
    if (typeof value === 'function') {
        return value.name;
    }
    else if (value instanceof Date) {
        return value.toISOString();
    }
    else if (value instanceof RegExp) {
        return value.toString();
    }
    else if (typeof value === 'object') {
        if ((value != null) &&
            (value.constructor !== Object) &&
            (!Array.isArray(value)))
            return value.constructor.name;
        else
            return stringify(value);
    }
    return stringify(value);
};
exports.toString = toString;
/**
 * assert turns a value into a Matcher so it can be tested.
 *
 * The Matcher returned is positive and configured to throw
 * errors if any tests fail.
 */
var assert = function (value, name) {
    if (name === void 0) { name = ''; }
    return new Positive(name ? name : (0, exports.toString)(value), value, true);
};
exports.assert = assert;
//# sourceMappingURL=assert.js.map