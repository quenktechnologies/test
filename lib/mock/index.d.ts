/**
 * ESValue represents any ES value in a type safe way.
 */
export declare type ESValue = number | boolean | string | object | Function | null | undefined | ESValue[];
/**
 * ESValueCallback
 */
export declare type ESValueCallback = (...arg: ESValue[]) => ESValue;
export { MockObject as Mock } from './object';
/**
 * Invocation is a recording of method invocations stored by a MockObject.
 */
export declare class Invocation {
    name: string;
    args: ESValue[];
    value: ESValue;
    constructor(name: string, args: ESValue[], value: ESValue);
}
