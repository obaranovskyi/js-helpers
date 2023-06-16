import { safeGet, deepClone, deepEquals } from '../Object';
import { getType, isString, isNumber } from '../Type';
import { partial, compose } from '../Function';
import { EMPTY } from '../Constants/common';
import * as TypeConstants from '../Constants/types';

/**
 * @desc Sorts array of objects by given properties with priorities.
 * @example
 *  let given = [
 *    { 'name': 'fred',   'age': 48 },
 *    { 'name': 'barney', 'age': 36 },
 *    { 'name': 'fred',   'age': 32 },
 *    { 'name': 'barney', 'age': 34 }
 *  ];
 *
 *  sortBy(given, ['name', 'age']);
 *  //  [
 *  //    { name: 'barney', age: 34 },
 *  //    { name: 'barney', age: 36 },
 *  //    { name: 'fred', age: 32 },
 *  //    { name: 'fred', age: 48 }
 *  //  ]
 * @param {Array<object>} source Source which requires sorting.
 * @param {Array<string>} propList Sorting property list.
 * @returns {Array<object>} Sorted array of objects.
 */
export function sortBy(source, propList) {
  let sourceClone = deepClone(source)
    , priorityProj = (first, second) => propName =>
    numAndStrComparator(first, second, propName);

  return sourceClone.sort((a, b) =>
    compose(
      head,
      compact,
      partial(map, EMPTY, priorityProj(a, b))
    )(propList) || 0);
};

/**
 * @desc Will group objects in array by property.
 * @example
 * let actualObjArr = [
 *   { name: 'John', age: 21 },
 *   { name: 'Liza', age: 23 },
 *   { name: 'John', age: 23 }
 * ];
 *
 * groupBy(['one', 'two', 'three'], 'length');
 * // { '3': ['one', 'two'], '5': ['three'] }
 *
 * groupBy(actualObjArr, 'name');
 * // {
 * //   John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ],
 * //   Liza: [ { name: 'Liza', age: 23 } ]
 * // }
 *
 * groupBy(actualObjArr, 'age');
 * // {
 * //   '21': [ { name: 'John', age: 21 } ],
 * //   '23': [ { name: 'Liza', age: 23 }, { name: 'John', age: 23 } ]
 * // };
 * @param {Array<object>} source Source which should be used for grouping.
 * @param  {string} groupVal Name which should be used for grouping.
 * @returns {object} Grouped object.
 */
export function groupByProp(source, groupVal) {
  return source.reduce((acc, val) =>
    Object.assign({}, acc, {
      [val[groupVal]]: acc[val[groupVal]]
      ? [...acc[val[groupVal]], val]
      : [val]
    }), {});
};

/**
 * @desc Will group objects in array by function.
 * @example
 * groupByFn([6.1, 4.2, 6.3], Math.floor)
 * // { '4': [4.2], '6': [6.1, 6.3] }
 *
 * groupByFn([
 *   { name: 'John', age: 21 },
 *   { name: 'Liza', age: 23 },
 *   { name: 'John', age: 23 }
 * ], item => `name_${item.name}`);
 * // {
 * //   name_John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ],
 * //   name_Liza: [ { name: 'Liza', age: 23 } ]
 * // }
 * @param {Array<object>} source Source which should be used for grouping.
 * @param {Function} groupFn Function which will define names for groups.
 * @returns {object} Grouped object.
 */
export function groupByFn(source, groupFn) {
  return source.reduce((acc, val) => {
    let propName = groupFn(val);
    return Object.assign({}, acc, {
      [propName]: acc[propName]
        ? [...acc[propName], val]
        : [val]
    });
  }, {});
};

/**
 * @desc Will group objects in array by object path.
 * @example
 * groupByPath([
 *   { name: { first: 'John', last: 'aaa' }, age: 21 },
 *   { name: { first: 'Liza', last: 'bbb'}, age: 23 },
 *   { name: { first: 'John', last: 'ccc'}, age: 23 } ], ['name', 'first']);
 *
 * // {
 * //   John: [
 * //     { name: { first: 'John', last: 'aaa' }, age: 21 },
 * //     { name: { first: 'John', last: 'ccc' }, age: 23 }
 * //   ],
 * //   Liza: [
 * //     { name :{ first: 'Liza', last: 'bbb' }, age: 23 }
 * //   ]
 * // }
 * @param {Array<object>} source Source which should be used for grouping.
 * @param {*} groupPath Path which should be used as name for groups.
 * @returns {object} Grouped object.
 */
