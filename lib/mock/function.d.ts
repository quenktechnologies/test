import { ESValue, ESValueCallback, Invocation } from './';
/**
 * MockFunction provides an object used to mock a function.
 *
 * Calls to the function are recorded internally and can be queried after the
 * fact. Use the [[toFunction]] method in places where an actual function is
 * accepted.
 */
export declare class MockFunction {
    value: ESValue | ESValueCallback;
    constructor(value: ESValue | ESValueCallback);
    calls: Invocation[];
    static create(value: ESValue | ESValueCallback): MockFunction;
    /**
     * getCalledCount provides the number of times the function was called.
     */
    getCalledCount(): number;
    /**
     * wasCalled tests whether a method was called.
     */
    wasCalled(): boolean;
    /**
     * wasCalledWith tests whether the function was called with the specified
     * argumentsa
     *
     * Compared using === .
     */
    wasCalledWith(args: ESValue[]): boolean;
    /**
     * wasCalledWithDeep tests whether a method was called with the specified
     * args.
     *
     * Compared using deepEqual.
     */
    wasCalledWithDeep(args: ESValue[]): boolean;
    /**
     * invoke records the invocation of this function.
     * @param args   - An array of arguments the function is called with.
     */
    invoke<T extends ESValue>(_this?: ESValue, args?: ESValue[]): T;
    /**
     * call this MockFunction.
     */
    call<T extends ESValue>(...allArgs: ESValue[]): T;
    /**
     * apply this MockFunction.
     */
    apply<T extends ESValue>(_this?: ESValue, args?: ESValue[]): T;
    /**
     * toFunction provides a callable function that can be used in place of this
     * instance.
     *
     * Calls to the function will be forwarded to the MockFunction instance.
     */
    toFunction(): Function;
}
