/**
 * Call records the application of a function or method.
 */
export declare class Call<A, T> {
    name: string;
    args: A[];
    ret: T;
    constructor(name: string, args: A[], ret: T);
}
/**
 * Data recorded during testing.
 */
export declare class Data {
    calls: Call<any, any>[];
    constructor(calls?: Call<any, any>[]);
    /**
     * record the application of a method.
     */
    record<A, T>(name: string, args: A[], ret: T): T;
    /**
     * called returns a list of methods that have been called so far.
     */
    called(): string[];
}
/**
 * Mock can be extended to satisfy an interface for which we are only interested
 * in recording information about method application.
 */
export declare class Mock {
    MOCK: Data;
}
