import { strict as assert } from 'assert';

import { MockObject } from '../../lib/mock/object';

class Actor {

    MOCK = new MockObject();

    tell(path: string, value: any): Actor {

        return this.MOCK.invoke('tell', [path, value], this);

    }

    spawn(tmpl: object): string {

        return this.MOCK.invoke('spawn', [tmpl], '?');

    }

    kill(addr: string): void {

        return this.MOCK.invoke('kill', [addr], undefined);

    }

}

describe('object', () => {

    describe('MockObject', () => {

        describe('getCalledCount', () => {

            it('should provide the count of method calls', () => {

                let a = new Actor();

                a.tell('/', 1);
                a.spawn({});
                a.tell('/', 1);
                a.kill('/');
                a.kill('/');
                a.tell('/', 1);

                assert.equal(a.MOCK.getCalledCount('tell'), 3);
                assert.equal(a.MOCK.getCalledCount('spawn'), 1);
                assert.equal(a.MOCK.getCalledCount('kill'), 2);

            });

        });

        describe('invoke', () => {

            it('should record method calls', () => {

                let a = new Actor();

                assert.ok(a.MOCK.calls.length === 0);

                a.spawn({});

                // @ts-ignore: 2367
                assert.ok(a.MOCK.calls.length === 1);

            });

        });

        describe('getCalledList', () => {

            it('should provided the order methods were called', () => {

                let a = new Actor();

                a.tell('?', 'foo');
                a.spawn({});
                a.kill('?');

                let ret = a.MOCK.getCalledList().join(',');
                assert.ok(ret === 'tell,spawn,kill');

            });

        });

    });

});
