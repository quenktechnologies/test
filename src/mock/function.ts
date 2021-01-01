import deepEqual = require('deep-equal');

import { ESValue, ESValueCallback, Invocation } from './';

/**
 * MockFunction provides an object used to mock a function.
 *
 * Calls to the function are recorded internally and can be queried after the
 * fact. Use the [[toFunction]] method in places where an actual function is
 * accepted.
 */
export class MockFunction {

    constructor(public value: ESValue | ESValueCallback) { }

    calls = <Invocation[]>[];

    static create(
        value: ESValue | ESValueCallback): MockFunction {

        return new MockFunction(value);

    }

    /**
     * getCalledCount provides the number of times the function was called.
     */
    getCalledCount(): number {

        return this.calls.length;

    }

    /**
     * wasCalled tests whether a method was called.
     */
    wasCalled(): boolean {

        return this.getCalledCount() > 0;

    }

    /**
     * wasCalledWith tests whether the function was called with the specified 
     * argumentsa
     *
     * Compared using === .
     */
    wasCalledWith(args: ESValue[]): boolean {

        return this.calls.some(c => c.args.every((a, i) => a === args[i]));

    }

    /**
     * wasCalledWithDeep tests whether a method was called with the specified
     * args.
     *
     * Compared using deepEqual.
     */
    wasCalledWithDeep(args: ESValue[]): boolean {

        return this.calls.some(c => deepEqual(c.args, args));

    }

    /**
     * invoke records the invocation of this function.
     * @param args   - An array of arguments the function is called with.
     */
    invoke<T extends ESValue>(_this?: ESValue, args: ESValue[] = []): T {

        let ret = (typeof this.value === 'function') ?
            (<Function>this.value).apply(_this, args) :
            this.value;

        this.calls.push(new Invocation('', args, ret));

        return ret;

    }

    /**
     * call this MockFunction.
     */
    call<T extends ESValue>(...allArgs:ESValue[]): T {

        let _this = allArgs[0];
        let args = allArgs.slice(1);

        return this.invoke(_this, args);

    }

    /**
     * apply this MockFunction.
     */
    apply<T extends ESValue>(_this?: ESValue, args: ESValue[] = []): T {

        return this.invoke(_this, args);

    }

    /**
     * toFunction provides a callable function that can be used in place of this
     * instance.
     *
     * Calls to the function will be forwarded to the MockFunction instance.
     */
    toFunction(): Function {

        let that = this;

        return function() {

            //@ts-ignore: 2683
            return that.apply(this, Array.prototype.slice.call(arguments));

        }

    }

}
