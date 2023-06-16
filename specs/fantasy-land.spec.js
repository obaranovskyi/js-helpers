import * as chai from 'chai';
import { assert, expect } from 'chai';

import { Functor, Apply, Applicative, Monad, LazyFunctor } from '../src/Fantasy-Land';
import { Maybe } from '../src/Fantasy-Land/maybe';
import { Either } from '../src/Fantasy-Land/either';
import { toSetoid, isSetoid } from '../src/Fantasy-Land/setoid';
import { identity } from '../src/Function-Combinators';


/** @test {Fantasy-Land} */
describe('Fantasy Land Library Tests', () => {

  /** @test {Fantasy-Land#Functor} */
  it('test: Functor', () => {
    let sideEffectVar = 0
      , functor = Functor('  64  ')
        .map(s => s.trim())
        .map(r => parseInt(r))
        .tap(v => sideEffectVar = 3)
        .map(i => i + 1)
        .map(i => String.fromCharCode(i))


    assert.equal(functor.fold(identity), 'A');
    assert.equal(functor.get(), 'A');
    assert.equal(sideEffectVar, 3);
    assert.equal(functor.toString(), 'Functor(A)');
    assert.equal(functor.inspect(), 'Functor(A)');
  });

  /** @test {Fantasy-Land#Apply} */
  it('test: Apply', () => {
    let sideEffectVar = 0
      , curry2Add = x => y => x + y
      , apply = Apply(curry2Add)
        .tap(() => sideEffectVar = 3)

    assert.equal(sideEffectVar, 3);
    assert.isFunction(apply.get());
    assert.isFunction(apply.fold(identity));
    assert.isFunction(apply.ap(2).get());
    assert.equal(apply.ap(2).ap(3).get(), 5);
    assert.equal(apply.ap(2).apGet(3), 5);
    assert.equal(apply.ap(2).ap(3).toString(), 'Apply(5)');
    assert.equal(apply.ap(2).ap(3).inspect(), 'Apply(5)');
    assert.equal(
      apply
        .ap(2)
        .ap(3)
        .map(n => `Number is ${n}`)
        .get()
      , 'Number is 5');
  });

  /** @test {Fantasy-Land#Applicative */
  it('test: Applicative', () => {
    let sideEffectVar = 0
      , curry2Add = x => y => x + y
      , applicative = Applicative.of(curry2Add)
        .tap(() => sideEffectVar = 3)

    assert.equal(sideEffectVar, 3);
    assert.isFunction(applicative.get());
    assert.isFunction(applicative.fold(identity));
    assert.isFunction(applicative.ap(2).get());
    assert.equal(applicative.ap(2).ap(3).get(), 5);
    assert.equal(applicative.ap(2).apGet(3), 5);
    assert.equal(applicative.ap(2).ap(3).toString(), 'Applicative(5)');
    assert.equal(applicative.ap(2).ap(3).inspect(), 'Applicative(5)');
    assert.equal(
      applicative
        .ap(2)
        .ap(3)
        .map(n => `Number is ${n}`)
        .get()
      , 'Number is 5');
  });

  /** @test {Fantasy-Land#Monad} */
  it('test: Monad', () => {
    let sideEffectVar = 0
      , curry2Add = x => y => x + y
      , monad = Monad.of(curry2Add)
        .tap(() => sideEffectVar = 3)

    assert.equal(sideEffectVar, 3);
    assert.isFunction(monad.get());
    assert.isFunction(monad.fold(identity));
    assert.isFunction(monad.ap(2).get());
    assert.equal(monad.ap(2).ap(3).get(), 5);
    assert.equal(monad.ap(2).apGet(3), 5);
    assert.equal(monad.ap(2).ap(3).toString(), 'Monad(5)');
    assert.equal(monad.ap(2).ap(3).inspect(), 'Monad(5)');
    assert.equal(
      monad
        .ap(2)
        .ap(3)
        .map(n => `Number is ${n}`)
        .get()
      , 'Number is 5');

    assert.equal(
      monad
        .ap(2)
        .ap(3)
        .chain(v => Monad.of(v * v))
        .get()
      , 25);

    assert.equal(
      monad
        .ap(2)
        .ap(3)
        .map(v => Monad.of(v * v))
        .join()
        .get()
      , 25);

    assert.equal(
      monad
        .ap(3)
        .apChain(Monad.of(2))
        .get()
      , 5);
  });

  /** @test {Fantasy-Land#LazyFunctor} */
  it('test: LazyFunctor', () => {
    let wasInvoked = false;
    let multiplyWithInvokeUpdate = x => {
      wasInvoked = true;
      return x * x;
    }

    assert.isNotNumber(
      LazyFunctor(() => 7)
        .lazyMap(multiplyWithInvokeUpdate)
        .lazyMap(x => x * 100)
    );
    assert.isFalse(wasInvoked);

    assert.isNumber(
      LazyFunctor(() => 7)
        .lazyMap(multiplyWithInvokeUpdate)
        .lazyMap(x => x * 100)
        .lazyFold(identity)
    );
    assert.isTrue(wasInvoked);

    assert.equal(
      LazyFunctor(() => 7)
        .lazyMap(multiplyWithInvokeUpdate)
        .lazyMap(x => x * 10)
        .lazyFold(identity),
      490
    );
  });

  /** @test {Fantasy-Land#Maybe} */
  describe('test: Maybe', () => {

    /** @test {Fantasy-Land#Maybe#fromNullable} */
    it('test: Maybe.fromNullable', () => {
      let positiveMaybe = Maybe.fromNullable('hello')
        , negativeMaybe = Maybe.fromNullable(undefined)

      assert.isTrue(positiveMaybe.isJust);
      assert.isFalse(positiveMaybe.isNothing);

      assert.isFalse(negativeMaybe.isJust);
      assert.isTrue(negativeMaybe.isNothing);
    });

    /** @test {Fantasy-Land#Maybe#of} */
    it('test: Maybe.of', () => {
      let positiveMaybe = Maybe.of('hello');

      assert.isTrue(positiveMaybe.isJust);
      assert.isFalse(positiveMaybe.isNothing);
    });

    /** @test {Fantasy-Land#Maybe#just} */
    it('test: Maybe.just', () => {
      let positiveMaybe = Maybe.just('hello');

      assert.isTrue(positiveMaybe.isJust);
      assert.isFalse(positiveMaybe.isNothing);
    });

    /** @test {Fantasy-Land#Maybe#nothing} */
    it('test: Maybe.nothing', () => {
      let positiveMaybe = Maybe.nothing('hello');

      assert.isFalse(positiveMaybe.isJust);
      assert.isTrue(positiveMaybe.isNothing);
    });

    /** @test {Fantasy-Land#Maybe#map} */
    it('test: Maybe.Just/Maybe.Nothing#map(f)', () => {
      let positiveMaybe = Maybe.fromNullable('hello')
        , negativeMaybe = Maybe.fromNullable(undefined);

      assert.equal(
        positiveMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .toString()
        , 'Maybe.Just(HELLO WORLD)');

      assert.equal(
        negativeMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .toString()
        , 'Maybe.Nothing()');
    });

    /** @test {Fantasy-Land#Maybe#getValue} */
    it('test: Maybe.Just/Maybe.Nothing#getValue()', () => {
      let positiveMaybe = Maybe.fromNullable('hello')
        , negativeMaybe = Maybe.fromNullable(undefined);

      assert.equal(
        positiveMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getValue()
        , 'HELLO WORLD');

      assert.isUndefined(
        negativeMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getValue());
    });

    /** @test {Fantasy-Land#Maybe#get} */
    it('test: Maybe.Just/Maybe.Nothing#get()', () => {
      let positiveMaybe = Maybe.fromNullable('hello')
        , negativeMaybe = Maybe.fromNullable(undefined);

      assert.equal(
        positiveMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .get()
        , 'HELLO WORLD');

      expect(
        negativeMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .get
      ).to.throw(chai.TypeError, 'Can\'t extract the value of a Nothing.');
    });

    /** @test {Fantasy-Land#Maybe#getOrElse} */
    it('test: Maybe.Just/Maybe.Nothing#getOrElse()', () => {
      let positiveMaybe = Maybe.fromNullable('hello')
        , negativeMaybe = Maybe.fromNullable(undefined);

      assert.equal(
        positiveMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getOrElse('Other')
        , 'HELLO WORLD');

      assert.equal(
        negativeMaybe
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getOrElse('Other')
        , 'Other');


    });

    /** @test {Fantasy-Land#Maybe#chain} */
    it('test: Maybe.Just/Maybe.Nothing#chain()', () => {
      assert.equal(
        Maybe.just('hello')
          .chain(s => Maybe.of(s.toUpperCase()))
          .getOrElse('Other')
        , 'HELLO');

      assert.equal(
        Maybe.nothing()
          .chain(s => Maybe.of(s.toUpperCase()))
          .getOrElse('Other')
        , 'Other');
    });

    /** @test {Fantasy-Land#Maybe#filter} */
    it('test: Maybe.Just/Maybe.Nothing#filter()', () => {
      assert.equal(
        Maybe.just('hello')
          .map(s => s.toUpperCase())
          .filter(s => s === 'HELLO')
          .getOrElse('Other')
        , 'HELLO');

      assert.equal(
        Maybe.nothing()
          .map(s => s.toUpperCase())
          .filter(s => s === 'HELLO')
          .getOrElse('Other')
        , 'Other');
    });
  });

  /** @test {Fantasy-Land#Either} */
  describe('test: Either', () => {

    /** @test {Fantasy-Land#Maybe#fromNullable} */
    it('test: Either.fromNullable', () => {
      let positiveEither = Either.fromNullable('hello')
        , negativeEither = Either.fromNullable(undefined)

      assert.isTrue(positiveEither.isRight);
      assert.isFalse(positiveEither.isLeft);

      assert.isFalse(negativeEither.isRight);
      assert.isTrue(negativeEither.isLeft);
    });

    /** @test {Fantasy-Land#Either#of} */
    it('test: Either.of', () => {
      let positiveEither = Either.of('hello');

      assert.isTrue(positiveEither.isRight);
      assert.isFalse(positiveEither.isLeft);
    });

    /** @test {Fantasy-Land#Either#tryCatch} */
    it('test: Either.tryCatch with falsy value', () => {
      const expected = 3000;
      assert.equal(
        Either.tryCatch(() => JSON.parse('incorrect json'))
          .map(c => c.port)
          .getOrElse(expected)
      , expected);
    });

    /** @test {Fantasy-Land#Either#tryCatch} */
    it('test: Either.tryCatch with truthy value', () => {
      assert.equal(
        Either.tryCatch(() => JSON.parse('{"port": 8888}'))
          .map(c => c.port)
          .getOrElse(3000)
      , 8888);
    });

    /** @test {Fantasy-Land#Either#tryCatch} */
    it('test: double Either.tryCatch', () => {
      const expected = 3000;
      assert.equal(
        Either.tryCatch(() => JSON.parse('incorrect json'))
          .map(c => Either.tryCatch(JSON.parse('another incorrect json')))
          .getOrElse(expected)
      , expected);
    });

    /** @test {Fantasy-Land#Either#right} */
    it('test: Either.right', () => {
      let positiveEither = Either.right('hello');

      assert.isTrue(positiveEither.isRight);
      assert.isFalse(positiveEither.isLeft);
    });

    /** @test {Fantasy-Land#Either#left} */
    it('test: Either.left', () => {
      let positiveEither = Either.left('hello');

      assert.isFalse(positiveEither.isRight);
      assert.isTrue(positiveEither.isLeft);
    });

    /** @test {Fantasy-Land#Either#map} */
    it('test: Either.Right/Either.Left#map(f)', () => {
      let positiveEither = Either.fromNullable('hello')
        , negativeEither = Either.fromNullable(undefined);

      assert.equal(
        positiveEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .toString()
        , 'Either.Right(HELLO WORLD)');

      assert.equal(
        negativeEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .toString()
        , 'Either.Left(undefined)');
    });

    /** @test {Fantasy-Land#Either#getValue} */
    it('test: Either.Right/Either.Left#getValue()', () => {
      let positiveEither = Either.fromNullable('hello')
        , negativeEither = Either.fromNullable(undefined);

      assert.equal(
        positiveEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getValue()
        , 'HELLO WORLD');

      assert.isUndefined(
        negativeEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getValue());
    });

    /** @test {Fantasy-Land#Either#get} */
    it('test: Either.Right/Either.Left#get()', () => {
      let positiveEither = Either.fromNullable('hello')
        , negativeEither = Either.fromNullable(undefined);

      assert.equal(
        positiveEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .get()
        , 'HELLO WORLD');

      expect(
        negativeEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .get
      ).to.throw(chai.TypeError, 'Can\'t extract the value of a Left.');
    });

    /** @test {Fantasy-Land#Either#getOrElse} */
    it('test: Either.Right/Either.Left#getOrElse()', () => {
      let positiveEither = Either.fromNullable('hello')
        , negativeEither = Either.fromNullable(undefined);

      assert.equal(
        positiveEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getOrElse('Other')
        , 'HELLO WORLD');

      assert.equal(
        negativeEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getOrElse('Other')
        , 'Other');


    });

    /** @test {Fantasy-Land#Either#chain} */
    it('test: Either.Right/Either.Left#chain()', () => {
      assert.equal(
        Either.right('hello')
          .chain(s => Either.of(s.toUpperCase()))
          .getOrElse('Other')
        , 'HELLO');

      assert.equal(
        Either.left()
          .chain(s => Either.of(s.toUpperCase()))
          .getOrElse('Other')
        , 'Other');
    });

    /** @test {Fantasy-Land#Either#filter} */
    it('test: Either.Right/Either.Left#filter()', () => {
      assert.equal(
        Either.right('hello')
          .map(s => s.toUpperCase())
          .filter(s => s === 'HELLO')
          .getOrElse('Other')
        , 'HELLO');

      assert.equal(
        Either.left()
          .map(s => s.toUpperCase())
          .filter(s => s === 'HELLO')
          .getOrElse('Other')
        , 'Other');
    });

    /** @test {Fantasy-Land#Either#getOrElseThrow} */
    it('test: Either.Rigth/Either.Left#getOrElseThrow(err)', () => {
      let positiveEither = Either.fromNullable('hello')
        , negativeEither = Either.fromNullable(undefined);

      assert.equal(
        positiveEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getOrElseThrow('some error message')
        , 'HELLO WORLD');

      expect(() =>
        negativeEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .getOrElseThrow('some error message')
      ).to.throw(chai.Error, 'some error message');

    });

    /** @test {Fantasy-Land#Either#orElse} */
    it('test: Either.Rigth/Either.Left#orElse(f)', () => {
      let positiveEither = Either.fromNullable('hello')
        , negativeEither = Either.fromNullable(undefined);

      assert.equal(
        positiveEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .orElse(() => Either.right(3))
          .get()
        , 'HELLO WORLD');

      assert.equal(
        negativeEither
          .map(s => `${s} world`)
          .map(s => s.toUpperCase())
          .orElse(() => Either.right(3))
          .get()
        , 3);
    });
  });

  describe('test: Setoid', () => {
    it('test: .toSetoid(eqFn) with positive case', () => {
      const comparePeopleFn = (p, p2) => p.id === p2.id;
      const PersonSetoid = toSetoid(comparePeopleFn);
      const person1 = { id: 1, name: 'Oleh' };
      const person2 = { id: 1, name: 'Oleh' };

      assert.isTrue(
        PersonSetoid(person1)
          .equals(
            PersonSetoid(person2))
      );

      assert.isTrue(
        PersonSetoid(person2)
          .equals(
            PersonSetoid(person1))
      );
    });

    it('test: .toSetoid(eqFn) with negative case', () => {
      const comparePeopleFn = (p, p2) => p.id === p2.id;
      const PersonSetoid = toSetoid(comparePeopleFn);
      const person1 = { id: 1, name: 'Oleh' }
      const person2 = { id: 2, name: 'Oleh' }

      assert.isFalse(
        PersonSetoid(person1)
          .equals(
            PersonSetoid(person2))
      );

      assert.isFalse(
        PersonSetoid(person2)
          .equals(
            PersonSetoid(person1))
      );
    });

    it('test: .isSetoid(obj)', () => {
      const comparePeopleFn = (p, p2) => p.id === p2.id;
      const PersonSetoid = toSetoid(comparePeopleFn);
      const person1 = { id: 1, name: 'Oleh' }
      const person2 = {
        id: 2,
        name: 'Oleh',
        equals: p => true
      };

      assert.isTrue(isSetoid(PersonSetoid(person1)));
      assert.isFalse(isSetoid(person1));
      assert.isFalse(isSetoid(person2));
    });
  });
});
