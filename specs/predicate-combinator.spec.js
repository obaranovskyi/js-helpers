import { assert, expect } from 'chai';

import { or, and, not, notOr } from '../src/Predicate-Combinator';


/** @test {Predicate-Combinator} */
describe('Predicate Combinator Library Tests', () => {

  /** @test {Predicate-Combinator#or} */
  it('test: .or(...predicates) - with number', () => {
    const negative = number => number < 0
        , positive = number => number > 0
        , notZero = or(negative, positive);

    assert.isFalse(notZero(0));
    assert.isTrue(notZero(-3));
    assert.isTrue(notZero(3));
  });

  /** @test {Predicate-Combinator#or} */
  it('test: .or(...predicates) - with array', () => {
    const data = [1,4,0,1,2,0]
        , negative = number => number < 0
        , positive = number => number > 0
        , notZero = or(negative, positive);

    expect(data.filter(notZero)).to.deep.equal([1,4,1,2]);
    assert.isTrue(data.some(notZero));
    assert.isFalse(data.every(notZero));
  });

  /** @test {Predicate-Combinator#not} */
  it('test: .not(...predicates) - with number', () => {
    const negative = number => number < 0
        , positive = number => number > 0
        , isZero = not(negative, positive);

    assert.isTrue(isZero(0));
    assert.isFalse(isZero(-3));
    assert.isFalse(isZero(3));
  });

  /** @test {Predicate-Combinator#not} */
  it('test: .not(...predicates) - with array', () => {
    const data = [1,4,0,1,2,0]
        , negative = number => number < 0
        , positive = number => number > 0
        , isZero = not(negative, positive);

    expect(data.filter(isZero)).to.deep.equal([0,0]);
    assert.isTrue(data.some(isZero));
    assert.isFalse(data.every(isZero));
  });

  /** @test {Predicate-Combinator#and} */
  it('test: .and(...predicates) - with string', () => {
    const isGreeting = str => str.indexOf('Hello') > -1
        , hasWorld = str => str.indexOf('World') > -1
        , isHelloWorld = and(isGreeting, hasWorld);

    assert.isTrue(isHelloWorld('Hello World'));
    assert.isFalse(isHelloWorld('Hello'));
    assert.isFalse(isHelloWorld('World'));
    assert.isFalse(isHelloWorld('Not a Greeting'));
  });

  /** @test {Predicate-Combinator#and} */
  it('test: .and(...predicates) - with array', () => {
    const data = ['Hello', 'World', 'Hello World', 'Not Greeting']
        , isGreeting = str => str.indexOf('Hello') > -1
        , hasWorld = str => str.indexOf('World') > -1
        , isHelloWorld = and(isGreeting, hasWorld);


    expect(data.filter(isHelloWorld)).to.deep.equal(['Hello World']);
    assert.isTrue(data.some(isHelloWorld));
    assert.isFalse(data.every(isHelloWorld));
  });

  /** @test {Predicate-Combinator#notOr} */
  it('test: .notOr(...predicates)', () => {
    const isGreeting = str => str.indexOf('Hello') > -1
        , hasWorld = str => str.indexOf('World') > -1;

    assert.isFalse(notOr(isGreeting, hasWorld)('Hello'));
    assert.isFalse(notOr(isGreeting, hasWorld)('World'));
    assert.isTrue(notOr(isGreeting, hasWorld)('Else'));
  });
});
