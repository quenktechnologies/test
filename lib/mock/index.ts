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

// Legacy export (deprecated).
export { MockObject as Mock } from './object';

/**
 * Invocation is a recording of method invocations stored by a MockObject.
 */
export class Invocation {

    constructor(
        public name: string,
        public args: ESValue[],
        public value: ESValue) { }

}
