/**
 * ESValue represents any ES value in a type safe way.
 */
export declare type ESValue = number | boolean | string | object | Function | null | undefined | ESValue[];
/**
 * ESValueCallback
 */
export declare type ESValueCallback = (...arg: ESValue[]) => ESValue;
/**
 * Returns map.
 */
export interface Returns {
    [key: string]: ReturnValue | ReturnCallback;
}
/**
 * Invocation is a recording of method invocations stored by a Mock.
 */
export declare class Invocation {
    name: string;
    args: ESValue[];
    value: ESValue;
    constructor(name: string, args: ESValue[], value: ESValue);
}
/**
 * ReturnValue stores a value to be returned by a mocked method.
 */
export declare class ReturnValue {
    name: string;
    value: ESValue;
    constructor(name: string, value: ESValue);
    get(..._: ESValue[]): ESValue;
}
/**
 * ReturnCallback allows a function to be used to provide a ReturnValue.
 */
export declare class ReturnCallback {
    name: string;
    value: (...args: ESValue[]) => ESValue;
    constructor(name: string, value: (...args: ESValue[]) => ESValue);
    get(...args: ESValue[]): ESValue;
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
    invoke<T extends ESValue>(method: string, args: ESValue[], ret: T): T;
    /**
     * setReturnValue so that invocation of a method always return the desired
     * result.
     */
    setReturnValue<T extends ESValue>(method: string, value: T): Mock;
    /**
     * setReturnCallback allows a function to provide the return value
     * of a method on invocation.
     */
    setReturnCallback<T extends ESValue>(method: string, value: (...args: T[]) => ESValue): Mock;
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
