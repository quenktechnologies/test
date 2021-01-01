import { strict as assert } from 'assert';

import { MockFunction } from '../../lib/mock/function';

describe('function', () => {

    describe('MockFunction', () => {

        describe('getCalledCount', () => {

            it('should provided the call count', () => {

                let mock = MockFunction.create(12);
                let f = mock.toFunction();

                f();
                assert.equal(mock.getCalledCount(), 1);

                f();
                assert.equal(mock.getCalledCount(), 2);

                f();
                assert.equal(mock.getCalledCount(), 3);

            });

        });

        describe('wasCalled', () => {

            it('should tell if the function was called', () => {

                let mock = MockFunction.create(12);
                let f = mock.toFunction();

                assert.ok(!mock.wasCalled());
                f();
                assert.ok(mock.wasCalled());

            });

        });

        describe('invoke', () => {

            it('should record function invocation', () => {

                let mock = MockFunction.create(12);
                assert.ok(mock.calls.length === 0);
                mock.invoke(undefined, [24]);
                assert.ok(mock.wasCalled());

            });

        });

        describe('call', () => {

            it('should record function invocation', () => {

                let mock = MockFunction.create(12);
                assert.ok(mock.calls.length === 0);
                mock.apply(undefined, [24]);
                assert.ok(mock.wasCalled());

            });

        });

        describe('apply', () => {

            it('should record function invocation', () => {

                let mock = MockFunction.create(12);
                assert.ok(mock.calls.length === 0);
                mock.apply(undefined, [24]);
                assert.ok(mock.wasCalled());

            });

        });

    });

});
