import { assert, expect, chai } from 'chai';

import * as FncLib from '../src/Function-Combinators';
import { compose } from '../src/Function';
import * as MthLib from '../src/Math';


/** @test {Function-Combinators} */
describe('Function Combinators Library Tests', () => {

  /** @test {Function-Combinators#identity} */
  it('test: .identity(value) (I combinator)', () => {
    assert.equal(FncLib.identity(2), 2);
  });

  /** @test {Function-Combinators#always} */
  it('test: .always(value)', () => {
    assert.typeOf(FncLib.always(2), 'function');
    assert.instanceOf(FncLib.always(2), Function);
    assert.equal(FncLib.always(2)(), 2);
  });

  /** @test {Function-Combinators#flip} */
  it('test: .flip(fn)', () => {
    const concat2Words = w1 => w2 => `${w1} ${w2}`;
    assert.equal(
      FncLib.flip(concat2Words)('world')('hello'),
      'hello world'
    );
  });

  /** @test {Function-Combinators#thrush} */
  it('test: .thrush(x)', () => {
    const addWorld = w => `${w} world`;
    assert.equal(
      FncLib.thrush('hello')(addWorld),
      'hello world'
    );
  });

  /** @test {Function-Combinators#duplication} */
  it('test: .duplication(fn)', () => {
    const add = x => y => x + y;

    assert.equal(FncLib.duplication(add)(7), 14);
  });

  /** @test {Function-Combinators#fork} */
  it('test: .fork(join, fn1, fn2)', () => {
    const calc = FncLib.fork(MthLib.multiply, x => x + x, FncLib.identity);
    assert.equal(calc(2), 8);
  });

  /** @test {Function-Combinators#seq} */
  it('test: .seq(...fns)', () => {
    let result = 0
      , addToResult = x => result += x;

    assert.equal(result, 0);
    FncLib.seq(addToResult, addToResult)(4);
    assert.equal(result, 8);
  });

  /** @test {Function-Combinators#alt} */
  it('test: .alt(fn1, fn2)', () => {
    const calc = FncLib.alt(FncLib.identity, x => x + 1);
    assert.equal(calc(0), 1);
    assert.equal(calc(2), 2);
  });

  /** @test {Function-Combinators#tap} */
  it('test: .tap(fn)', () => {
    let sayHelloTo = name => `Hello ${name}`
      , toUpperCase = str => str.toUpperCase()
      , addDollarSign  = str => `$${str}$`
      , chainMiddleResult = ''
      , tapHandler = data => chainMiddleResult = data
      , sayHelloInUpperCase = compose(addDollarSign, sayHelloTo, FncLib.tap(tapHandler), toUpperCase);

    assert.equal(sayHelloInUpperCase('oleh'), '$Hello OLEH$');
    assert.equal(chainMiddleResult, 'OLEH');
  });
});
