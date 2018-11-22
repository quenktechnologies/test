import * as stringify from 'json-stringify-safe';
import * as egal from 'egal';

/**
 * Type 
 */
export type Type = any;

/**
 * Matcher is used to execute tests against a value.
 *
 * Matchers provide various methods and properties for "fluent"
 * chaining of test operations.
 *
 *
 * A Matcher can be one of either Positive, Negative or Failed.
 * Positive matches succeed if a test passers, Negative succeeds
 * if the tests failed. 
 *
 * A Failed is used mostly for unit testing as by default Matchers
 * are configured to throw errors if a test fails.
 */
export interface Matcher {

    /**
     * be is a convenience property for creating a more descriptive chain.
     */
    be: Matcher;

    /**
     * not is a convenience property for a negative matcher.
     */
    not: Matcher;

    /**
     * instance is an alias of be.
     */
    instance: Matcher;

    /**
     * of checks if the value is an instanceof the supplied constructor.
     */
    of(cons: Function): Matcher;

    /**
     * equal strictly checks if the value is equal to the value supplied.
     */
    equal(b: Type): Matcher;

    /**
     * equate checks object equality by content recursively.
     */
    equate(b: Type): Matcher;

    /**
     * throw checks if a function raised an error.
     */
    throw(message?: string): Matcher;

    /**
     * object value check.
     */
    object(): Matcher;

    /**
     * array value check.
     */
    array(): Matcher;

    /**
     * string check.
     */
    string(): Matcher;

    /**
     * number check.
     */
    number(): Matcher;

    /**
     * boolean value check.
     */
    boolean(): Matcher;

    /**
     * true boolean value check.
     */
    true(): Matcher;

    /**
     * false boolean value check.
     */
    false(): Matcher;

    /**
     * null value test
     */
    null(): Matcher;

    /**
     * undefined value test
     */
    undefined(): Matcher;

}

/**
 * Positive value matcher.
 */
export class Positive implements Matcher {

    constructor(public value: Type, public throwErrors: boolean) { }

    prefix = 'must';

    get be() {

        return this;

    }

    get not() {

        return new Negative(this.value, this.throwErrors);

    }

    get instance() {

        return this;

    }

    assert(ok: boolean, condition: string): Matcher {

        if (!ok) {

            if (this.throwErrors)
                throw new Error(`The value ${toString(this.value)} ${this.prefix} ` +
                    `${condition}!`);

            return new Failed(this.value, this.throwErrors);

        }

        return this;

    }

    of(cons: Function): Matcher {

        return this.assert((this.value instanceof cons),
            `be instanceof ${(<any>cons).name}`);

    }

    object(): Matcher {

        return this.assert(((typeof this.value === 'object') &&
            (this.value !== null)), 'be typeof object');

    }

    array(): Matcher {

        return this.assert(Array.isArray(this.value), 'be an array');

    }

    string(): Matcher {

        return this.assert((typeof this.value === 'string'), 'be typeof string');

    }

    number(): Matcher {

        return this.assert((typeof this.value === 'number'), 'be typeof number');

    }

    boolean(): Matcher {

        return this.assert((typeof this.value === 'boolean'), 'be typeof boolean');

    }

    true(): Matcher {

        return this.assert((this.value === true), 'be true');

    }

    false(): Matcher {

        return this.assert((this.value === false), 'be false');

    }

    null(): Matcher {

        return this.assert(this.value === null, 'be null');

    }

    undefined(): Matcher {

        return this.assert((this.value === undefined), 'be undefined');

    }

    equal(b: Type): Matcher {

        return this.assert(this.value === b, `equal ${toString(b)}`);

    }

    equate(b: Type): Matcher {

        return this.assert(egal.deepEgal(this.value, b), `equate ${b}`);

    }

    throw(message?: string): Matcher {

        let ok = false;

        try {

            (<Function>this.value)();

        } catch (e) {

            if (message != null) {

                ok = e.message === message;

            } else {

                ok = true;

            }

        }

        return this.assert(ok, `throw ${(message != null) ? message : ''}`);

    }

}

/**
 * Negative value matcher.
 */
export class Negative extends Positive {

    prefix = 'must not';

    assert(ok: boolean, condition: string): Matcher {

        return super.assert(!ok, condition);

    }
    get not() {

        return new Positive(this.value, this.throwErrors); // not not == true

    }

}

/**
 * Failed matcher.
 */
export class Failed extends Positive {

    assert(_: boolean, __: string): Matcher {

        return this;

    }

}

/**
 * @private
 */
export const toString = <A>(value: A): string => {

    if (typeof value === 'function') {

        return (<any>value).name;

    } else if (value instanceof Date) {

        return value.toISOString();

    } else if (value instanceof RegExp) {

        return value.toString();

    } else if (typeof value === 'object') {

        if ((value.constructor !== Object) && (!Array.isArray(value)))
            return (<any>value.constructor).name;
        else
            return stringify(value);

    }

    return stringify(value);

}

/**
 * must turns a value into a Matcher so it can be tested.
 *
 * The Matcher returned is positive and configured to throw
 * errors if any tests fail.
 */
export const must = (value: Type): Matcher => new Positive(value, true); 