export function groupByPath(source, groupPath) {
  return source.reduce((acc, val) => {
    let propName = safeGet(val, ...groupPath);
    return Object.assign({}, acc, {
      [propName]: acc[propName]
        ? [...acc[propName], val]
        : [val]
    });
  }, {});
};

/**
 * @desc Will group objects in array by given property,
 * function or path.
 * @example
 * let actualObjArr = [
 *   { name: 'John', age: 21 },
 *   { name: 'Liza', age: 23 },
 *   { name: 'John', age: 23 }
 * ];
 *
 * groupBy(['one', 'two', 'three'], 'length');
 * // { '3': ['one', 'two'], '5': ['three'] });
 *
 * groupBy(actualObjArr, 'name');
 * // {
 * //   John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ],
 * //   Liza: [ { name: 'Liza', age: 23 } ]
 * // }
 *
 * groupBy(actualObjArr, 'age');
 * // {
 * //   '21': [ { name: 'John', age: 21 } ],
 * //   '23': [ { name: 'Liza', age: 23 }, { name: 'John', age: 23 } ]
 * // };
 *
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // { '4': [4.2], '6': [6.1, 6.3] }
 *
 * groupBy([
 *   { name: 'John', age: 21 },
 *   { name: 'Liza', age: 23 },
 *   { name: 'John', age: 23 }
 * ], item => `name_${item.name}`);
 * // {
 * //   name_John: [ { name: 'John', age: 21 }, { name: 'John', age: 23 } ],
 * //   name_Liza: [ { name: 'Liza', age: 23 } ]
 * // }
 *
 * groupBy([
 *   { name: { first: 'John', last: 'aaa' }, age: 21 },
 *   { name: { first: 'Liza', last: 'bbb'}, age: 23 },
 *   { name: { first: 'John', last: 'ccc'}, age: 23 } ], ['name', 'first']);
 * // {
 * //   John: [
 * //     { name: { first: 'John', last: 'aaa' }, age:21 },
 * //     { name: { first: 'John', last: 'ccc' }, age:23 }
 * //   ],
 * //   Liza: [
 * //     { name :{ first: 'Liza', last: 'bbb' }, age: 23 }
 * //   ]
 * // }
 * @param  {...any} args grouping arguments.
 * @returns {object} Grouped object.
 */
export function groupBy(...args) {
  return ({
    [TypeConstants.STRING]: groupByProp,
    [TypeConstants.FUNCTION]: groupByFn,
    [TypeConstants.ARRAY]: groupByPath,
  })[getType(tail(args))](...args);
};

/**
 * @desc Will create clone of given array.
 * @example
 * cloneArray([1,2,3]); // [1,2,3]
 *
 * cloneArray([{name: 'John'}, {name: 'Liza'}]); // [{name: 'John'}, {name: 'Liza'}]
 *
 * @param {Array<T>} source Array that
 * should be cloned.
 * @returns {Array<T>} Cloned array.
 */
export function cloneArray(source) {
  return source.slice();
};

/**
 * @desc Returns an array without match item.
 * @example
 * let numberArray = without([1, 2, 3], 1);
 * numberArray // => [2, 3]
 *
 * @param {Array<T>} source Array from where to remove
 * match item.
 * @param {T} matchItem item that should not
 * be included in result array.
 * @returns {Array<T>} Array without matched element.
 */
export function without(source, matchItem) {
  return source.filter(elem => elem !== matchItem);
};

/**
 * @desc Creates an array with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 * @example
 * let dataArray = [0, -3, 'Hello', '', false, true, {}, [], null, undefined];
 *
 * compact(dataArray, 3); // [-3, 'Hello', true, {}, []]
 *
 * @param {Array<T>} source Array to compact.
 * truthly values
 * @return {Array<T>} Returns the new array of filtered values.
 */
export function compact(source) {
  return source.filter(elem => elem);
};

/**
 * @desc The opposite of filter; this method returns the elements of
 * collection that predicate does not return truthy for.
 * @example
 *  let numberArray = [1, 2, 3]
 *    , objectArray = [{ name: 'John' }, { name: 'Liza' }];
 *
 *  reject(numberArray, item => item < 3) // [3]
 *  reject(objectArray, user => user.name === 'Liza') // [{ name: 'John' }]
 *
 * @param {Array<T>} source Array that should checked.
 * @param {Function} fn Opposite filter function.
 * @return {Array<T>} Returns the new filtered array.
 */
export function reject(source, fn) {
  return source.reduce((accumulator, sourceValue) => {
    if (!fn(sourceValue)) accumulator.push(sourceValue);
    return accumulator;
  }, []);
};

