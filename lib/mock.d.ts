/**
 * Value represents any ES value in a type safe way.
 */
export declare type Value = number | boolean | string | object | Function | Value[];
/**
 * ReturnValue of a mocked method or function.
 *
 * This can be the raw value or a function that given the arguments of the
 * method/function will produce a value.
 */
export declare type ReturnValue = Value | ValueFun;
/**
 * ValueFun
 */
export declare type ValueFun = (arg: Value[]) => Value;
/**
 * Returns map.
 */
export interface Returns {
    [key: string]: Return;
}
/**
 * Invocation is a recording of method invocations stored by a Mock.
 */
export declare class Invocation {
    name: string;
    args: Value[];
    value: ReturnValue;
    constructor(name: string, args: Value[], value: ReturnValue);
}
/**
 * Return stores a value to be returned by a mocked method.
 */
export declare class Return {
    name: string;
    value: ReturnValue;
    constructor(name: string, value: ReturnValue);
    get(): Value;
}
/**
 * Mock is a class that can be used to keep track of the mocking of some
 * interface.
 *
 * It provides methods for recording the invocation of methods and setting
 * their return values. Generally, embedding a Mock instance is preffered to
 * extending the class.
 */
export declare class Mock {
    calls: Invocation[];
    returns: Returns;
    constructor(calls?: Invocation[], returns?: Returns);
    /**
     * invoke records the invocation of a method.
     * @param method - The method name.
     * @param args   - An array of arguments the method is called with.
     * @param ret    - The return value of the method invocation.
     */
    invoke<T extends Value>(method: string, args: Value[], ret: T): T;
    /**
     * setReturnValue so that invocation of a method always return the desired
     * result.
     */
    setReturnValue(method: string, value: ReturnValue): Mock;
    /**
     * getCalledList returns a list of methods that have been called so far.
     */
    getCalledList(): string[];
    /**
     * wasCalled tests whether a method was called.
     */
    wasCalled(method: string): boolean;
    /**
     * wasCalledNTimes tests whether a method was called a certain amount of
     * times.
     */
    wasCalledNTimes(method: string, n: number): boolean;
}
