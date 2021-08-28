import { ESValue, Invocation } from './';
/**
 * Returns map.
 */
export interface Returns {
    [key: string]: ReturnValue | ReturnCallback;
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
 * MockObject is a class that can be used to keep track of the mocking of some
 * interface.
 *
 * It provides methods for recording the invocation of methods and setting
 * their return values. Generally, embedding a MockObject instance is preffered
 * to extending the class.
 */
export declare class MockObject {
    calls: Invocation[];
    returns: Returns;
    /**
     * getCalledCount provides the number of times a method was called.
     */
    getCalledCount(method: string): number;
    /**
     * getCalledArgs provides the first set of arguments a method was called
     * with.
     *
     * The array is empty if the method was never called.
     */
    getCalledArgs(name: string): ESValue;
    /**
     * getCalledList returns a list of methods that have been called so far.
     */
    getCalledList(): string[];
    /**
     * setReturnValue so that invocation of a method always return the desired
     * result.
     */
    setReturnValue<T extends ESValue>(method: string, value: T): MockObject;
    /**
     * setReturnCallback allows a function to provide the return value
     * of a method on invocation.
     */
    setReturnCallback<T extends ESValue>(method: string, value: (...args: T[]) => ESValue): MockObject;
    /**
     * invoke records the invocation of a method.
     * @param method - The method name.
     * @param args   - An array of arguments the method is called with.
     * @param ret    - The return value of the method invocation.
     */
    invoke<T extends ESValue>(method: string, args: ESValue[], ret: T): T;
    /**
     * wasCalledWith tests whether a method was called with the specified args.
     *
     * Compared using === .
     */
    wasCalledWith(name: string, args: ESValue[]): boolean;
    /**
     * wasCalledWithDeep tests whether a method was called with the specified
     * args.
     *
     * Compared using deepEqual.
     */
    wasCalledWithDeep(name: string, args: ESValue[]): boolean;
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
