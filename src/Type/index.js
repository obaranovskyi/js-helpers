import * as TypeConstants from '../Constants/types';


/**
 * @desc Checks if passed value is null.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is null.
 */
export function isNull(valToCheck) {
  return (!valToCheck && typeof valToCheck === TypeConstants.OBJECT);
};

/**
 * @desc Checks if passed value is not null.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not null.
 */
export function isNotNull(valToCheck) {
  return !isNull(valToCheck);
};

/**
 * @desc Checks if passed value is NaN.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is NaN.
 */
export function isNaN(valToCheck) {
  return valToCheck !== valToCheck;
};

/**
 * @desc Checks if passed value is not NaN.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not NaN.
 */
export function isNotNaN(valToCheck) {
  return !isNaN(valToCheck);
};

/**
 * @desc Checks if passed value is negative zero.
 * @param {number} numberToCheck Value to Check.
 * @return {boolean} Returns true is passed value is negative zero.
 */
export function isNegativeZero(numberToCheck) {
  let number = Number(numberToCheck);
  return (number === 0) && (1 / number === -Infinity);
};

/**
 * @desc Checks if passed value is not negative zero.
 * @param {number} numberToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not negative zero.
 */
export function isNotNegativeZero(numberToCheck) {
  return !isNegativeZero(numberToCheck);
};

/**
 * @desc Checks if passed value is undefined.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is undefined.
 */
export function isUndefined(valToCheck) {
  return getType(valToCheck) === TypeConstants.UNDEFINED;
};

/**
 * @desc Checks if passed value is not undefined.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not undefined.
 */
export function isNotUndefined(valToCheck) {
  return !isUndefined(valToCheck);
};

/**
 * @desc Checks if passed value is number.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is number.
 */
export function isNumber(valToCheck) {
  return getType(valToCheck) === TypeConstants.NUMBER;
};

/**
 * @desc Checks if passed value is not number.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not number.
 */
export function isNotNumber(valToCheck) {
  return !isNumber(valToCheck);
};

/**
 * @desc Checks if passed value is boolean.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is boolean.
 */
export function isBoolean(valToCheck) {
  return getType(valToCheck) === TypeConstants.BOOLEAN;
};

/**
 * @desc Checks if passed value is not boolean.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not boolean.
 */
export function isNotBoolean(valToCheck) {
  return !isBoolean(valToCheck);
};

/**
 * @desc Checks if passed value is string.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is string.
 */
export function isString(valToCheck) {
  return getType(valToCheck) === TypeConstants.STRING;
};

/**
 * @desc Checks if passed value is not string.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not string.
 */
export function isNotString(valToCheck) {
  return !isString(valToCheck);
};

/**
 * @desc Checks if passed value is Symbol.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is Symbol.
 */
export function isSymbol(valToCheck) {
  return getType(valToCheck) === TypeConstants.SYMBOL;
};

/**
 * @desc Checks if passed value is not Symbol.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not Symbol.
 */
export function isNotSymbol(valToCheck) {
  return !isSymbol(valToCheck);
};

/**
 * @desc Checks if passed value is Object.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is Object.
 */
export function isObject(valToCheck) {
  return getType(valToCheck) === TypeConstants.OBJECT;
};

/**
 * @desc Checks if passed value is not Object.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not Object.
 */
export function isNotObject(valToCheck) {
  return !isObject(valToCheck);
};

/**
 * @desc Checks if passed value is Date.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is Date.
 */
export function isDate(valToCheck) {
  return getType(valToCheck) === TypeConstants.DATE;
};

/**
 * @desc Checks if passed value is not Date.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not Date.
 */
export function isNotDate(valToCheck) {
  return !isDate(valToCheck);
};

/**
 * @desc Checks if passed value is RegExp.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is RegExp.
 */
export function isRegExp(valToCheck) {
  return getType(valToCheck) === TypeConstants.REG_EXP;
};

/**
 * @desc Checks if passed value is not RegExp.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not RegExp.
 */
export function isNotRegExp(valToCheck) {
  return !isRegExp(valToCheck);
};

/**
 * @desc Checks if passed value is Array.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is Array.
 */
