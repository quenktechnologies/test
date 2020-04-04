import deepEqual = require('deep-equal');

/**
 * ESValue represents any ES value in a type safe way.
 */
export type ESValue
    = number
    | boolean
    | string
    | object
    | Function
    | null
    | undefined
    | ESValue[]
    ;

/**
 * ESValueCallback
 */
export type ESValueCallback = (...arg: ESValue[]) => ESValue;

/**
 * Returns map.
 */
export interface Returns {

    [key: string]: ReturnValue | ReturnCallback

}

/**
 * Invocation is a recording of method invocations stored by a Mock.
 */
export class Invocation {

    constructor(
        public name: string,
        public args: ESValue[],
        public value: ESValue) { }

}

/**
 * ReturnValue stores a value to be returned by a mocked method.
 */
export class ReturnValue {

    constructor(public name: string, public value: ESValue) { }

    get(..._: ESValue[]): ESValue {

        return this.value;

    }

}

/**
 * ReturnCallback allows a function to be used to provide a ReturnValue.
 */
export class ReturnCallback {

    constructor(
        public name: string,
        public value: (...args: ESValue[]) => ESValue) { }

    get(...args: ESValue[]): ESValue {

        return this.value.apply(undefined, args);

    }

}

/**
 * Mock is a class that can be used to keep track of the mocking of some
 * interface.
 *
 * It provides methods for recording the invocation of methods and setting
 * their return values. Generally, embedding a Mock instance is preffered to 
 * extending the class.
 */
export class Mock {

    constructor(
        public calls: Invocation[] = [],
        public returns: Returns = {}) { }

    /**
     * invoke records the invocation of a method.
     * @param method - The method name.
     * @param args   - An array of arguments the method is called with.
     * @param ret    - The return value of the method invocation.
     */
    invoke<T extends ESValue>(method: string, args: ESValue[], ret: T): T {

        this.calls.push(new Invocation(method, args, ret));

        return this.returns.hasOwnProperty(method) ?
            <T>this.returns[method].get.apply(this.returns[method], args) : ret;

    }

    /**
     * setReturnValue so that invocation of a method always return the desired
     * result.
     */
    setReturnValue<T extends ESValue>(method: string, value: T): Mock {

        this.returns[method] = new ReturnValue(method, value);

        return this;

    }

    /**
     * setReturnCallback allows a function to provide the return value
     * of a method on invocation.
     */
    setReturnCallback<T extends ESValue>(
        method: string,
        value: (...args: T[]) => ESValue): Mock {

        this.returns[method] =
            new ReturnCallback(method, <ESValueCallback>value);

        return this;

    }

    /**
     * getCalledWith tests whether a method was called with the specified args.
     *
     * Compared using === .
     */
    getCalledWith(name: string, args: ESValue[]): boolean {

        return this.calls.some(c => (c.name === name) &&
            c.args.every((a, i) => a === args[i]));

    }

    /**
     * getCalledWithDeep tests whether a method was called with the specified
     * args.
     *
     * Compared using deepEqual.
     */
    getCalledWithDeep(name: string, args: ESValue[]): boolean {

        return this.calls.some(c =>
            (c.name === name) && deepEqual(c.args, args));

    }

    /**
     * getCalledList returns a list of methods that have been called so far.
     */
    getCalledList(): string[] {

        return this.calls.map(c => c.name);

    }

    /**
     * wasCalled tests whether a method was called.
     */
    wasCalled(method: string): boolean {

        return this.getCalledList().indexOf(method) > - 1;

    }

    /**
     * wasCalledNTimes tests whether a method was called a certain amount of
     * times.
     */
    wasCalledNTimes(method: string, n: number): boolean {

        return this.getCalledList().reduce((p, c) =>
            (c === method) ? p + 1 : p, 0) === n;

    }

}
