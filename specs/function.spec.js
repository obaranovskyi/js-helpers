import { assert, expect, chai } from 'chai';

import * as FnLib from '../src/Function';


/** @test {Function} */
describe('Function Library Tests', () => {

  /** @test {Function#curry} */
  it('test: .curry(fn)', () => {
    let add = (a, b, c) => a + b + c
      , curried = FnLib.curry(add);

    assert.equal(curried(8)(11)(7), 26);
    assert.equal(curried(8, 11)(7), 26);
    assert.equal(curried(8)(11, 7), 26);
    assert.equal(curried(8, 11, 7), 26);
  });

  /** @test {Function#partial} */
  it('test: .partial(fn)', () => {
    const greet = (greeting, name) => `${greeting} ${name}`
      , sayHelloTo = FnLib.partial(greet, 'hello');

    assert.equal(sayHelloTo('fred'), 'hello fred');

    const greetFred = FnLib.partial(greet, undefined, 'fred');
    assert.equal(greetFred('hi'), 'hi fred');
  });

  /** @test {Function#compose} */
  it('test: .compose(...fns)', () => {
    const sayHelloTo = name => `Hello ${name}`
        , toUpperCase = str => str.toUpperCase()
        , addDollarSign  = str => `$${str}$`
        , sayHelloInUpperCase = FnLib.compose(addDollarSign, sayHelloTo, toUpperCase);

    assert.equal(sayHelloInUpperCase('oleh'), '$Hello OLEH$');
  });

  /** @test {Function#pipe} */
  it('test: .pipe(...fns)', () => {
    let sayHelloTo = name => `Hello ${name}`
      , toUpperCase = str => str.toUpperCase()
      , addDollarSign  = str => `$${str}$`
      , sayHelloInUpperCase = FnLib.pipe(toUpperCase, sayHelloTo, addDollarSign);

    assert.equal(sayHelloInUpperCase('oleh'), '$Hello OLEH$');
  });

  /** @test {Function#once} */
  it('test: .once(fn)', () => {
    let dollarAccount = 0
      , payCb = () => dollarAccount += 100
      , doPayment = FnLib.once(payCb);

    assert.equal(dollarAccount, 0);

    doPayment();
    assert.equal(dollarAccount, 100);

    doPayment();
    assert.notEqual(dollarAccount, 200);
    assert.equal(dollarAccount, 100);
  });

  /** @test {Function#unary} */
  it('test: .unary(fn)', () => {
    expect([1, 2, 3].map(a => a * a)).to.deep.equal([1, 4, 9]);
    expect([1, 2, 3].map(parseInt)).to.deep.equal([1, NaN, NaN]);
    expect([1, 2, 3].map(FnLib.unary(parseInt))).to.deep.equal([1, 2, 3]);
  });

  /** @test {Function#memoize} */
  it('test: .memoize(fn)', () => {
    let invokeCounter = 0
      , invokeIncrement = (num) => {
          invokeCounter++;
          return num * num;
        }
      , memoizedInvokeIncrement = FnLib.memoize(invokeIncrement);

      assert.equal(invokeCounter, 0);

      assert.equal(memoizedInvokeIncrement(3), 9);
      assert.equal(invokeCounter, 1);

      assert.equal(memoizedInvokeIncrement(3), 9);
      assert.notEqual(invokeCounter, 2);
      assert.equal(invokeCounter, 1);
  });

  /** @test {Function#rearg} */
  it('test: .rearg(fn, order) ', () => {
    let rearged = FnLib.rearg((a, b, c) => {
      return [a,b,c]
    }, [2, 0, 1]);

    assert.deepEqual(
      rearged('y', 'z', 'x'),
      ['x', 'y', 'z']);
  });

  /** @test {Function#after} */
  it('test: .after(count, fn)', () => {
    let wasInvoked = false
      , invokeSpy = () => wasInvoked = true
      , invokeAfter2Calls = FnLib.after(2, invokeSpy);

    invokeAfter2Calls();
    assert.isFalse(wasInvoked);

    invokeAfter2Calls();
    assert.isTrue(wasInvoked);
  });

  /** @test {Function#orCurry} */
  it('test: .orCurry(fn, args)', () => {
    function add3Nums(x, y, z) {
      return FnLib.orCurry(
        function(x, y, z) {
          return x + y + z;
        }
      , arguments);
    };

    assert.equal(add3Nums()(1)()(2)()(3), 6);
    assert.equal(add3Nums(1)(2)(3), 6);
    assert.equal(add3Nums(1, 2)(3), 6);
    assert.equal(add3Nums(1)(2, 3), 6);
    assert.equal(add3Nums(1, 2, 3), 6);
  });
});
