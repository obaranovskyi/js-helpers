import * as chai from 'chai';
import { assert, expect } from 'chai';

import * as TypeLib from '../src/Type';
import * as TypeConstants from '../src/Constants/types';


/** @test {Type} */
describe('Type Library Tests', () => {

  /** @test {Type#isNull} */
  it('test: .isNull(value)', () => {
    assert.isTrue(TypeLib.isNull(null));

    assert.isFalse(TypeLib.isNull(undefined));
    assert.isFalse(TypeLib.isNull(0));
    assert.isFalse(TypeLib.isNull(-0));
    assert.isFalse(TypeLib.isNull(''));
    assert.isFalse(TypeLib.isNull(false));
    assert.isFalse(TypeLib.isNull({}));
    assert.isFalse(TypeLib.isNull([]));
    assert.isFalse(TypeLib.isNull(NaN));
    assert.isFalse(TypeLib.isNull(Infinity));
    assert.isFalse(TypeLib.isNull(-Infinity));
    assert.isFalse(TypeLib.isNull(Symbol('test:')));
    assert.isFalse(TypeLib.isNull(Function.prototype));
  });

  /** @test {Type#isNotNull} */
  it('test: .isNotNull(value)', () => {
    assert.isFalse(TypeLib.isNotNull(null));

    assert.isTrue(TypeLib.isNotNull(undefined));
    assert.isTrue(TypeLib.isNotNull(0));
    assert.isTrue(TypeLib.isNotNull(-0));
    assert.isTrue(TypeLib.isNotNull(''));
    assert.isTrue(TypeLib.isNotNull(false));
    assert.isTrue(TypeLib.isNotNull({}));
    assert.isTrue(TypeLib.isNotNull([]));
    assert.isTrue(TypeLib.isNotNull(NaN));
    assert.isTrue(TypeLib.isNotNull(Infinity));
    assert.isTrue(TypeLib.isNotNull(-Infinity));
    assert.isTrue(TypeLib.isNotNull(Symbol('test:')));
    assert.isTrue(TypeLib.isNotNull(Function.prototype));
  });

  /** @test {Type#isNaN} */
  it('test: .isNaN(number)', () => {
    assert.isTrue(TypeLib.isNaN(NaN));

    assert.isFalse(TypeLib.isNaN(null));
    assert.isFalse(TypeLib.isNaN(undefined));
    assert.isFalse(TypeLib.isNaN(0));
    assert.isFalse(TypeLib.isNaN(-0));
    assert.isFalse(TypeLib.isNaN(''));
    assert.isFalse(TypeLib.isNaN(false));
    assert.isFalse(TypeLib.isNaN({}));
    assert.isFalse(TypeLib.isNaN([]));
    assert.isFalse(TypeLib.isNaN(Infinity));
    assert.isFalse(TypeLib.isNaN(-Infinity));
    assert.isFalse(TypeLib.isNaN(Symbol('test:')));
    assert.isFalse(TypeLib.isNaN(Function.prototype));
  });

  /** @test {Type#isNotNaN} */
  it('test: .isNotNaN(number)', () => {
    assert.isFalse(TypeLib.isNotNaN(NaN));

    assert.isTrue(TypeLib.isNotNaN(null));
    assert.isTrue(TypeLib.isNotNaN(undefined));
    assert.isTrue(TypeLib.isNotNaN(0));
    assert.isTrue(TypeLib.isNotNaN(-0));
    assert.isTrue(TypeLib.isNotNaN(''));
    assert.isTrue(TypeLib.isNotNaN(false));
    assert.isTrue(TypeLib.isNotNaN({}));
    assert.isTrue(TypeLib.isNotNaN([]));
    assert.isTrue(TypeLib.isNotNaN(Infinity));
    assert.isTrue(TypeLib.isNotNaN(-Infinity));
    assert.isTrue(TypeLib.isNotNaN(Symbol('test:')));
    assert.isTrue(TypeLib.isNotNaN(Function.prototype));
  });

  /** @test {Type#isNegativeZero} */
  it('test: .isNegativeZero(number)', () => {
    assert.isTrue(TypeLib.isNegativeZero(-0));

    assert.isFalse(TypeLib.isNegativeZero(0));
    assert.isFalse(TypeLib.isNegativeZero(7));
    assert.isFalse(TypeLib.isNegativeZero(-7));
    assert.isFalse(TypeLib.isNegativeZero(NaN));
    assert.isFalse(TypeLib.isNegativeZero(Infinity));
    assert.isFalse(TypeLib.isNegativeZero(-Infinity));
  });

  /** @test {Type#isNotNegativeZero} */
  it('test: .isNotNegativeZero(number)', () => {
    assert.isFalse(TypeLib.isNotNegativeZero(-0));

    assert.isTrue(TypeLib.isNotNegativeZero(0));
    assert.isTrue(TypeLib.isNotNegativeZero(7));
    assert.isTrue(TypeLib.isNotNegativeZero(-7));
    assert.isTrue(TypeLib.isNotNegativeZero(NaN));
    assert.isTrue(TypeLib.isNotNegativeZero(Infinity));
    assert.isTrue(TypeLib.isNotNegativeZero(-Infinity));
  });

  /** @test {Type#isArray} */
  it('test: .isArray(value)', () => {
    assert.isTrue(TypeLib.isArray([]));

    assert.isFalse(TypeLib.isArray(null));
    assert.isFalse(TypeLib.isArray(undefined));
    assert.isFalse(TypeLib.isArray(0));
    assert.isFalse(TypeLib.isArray(-0));
    assert.isFalse(TypeLib.isArray(''));
    assert.isFalse(TypeLib.isArray(false));
    assert.isFalse(TypeLib.isArray({}));
    assert.isFalse(TypeLib.isArray(NaN));
    assert.isFalse(TypeLib.isArray(Infinity));
    assert.isFalse(TypeLib.isArray(-Infinity));
    assert.isFalse(TypeLib.isArray(Symbol('test:')));
    assert.isFalse(TypeLib.isArray(Function.prototype));
  });

  /** @test {Type#isNotArray} */
  it('test: .isNotArray(value)', () => {
    assert.isFalse(TypeLib.isNotArray([]));

    assert.isTrue(TypeLib.isNotArray(null));
    assert.isTrue(TypeLib.isNotArray(undefined));
    assert.isTrue(TypeLib.isNotArray(0));
    assert.isTrue(TypeLib.isNotArray(-0));
    assert.isTrue(TypeLib.isNotArray(''));
    assert.isTrue(TypeLib.isNotArray(false));
    assert.isTrue(TypeLib.isNotArray({}));
    assert.isTrue(TypeLib.isNotArray(NaN));
    assert.isTrue(TypeLib.isNotArray(Infinity));
    assert.isTrue(TypeLib.isNotArray(-Infinity));
    assert.isTrue(TypeLib.isNotArray(Symbol('test:')));
    assert.isTrue(TypeLib.isNotArray(Function.prototype));
  });

  /** @test {Type#isNumber} */
  it('test: .isNumber(value)', () => {
    assert.isTrue(TypeLib.isNumber(0));
    assert.isTrue(TypeLib.isNumber(-0));
    assert.isTrue(TypeLib.isNumber(NaN));
    assert.isTrue(TypeLib.isNumber(Infinity));
    assert.isTrue(TypeLib.isNumber(-Infinity));

    assert.isFalse(TypeLib.isNumber([]));
    assert.isFalse(TypeLib.isNumber(null));
    assert.isFalse(TypeLib.isNumber(undefined));
    assert.isFalse(TypeLib.isNumber(''));
    assert.isFalse(TypeLib.isNumber(false));
    assert.isFalse(TypeLib.isNumber({}));
    assert.isFalse(TypeLib.isNumber(Symbol('test:')));
    assert.isFalse(TypeLib.isNumber(Function.prototype));
  });

  /** @test {Type#isNotNumber} */
  it('test: .isNotNumber(value)', () => {
    assert.isFalse(TypeLib.isNotNumber(0));
    assert.isFalse(TypeLib.isNotNumber(-0));
    assert.isFalse(TypeLib.isNotNumber(NaN));
    assert.isFalse(TypeLib.isNotNumber(Infinity));
    assert.isFalse(TypeLib.isNotNumber(-Infinity));

    assert.isTrue(TypeLib.isNotNumber([]));
    assert.isTrue(TypeLib.isNotNumber(null));
    assert.isTrue(TypeLib.isNotNumber(undefined));
    assert.isTrue(TypeLib.isNotNumber(''));
    assert.isTrue(TypeLib.isNotNumber(false));
    assert.isTrue(TypeLib.isNotNumber({}));
    assert.isTrue(TypeLib.isNotNumber(Symbol('test:')));
    assert.isTrue(TypeLib.isNotNumber(Function.prototype));
  });

  /** @test {Type#isUndefined} */
  it('test: .isUndefined(value)', () => {
    assert.isTrue(TypeLib.isUndefined(undefined));

    assert.isFalse(TypeLib.isUndefined(0));
    assert.isFalse(TypeLib.isUndefined(-0));
    assert.isFalse(TypeLib.isUndefined(NaN));
    assert.isFalse(TypeLib.isUndefined(Infinity));
    assert.isFalse(TypeLib.isUndefined(-Infinity));
    assert.isFalse(TypeLib.isUndefined([]));
    assert.isFalse(TypeLib.isUndefined(null));
    assert.isFalse(TypeLib.isUndefined(''));
    assert.isFalse(TypeLib.isUndefined(false));
    assert.isFalse(TypeLib.isUndefined(/[\[\]']+/g));
    assert.isFalse(TypeLib.isUndefined({}));
    assert.isFalse(TypeLib.isUndefined(Symbol('test:')));
    assert.isFalse(TypeLib.isUndefined(Function.prototype));
  });

  /** @test {Type#isNotUndefined} */
  it('test: .isNotUndefined(value)', () => {
    assert.isFalse(TypeLib.isNotUndefined(undefined));

    assert.isTrue(TypeLib.isNotUndefined(0));
    assert.isTrue(TypeLib.isNotUndefined(-0));
    assert.isTrue(TypeLib.isNotUndefined(NaN));
    assert.isTrue(TypeLib.isNotUndefined(Infinity));
    assert.isTrue(TypeLib.isNotUndefined(-Infinity));
    assert.isTrue(TypeLib.isNotUndefined([]));
    assert.isTrue(TypeLib.isNotUndefined(null));
    assert.isTrue(TypeLib.isNotUndefined(''));
    assert.isTrue(TypeLib.isNotUndefined(false));
    assert.isTrue(TypeLib.isNotUndefined(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotUndefined({}));
    assert.isTrue(TypeLib.isNotUndefined(Symbol('test:')));
    assert.isTrue(TypeLib.isNotUndefined(Function.prototype));
  });

  /** @test {Type#isDate} */
  it('test: .isDate(value)', () => {
    assert.isTrue(TypeLib.isDate(new Date()));

    assert.isFalse(TypeLib.isDate(undefined));
    assert.isFalse(TypeLib.isDate(0));
    assert.isFalse(TypeLib.isDate(-0));
    assert.isFalse(TypeLib.isDate(NaN));
    assert.isFalse(TypeLib.isDate(Infinity));
    assert.isFalse(TypeLib.isDate(-Infinity));
    assert.isFalse(TypeLib.isDate([]));
    assert.isFalse(TypeLib.isDate(null));
    assert.isFalse(TypeLib.isDate(''));
    assert.isFalse(TypeLib.isDate(false));
    assert.isFalse(TypeLib.isDate(/[\[\]']+/g));
    assert.isFalse(TypeLib.isDate({}));
    assert.isFalse(TypeLib.isDate(Symbol('test:')));
    assert.isFalse(TypeLib.isDate(Function.prototype));
  });

  /** @test {Type#isNotDate} */
  it('test: .isNotDate(value)', () => {
    assert.isFalse(TypeLib.isNotDate(new Date()));

    assert.isTrue(TypeLib.isNotDate(undefined));
    assert.isTrue(TypeLib.isNotDate(0));
    assert.isTrue(TypeLib.isNotDate(-0));
    assert.isTrue(TypeLib.isNotDate(NaN));
    assert.isTrue(TypeLib.isNotDate(Infinity));
    assert.isTrue(TypeLib.isNotDate(-Infinity));
    assert.isTrue(TypeLib.isNotDate([]));
    assert.isTrue(TypeLib.isNotDate(null));
    assert.isTrue(TypeLib.isNotDate(''));
    assert.isTrue(TypeLib.isNotDate(false));
    assert.isTrue(TypeLib.isNotDate(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotDate({}));
    assert.isTrue(TypeLib.isNotDate(Symbol('test:')));
    assert.isTrue(TypeLib.isNotDate(Function.prototype));
  });

  /** @test {Type#isObject} */
  it('test: .isObject(value)', () => {
    assert.isTrue(TypeLib.isObject({}));
    assert.isTrue(TypeLib.isObject(new Object()));

    assert.isFalse(TypeLib.isObject(new Date()));
    assert.isFalse(TypeLib.isObject(undefined));
    assert.isFalse(TypeLib.isObject(0));
    assert.isFalse(TypeLib.isObject(-0));
    assert.isFalse(TypeLib.isObject(NaN));
    assert.isFalse(TypeLib.isObject(Infinity));
    assert.isFalse(TypeLib.isObject(-Infinity));
    assert.isFalse(TypeLib.isObject([]));
    assert.isFalse(TypeLib.isObject(null));
    assert.isFalse(TypeLib.isObject(''));
    assert.isFalse(TypeLib.isObject(false));
    assert.isFalse(TypeLib.isObject(/[\[\]']+/g));
    assert.isFalse(TypeLib.isObject(Symbol('test:')));
    assert.isFalse(TypeLib.isObject(Function.prototype));
  });

  /** @test {Type#isNotObject} */
  it('test: .isNotObject(value)', () => {
    assert.isFalse(TypeLib.isNotObject({}));
    assert.isFalse(TypeLib.isNotObject(new Object()));

    assert.isTrue(TypeLib.isNotObject(new Date()));
    assert.isTrue(TypeLib.isNotObject(undefined));
    assert.isTrue(TypeLib.isNotObject(0));
    assert.isTrue(TypeLib.isNotObject(-0));
    assert.isTrue(TypeLib.isNotObject(NaN));
    assert.isTrue(TypeLib.isNotObject(Infinity));
    assert.isTrue(TypeLib.isNotObject(-Infinity));
    assert.isTrue(TypeLib.isNotObject([]));
    assert.isTrue(TypeLib.isNotObject(null));
    assert.isTrue(TypeLib.isNotObject(''));
    assert.isTrue(TypeLib.isNotObject(false));
    assert.isTrue(TypeLib.isNotObject(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotObject(Symbol('test:')));
    assert.isTrue(TypeLib.isNotObject(Function.prototype));
  });

  /** @test {Type#isBoolean} */
  it('test: .isBoolean(value)', () => {
    assert.isTrue(TypeLib.isBoolean(false));
    assert.isTrue(TypeLib.isBoolean(new Boolean(false)));

    assert.isFalse(TypeLib.isBoolean({}));
    assert.isFalse(TypeLib.isBoolean(new Object()));
    assert.isFalse(TypeLib.isBoolean(new Date()));
    assert.isFalse(TypeLib.isBoolean(undefined));
    assert.isFalse(TypeLib.isBoolean(0));
    assert.isFalse(TypeLib.isBoolean(-0));
    assert.isFalse(TypeLib.isBoolean(NaN));
    assert.isFalse(TypeLib.isBoolean(Infinity));
    assert.isFalse(TypeLib.isBoolean(-Infinity));
    assert.isFalse(TypeLib.isBoolean([]));
    assert.isFalse(TypeLib.isBoolean(null));
    assert.isFalse(TypeLib.isBoolean(''));
    assert.isFalse(TypeLib.isBoolean(/[\[\]']+/g));
    assert.isFalse(TypeLib.isBoolean(Symbol('test:')));
    assert.isFalse(TypeLib.isBoolean(Function.prototype));
  });

  /** @test {Type#isNotBoolean} */
  it('test: .isNotBoolean(value)', () => {
    assert.isFalse(TypeLib.isNotBoolean(false));
    assert.isFalse(TypeLib.isNotBoolean(new Boolean(false)));

    assert.isTrue(TypeLib.isNotBoolean({}));
    assert.isTrue(TypeLib.isNotBoolean(new Object()));
    assert.isTrue(TypeLib.isNotBoolean(new Date()));
    assert.isTrue(TypeLib.isNotBoolean(undefined));
    assert.isTrue(TypeLib.isNotBoolean(0));
    assert.isTrue(TypeLib.isNotBoolean(-0));
    assert.isTrue(TypeLib.isNotBoolean(NaN));
    assert.isTrue(TypeLib.isNotBoolean(Infinity));
    assert.isTrue(TypeLib.isNotBoolean(-Infinity));
    assert.isTrue(TypeLib.isNotBoolean([]));
    assert.isTrue(TypeLib.isNotBoolean(null));
    assert.isTrue(TypeLib.isNotBoolean(''));
    assert.isTrue(TypeLib.isNotBoolean(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotBoolean(Symbol('test:')));
    assert.isTrue(TypeLib.isNotBoolean(Function.prototype));
  });

  /** @test {Type#isSymbol} */
  it('test: .isSymbol(value)', () => {
    assert.isTrue(TypeLib.isSymbol(Symbol('test:')));

    assert.isFalse(TypeLib.isSymbol(false));
    assert.isFalse(TypeLib.isSymbol(new Boolean(false)));
    assert.isFalse(TypeLib.isSymbol({}));
    assert.isFalse(TypeLib.isSymbol(new Object()));
    assert.isFalse(TypeLib.isSymbol(new Date()));
    assert.isFalse(TypeLib.isSymbol(undefined));
    assert.isFalse(TypeLib.isSymbol(0));
    assert.isFalse(TypeLib.isSymbol(-0));
    assert.isFalse(TypeLib.isSymbol(NaN));
    assert.isFalse(TypeLib.isSymbol(Infinity));
    assert.isFalse(TypeLib.isSymbol(-Infinity));
    assert.isFalse(TypeLib.isSymbol([]));
    assert.isFalse(TypeLib.isSymbol(null));
    assert.isFalse(TypeLib.isSymbol(''));
    assert.isFalse(TypeLib.isSymbol(/[\[\]']+/g));
    assert.isFalse(TypeLib.isSymbol(Function.prototype));
  });

  /** @test {Type#isNotSymbol} */
  it('test: .isNotSymbol(value)', () => {
    assert.isFalse(TypeLib.isNotSymbol(Symbol('test:')));

    assert.isTrue(TypeLib.isNotSymbol(false));
    assert.isTrue(TypeLib.isNotSymbol(new Boolean(false)));
    assert.isTrue(TypeLib.isNotSymbol({}));
    assert.isTrue(TypeLib.isNotSymbol(new Object()));
    assert.isTrue(TypeLib.isNotSymbol(new Date()));
    assert.isTrue(TypeLib.isNotSymbol(undefined));
    assert.isTrue(TypeLib.isNotSymbol(0));
    assert.isTrue(TypeLib.isNotSymbol(-0));
    assert.isTrue(TypeLib.isNotSymbol(NaN));
    assert.isTrue(TypeLib.isNotSymbol(Infinity));
    assert.isTrue(TypeLib.isNotSymbol(-Infinity));
    assert.isTrue(TypeLib.isNotSymbol([]));
    assert.isTrue(TypeLib.isNotSymbol(null));
    assert.isTrue(TypeLib.isNotSymbol(''));
    assert.isTrue(TypeLib.isNotSymbol(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotSymbol(Function.prototype));
  });

  /** @test {Type#isString} */
  it('test: .isString(value)', () => {
    assert.isTrue(TypeLib.isString(''));
    assert.isTrue(TypeLib.isString(new String()));

    assert.isFalse(TypeLib.isString(false));
    assert.isFalse(TypeLib.isString(new Boolean(false)));
    assert.isFalse(TypeLib.isString({}));
    assert.isFalse(TypeLib.isString(new Object()));
    assert.isFalse(TypeLib.isString(new Date()));
    assert.isFalse(TypeLib.isString(undefined));
    assert.isFalse(TypeLib.isString(0));
    assert.isFalse(TypeLib.isString(-0));
    assert.isFalse(TypeLib.isString(NaN));
    assert.isFalse(TypeLib.isString(Infinity));
    assert.isFalse(TypeLib.isString(-Infinity));
    assert.isFalse(TypeLib.isString([]));
    assert.isFalse(TypeLib.isString(null));
    assert.isFalse(TypeLib.isString(/[\[\]']+/g));
    assert.isFalse(TypeLib.isString(Symbol('test:')));
    assert.isFalse(TypeLib.isString(Function.prototype));
  });

  /** @test {Type#isNotString} */
  it('test: .isNotString(value)', () => {
    assert.isFalse(TypeLib.isNotString(''));
    assert.isFalse(TypeLib.isNotString(new String()));

    assert.isTrue(TypeLib.isNotString(false));
    assert.isTrue(TypeLib.isNotString(new Boolean(false)));
    assert.isTrue(TypeLib.isNotString({}));
    assert.isTrue(TypeLib.isNotString(new Object()));
    assert.isTrue(TypeLib.isNotString(new Date()));
    assert.isTrue(TypeLib.isNotString(undefined));
    assert.isTrue(TypeLib.isNotString(0));
    assert.isTrue(TypeLib.isNotString(-0));
    assert.isTrue(TypeLib.isNotString(NaN));
    assert.isTrue(TypeLib.isNotString(Infinity));
    assert.isTrue(TypeLib.isNotString(-Infinity));
    assert.isTrue(TypeLib.isNotString([]));
    assert.isTrue(TypeLib.isNotString(null));
    assert.isTrue(TypeLib.isNotString(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotString(Symbol('test:')));
    assert.isTrue(TypeLib.isNotString(Function.prototype));
  });

  /** @test {Type#isRegExp} */
  it('test: .isRegExp(value)', () => {
    assert.isTrue(TypeLib.isRegExp(/[\[\]']+/g));
    assert.isTrue(TypeLib.isRegExp(new RegExp()));

    assert.isFalse(TypeLib.isRegExp(undefined));
    assert.isFalse(TypeLib.isRegExp(0));
    assert.isFalse(TypeLib.isRegExp(-0));
    assert.isFalse(TypeLib.isRegExp(NaN));
    assert.isFalse(TypeLib.isRegExp(Infinity));
    assert.isFalse(TypeLib.isRegExp(-Infinity));
    assert.isFalse(TypeLib.isRegExp([]));
    assert.isFalse(TypeLib.isRegExp(null));
    assert.isFalse(TypeLib.isRegExp(''));
    assert.isFalse(TypeLib.isRegExp(false));
    assert.isFalse(TypeLib.isRegExp({}));
    assert.isFalse(TypeLib.isRegExp(Symbol('test:')));
    assert.isFalse(TypeLib.isRegExp(Function.prototype));
  });

  /** @test {Type#isNotRegExp} */
  it('test: .isNotRegExp(value)', () => {
    assert.isFalse(TypeLib.isNotRegExp(/[\[\]']+/g));
    assert.isFalse(TypeLib.isNotRegExp(new RegExp()));

    assert.isTrue(TypeLib.isNotRegExp(undefined));
    assert.isTrue(TypeLib.isNotRegExp(0));
    assert.isTrue(TypeLib.isNotRegExp(-0));
    assert.isTrue(TypeLib.isNotRegExp(NaN));
    assert.isTrue(TypeLib.isNotRegExp(Infinity));
    assert.isTrue(TypeLib.isNotRegExp(-Infinity));
    assert.isTrue(TypeLib.isNotRegExp([]));
    assert.isTrue(TypeLib.isNotRegExp(null));
    assert.isTrue(TypeLib.isNotRegExp(''));
    assert.isTrue(TypeLib.isNotRegExp(false));
    assert.isTrue(TypeLib.isNotRegExp({}));
    assert.isTrue(TypeLib.isNotRegExp(Symbol('test:')));
    assert.isTrue(TypeLib.isNotRegExp(Function.prototype));
  });

  /** @test {Type#isFunction} */
  it('test: .isFunction(value)', () => {
    assert.isTrue(TypeLib.isFunction(Function.prototype));
    assert.isTrue(TypeLib.isFunction(() => { }));

    assert.isFalse(TypeLib.isFunction(/[\[\]']+/g));
    assert.isFalse(TypeLib.isFunction(new RegExp()));
    assert.isFalse(TypeLib.isFunction(undefined));
    assert.isFalse(TypeLib.isFunction(0));
    assert.isFalse(TypeLib.isFunction(-0));
    assert.isFalse(TypeLib.isFunction(NaN));
    assert.isFalse(TypeLib.isFunction(Infinity));
    assert.isFalse(TypeLib.isFunction(-Infinity));
    assert.isFalse(TypeLib.isFunction([]));
    assert.isFalse(TypeLib.isFunction(null));
    assert.isFalse(TypeLib.isFunction(''));
    assert.isFalse(TypeLib.isFunction(false));
    assert.isFalse(TypeLib.isFunction({}));
    assert.isFalse(TypeLib.isFunction(Symbol('test:')));
  });

  /** @test {Type#isNotFunction} */
  it('test: .isNotFunction(value)', () => {
    assert.isFalse(TypeLib.isNotFunction(Function.prototype));
    assert.isFalse(TypeLib.isNotFunction(() => { }));

    assert.isTrue(TypeLib.isNotFunction(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotFunction(new RegExp()));
    assert.isTrue(TypeLib.isNotFunction(undefined));
    assert.isTrue(TypeLib.isNotFunction(0));
    assert.isTrue(TypeLib.isNotFunction(-0));
    assert.isTrue(TypeLib.isNotFunction(NaN));
    assert.isTrue(TypeLib.isNotFunction(Infinity));
    assert.isTrue(TypeLib.isNotFunction(-Infinity));
    assert.isTrue(TypeLib.isNotFunction([]));
    assert.isTrue(TypeLib.isNotFunction(null));
    assert.isTrue(TypeLib.isNotFunction(''));
    assert.isTrue(TypeLib.isNotFunction(false));
    assert.isTrue(TypeLib.isNotFunction({}));
    assert.isTrue(TypeLib.isNotFunction(Symbol('test:')));
  });

  /** @test {Type#isPrimitive} */
  it('test: .isPrimitive(value)', () => {
    assert.isTrue(TypeLib.isPrimitive(0));
    assert.isTrue(TypeLib.isPrimitive(-0));
    assert.isTrue(TypeLib.isPrimitive(null));
    assert.isTrue(TypeLib.isPrimitive(''));
    assert.isTrue(TypeLib.isPrimitive(false));
    assert.isTrue(TypeLib.isPrimitive(undefined));
    assert.isTrue(TypeLib.isPrimitive(NaN));
    assert.isTrue(TypeLib.isPrimitive(Infinity));
    assert.isTrue(TypeLib.isPrimitive(-Infinity));

    assert.isFalse(TypeLib.isPrimitive(Function.prototype));
    assert.isFalse(TypeLib.isPrimitive(() => { }));
    assert.isFalse(TypeLib.isPrimitive(/[\[\]']+/g));
    assert.isFalse(TypeLib.isPrimitive(new RegExp()));
    assert.isFalse(TypeLib.isPrimitive([]));
    assert.isFalse(TypeLib.isPrimitive({}));
    assert.isFalse(TypeLib.isPrimitive(Symbol('test:')));
  });

  /** @test {Type#isNotPrimitive} */
  it('test: .isNotPrimitive(value)', () => {
    assert.isFalse(TypeLib.isNotPrimitive(0));
    assert.isFalse(TypeLib.isNotPrimitive(-0));
    assert.isFalse(TypeLib.isNotPrimitive(null));
    assert.isFalse(TypeLib.isNotPrimitive(''));
    assert.isFalse(TypeLib.isNotPrimitive(false));
    assert.isFalse(TypeLib.isNotPrimitive(undefined));
    assert.isFalse(TypeLib.isNotPrimitive(NaN));
    assert.isFalse(TypeLib.isNotPrimitive(Infinity));
    assert.isFalse(TypeLib.isNotPrimitive(-Infinity));

    assert.isTrue(TypeLib.isNotPrimitive(Function.prototype));
    assert.isTrue(TypeLib.isNotPrimitive(() => { }));
    assert.isTrue(TypeLib.isNotPrimitive(/[\[\]']+/g));
    assert.isTrue(TypeLib.isNotPrimitive(new RegExp()));
    assert.isTrue(TypeLib.isNotPrimitive([]));
    assert.isTrue(TypeLib.isNotPrimitive({}));
    assert.isTrue(TypeLib.isNotPrimitive(Symbol('test:')));
  });

  /** @test {Type#getType} */
  it('test: .getType(value)', () => {
    assert.equal(TypeLib.getType([]), TypeConstants.ARRAY);
    assert.equal(TypeLib.getType(new Array(1, 2, 3)), TypeConstants.ARRAY);

    assert.equal(TypeLib.getType(Symbol('desc')), TypeConstants.SYMBOL);

    assert.equal(TypeLib.getType(1), TypeConstants.NUMBER);
    assert.equal(TypeLib.getType(new Number(1)), TypeConstants.NUMBER);
    assert.equal(TypeLib.getType(NaN), TypeConstants.NUMBER);
    assert.equal(TypeLib.getType(Infinity), TypeConstants.NUMBER);
    assert.equal(TypeLib.getType(-Infinity), TypeConstants.NUMBER);

    assert.equal(TypeLib.getType(true), TypeConstants.BOOLEAN);
    assert.equal(TypeLib.getType(new Boolean(false)), TypeConstants.BOOLEAN);

    function Person(name) {
      this.name = name;
    }
    var person = new Person('Oleh');
    assert.equal(TypeLib.getType(person), TypeConstants.OBJECT);
    assert.equal(TypeLib.getType({}), TypeConstants.OBJECT);
    assert.equal(TypeLib.getType(new Object()), TypeConstants.OBJECT);

    assert.equal(TypeLib.getType(() => { }), TypeConstants.FUNCTION);

    assert.equal(TypeLib.getType(null), TypeConstants.NULL);
    assert.equal(TypeLib.getType(undefined), TypeConstants.UNDEFINED);

    assert.equal(TypeLib.getType(new Date()), TypeConstants.DATE);

    assert.equal(TypeLib.getType(/[\[\]']+/g), TypeConstants.REG_EXP);
    assert.equal(TypeLib.getType(new RegExp()), TypeConstants.REG_EXP);
  });

  /** @test {Type#toBe} */
  it('test: .toBe(expectation)', () => {
    let isUndefined = TypeLib.toBe(undefined)
      , isNumber3 = TypeLib.toBe(3)
      , isNaN = TypeLib.toBe(NaN)

    assert.isTrue(isUndefined(undefined));
    assert.isFalse(isUndefined({}));

    assert.isTrue(isNumber3(3));
    assert.isFalse(isNumber3(2));

    assert.isTrue(isNaN(NaN));
    assert.isFalse(isNaN(2));
  });


  /** @test {Type#notToBe} */
  it('test: .notToBe(expectation)', () => {
    let isNotUndefined = TypeLib.notToBe(undefined)
      , isNotNumber3 = TypeLib.notToBe(3)
      , isNotNaN = TypeLib.notToBe(NaN)

    assert.isFalse(isNotUndefined(undefined));
    assert.isTrue(isNotUndefined({}));

    assert.isFalse(isNotNumber3(3));
    assert.isTrue(isNotNumber3(2));

    assert.isFalse(isNotNaN(NaN));
    assert.isTrue(isNotNaN(2));
  });

  /** @test {Type#getTypeByClass} */
  it('test: .getTypeByClass(clazz)', () => {
    assert.equal(TypeLib.getTypeByClass(String), TypeConstants.STRING);
    assert.equal(TypeLib.getTypeByClass(RegExp), TypeConstants.REG_EXP);
    assert.equal(TypeLib.getTypeByClass(Object), TypeConstants.OBJECT);
    assert.equal(TypeLib.getTypeByClass(Function), TypeConstants.FUNCTION);
    assert.equal(TypeLib.getTypeByClass(Date), TypeConstants.DATE);
    assert.equal(TypeLib.getTypeByClass(Boolean), TypeConstants.BOOLEAN);
    assert.equal(TypeLib.getTypeByClass(Number), TypeConstants.NUMBER);
    assert.equal(TypeLib.getTypeByClass(Array), TypeConstants.ARRAY);
    assert.equal(TypeLib.getTypeByClass(Symbol), TypeConstants.SYMBOL);

    class Person {}
    assert.equal(TypeLib.getTypeByClass(Person), 'person')
  });

  /** @test {Type#typeCheck} */
  it('test .typeCheck(clazz, actualType) positive', () => {
    assert.isString(TypeLib.typeCheck(String, ''));
    assert.typeOf(TypeLib.typeCheck(RegExp, /ab+c/), 'regexp');
    assert.isObject(TypeLib.typeCheck(Object, {}));
    assert.isFunction(TypeLib.typeCheck(Function, () => {}));
    assert.instanceOf(TypeLib.typeCheck(Date, new Date()), Date);
    assert.isBoolean(TypeLib.typeCheck(Boolean, true));
    assert.isNumber(TypeLib.typeCheck(Number, 333));
    assert.isArray(TypeLib.typeCheck(Array, []));
    assert.typeOf(TypeLib.typeCheck(Symbol, Symbol('desc')), 'symbol');
  });

  /** @test {Type#typeCheck} */
  it('test .typeCheck(clazz, actualType) negative', () => {
    expect(() => {
      TypeLib.typeCheck(String, 777);
    }).to.throw(chai.TypeError, 'Type mismatch. Expected [string] but found [number]');
  });
});
