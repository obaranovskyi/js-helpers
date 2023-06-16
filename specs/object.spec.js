import chai, { assert, expect } from 'chai';

import * as ObjLib from '../src/Object';


/** @test {Object} */
describe('Object Library Tests', () => {

    /** @test {Object#deepFreeze} */
    it('test: .deepFreeze(obj)', () => {
      let obj = {
        internal: {
          b: 'Hello'
        }
      };

      ObjLib.deepFreeze(obj);

      expect(() => {
        obj.internal.a = 'some value';
      }).to.throw(chai.TypeError, /Cannot add property a, object is not extensible/);

      expect(() => {
        obj.internal.b = 'Hi';
      }).to.throw(chai.TypeError, /Cannot assign to read only property \'b\' of object \'#<Object>\'/);

    });

    /** @test {Object#cloneObject} */
    it('test: .cloneObject(objectToClone)', () => {
      let obj = {}
        , obj2 = obj;

      assert.equal(obj, obj2);
      assert.notEqual(obj, ObjLib.cloneObject(obj));
    });

    /** @test {Object#deepClone} */
    it('test: .deepClone(objectToDeepClone)', () => {
      let obj = { a: { b: { c: [ { name: 'Oleh' } ] } } };

      let copy = ObjLib.deepClone(obj);
      assert.equal(obj.a.b.c[0].name, copy.a.b.c[0].name);
      assert.notEqual(obj.a.b, copy.a.b);
      assert.notEqual(obj.a.b.c, copy.a.b.c);
      assert.deepEqual(obj, copy);

      copy.a.b.c[0].name = 'Updated Name';
      assert.notEqual(obj.a.b.c[0].name, 'Updated Name');
      assert.equal(obj.a.b.c[0].name, 'Oleh');


    });

    /** @test {Object#pick} */
    it('test: .pick(source, ...pickArray)', () => {
      let user = {
        name: 'Oleh',
        age: 29,
        profession: 'dev'
      };

      expect(ObjLib.pick(user, 'name', 'age')).to.deep.equal({name: 'Oleh', age: 29});
    });

    /** @test {Object#omit} */
    it('test: .omit(source, ...omitArray)', () => {
      let user = {
        name: 'Oleh',
        age: 29,
        profession: 'dev'
      };

      expect(ObjLib.omit(user, 'name', 'age')).to.deep.equal({profession: 'dev'});
    });

    /** @test {Object#safeGet} */
    it('test: .safeGet(obj, ...props)', () => {
      let user1 = {name: 'Oleh', address: {zip: 123}}
        , user2 = {name: 'Oleh'};

      assert.equal(ObjLib.safeGet(user1, 'address', 'zip'), 123);
      assert.isUndefined(ObjLib.safeGet(user2, 'address', 'zip'));
    });

    /** @test {Object#safeGetOr} */
    it('test: .safeGetOr(obj, orValue, ...props)', () => {
      let user1 = {name: 'Oleh', address: {zip: 123}};

      assert.equal(ObjLib.safeGetOr(user1, 'no zip available', 'address', 'zip'), 123);
      assert.equal(ObjLib.safeGetOr(user1, 'no zip available', 'address', 'zip', 'previous'), 'no zip available');
    });

    /** @test {Object#safeGet} */
    it('test: .safeGet(obj, ...props) with array', () => {
      let array =
        [
          [ [ 23, 1 ] ],
          [1],
          { name: ['John', 'Liza'] }
        ];
      assert.equal(ObjLib.safeGet(array, 0, 0, 0), 23);
      assert.equal(ObjLib.safeGet(array, 2, 'name', 1), 'Liza');
      assert.isUndefined(ObjLib.safeGet(array, 3, 1));
    });

    /** @test {Object#safeGetOr} */
    it('test: .safeGetOr(obj, orValue, ...props) with array', () => {
      let array =
        [
          [ [ 23, 1 ] ],
          [1],
          { name: ['John', 'Liza'] }
        ];
      assert.equal(ObjLib.safeGetOr(array, 'no value', 0, 0, 0), 23);
      assert.equal(ObjLib.safeGetOr(array, 'no value', 0, 0, 0, 10), 'no value');
    });

    /** @test {Object#getWithProps} */
    it('test: .getWithProps(obj, ...props)', () => {
      let user1 = {name: 'Oleh', address: {zip: 123}}
        , user2 = {name: 'Oleh'}
        , getZip = ObjLib.getWithProps('address', 'zip');

      assert.equal(getZip(user1), 123);
      assert.isUndefined(getZip(user2));
    });

    /** @test {Object#getWithCtx} */
    it('test: .getWithCtx(obj, ...props)', () => {
      let user1 = {name: 'Oleh', address: {zip: 123}}
        , user2 = {name: 'Oleh'}
        , getFromUser1 = ObjLib.getWithCtx(user1)
        , getFromUser2 = ObjLib.getWithCtx(user2);

      assert.equal(getFromUser1('address', 'zip'), 123);
      assert.isUndefined(getFromUser2('address', 'zip'));
    });

    /** @test {Object#objectProjection} */
    it('test: .objectProjection(obj, cb, skipCb = (...args) => args) ', () => {
      assert.deepEqual(
        ObjLib.objectProjection({a: 3, b: 7, c: () => {}}, (k, v) => `${k}=${v}`),
        ['a=3', 'b=7', 'c=function c() {}']);

      assert.deepEqual(
        ObjLib.objectProjection({a: 3, b: 7, c: () => {}}, (k, v) => `${k}=${v}`, (k, v) => typeof v !== 'function'),
        [ 'a=3', 'b=7' ]);
    });

    /** @test {Object#conformsTo} */
    it('test: conformsTo(object, predicateSetModel)', () => {
      let given = { b: 1, a: 'Hello' }
        , actual1 = ObjLib.conformsTo(given, { b: n => n === 1, a: n => n === 'Hello' })
        , actual2 = ObjLib.conformsTo(given, { b: n => n === 1, a: n => n === 'NOT-Hello' });

      assert.isTrue(actual1);
      assert.isFalse(actual2);
    });

    /** @test {Object@deepEquals} */
    it('deepEquals(first, second)', () => {
      assert.isTrue(ObjLib.deepEquals(
        [
          { id: 1, firstName: 'Jon', lastName: 'Snow', gender: 'm', age: 14, location: 'Winterfell' },
          { id: 2, firstName: 'Eddard', lastName: 'Stark', gender: 'm', age: 35, location: 'Winterfell' },
          { id: 3, firstName: 'Catelyn', lastName: 'Stark', gender: 'f', age: 33, location: 'Winterfell' },
          { id: 4, firstName: 'Roose', lastName: 'Bolton', gender: 'm', age: 40, location: 'Dreadfort' },
          { id: 5, firstName: 'Ramsay', lastName: 'Snow', gender: 'm', age: 15, location: 'Dreadfort' }
        ],
        [
          { id: 1, firstName: 'Jon', lastName: 'Snow', gender: 'm', age: 14, location: 'Winterfell' },
          { id: 2, firstName: 'Eddard', lastName: 'Stark', gender: 'm', age: 35, location: 'Winterfell' },
          { id: 3, firstName: 'Catelyn', lastName: 'Stark', gender: 'f', age: 33, location: 'Winterfell' },
          { id: 4, firstName: 'Roose', lastName: 'Bolton', gender: 'm', age: 40, location: 'Dreadfort' },
          { id: 5, firstName: 'Ramsay', lastName: 'Snow', gender: 'm', age: 15, location: 'Dreadfort' }
        ]
      ));

      assert.isFalse(ObjLib.deepEquals(
        [
          { id: 1, firstName: 'Jon', lastName: 'Snow', gender: 'm', age: 14, location: 'Winterfell' },
          { id: 2, firstName: 'Eddard', lastName: 'Stark', gender: 'm', age: 35, location: 'Winterfell' },
          { id: 3, firstName: 'Catelyn', lastName: 'Stark', gender: 'f', age: 33, location: 'Winterfell' },
          { id: 4, firstName: 'Roose', lastName: 'Bolton', gender: 'm', age: 40, location: 'Dreadfort' },
          { id: 5, firstName: 'Ramsay', lastName: 'Snow', gender: 'm', age: 15, location: 'Dreadfort' }
        ],
        [
          { id: 1, firstName: 'Jon', lastName: 'Snow', gender: 'm', age: 14, location: 'Winterfell' },
          { id: 2, firstName: 'Eddard', lastName: 'Stark', gender: 'm', age: 35, location: 'Winterfell' },
          { id: 3, firstName: 'Catelyn', lastName: 'Stark', gender: 'f', age: 33, location: 'Winterfell' },
          { id: 4, firstName: 'Roose', lastName: 'Bolton', gender: 'm', age: 40, location: 'Dreadfort' },
          { id: 5, firstName: 'Ramsay. Not same here!', lastName: 'Snow', gender: 'm', age: 15, location: 'Dreadfort' }
        ]
      ));
    });
});
