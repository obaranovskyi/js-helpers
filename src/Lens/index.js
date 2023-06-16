import { deepClone, safeGet } from '../Object';
import { isObject, isArray, isString, isNumber } from '../Type';
import { not } from '../Predicate-Combinator';
import { throwIncorrectArgsTypeErrorIfSomeOf } from '../Error';

/**
 * @desc Returns value taken by property from source.
 * @example
 * let user = { name: { first: 'Oleh' } };
 * eq({ first: 'Oleh' }, prop('name', user)); // false
 * eq(prop('name', user).first, 'Oleh'); // true
 *
 * @param {string} propName Property name
 * which should be taken within source.
 * @param {object} source Object is source from where should
 * be taken value by property name.
 * @return {T} property value.
 */
export function prop(propName, source) {
  throwIncorrectArgsTypeErrorIfSomeOf(
      not(isString)(propName),
      not(isObject)(source));

  return deepClone(source)[propName];
};

/**
 * @desc Returns value taken by index from source.
 * @param {number} index Index
 * which should be taken within source.
 * @param {Array<T>} source Array is source from where should
 * be taken value by index.
 * @return {T} value by index.
 */
export function lensIndex(index, source) {
  throwIncorrectArgsTypeErrorIfSomeOf(
      not(isNumber)(index),
      not(isArray)(source));

  return deepClone(source)[index];
};

/**
 * @desc Returns a lens whose focus is the specified property.
 * @param {string} propName Property name
 * which should be taken within source.
 * @return {Function} function which expects object to be source.
 */
export function lensProp(propName) {
  throwIncorrectArgsTypeErrorIfSomeOf(
    not(isString)(propName));
  return source => {
    throwIncorrectArgsTypeErrorIfSomeOf(
      not(isObject)(source));

    return deepClone(source)[propName];
  }
};

/**
 * @desc Makes a deep clone of an object, setting or overriding
 * the specified property with the given value.
 * @param {string} propName Property name
 * @param {T} valueToBeSet New value for property
 * @param {object} source Object where should be changed
 * property value.
 * @return {object} Clone of source with changed value.
 */
export function assoc(propName, valueToBeSet, source) {
  throwIncorrectArgsTypeErrorIfSomeOf(
    not(isString)(propName),
    not(isObject)(source));

  return Object.assign(deepClone(source), {[propName]: valueToBeSet});
}

/**
 * @desc Updates Array or Object by given path with given value.
 * @param {Array<String|Number>} path Path to property which should be changed.
 * @param {any} valueToBeSet Value which should be set by path.
 * @param {Object|Array} source Source where should be changed property.
 * @return {Object|Array} Resurns clone of object or array with applied changes.
 */
export function assocPath(path, valueToBeSet, source) {
  let sourceClone = deepClone(source);
  path.forEach((propName, index) => {
    let nextIndex = index + 1
      , chunkToCurrentProp = path.slice(0, nextIndex)
      , chunkToPreviousProp = path.slice(0, index);

    if(chunkToCurrentProp.length === path.length) {
        let currentProp = safeGet(sourceClone, ...chunkToPreviousProp);
        currentProp[path[index]] = valueToBeSet;
    } else {
      let ctx = Boolean(chunkToPreviousProp.length)
        ? safeGet(sourceClone, ...chunkToPreviousProp)
        : sourceClone;

      if(isNumber(path[nextIndex]) && !isArray(ctx[propName])) ctx[propName] = [];

      if(isString(path[nextIndex]) && !isObject(ctx[propName])) ctx[propName] = {};
    }
  });

  return sourceClone;
}

/**
 * @desc Retrieve the value at a given path.
 * @param {Array<string>} p Path to value.
 * @param {object} source Source to use.
 * @return {any} Value by path.
 */
export function path(p, source) {
  return safeGet(deepClone(source), ...p);
}

/**
 * @desc Retrieve the value at a given path and compares it with
 * given value.
 * @param {Array<string>} path Path to value.
 * @param {object} source Source to use.
 * @param {any} value Value for comparing.
 * @return {any} Comparation result.
 */
export function pathEq(path, source, value) {
  return safeGet(deepClone(source), ...path) === value;
}

/**
 * @desc Retrieve the value at a given path and if value is undefined
 * returns orValue.
 * @param {Array<string>} path Path to value.
 * @param {object} source Source to use.
 * @param {any} orValue Value which should be returned in
 * case if path doesn't exist.
 * @return {any} Value by path or orValue.
 */
export function pathOr(path, source, orValue) {
  return safeGet(deepClone(source), ...path) || orValue;
}

/**
 * @desc Retrieve the value at a given path and returns result
 * of invocation satisfy function with value by path.
 * @param {Array<string>} path Path to value.
 * @param {object} source Source to use.
 * @param {Function} satisfyFn Function which will be invoked with path value.
 * @return {any} Result of invocation satisfy function with value by path.
 */
export function pathSatisfies(path, source, satisfyFn) {
  return satisfyFn(safeGet(deepClone(source), ...path));
}





