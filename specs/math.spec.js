import { assert, expect } from 'chai';

import * as MthLib from '../src/Math';


/** @test {Math} */
describe('Math Library Tests', () => {

  /** @test {Math#compareDecimalNumbers} */
  it('test: .compareDecimalNumbers(number1, number2)', () => {
    var a = 0.1 + 0.2
      , b = 0.3;

    assert.notEqual(a, b);
    assert.isTrue(MthLib.compareDecimalNumbers(a, b));
  });

  /** @test {Math#add} */
  it('test: .add(augend, ...addendList)', () => {
    assert.equal(MthLib.add(), 0);
    assert.equal(MthLib.add(1,2), 3);
    assert.equal(MthLib.add(1,2,3,4), 10);
    assert.equal(MthLib.add(1,2,3,4,5), 15);
  });

  /** @test {Math#subtract} */
  it('test: .subtract(minuend, ...subtrahendList)', () => {
    assert.equal(MthLib.subtract(), 0);
    assert.equal(MthLib.subtract(2,1), 1);
    assert.equal(MthLib.subtract(1,2,3,4), -8);
    assert.equal(MthLib.subtract(5,1,1,1,1), 1);
  });

  /** @test {Math#multiply} */
  it('test: .multiply(multiplier, ...multiplicandList)', () => {
    assert.equal(MthLib.multiply(), 0);
    assert.equal(MthLib.multiply(1,2), 2);
    assert.equal(MthLib.multiply(1,2,3,4), 24);
    assert.equal(MthLib.multiply(1,2,3,4,5), 120);
  });

  /** @test {Math#divide} */
  it('test: .divide(dividend, ...divisorList)', () => {
    assert.equal(MthLib.divide(), 0);
    assert.equal(MthLib.divide(4,2), 2);
    assert.equal(MthLib.divide(16,4,2), 2);
    assert.equal(MthLib.divide(32,2,4,2), 2);
  });

  /** @test {Math#getRandomInt} */
  it('test: .getRandomInt(number)', () => {
    expect(MthLib.getRandomInt(5)).to.be.within(0, 5);
    expect(MthLib.getRandomInt(15)).to.be.within(0, 15);
    expect(MthLib.getRandomInt(30)).to.be.within(0, 30);
  });

  /** @test {Math#getRandomIntFromTo} */
  it('test: .getRandomIntFromTo(number1, number2)', () => {
    expect(MthLib.getRandomIntFromTo(10,15)).to.be.within(10, 15);
    expect(MthLib.getRandomIntFromTo(50,75)).to.be.within(50, 75);
    expect(MthLib.getRandomIntFromTo(100,200)).to.be.within(100, 200);
  });
});
