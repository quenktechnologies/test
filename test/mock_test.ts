import { Mock } from '../src/mock';

class Actor {

    MOCK = new Mock();

    tell(path: string, value: any): Actor {

        return this.MOCK.invoke('tell', [value], this);

    }

    spawn(tmpl: object): string {

        return this.MOCK.invoke('spawn', [tmpl], '?');

    }

    kill(addr: string): void {

        return this.MOCK.invoke('kill', [addr], undefined);

    }

}

describe('mock', () => {

    describe('Mock', () => {

        describe('invoke', () => {

            it('should invoke method applications', () => {

                let a = new Actor();

                if (a.MOCK.calls.length > 0) {

                    throw new Error('Invalid state');

                }

                a.spawn({});

                if (a.MOCK.calls.length !== 1)
                    throw new Error('Calls length must be 1!');

            });

        });

        describe('wasCalled', () => {

            it('should provided the order methods were called', () => {

                let a = new Actor();

                a.tell('?', 'foo');
                a.spawn({});
                a.kill('?');

                let ret = a.MOCK.getCalledList().join(',');

                if (ret !== 'tell,spawn,kill') {

                    throw new Error(`Incorrect call sequence "${ret}"`);

                }

            });

        });

    });

});