/**
 * @desc Will shuffle elements in array.
 * @example
 * shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
 * // [ 1, 5, 3, 4, 2, 6, 10, 7, 8, 9 ]
 *
 * shuffle([
 *   { name: 'name1' },
 *   { name: 'name2' },
 *   { name: 'name3' },
 *   { name: 'name4' },
 *   { name: 'name5' },
 *   { name: 'name6' },
 *   { name: 'name7' },
 *   { name: 'name8' },
 *   { name: 'name9' },
 *   { name: 'name10' }
 * ]);
 * // [
 * //   { name: 'name2' },
 * //   { name: 'name3' },
 * //   { name: 'name4' },
 * //   { name: 'name1' },
 * //   { name: 'name9' },
 * //   { name: 'name6' },
 * //   { name: 'name8' },
 * //   { name: 'name7' },
 * //   { name: 'name10' },
 * //   { name: 'name5' }
 * // ]
 *
 * @param {Array<T>} source Array to shuffle.
 * @returns {Array<T>} Array that is shuffled out.
 */
export function shuffle(source) {
  let arrCopy = source.slice();
  return arrCopy.sort(() => Math.random() - 0.5);
};

/**
 * @desc Will return first n elements.
 * @example
 * let numberArray = [1, 2, 3]
 *   , objectArray = [{ name: 'John' }, { name: 'Liza' }];
 *
 * take(numberArray); // [1]
 * take(objectArray); // [{ name: 'John' }]
 *
 * take(numberArray, 2); // [1, 2]
 * take(objectArray, 2); // [{ name: 'John' }, { name: 'Liza' }]
 *
 * @param {Array<T>} source Array to slice.
 * @param {number} [sourceLength=1] Number of first n elements
 * that should be returned back.
 * @return {Array<T>} First n elements from Array.
 */
export function take(source, sourceLength = 1) {
  return source.slice(0, sourceLength);
};

/**
 * @desc Will return last n elements from an array.
 * @param {Array<T>} source Array to slice.
 * @param {number} [numberOfLastElements=1] Number of last n elements
 * that should be returned back.
 * @return {Array<T>} Last n elements from Array.
 */
export function takeRight(source, numberOfLastElements = 1) {
  return source.slice(-numberOfLastElements);
};

/**
 * @desc Creates a slice of array with elements taken from
 * the beginning. Elements are taken until predicate returns
 * falsey.
 * @param {Array<T>} [source=[]] The array to query.
 * @param {Function} whileFn The function invoked per iteration.
 * @return {Array<T>} First n elements from Array before match.
 */
export function takeWhile(source = [], whileFn) {
  let indexOfСoincidence = source.findIndex(whileFn)
    , indexOfCutting = indexOfСoincidence > -1
        ? indexOfСoincidence : source.length;
  return source.slice(0, indexOfCutting);
};

/**
 * @desc Creates a slice of array with elements taken from
 * the end. Elements are taken until predicate returns
 * falsey.
 * @param {Array<T>} [source=[]] The array to query.
 * @param {Function} rightWhileFn The function invoked
 * per iteration.
 * @return {Array<T>} Last n elements from Array before match.
 */
export function takeRightWhile(source = [], rightWhileFn) {
  let indexOfСoincidence = source.findIndex(rightWhileFn)
    , indexOfCutting = indexOfСoincidence > -1
        ? indexOfСoincidence  + 1 : 0;
  return source.slice(indexOfCutting, source.length);
};

/**
 * @desc Will return array of selected properties.
 * @param {Array<Object>} [source=[]] Array for propjection.
 * @param {string} propName Name of the property from
 * that should be included in Array.
 * @return {Array<T>} Packed array of selected properties.
 */
export function pluck(source = [], propName) {
  return source.map(item => item[propName]);
};

/**
 * @desc Will fill array by given value.
 * @param {T} source Fill value.
 * @param {number} number Number of filled elements in Array.
 * @return {Array<T>} Array with n elements filled by T.
 */
export function fill(source, number) {
  return Array.from({ length: number }, i => source);
}

/**
 * @desc Will fill array in the end for n elements and add
 * given array from begining.
 * @param {T} value Fill Value.
 * @param {number} number Number of elements that should be filled
 * in the end of returned an array.
 * @param {Array<T|D>} [source=[]] Fill Value.
 * @return {Array<T|D>} Returns combination from given
 * and filled array.
 */
export function fillRight(value, number, source = []) {
  return [...source, ...fill(value, number)];
}

