import { assert } from 'chai';

import * as PcLib from '../src/Predicate-Combinator';
import * as PrdLib from '../src/Predicate';

/** @test {Predicate} */
describe('Predicate Library Tests', () => {

  /** @test {Predicate#lt} */
  it('test: .lt(number)', () => {
    let lessThen100 = PrdLib.lt(100)
      , truthlyResult = [1,2,37]
      , falsyResult = [101, 100, 303];

    assert.isTrue(truthlyResult.every(lessThen100));
    assert.isFalse(falsyResult.every(lessThen100));
  });

  /** @test {Predicate#gt} */
  it('test: .gt(number)', () => {
    let greaterThan100 = PrdLib.gt(100)
      , falsyResult = [1,2,37]
      , truthlyResult = [101,200,303];

    assert.isTrue(truthlyResult.every(greaterThan100));
    assert.isFalse(falsyResult.every(greaterThan100));
  });

  /** @test {Predicate#range} */
  it('test: .range(number1, number2)', () => {
    let inRangeOf1and100 = PrdLib.range(1, 100)
      , truthlyResult = [2,3]
      , falsyResult = [101,200];

      assert.isTrue(truthlyResult.every(inRangeOf1and100));
      assert.isFalse(falsyResult.every(inRangeOf1and100));
  });

  /** @test {Predicate#lte} */
  it('test: .lte(number)', () => {
    let lessThen100Including = PrdLib.lte(100)
      , truthlyResult = [1, 2, 100]
      , falsyResult = [99, 100, 101];

    assert.isTrue(truthlyResult.every(lessThen100Including));
    assert.isFalse(falsyResult.every(lessThen100Including));
  });

  /** @test {Predicate#gte} */
  it('test: .gte(number)', () => {
    let greaterThan100Including = PrdLib.gte(100)
      , falsyResult = [1,2,37]
      , truthlyResult = [100,101,200,303];

    assert.isTrue(truthlyResult.every(greaterThan100Including));
    assert.isFalse(falsyResult.every(greaterThan100Including));
  });

  /** @test {Predicate#rangeEqual} */
  it('test: .rangeEqual(number1, number2)', () => {
    let inRangeOf1and100Including = PrdLib.rangeEqual(1, 100)
      , truthlyResult = [1,100]
      , falsyResult = [101,200];

      assert.isTrue(truthlyResult.every(inRangeOf1and100Including));
      assert.isFalse(falsyResult.every(inRangeOf1and100Including));
  });

  /** @test {Predicate#lte} */
  it('test: .lt(number) combined with gt(number)', () => {
    let inRangeOf = PcLib.or(
      PrdLib.lt(-20),
      PcLib.and(PrdLib.gt(5), PrdLib.lt(10)));

    assert.isTrue(inRangeOf(7));
    assert.isTrue(inRangeOf(-40));
    assert.isFalse(inRangeOf(-6));
    assert.isFalse(inRangeOf(11));
  });

  /** @test {Predicate#eq} */
  it('test: .eq(elem1)', () => {
    assert.isTrue(PrdLib.eq(1)(1));
    assert.isFalse(PrdLib.eq(1)(2));
    assert.isTrue(PrdLib.eq('hello')('hello'));
    assert.isFalse(PrdLib.eq('hello')('hello2'));
    assert.isFalse(PrdLib.eq({ greeting: 'hello' })({ greeting: 'hello' }));
  });

  /** @test {Predicate#notEq} */
  it('test: .notEq(elem1)', () => {
    assert.isFalse(PrdLib.notEq(1)(1));
    assert.isTrue(PrdLib.notEq(1)(2));
    assert.isFalse(PrdLib.notEq('hello')('hello'));
    assert.isTrue(PrdLib.notEq('hello')('hello2'));
    assert.isTrue(PrdLib.notEq({ greeting: 'hello' })({ greeting: 'hello' }));
  });
});
