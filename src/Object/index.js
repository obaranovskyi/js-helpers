import { isArray, isNotNull, isPrimitive, isObject } from '../Type';
import { and } from '../Predicate-Combinator';

/**
 * @desc Will deep frezee all properties.
 * @param {object} obj Object that should be fully freezed.
 * @return {object} Freezed object.
 */
export function deepFreeze(obj) {
  let propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(name => {
    let prop = obj[name];

    if (and(isObject, isNotNull)(prop))
      deepFreeze(prop);
  });

  return Object.freeze(obj);
};

/**
 * @desc Will create object clone.
 * @param {object} objectToClone Object that should be cloned.
 * @return {object} Clone of passed object.
 */
export function cloneObject(objectToClone) {
  return Object.assign({}, objectToClone);
};

/**
 * @desc Will create an object deep clone.
 * @param {object} objectToDeepClone Object that should be deep cloned.
 * @return {object} Clone of passed object.
 */
export function deepClone(objectToDeepClone) {
  let newObj = objectToDeepClone;
  if (objectToDeepClone && typeof objectToDeepClone === 'object') {
      newObj = isArray(objectToDeepClone) ? [] : {};
      for (let i in objectToDeepClone) {
          newObj[i] = deepClone(objectToDeepClone[i]);
      }
  }
  return newObj;
};

/**
 * @desc Will create and return a new object with
 * selected properties from pickArray.
 * @param {object} source Object that should have updated structure.
 * @param {...string} pickArray Properties that should be included in
 * result object.
 * @return {object} Object that includes pickArray property list.
 */
export function pick(source, ...pickArray) {
  return pickArray.reduce((accumulator, sourceKey) => {
    accumulator[sourceKey] = source[sourceKey]
    return accumulator;
  }, {});
};

/**
 * @desc Will create and return a new object with omited properties from omitArray.
 * @param {object} source Object that should have updated structure.
 * @param {...string} omitArray Properties that should omited in result object.
 * @return {object} Object with excluded properties from omitArray.
 */
export function omit(source, ...omitArray) {
  return Object.keys(source).reduce((accumulator, sourceKey) => {
    if (!omitArray.includes(sourceKey))
      accumulator[sourceKey] = source[sourceKey]
    return accumulator;
  }, {});
};

/**
 * @desc Implementation of optional chain operator.
 * @param {object} obj Context object.
 * @param {...string} props Property chain.
 * @return Context value by property chain.
 */
export function safeGet(obj, ...props) {
  let val = obj[props.shift()];
  return (props.length && val) ? safeGet(val, ...props) : val;
};

/**
 * @desc Implementation of optional chain operator.
 * @param {object} obj Context object.
 * @param {any} orValue Value which will be returned if obj doesn't
 * contain truthly value.
 * @param {...string} props Property chain.
 * @return {any} Context value by property chain or orValue.
 */
export function safeGetOr(obj, orValue, ...props) {
  return safeGet(obj, ...props) || orValue;
};

/**
 * @desc Curry version of get function that expects in
 * future to get context.
 * @param {...string} props Property chain.
 * @return {Function} Curry functions that expects to get
 * context object.
 */
export function getWithProps(...props) {
  return obj => safeGet(obj, ...props);
};

/**
 * @desc Curry version of get function that expects in
 * future to get property list.
 * @param {object} obj Context object.
 * @return {Function} Curry functions that expects to get
 * property list.
 */
export function getWithCtx(obj) {
  return (...props) => safeGet(obj, ...props);
};

/**
 * @desc Iterates by object properties.
 * @param {object} obj Context object.
 * @param {Function} cb Callback function which will be invoked
 * with key and value argument.
 * @param {Function} skipCb Skip function which allows to skip property
 * by given condition.
 * @return {Array<any>} Returns array projected by Callback function.
 */
export function objectProjection(obj, cb, skipCb = (...args) => args) {
  return Object.entries(obj)
    .filter(([k, v]) => skipCb(k, v))
    .map(([key, value]) =>
      cb(key, value));
}

/**
 * @desc Checks object properties with set of predicates.
 * @example
 * let given = { b: 1, a: 'Hello' };
 *
 * conformsTo(given, { b: n => n === 1, a: n => n === 'Hello' }); // true
 *
 * conformsTo(given, { b: n => n === 1, a: n => n === 'NOT-Hello' }); // false
 *
 * @param {object} object Object which should be chcked.
 * @param {object} predicateSetModel Predicate set model.
 * @returns {boolean} Returns true if all predicates returns true.
 */
export function conformsTo(object, predicateSetModel) {
  return Object.keys(predicateSetModel)
    .every(key => predicateSetModel[key](object[key]))
}

/**
 * @desc Compares two elements.
 * @example
 * deepEquals(
 *   [
 *     { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, location: 'Winterfell' },
 *     { id: 2, firstName: 'Eddard', lastName: 'Stark', age: 35, location: 'Winterfell' },
 *     { id: 3, firstName: 'Catelyn', lastName: 'Stark', age: 33, location: 'Winterfell' },
 *     { id: 4, firstName: 'Roose', lastName: 'Bolton', age: 40, location: 'Dreadfort' },
 *     { id: 5, firstName: 'Ramsay', lastName: 'Snow', age: 15, location: 'Dreadfort' }
 *   ],
 *   [
 *     { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, location: 'Winterfell' },
 *     { id: 2, firstName: 'Eddard', lastName: 'Stark', age: 35, location: 'Winterfell' },
 *     { id: 3, firstName: 'Catelyn', lastName: 'Stark', age: 33, location: 'Winterfell' },
 *     { id: 4, firstName: 'Roose', lastName: 'Bolton', age: 40, location: 'Dreadfort' },
 *     { id: 5, firstName: 'Ramsay', lastName: 'Snow', age: 15, location: 'Dreadfort' }
 *   ]
 * ); // true
 *
 * deepEquals(
 *   [
 *     { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, location: 'Winterfell' },
 *     { id: 2, firstName: 'Eddard', lastName: 'Stark', age: 35, location: 'Winterfell' },
 *     { id: 3, firstName: 'Catelyn', lastName: 'Stark', age: 33, location: 'Winterfell' },
 *     { id: 4, firstName: 'Roose', lastName: 'Bolton', age: 40, location: 'Dreadfort' },
 *     { id: 5, firstName: 'Ramsay', lastName: 'Snow', age: 15, location: 'Dreadfort' }
 *   ],
 *   [
 *     { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, location: 'Winterfell' },
 *     { id: 2, firstName: 'Eddard', lastName: 'Stark', age: 35, location: 'Winterfell' },
 *     { id: 3, firstName: 'Catelyn', lastName: 'Stark', age: 33, location: 'Winterfell' },
 *     { id: 4, firstName: 'Roose', lastName: 'Bolton', age: 40, location: 'Dreadfort' },
 *     { id: 5, firstName: 'Not the same!', lastName: 'Snow', age: 15, location: 'Dreadfort' }
 *   ]
 * ); // false
 * @param {any} first First element for comparation.
 * @param {any} second Second element for comparation.
 * @returns {boolean} Returns true if two elements are the same.
 */
export function deepEquals(first, second) {
  if (isPrimitive(first) && isPrimitive(second)) return first === second;
  if (isPrimitive(first) || isPrimitive(second)) return false;

  let firstKeys = Object.keys(first);

  if(firstKeys.length !== Object.keys(second).length) return false;

  return firstKeys.every(key => deepEquals(first[key], second[key]));
};
