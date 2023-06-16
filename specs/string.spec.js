import { assert, expect } from 'chai';

import * as StrLib from '../src/String';


/** @test {String} */
describe('String Library Tests', () => {

    /** @test {String#buildResource} */
    it('test: .buildResource(src, ...args)', () => {
      assert.equal(StrLib.buildResource('Hello{0}World{1}All{2}', '$', '%', '@'), 'Hello$World%All@');
      assert.equal(StrLib.buildResource(undefined, '$', '%', '@'), '');
      assert.equal(StrLib.buildResource(), '');
    });

    /** @test {String#replaceAll} */
    it('test: .replaceAll(replaceable, from, to)', () => {
      assert.equal(StrLib.replaceAll('Hello$ World$', '$', '!'), 'Hello! World!');
      assert.equal(StrLib.replaceAll('Hello World', '$', '!'), 'Hello World');
    });

    /** @test {String#replaceAllDifferences} */
    it('test: .replaceAllDifferences(replaceable, fromList, to)', () => {
      assert.equal(StrLib.replaceAllDifferences('#Hello$ World%', ['#', '$', '%'], ''), 'Hello World');
      assert.equal(StrLib.replaceAllDifferences('Hello World', ['#', '$', '%'], ''), 'Hello World');
    });

    /** @test {String#includes} */
    it('test: .includes(source, includement)', () => {
      assert.isTrue(StrLib.includes('Hello World', 'Hello'));
      assert.isFalse(StrLib.includes('Hello World', 'Hi'));
    });

    /** @test {String#trim} */
    it('test: .trim(strSource)', () => {
      assert.equal(StrLib.trim('  Hello World     '), 'Hello World');
      assert.equal(StrLib.trim('Hello World    '), 'Hello World');
      assert.equal(StrLib.trim('  Hello World'), 'Hello World');
    });

    /** @test {String#equalsIgnoreCase} */
    it('test: .equalsIgnoreCase(str1, str2)', () => {
      assert.isTrue(StrLib.equalsIgnoreCase('hello world', 'HELLO WORLD'));
      assert.isTrue(StrLib.equalsIgnoreCase('hello world', 'Hello World'));
    });

    /** @test {String#upperFirst} */
    it('test: .upperFirst(str = "")', () => {
      assert.equal(StrLib.upperFirst('oleh'), 'Oleh');
      assert.equal(StrLib.upperFirst('OLEH'), 'OLEH');
    });

    /** @test {String#getFirstUpperLetter} */
    it('test: .getFirstUpperLetter(strValue)', () => {
      assert.equal(StrLib.getFirstUpperLetter('a2rAB'), 'A');
    });

    /** @test {String#getLastUpperLetter} */
    it('test: .getLastUpperLetter(strValue)', () => {
      assert.equal(StrLib.getLastUpperLetter('a2rAB'), 'B');
    });

    /** @test {String#getFirstLowerLetter} */
    it('test: .getFirstLowerLetter(strValue)', () => {
      assert.equal(StrLib.getFirstLowerLetter('a2rAB'), 'a');
    });

    /** @test {String#getFirstLowerLetter} */
    it('test: .getLastLowerLetter(strValue)', () => {
      assert.equal(StrLib.getLastLowerLetter('a2rAB'), 'r');
    });

    /** @test {String#words} */
    it('test: .words(strValue)', () => {
      expect(StrLib.words('Foo  Bar')).to.deep.equal(['Foo', 'Bar']);
      expect(StrLib.words('fooBar')).to.deep.equal(['foo', 'Bar']);
      expect(StrLib.words('__FOO_BAR__')).to.deep.equal(['FOO', 'BAR']);
    });

    /** @test {String#snakeCase} */
    it('test: .snakeCase(str)', () => {
      assert.equal(StrLib.snakeCase('Foo  Bar'), 'foo_bar');
      assert.equal(StrLib.snakeCase('fooBar'), 'foo_bar');
      assert.equal(StrLib.snakeCase('__FOO_BAR__'), 'foo_bar');
    });

    /** @test {String#kebabCase} */
    it('test: .kebabCase(str) ', () => {
      assert.equal(StrLib.kebabCase('Foo  Bar'), 'foo-bar');
      assert.equal(StrLib.kebabCase('fooBar'), 'foo-bar');
      assert.equal(StrLib.kebabCase('__FOO_BAR__'), 'foo-bar');
    });

    /** @test {String#camelCase} */
    it('test: .camelCase(str)', () => {
      assert.equal(StrLib.camelCase('Foo  Bar'), 'fooBar');
      assert.equal(StrLib.camelCase('fooBar'), 'fooBar');
      assert.equal(StrLib.camelCase('__FOO_BAR__'), 'fooBar');
    });
});