/**
 * @desc Will fill array in the begining for n elements and add
 * given array in the end.
 * @param {T} value Fill Value.
 * @param {number} number Number of elements that should be filled
 * in the begining of returned an array.
 * @param {Array<T|D>} [source=[]] Fill Value.
 * @return {Array<T|D>} Returns combination from given
 * and filled array.
 */
export function fillLeft(value, number, source = []) {
  return [...fill(value, number), ...source];
}

/**
 * @desc Will return random element from array.
 * @param {Array<T>} source Array from where should be
 * choosen random element.
 * @return {T} Random element.
 */
export function sample(source) {
  var randomIndex = Math.floor(Math.random() * (source.length));
  return source[randomIndex];
};

/**
 * @desc Invokes the iteratee n times, returning an array of the results
 * of each invocation.
 * @param {number} iterationNumber Number of iterations.
 * @param {Function} fn Function that should be invoked
 * with each iteration.
 * @return {Array<T>} Result array.
 */
export function times(iterationNumber, fn) {
  return Array.apply(null, Array(iterationNumber)).map((elem, index) => fn(index));
};

/**
 * @desc Checks if predicate returns truthy for all elements of collection.
 * Iteration is stopped once predicate returns falsey.
 * @param {Array<T>} [source=[]] Array to check.
 * @param {Function} fn Predicate function.
 * @return {boolean} true if all items will be returned by
 * predicate function.
 */
export function every(source = [], fn) {
  return source.filter(fn).length === source.length;
};

/**
 * @desc Iterates over elements of collection, returning the first
 * element predicate returns truthy for.
 * @param {Array<T>} [source=[]] Array where check.
 * @param {Function} fn Predicate function.
 * @return {T} Item if it was found by function predicate.
 */
export function find(source = [], fn) {
  return source.find(fn);
};

/**
 * @desc Flattens array.
 * @param {Array<T>} source Array that should be flatten.
 * @return Returns the new flattened array.
 */
export function flatten(source) {
  let result = []
    , splitArray = (arr, result) => {
      return arr.reduce((accumulator, item) => {
        (item instanceof Array) ? splitArray(item, accumulator) : accumulator.push(item);
        return accumulator;
      }, result);
    };

  return splitArray(source, result)
};

/**
 * @desc Will zip multiple Arrays using projection function.
 * Takes arguments ArrayLike object that should include n number of arrays with
 * same length and in the end should be projection function.
 * @return {Array<D>} Projected Array.
 */
export function zipWithProjection() {
  let argumentsArray = Array.from(arguments)
    , projectionFn = argumentsArray.pop()
    , sizeArray = argumentsArray.map(arrayItem => arrayItem.length)
    , minArrayLength = Math.min(...sizeArray);

  return times(minArrayLength, index =>
    projectionFn(...argumentsArray.map(arrayItem => arrayItem[index])));
};

/**
 * @desc Will project array object.
 * @param {Array<T>} [source] Array that should use projection function.
 * @param {Function} fn Projection function.
 * @return {Array<D>} Projection Array.
 */
export function map(source, fn) {
  return source.map(fn);
};

/**
 * @desc Will filter an array.
 * @param {Array<T>} [source=[]] Array that should use filtered function.
 * @param {Function} fn Predicate function.
 * @return {Array<T>} Filtered Array.
 */
export function filter(source = [], fn) {
  return source.filter(fn);
};

/**
 * @desc Creates an array of grouped elements, the first of which
 * contains the first elements of the given arrays, the second of
 * which contains the second elements of the given arrays, and so on.
 * @param {...Array<T>} source Array to zip.
 * @return {Array<D>} Zipped Array.
 */
export function zip(...source) {
  let sizeArray = source.map(arrayItem => arrayItem.length)
    , minArrayLength = Math.min(...sizeArray);

  return times(minArrayLength, index =>
    source.map(arrayItem => arrayItem[index]));
};

/**
 * @desc Checks if predicate returns truthy for any element of collection.
 * Iteration is stopped once predicate returns truthy. Is analog of any(*) function.
 * @param {Array<T>} [source=[]] The collection to iterate over.
 * @param {Function} fn The collection to iterate over.
 * @return {boolean} Returns true if any element passes the predicate check, else false.
 */
export function some(source = [], fn) {
  return !!source.filter(fn).length;
};

/**
 * @desc Checks if predicate returns truthy for any element of collection.
 * Iteration is stopped once predicate returns truthy. Is analog some(*) function.
 * @param {Array<T>} [source=[]] The collection to iterate over.
 * @param {Function} fn The collection to iterate over.
 * @return {boolean} Returns true if any element passes the predicate check, else false.
 */
