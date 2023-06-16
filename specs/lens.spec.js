import { assert } from 'chai';

import { prop, lensIndex, lensProp, assoc, assocPath,
  path, pathEq, pathOr, pathSatisfies } from '../src/Lens';
import { IncorrectArgsTypeError } from '../src/Error/incorrect-args-type-error';


/** @test {Lens} */
describe('Lens Library Tests', () => {

  /** @test {Lens#prop} */
  it('test: prop(propName, source)', () => {
    let user = { name: 'Oleh' };
    assert.equal('Oleh', prop('name', user));
  });

  /** @test {Lens#prop} */
  it('test: prop(propName, source) with inner object', () => {
    let user = { name: { first: 'Oleh' } };
    assert.notEqual({ first: 'Oleh' }, prop('name', user));
    assert.equal('Oleh', prop('name', user).first);
  });

  /** @test {Lens#prop} */
  it('test: prop(propName, source) with wrong first argument', () => {
    assert.throw(() => prop(1, {}), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#prop} */
  it('test: prop(propName, source) with wrong second argument', () => {
    assert.throw(() => prop('some', []), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#prop} */
  it('test: prop(propName, source) with undefined first argument', () => {
    assert.throw(() => prop(undefined, 2), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#prop} */
  it('test: prop(propName, source) with undefined second argument', () => {
    assert.throw(() => prop('hello', undefined), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensIndex} */
  it('test: lensIndex(index, source)', () => {
    let names = ['Oleh', 'John'];
    assert.equal('Oleh', lensIndex(0, names));
  });

  /** @test {Lens#lensIndex} */
  it('test: lensIndex(index, source) with inner object', () => {
    let expected = { name: { first: 'Oleh' } };
    let names = [expected];
    assert.notEqual(expected, lensIndex(0, names));
    assert.equal(expected.name.first, lensIndex(0, names).name.first);
  });

  /** @test {Lens#lensIndex} */
  it('test: lensIndex(index, source) with wrong first argument', () => {
    assert.throw(() => lensIndex('propName', []), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensIndex} */
  it('test: lensIndex(index, source) with wrong second argument', () => {
    assert.throw(() => prop(1, {}), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensIndex} */
  it('test: lensIndex(index, source) with undefined first argument', () => {
    assert.throw(() => lensIndex(undefined, []), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensIndex} */
  it('test: lensIndex(index, source) with undefined second argument', () => {
    assert.throw(() => lensIndex(1, undefined), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensProp} */
  it('test: lensProp(propName)', () => {
    let user1 = { name: 'John' }
      , user2 = { name: 'Eric' }
      , nameLens = lensProp('name');
    assert.equal('John', nameLens(user1));
    assert.equal('Eric', nameLens(user2));
  });

  /** @test {Lens#lensProp} */
  it('test: lensProp(propName) with wrong first argument', () => {
    assert.throw(() => lensProp(1), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensProp} */
  it('test: lensProp(propName) with wrong second argument', () => {
    assert.throw(() => lensProp('some')(2), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensProp} */
  it('test: lensProp(propName) with undefined first argument', () => {
    assert.throw(() => lensProp(undefined), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#lensProp} */
  it('test: lensProp(propName) with undefined first argument', () => {
    assert.throw(() => lensProp('hello')(undefined), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#assoc} */
  it('test: assoc(propName, valueToBeSet, source)', () => {
    let user = { name: 'John' }
      , updatedUser = assoc('name', 'Eric', user);
    assert.equal('Eric', updatedUser.name);
    assert.equal('John', user.name);
    assert.notEqual(user, updatedUser);
  });

  /** @test {Lens#assoc} */
  it('test: assoc(propName, valueToBeSet, source) with inner object', () => {
    let user = { name: { first: 'John' } }
      , updatedUser =  assoc('name', { first: 'Eric' }, user)

    assert.notEqual(user.name, updatedUser.name);
    assert.equal('John', user.name.first);
    assert.equal('Eric', updatedUser.name.first);
  });

  /** @test {Lens#assoc} */
  it('test: assoc(propName, valueToBeSet, source) with wrong first argument', () => {
    assert.throw(() => assoc(1, {}, {}), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#assoc} */
  it('test: assoc(propName, valueToBeSet, source) with wrong third argument', () => {
    assert.throw(() => assoc('some', {}, 'not object'), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#assoc} */
  it('test: assoc(propName, valueToBeSet, source) with undefined first argument', () => {
    assert.throw(() => assoc(undefined, 2, {}), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#assoc} */
  it('test: assoc(propName, valueToBeSet, source) with undefined third argument', () => {
    assert.throw(() => prop('hello', 3, undefined), IncorrectArgsTypeError, 'Incorrect arguments were passed');
  });

  /** @test {Lens#assocPath} */
  it('test: assocPath(path, valueToBeSet, source)', () => {
    let user = {name: 'Oleh'}
      , result1 = assocPath(['a', 1, 'b', 'c'], 'hello', user)
      , result2 = assocPath(['a', 1, 'b', 'c', 0], 'world', user)
      , result3 = assocPath(['a', 1, 3, 'b', 'c', 0, 'r'], 'yeah', user);

    assert.equal(result1.a[1].b.c, 'hello');
    assert.equal(result2.a[1].b.c[0], 'world');
    assert.equal(result3.a[1][3].b.c[0].r, 'yeah');
    assert.notEqual(result1, user);
    assert.notEqual(result2, user);
    assert.notEqual(result3, user);
  });

  /** @test {Lens#assocPath} */
  it('test: assocPath(path, valueToBeSet, source) with array', () => {
    let user = [{name: 'John'}, {name: 'Jimi'}]
      , result = assocPath([1, 1, 'b', 'd', 1, 'c'], 'hello', user);

    assert.equal(result[1][1].b.d[1].c, 'hello');

    // should not override old values
    assert.equal(result[0].name, 'John');

  });

  /** @test {Lens#assocPath} */
  it('test: assocPath(path, valueToBeSet, source) should not override old props', () => {
    let user = {
      d: { r: [ 1, { b:2 } ] },
      a: [
        [ { b:2 } ],
        [ { b: { c: [{ r: 'ddd' } ] } }, { b: { c: [ { r: 'bbb' } ] } }, { b: { c: [ { r: 'aaa' } ] } } ]
      ]
    }
      , result = assocPath(['a', 1, 2, 'b', 'c', 0, 'r'], 'yeah', user);

    // should not override old object
    assert.equal(user.a[1][2].b.c[0].r, 'aaa');
    assert.equal(user.a[1][1].b.c[0].r, 'bbb');
    assert.equal(user.a[1][0].b.c[0].r, 'ddd');
    assert.equal(user.d.r[1].b, 2);

    // should override only one propperty
    assert.equal(result.a[1][2].b.c[0].r, 'yeah');

    // rest should stay the same as in source
    assert.equal(result.a[1][1].b.c[0].r, 'bbb');
    assert.equal(result.a[1][0].b.c[0].r, 'ddd');
    assert.equal(result.d.r[1].b, 2);

    // full identity
    assert.notEqual(JSON.stringify(user), JSON.stringify(result));

    result = assocPath(['a', 1, 2, 'b', 'c', 0, 'r'], 'aaa', user);

    assert.equal(JSON.stringify(user), JSON.stringify(result));
    assert.deepEqual(user, result);
  });

  /** @test {Lens#path} */
  it('test: path(p, source)', () => {
    let user = { name: 'John', address: { email: 'some@email.com' }}
      , result = path(['address', 'email'], user);
    assert.equal(result, 'some@email.com');
    assert.isUndefined(path(['address', 'email', 'notExisting'], user));
  });

  /** @test {Lens#pathEq} */
  it('test: pathEq(path, source, value)', () => {
    let user = { name: 'John', address: { email: 'some@email.com' }}
      , result1 = pathEq(['address', 'email'], user, 'not email')
      , result2 = pathEq(['address', 'email'], user, 'some@email.com');
    assert.isFalse(result1);
    assert.isTrue(result2, 'some@email.com');
  });

  /** @test {Lens#pathOr} */
  it('test: pathOr(path, source, orValue)', () => {
    let user = { name: 'John', address: { email: 'some@email.com' }};
    assert.equal(pathOr(['address', 'email'], user, 'N/A'), 'some@email.com');
    assert.equal(pathOr(['address', 'email', 'notExisting'], user, 'N/A'), 'N/A');
  });

  /** @test {Lens#pathSatisfies} */
  it('test: pathSatisfies(path, source, satisfyFn)', () => {
    let user = { name: 'John', address: { email: 'some@email.com' }};
    assert.equal(pathSatisfies(['address', 'email'], user, p => p.toUpperCase()), 'SOME@EMAIL.COM');
  });
});
