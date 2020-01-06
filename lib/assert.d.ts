/**
 * Type
 */
export declare type Type = any;
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
export declare class Positive implements Matcher {
    value: Type;
    throwErrors: boolean;
    constructor(value: Type, throwErrors: boolean);
    prefix: string;
    get be(): this;
    get not(): Negative;
    get instance(): this;
    assert(ok: boolean, condition: string): Matcher;
    of(cons: Function): Matcher;
    object(): Matcher;
    array(): Matcher;
    string(): Matcher;
    number(): Matcher;
    boolean(): Matcher;
    true(): Matcher;
    false(): Matcher;
    null(): Matcher;
    undefined(): Matcher;
    equal(b: Type): Matcher;
    equate(b: Type): Matcher;
    throw(message?: string): Matcher;
}
/**
 * Negative value matcher.
 */
export declare class Negative extends Positive {
    prefix: string;
    assert(ok: boolean, condition: string): Matcher;
    get not(): Positive;
}
/**
 * Failed matcher.
 */
export declare class Failed extends Positive {
    assert(_: boolean, __: string): Matcher;
}
/**
 * @private
 */
export declare const toString: <A>(value: A) => string;
/**
 * assert turns a value into a Matcher so it can be tested.
 *
 * The Matcher returned is positive and configured to throw
 * errors if any tests fail.
 */
export declare const assert: (value: any) => Matcher;