export function any(source = [], fn) {
  return some(source, fn);
};

/**
 * @desc Will return last element from array. Is analog of tail(*) function.
 * @param {Array<T>} [source=[]] Array where to check for last element.
 * @return {T} Returns last element from Array.
 */
export function last(source = []) {
  return source[source.length-1];
};

/**
 * @desc Will return last element from array. Is analog of last(*) function.
 * @param {Array<T>} [source=[]] Array where to check for last element.
 * @return {T} Returns last element from Array.
 */
export function tail(source) {
  return last(source);
}

/**
 * @desc Will return first element from array. Is analog of first(*) function.
 * @param {Array<T>} [source=[]] Array where to check for first element.
 * @return {T} Returns first element from Array.
 */
export function head(source = []) {
  return source[0];
};

/**
 * @desc Will return first element from array. Is analog of head(*) function.
 * @param {Array<T>} [source=[]] Array where to check for first element.
 * @return {T} Returns first element from Array.
 */
export function first(source = []) {
  return head(source);
};

/**
 * @desc Will return element from array by given index.
 * @example
 * nth([51,35,23], 1) // 35
 *
 * @param {Array<T>} source Source where should be taken element by given index.
 * @param {number} index Index of element which should be returned.
 * @return {T} Returns nth element from Array.
 */
export function nth(source, index) {
  return source[index];
};

/**
 * @desc Casts values as an array if it's not one.
 * @param {...T} valueToCast All values will be included in array that
 * will be returned back.
 * @return {Array<T>} Return array that will include all arguments.
 */
export function castArray(...valueToCast) {
  return valueToCast;
};

/**
 * @desc Returns array with changed order.
 * @param {Array<T>} source Array that should change the order.
 * @param {Array<number>} order Order Array.
 * @return {Array<T>} Array with changed order.
 */
export function changeOrder(source, order) {
  return order.reduce((accumulator, value) =>
    [...accumulator, source[value]], []);
};

/**
 * @desc number or string comparator. Can be used in sort function.
 * @example
 * let given = [
 *   { 'name': 'fred',   'age': 48 },
 *   { 'name': 'barney', 'age': 36 }
 * ];
 *
 * numAndStrComparator(given[0], given[1], 'name'); // 1
 * numAndStrComparator(given[1], given[0],'name'); // -1
 * numAndStrComparator(given[0], given[1],'age'); // 1
 * numAndStrComparator(given[1], given[0],'age'); // -1
 *
 * @param {string|number} first First argumnet for comparation.
 * @param {string|number} second Second argumnet for comparation.
 * @param {string} prop Compare property.
 * @returns {number} Comparation result.
 */
export function numAndStrComparator(first, second, prop) {
  let valueArr = [first[prop], second[prop]];
  if(valueArr.every(isString) || valueArr.every(isNumber)) {
    if(first[prop] === second[prop]) return 0;
    return (first[prop] < second[prop]) ? -1 : 1;
  }
};

/**
 * @desc returns new array only with uniq elements
 * @example
 * uniq(
 *   [
 *     { id: 1, firstName: 'Jon', lastName: 'Snow', location: 'Winterfell' },
 *     { id: 2, firstName: 'Eddard', lastName: 'Stark', location: 'Winterfell' },
 *     { id: 3, firstName: 'Catelyn', lastName: 'Stark', location: 'Winterfell' },
 *     { id: 4, firstName: 'Roose', lastName: 'Bolton', location: 'Dreadfort' },
 *     { id: 4, firstName: 'Roose', lastName: 'Bolton', location: 'Dreadfort' },
 *     { id: 5, firstName: 'Ramsay', lastName: 'Snow', location: 'Dreadfort' }
 *   ]);
 * // [
 * //   { id: 1, firstName: 'Jon', lastName: 'Snow', location: 'Winterfell' },
 * //   { id: 2, firstName: 'Eddard', lastName: 'Stark', location: 'Winterfell' },
 * //   { id: 3, firstName: 'Catelyn', lastName: 'Stark', location: 'Winterfell' },
 * //   { id: 4, firstName: 'Roose', lastName: 'Bolton', location: 'Dreadfort' },
 * //   { id: 5, firstName: 'Ramsay', lastName: 'Snow', location: 'Dreadfort' }
 * // ]
 *
 * @param {Array<any>} source Source for uniqueness.
 * @returns {Array<any>} New array only with unique elements.
 */
export function uniq(source) {
  return source.reduce((acc, val) => {
    return acc.find(item => deepEquals(item, val))
      ? acc : [...acc, val];
  }, []);
}