export function isArray(valToCheck) {
  return getType(valToCheck) === TypeConstants.ARRAY;
};

/**
 * @desc Checks if passed value is not Array.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not Array.
 */
export function isNotArray(valToCheck) {
  return !isArray(valToCheck);
};

/**
 * @desc Checks if passed value is Function.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is Function.
 */
export function isFunction(valToCheck) {
  return getType(valToCheck) === TypeConstants.FUNCTION;
};

/**
 * @desc Checks if passed value is not Function.
 * @param {T} valToCheck Value to Check.
 * @return {boolean} Returns true is passed value is not Function.
 */
export function isNotFunction(valToCheck) {
  return !isFunction(valToCheck);
};

/**
 * @desc Determine whether a value is a primitive type.
 * @param {T} value Value to Check.
 * @return {boolean} Returns true is passed value is primitive type.
 */
export function isPrimitive(value) {
  return [isNull, isNumber, isBoolean, isString,
    value => value === void 0].some(fn => fn(value));
}

/**
 * @desc Determine whether a value is not a primitive type.
 * @param {T} value Value to Check.
 * @return {boolean} Returns true is passed value is not primitive type.
 */
export function isNotPrimitive(value) {
  return !isPrimitive(value);
}

/**
 * @desc Checks type of passed value.
 * @param {T} valToCheck Value to Check.
 * @return {string} Returns object type.
 */
export function getType(valToCheck) {
  let toString = Object.prototype.toString
    , valType = toString.call(valToCheck);
  return valType.replace(/[\[\]']+/g,'').split(' ')[1].toLowerCase();
};

/**
 * @desc Takes expectation and returns predicate function which
 * will be checking if new passed variable equal to expectation.
 * @param {T} expectation Expected value.
 * @return {Function} Returns predicate function.
 */
export function toBe(expectation) {
  return value => Object.is(expectation, value);
};

/**
 * @desc Takes expectation and returns predicate function which
 * will be checking if new passed variable not equal to expectation.
 * @param {T} expectation Not expected value.
 * @return {Function} Returns predicate function.
 */
export function notToBe(expectation) {
  return value => !Object.is(expectation, value);
};

/**
 * @desc Returns class name.
 * @example
 * getTypeByClass(String); // string
 * getTypeByClass(RegExp); // regexp
 * getTypeByClass(Object); // object
 * getTypeByClass(Function); // function
 * getTypeByClass(Date); // date
 * getTypeByClass(Boolean); // boolean
 * getTypeByClass(Number); // number
 * getTypeByClass(Array); // array
 * getTypeByClass(Symbol); // symbol
 *
 * class Person {}
 * getTypeByClass(Person); // person
 *
 * @param {T} clazz Source which should be a class.
 * @returns {string} Name of class.
 */
export function getTypeByClass(clazz) {
  return clazz.name.toLowerCase();
}

/**
 * @desc Checks if type is correct and throws error in negative case.
 * @throws {TypeError} If passed actualType has incorrect type.
 * @example
 * typeCheck(String, ''); // ''
 * typeCheck(RegExp, /ab+c/); // /ab+c/
 * typeCheck(Object, {}); // {}
 * typeCheck(Function, () => {}); // () => {}
 * typeCheck(Date, new Date()); // Sun Nov 04 2018 01:25:43 GMT+0200 (Eastern European Standard Time)
 * typeCheck(Boolean, true); // true
 * typeCheck(Number, 333); // 333
 * typeCheck(Array, []); // []
 * typeCheck(Symbol, Symbol('desc')); // Symbol('desc')
 *
 * typeCheck(String, 777); // TypeError
 * typeCheck(Number, 'hello'); // TypeError
 * typeCheck(Boolean, {}); // TypeError
 * ...
 *
 * @param {T} clazz Expected source which should be a class.
 * @param {any} actualType Value which should be checked.
 * @returns {any} actualType if type is correct else throws error.
 */
export function typeCheck(clazz, actualType) {
  let constrType = getTypeByClass(clazz)
    , valueType = getType(actualType);

  if (constrType !== valueType)
      throw new TypeError(`Type mismatch. Expected [${constrType}] but found [${valueType}]`);

  return actualType;
};
