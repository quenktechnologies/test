import { Positive, Negative, Failed, toString } from '../src';

class Func { }

const pos = new Positive('foo', true);
const neg = new Negative('foo', true);

const failed = {

    positive: {

        success() {
            throw new Error(`positive: expected success!`);

        },

        failure() {

            throw new Error('positive: failure!');

        }

    },

    negative: {

        success() {

            throw new Error(`negative: expected success!`);

        },

        failure() {

            throw new Error(`negative: expected failure`);

        }
    }

}

describe('must', () => {

    describe('Matcher', () => {

        describe('be', () => {

            it('be a positive for Positive', () => {

                if (!(pos.be instanceof Positive))
                    throw new Error(`be is not positive!`);

            });

            it('be a negative for Negative', () => {

                if (!(neg.be instanceof Negative))
                    throw new Error(`be is not negative!`);

            });

        });

        describe('not', () => {

            it('be a negative for Positive', () => {

                if (!(pos.not instanceof Negative))
                    throw new Error(`not is not negative!`);

            });

            it('be a negative for Negative', () => {

                if (!(neg.not instanceof Positive))
                    throw new Error(`not is not positive!`);

            });

        });

        describe('instance', () => {

            it('be positive for Positive', () => {

                if (!(pos.instance instanceof Positive))
                    throw new Error(`instance is not positive!`);

            });

            it('be negative for Negative!', () => {

                if (!(neg.instance instanceof Negative))
                    throw new Error(`instance is not negative`);

            });

        });

        describe('of', () => {

            it('do an instanceof test', () => {

                let p = new Positive(new Date(), false);
                let n = new Negative(new Date(), false);

                if (p.of(Date) instanceof Failed)
                    failed.positive.success();

                if (!(p.of(String) instanceof Failed))
                    failed.positive.failure();

                if (n.of(String) instanceof Failed)
                    failed.negative.success();

                if (!(n.of(Date) instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('object', () => {

            it('do a typeof object test', () => {

                if (new Positive({}, false).object() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive(12, false).object() instanceof Failed))
                    failed.positive.failure();

                if (new Negative(12, false).object() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative({}, false).object() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('array', () => {

            it('do an Array.isArray test', () => {

                if (new Positive([], false).array() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive(12, false).array() instanceof Failed))
                    failed.positive.failure();

                if (new Negative(12, false).array() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative([], false).array() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('string', () => {

            it('do a typeof string test', () => {

                if (new Positive('', false).string() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive(12, false).string() instanceof Failed))
                    failed.positive.failure();

                if (new Negative(12, false).string() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative('', false).string() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('number', () => {

            it('do a typeof number test', () => {

                if (new Positive(12, false).number() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive('12', false).number() instanceof Failed))
                    failed.positive.failure();

                if (new Negative('12', false).number() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(12, false).number() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('boolean', () => {

            it('do a typeof boolean test', () => {

                if (new Positive(false, false).boolean() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive('true', false).boolean() instanceof Failed))
                    failed.positive.failure();

                if (new Negative('false', false).boolean() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(false, false).boolean() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('true', () => {

            it('do a true strict equality test', () => {

                if (new Positive(true, false).true() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive('true', false).true() instanceof Failed))
                    failed.positive.failure();

                if (new Negative('true', false).true() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(true, false).true() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('false', () => {

            it('do a false strict equality test', () => {

                if (new Positive(false, false).false() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive('false', false).false() instanceof Failed))
                    failed.positive.failure();

                if (new Negative('false', false).false() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(false, false).false() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('null', () => {

            it('do a null strict equality test', () => {

                if (new Positive(null, false).null() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive('null', false).null() instanceof Failed))
                    failed.positive.failure();

                if (new Negative('null', false).null() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(null, false).null() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('undefined', () => {

            it('do a undefined strict equality test', () => {

                if (new Positive(undefined, false).undefined() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive('undefined', false).undefined() instanceof Failed))
                    failed.positive.failure();

                if (new Negative('undefined', false).undefined() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(undefined, false).undefined() instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('equal', () => {

            it('do a strict equality test on primitives', () => {

                if (new Positive(12, false).equal(12) instanceof Failed)
                    failed.positive.success();

                if (!(new Positive('12', false).equal(12) instanceof Failed))
                    failed.positive.failure();

                if (new Negative('12', false).equal(12) instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(12, false).equal(12) instanceof Failed))
                    failed.negative.failure();

            });

            it('do a strict equality test on objects', () => {

                let foo = {};

                if (new Positive(foo, false).equal(foo) instanceof Failed)
                    failed.positive.success();

                if (!(new Positive({}, false).equal(foo) instanceof Failed))
                    failed.positive.failure();

                if (new Negative({}, false).equal(foo) instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(foo, false).equal(foo) instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('equate', () => {

            it('do a strict equality test on primitives', () => {

                let foo = { a: 1, b: { c: 2, d: { e: [{ f: 3 }] } } };
                let bar = { a: 1, b: { c: 2, d: { e: [{ f: 3 }] } } };

                if (new Positive(foo, false).equate(bar) instanceof Failed)
                    failed.positive.success();

                if (!(new Positive(foo, false).equate({}) instanceof Failed))
                    failed.positive.failure();

                if (new Negative(foo, false).equate({}) instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(foo, false).equate(bar) instanceof Failed))
                    failed.negative.failure();

            });

        });

        describe('throw', () => {

            it('test for thrown errors', () => {

                let f = () => { throw new Error('err'); }

                if (new Positive(f, false).throw() instanceof Failed)
                    failed.positive.success();

                if (!(new Positive(() => { }, false).throw() instanceof Failed))
                    failed.positive.failure();

                if (new Negative(() => { }, false).throw() instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(f, false).throw() instanceof Failed))
                    failed.negative.failure();

            });

            it('test for thrown errors by message property', () => {

                let f = () => { throw new Error('err'); }

                if (new Positive(f, false).throw('err') instanceof Failed)
                    failed.positive.success();

                if (!(new Positive(f, false).throw('error') instanceof Failed))
                    failed.positive.failure();

                if (new Negative(f, false).throw('error') instanceof Failed)
                    failed.negative.success();

                if (!(new Negative(f, false).throw('err') instanceof Failed))
                    failed.negative.failure();

            });

        });

    });

    describe('toString', () => {

        it('should work with functions', () => {

            if (toString(Func) !== 'Func')
                throw new Error('failed!');

        });

        it('should work with dates', () => {

            if (toString(new Date(1989, 6, 24)) !== '1989-07-24T04:00:00.000Z')
                throw new Error('failed!');

        });

        it('should work with RegExp', () => {

            if (toString(/.*/) !== '/.*/')
                throw new Error('failed!');

        });

        it('should work with instances', () => {

            if (toString(new Func()) !== 'Func')
                throw new Error('failed!');

        });

        it('should work with objects', () => {

            if (toString({ a: 'abc' }) !== '{"a":"abc"}')
                throw new Error('failed!');

        });

    });

});
