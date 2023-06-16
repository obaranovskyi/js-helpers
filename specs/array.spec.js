import { assert, expect } from 'chai';

import * as ArrLib from '../src/Array';

/** @test {Array} */
describe('Array Library Tests', () => {

  /** @test {Array#sortBy} */
  it('test: .sortBy(source, propList)', () => {
    let given = [
      { 'name': 'fred',   'age': 48 },
      { 'name': 'barney', 'age': 36 },
      { 'name': 'fred',   'age': 32 },
      { 'name': 'barney', 'age': 34 }
    ];
    let actual = ArrLib.sortBy(given, ['name', 'age']);

    assert.deepEqual(actual,
      [
        { name: 'barney', age: 34 },
        { name: 'barney', age: 36 },
        { name: 'fred', age: 32 },
        { name: 'fred', age: 48 }
      ]);
  });

  /** @test {Array#groupByProp} */
  it('test: .groupByProp(arr, groupVal)', () => {
    let actualObjArr = [{name: 'John', age: 21}, {name: 'Liza', age: 23}, {name: 'John', age: 23}]
      , actualByLength = ArrLib.groupByProp(['one', 'two', 'three'], 'length')
      , actualByName = ArrLib.groupByProp(actualObjArr, 'name')
      , actualByAge = ArrLib.groupByProp(actualObjArr, 'age');

      assert.deepEqual(actualByLength, { '3': [ 'one', 'two' ], '5': [ 'three' ] });
      assert.deepEqual(actualByName, { John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ], Liza: [ { name: 'Liza', age: 23 } ] });
      assert.deepEqual(actualByAge, { '21': [ { name: 'John', age: 21 } ], '23': [ { name: 'Liza', age: 23 }, { name: 'John', age: 23 } ] });
  });

  /** @test {Array#groupByFn} */
  it('test: .groupByFn(arr, groupFn)', () => {
    let actualByMathFloor = ArrLib.groupByFn([6.1, 4.2, 6.3], Math.floor)
      , actualByCustomName = ArrLib.groupByFn([{name: 'John', age: 21}, {name: 'Liza', age: 23}, {name: 'John', age: 23}], item => `name_${item.name}`);

      assert.deepEqual(actualByMathFloor, { '4': [ 4.2 ], '6': [ 6.1, 6.3 ] });
      assert.deepEqual(actualByCustomName, { name_John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ], name_Liza: [ { name: 'Liza', age: 23 } ] });
  });

  /** @test {Array#groupByPath} */
  it('test: .groupByPath(arr, groupPath)', () => {
    let actualByObject = ArrLib.groupByPath([
      { name: { first: 'John', last: 'aaa' }, age: 21 },
      { name: { first: 'Liza', last: 'bbb'}, age: 23 },
      { name: { first: 'John', last: 'ccc'}, age: 23 } ], ['name', 'first']);

    assert.deepEqual(actualByObject, {John: [{name:{first:'John', last:'aaa'}, age:21},{name: {first:'John', last: 'ccc'}, age:23}], Liza:[{name :{first:'Liza', last:'bbb'}, age:23}]});
  });

  /** @test {Array#groupBy} */
  it('test: .groupBy(...args)', () => {
    let actualObjArr = [{name: 'John', age: 21}, {name: 'Liza', age: 23}, {name: 'John', age: 23}]
      , actualByLength = ArrLib.groupBy(['one', 'two', 'three'], 'length')
      , actualByName = ArrLib.groupBy(actualObjArr, 'name')
      , actualByAge = ArrLib.groupBy(actualObjArr, 'age');

    assert.deepEqual(actualByLength, { '3': [ 'one', 'two' ], '5': [ 'three' ] });
    assert.deepEqual(actualByName, { John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ], Liza: [ { name: 'Liza', age: 23 } ] });
    assert.deepEqual(actualByAge, { '21': [ { name: 'John', age: 21 } ], '23': [ { name: 'Liza', age: 23 }, { name: 'John', age: 23 } ] });

    let actualByMathFloor = ArrLib.groupBy([6.1, 4.2, 6.3], Math.floor)
      , actualByCustomName = ArrLib.groupBy([{name: 'John', age: 21}, {name: 'Liza', age: 23}, {name: 'John', age: 23}], item => `name_${item.name}`);

    assert.deepEqual(actualByMathFloor, { '4': [ 4.2 ], '6': [ 6.1, 6.3 ] });
    assert.deepEqual(actualByCustomName, { name_John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ], name_Liza: [ { name: 'Liza', age: 23 } ] });

    let actualByObject = ArrLib.groupBy([
      { name: { first: 'John', last: 'aaa' }, age: 21 },
      { name: { first: 'Liza', last: 'bbb'}, age: 23 },
      { name: { first: 'John', last: 'ccc'}, age: 23 } ], ['name', 'first']);

    assert.deepEqual(actualByObject, { John: [{name:{first:'John', last:'aaa'}, age:21},{name: {first:'John', last: 'ccc'}, age:23}], Liza:[{name :{first:'Liza', last:'bbb'}, age:23}]});
  });

  /** @test {Array#cloneArray} */
  it('test: .cloneArray(arrayToClone)', () => {
    let numberArray = [1,2,3]
      , numberArrayClone = ArrLib.cloneArray(numberArray)

      , objectArray = [{name: 'John'}, {name: 'Liza'}]
      , objectArrayClone = ArrLib.cloneArray(objectArray);

    expect(numberArrayClone).to.not.equal(numberArray);
    expect(numberArrayClone).to.deep.equal(numberArray);

    expect(objectArrayClone).to.not.equal(objectArray);
    expect(objectArrayClone).to.deep.equal(objectArray);
  });

  /** @test {Array#without} */
  it('test: .without(source, item)', () => {
    let numberArray = [1,2,3];
    expect(ArrLib.without(numberArray, 3)).to.deep.equal([1,2]);
  });

  /** @test {Array#compact} */
  it('test: .compact(source)', () => {
    let dataArray = [0, -3, 'Hello', '', false, true, {}, [], null, undefined];
    expect(ArrLib.compact(dataArray, 3)).to.deep.equal([-3, 'Hello', true, {}, []]);
  });

  /** @test {Array#shuffle} */
  it('test: .shuffle(arrToShuffle)', () => {
    let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      , objectArray = [{name: 'name1'}, {name: 'name2'}, {name: 'name3'}, {name: 'name4'}, {name: 'name5'},
          {name: 'name6'}, {name: 'name7'}, {name: 'name8'}, {name: 'name9'}, {name: 'name10'}]
      , shuffleNumberArray = ArrLib.shuffle(numberArray)
      , shuffleObjectArray = ArrLib.shuffle(objectArray);

    expect(shuffleNumberArray).to.deep.not.equal(numberArray);
    assert.equal(shuffleNumberArray.size, numberArray.size);

    expect(shuffleObjectArray).to.deep.not.equal(objectArray);
    assert.equal(shuffleObjectArray.size, objectArray.size);
  });

  /** @test {Array#reject} */
  it('test: .reject(source, fn)', () => {
    let numberArray = [1,2,3]
      , objectArray = [{name: 'John'}, {name: 'Liza'}];

    expect(ArrLib.reject(numberArray, item => item < 3)).to.deep.equal([3]);
    expect(ArrLib.reject(objectArray, user => user.name === 'Liza')).to.deep.equal([objectArray[0]]);
  });

  /** @test {Array#filter} */
  it('test: .filter(source, fn)', () => {
    let numberArray = [1,2,3]
      , objectArray = [{name: 'John'}, {name: 'Liza'}];

    expect(ArrLib.filter(numberArray, item => item < 3)).to.deep.equal([1,2]);
    expect(ArrLib.filter(objectArray, user => user.name === 'John')).to.deep.equal([objectArray[0]]);
  });

  /** @test {Array#take} */
  it('test: .take(array, numberOfLastElements = 1)', () => {
    let numberArray = [1,2,3]
      , objectArray = [{name: 'John'}, {name: 'Liza'}];

    expect(ArrLib.take(numberArray)).to.deep.equal([1]);
    expect(ArrLib.take(objectArray)).to.deep.equal([objectArray[0]]);

    expect(ArrLib.take(numberArray, 2)).to.deep.equal([1,2]);
    expect(ArrLib.take(objectArray, 2)).to.deep.equal(objectArray);
  });

  /** @test {Array#takeRight} */
  it('test: .takeRight(array, numberOfLastElements = 1)', () => {
    let numberArray = [1,2,3]
      , objectArray = [{name: 'John'}, {name: 'Liza'}];

    expect(ArrLib.takeRight(numberArray)).to.deep.equal([3]);
    expect(ArrLib.takeRight(objectArray)).to.deep.equal([objectArray[1]]);

    expect(ArrLib.takeRight(numberArray, 2)).to.deep.equal([2,3]);
    expect(ArrLib.takeRight(objectArray, 2)).to.deep.equal(objectArray);
  });

  /** @test {Array#takeWhile} */
  it('test: .takeWhile(array = [], whileFn)', () => {
    let items = [
      { name: 'Edward', value: 21 },
      { name: 'Sharpe', value: 37 },
      { name: 'And', value: 45 },
      { name: 'Zeros', value: 37 }
    ];

    expect(ArrLib.takeWhile(items, item => item.name === 'Edward')).to.deep.equal([]);
    expect(ArrLib.takeWhile(items, item => item.name === 'Sharpe')).to.deep.equal([items[0]]);
    expect(ArrLib.takeWhile(items, item => item.name === 'And')).to.deep.equal([items[0], items[1]]);
    expect(ArrLib.takeWhile(items, item => item.name === 'NotExisting')).to.deep.equal(items);
  });

  /** @test {Array#takeRightWhile} */
  it('test: .takeRightWhile(array = [], rightWhileFn)', () => {
    let items = [
      { name: 'Edward', value: 21 },
      { name: 'Sharpe', value: 37 },
      { name: 'And', value: 45 },
      { name: 'Zeros', value: 37 }
    ];

    expect(ArrLib.takeRightWhile(items, item => item.name === 'Edward')).to.deep.equal([items[1], items[2], items[3]]);
    expect(ArrLib.takeRightWhile(items, item => item.name === 'Sharpe')).to.deep.equal([items[2], items[3]]);
    expect(ArrLib.takeRightWhile(items, item => item.name === 'And')).to.deep.equal([items[3]]);
    expect(ArrLib.takeRightWhile(items, item => item.name === 'NotExisting')).to.deep.equal(items);
  });

  /** @test {Array#pluck} */
  it('test: .pluck(array = [], propName)', () => {
    let users = [{name: 'John'}, {name: 'Liza'}];

    expect(ArrLib.pluck(users, 'name')).to.deep.equal(['John', 'Liza']);
  });

  /** @test {Array#fill} */
  it('test: .fill(value, number)', () => {
    let user = {name: 'Oleh'};
    expect(ArrLib.fill(user, 3)).to.deep.equal([user,user,user]);
    expect(ArrLib.fill(1, 5)).to.deep.equal([1,1,1,1,1]);
  });

  /** @test {Array#fillRight} */
  it('test: .fillRight(value, number, arr)', () => {
    let user = {name: 'John'}
      , user2 = {name: 'Lize'};

    expect(ArrLib.fillRight(user, 3, [user2, user2])).to.deep.equal([user2,user2,user,user,user]);
    expect(ArrLib.fillRight(1, 5, [4,4])).to.deep.equal([4,4,1,1,1,1,1]);
  });

  /** @test {Array#fillLeft} */
  it('test: .fillLeft(value, number, arr)', () => {
    let user = {name: 'John'}
      , user2 = {name: 'Lize'};

    expect(ArrLib.fillLeft(user, 3, [user2, user2])).to.deep.equal([user,user,user,user2,user2]);
    expect(ArrLib.fillLeft(1, 5, [4,4])).to.deep.equal([1,1,1,1,1,4,4]);
  });

  /** @test {Array#times} */
  it('test: .times(iterationNumber, fn)', () => {
    let inc = 0;

    expect(ArrLib.times(5, item => {
      inc++;
      return item;
    })).to.deep.equal([0,1,2,3,4]);

    expect(inc).to.be.equal(5);
  });

  /** @test {Array#every} */
  it('test: .every(source = [], fn)', () => {
    let users = [{name: 'John'}, {name: 'John'}]
      , users2 = [{name: 'Liza'}, {name: 'John'}]

    assert.isTrue(ArrLib.every(users, user => user.name === 'John'));
    assert.isFalse(ArrLib.every(users2, user => user.name === 'John'));
  });

  /** @test {Array#flatten} */
  it('test: .flatten(arrayToConcat)', () => {
    let numberArray = [1,[2,[3,[4],5],6],7];
    expect(ArrLib.flatten(numberArray)).to.deep.equal([1,2,3,4,5,6,7]);
  });

  /** @test {Array#zipWithProjection} */
  it('test: .zipWithProjection()', () => {
    expect(ArrLib.zipWithProjection(['Andriy', 'Ihor'], [23, 21], [true, false],
        (name, age, isMerried) => ({name, age, isMerried}))).to.deep.equal(
          [{name: 'Andriy', age: 23, isMerried: true}, {name: 'Ihor', age: 21, isMerried: false}]);
  });

  /** @test {Array#map} */
  it('test: .map(arrayToMap, fn)', () => {
    let users = [{name: 'Andriy', age: 23, isMerried: true}, {name: 'Ihor', age: 21, isMerried: false}];
    expect(ArrLib.map(users, u => u.name)).to.deep.equal(['Andriy', 'Ihor']);
  });

  /** @test {Array#zip} */
  it('test: .zip(...arrayToZip)', () => {
    expect(ArrLib.zip(['a', 'b'], [1, 2], [true, false])).to.deep.equal([['a',1,true], ['b',2,false]]);
  });

  /** @test {Array#some} */
  it('test: .some(source = [], fn) ', () => {
    let users = [{name: 'Liza'}, {name: 'John'}];
    assert.isTrue(ArrLib.some(users, u => u.name === 'Liza'));
    assert.isFalse(ArrLib.some(users, u => u.name === 'NotInArray'));
  });

  /** @test {Array#any} */
  it('test: .any(source = [], fn) ', () => {
    let users = [{name: 'Liza'}, {name: 'John'}];
    assert.isTrue(ArrLib.any(users, u => u.name === 'Liza'));
    assert.isFalse(ArrLib.any(users, u => u.name === 'NotInArray'));
  });

  /** @test {Array#sample} */
  it('test: .sample(source) ', () => {
    let users = [{name: 'name1'}, {name: 'name2'}, {name: 'name3'}, {name: 'name4'}, {name: 'name5'},
          {name: 'name6'}, {name: 'name7'}, {name: 'name8'}, {name: 'name9'}, {name: 'name10'}]
      , randomUser = ArrLib.sample(users)
      , existing = ArrLib.find(users, user => user.name === randomUser.name);

    assert.isDefined(existing);
  });

  /** @test {Array#find} */
  it('test: .find(source, fn) ', () => {
    let users = [{name: 'name1'}, {name: 'name2'}, {name: 'name3'}, {name: 'name4'}, {name: 'name5'},
          {name: 'name6'}, {name: 'name7'}, {name: 'name8'}, {name: 'name9'}, {name: 'name10'}]
      , findResult = ArrLib.find(users, user => user.name === 'name7');

    assert.isDefined(findResult);
  });

  /** @test {Array#first} */
  it('test: .first(array = []) ', () => {
    assert.equal(ArrLib.first([51,35,23]), 51);
  });

  /** @test {Array#head} */
  it('test: .head(array = []) ', () => {
    assert.equal(ArrLib.head([51,35,23]), 51);
  });

  /** @test {Array#last} */
  it('test: .last(array = []) ', () => {
    assert.equal(ArrLib.last([51,35,23]), 23);
  });

  /** @test {Array#tail} */
  it('test: .tail(array = []) ', () => {
    assert.equal(ArrLib.tail([51,35,23]), 23);
  });

  /** @test {Array#nth} */
  it('test: .nth(source, index)', () => {
    assert.equal(ArrLib.nth([51,35,23], 1), 35);
  });

  /** @test {Array#castArray} */
  it('test: .castArray(...valueToCast) ', () => {
    expect(ArrLib.castArray(51,35,23)).to.deep.equal([51,35,23]);
    expect(ArrLib.castArray(false)).to.deep.equal([false]);
    expect(ArrLib.castArray('Hello')).to.deep.equal(['Hello']);
  });

  /** @test {Array#changeOrder} */
  it('test: .changeOrder(argsArray, order) ', () => {
    assert.deepEqual(
      ArrLib.changeOrder(['b', 'c', 'a'], [2, 0, 1]),
      ['a', 'b', 'c']);
  });

  /** @test {Array#numAndStrComparator} */
  it('test: .numAndStrComparator(first, second, prop)', () => {
    let given = [
      { 'name': 'fred',   'age': 48 },
      { 'name': 'barney', 'age': 36 }
    ];
    let byString1 = ArrLib.numAndStrComparator(given[0], given[1], 'name')
      , byString2 = ArrLib.numAndStrComparator(given[1], given[0],'name')
      , byNumber1 = ArrLib.numAndStrComparator(given[0], given[1],'age')
      , byNumber2 = ArrLib.numAndStrComparator(given[1], given[0],'age');

    assert.equal(byString1, 1);
    assert.equal(byString2, -1);
    assert.equal(byNumber1, 1);
    assert.equal(byNumber2, -1);
  });

  /** @test {Array#uniq}*/
  it('uniq(source)', () => {
    assert.deepEqual(ArrLib.uniq(
      [
        { id: 1, firstName: 'Jon', lastName: 'Snow', location: 'Winterfell' },
        { id: 2, firstName: 'Eddard', lastName: 'Stark', location: 'Winterfell' },
        { id: 3, firstName: 'Catelyn', lastName: 'Stark', location: 'Winterfell' },
        { id: 4, firstName: 'Roose', lastName: 'Bolton', location: 'Dreadfort' },
        { id: 4, firstName: 'Roose', lastName: 'Bolton', location: 'Dreadfort' },
        { id: 5, firstName: 'Ramsay', lastName: 'Snow', location: 'Dreadfort' }
      ]),
      [
        { id: 1, firstName: 'Jon', lastName: 'Snow', location: 'Winterfell' },
        { id: 2, firstName: 'Eddard', lastName: 'Stark', location: 'Winterfell' },
        { id: 3, firstName: 'Catelyn', lastName: 'Stark', location: 'Winterfell' },
        { id: 4, firstName: 'Roose', lastName: 'Bolton', location: 'Dreadfort' },
        { id: 5, firstName: 'Ramsay', lastName: 'Snow', location: 'Dreadfort' }
      ]
    );
  });
});
