
/**
 * Value represents any ES value in a type safe way.
 */
export type Value
    = number
    | boolean
    | string
    | object
    | Function
    | Value[]
    ;

/**
 * ReturnValue of a mocked method or function.
 *
 * This can be the raw value or a function that given the arguments of the
 * method/function will produce a value.
 */
export type ReturnValue
    = Value
    | ValueFun
    ;

/**
 * ValueFun
 */
export type ValueFun = (arg: Value[]) => Value;

/**
 * Returns map.
 */
export interface Returns {

    [key: string]: Return

}

/**
 * Invocation is a recording of method invocations stored by a Mock.
 */
export class Invocation {

    constructor(
        public name: string,
        public args: Value[],
        public value: ReturnValue) { }

}

/**
 * Return stores a value to be returned by a mocked method.
 */
export class Return {

    constructor(public name: string, public value: ReturnValue) { }

    get(): Value {

        return this.value;

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
    invoke<T extends Value>(method: string, args: Value[], ret: T): T {

        this.calls.push(new Invocation(method, args, ret));

        return this.returns.hasOwnProperty(method) ?
            <T>this.returns[method].get() : ret;

    }

    /**
     * setReturnValue so that invocation of a method always return the desired
     * result.
     */
    setReturnValue(method: string, value: ReturnValue): Mock {

        this.returns[method] = new Return(method, value);

        return this;

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
