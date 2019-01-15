
/**
 * Call records the application of a function or method.
 */
export class Call<A, T> {

    constructor(public name: string, public args: A[], public ret: T) { }

}

/**
 * Data recorded during testing.
 */
export class Data {

    constructor(public calls: Call<any, any>[] = []) { }

    /**
     * record the application of a method.
     */
    record<A, T>(name: string, args: A[], ret: T): T {

        this.calls.push(new Call(name, args, ret));
        return ret;

    }

    /**
     * called returns a list of methods that have been called so far.
     */
    called(): string[] {

        return this.calls.map(c => c.name);

    }

}

/**
 * Mock can be extended to satisfy an interface for which we are only interested
 * in recording information about method application.
 */
export class Mock {

    MOCK = new Data();

}
