import * as PcLib from '../Predicate-Combinator';

/**
 * @desc Saves number1 and returns predicate function that will be checking
 * if number2 is less then number1.
 * @param {number} number1 First number.
 * @return {Function} Predicate Function.
 */
export function lt(number1) {
  return number2 => number2 < number1;
};

/**
 * @desc Saves number1 and returns predicate function that will be checking
 * if number2 is greater then number1.
 * @param {number} number1 First number.
 * @return {Function} Predicate Function.
 */
export function gt(number1) {
  return number2 => number2 > number1;
};

/**
 * @desc Saves number1, number2 and returns predicate function that will be checking
 * if future passed number is in range of number1 and number2.
 * @param {number} number1 Min range number.
 * @param {number} number2 Max range number.
 * @return {Function} Predicate Function.
 */
export function range(number1, number2) {
  return number => PcLib.and(
    gt(number1), lt(number2))(number);
};

/**
 * @desc Saves number1 and returns predicate function that will be checking
 * if number2 is less then or equal to number1.
 * @param {number} number1 First number.
 * @return {Function} Predicate Function.
 */
export function lte(number1) {
  return number2 => number2 <= number1;
};

/**
 * @desc Saves number1 and returns predicate function that will be checking
 * if number2 is greater then or equal to number1.
 * @param {number} number1 First number.
 * @return {Function} Predicate Function.
 */
export function gte(number1) {
  return number2 => number2 >= number1;
};

/**
 * @desc Saves number1, number2 and returns predicate function that will be checking
 * if future passed number is in range of number1 and number2 or equal to number1/number2.
 * @param {number} number1 Min range number.
 * @param {number} number2 Max range number.
 * @return {Function} Predicate Function.
 */
export function rangeEqual(number1, number2) {
  return number => PcLib.and(
    gte(number1), lte(number2))(number);
};

/**
 * @desc Checks if two elements are the same
 * @example
 * eq(1)(1) // true
 * eq(1)(2) // false
 *
 * eq('hello')('hello') // true
 * eq('hello')('hello2') // false
 *
 * eq({ greeting: 'hello' })({ greeting: 'hello' }) // false
 *
 * @param {T} elem1 Element which will be compared with other.
 * @returns {Function} Function which take second element for comparation.
 */
export function eq(elem1) {
  return elem2 => elem1 === elem2;
}

/**
 * @desc Checks if two elements are not the same.
 * @example
 * eq(1)(1) // false
 * eq(1)(2) // true
 *
 * eq('hello')('hello') // false
 * eq('hello')('hello2') // true
 *
 * eq({ greeting: 'hello' })({ greeting: 'hello' }) // true
 *
 * @param {T} elem1 Element which will be compared with other.
 * @returns {Function} Function which take second element for comparation.
 */
export function notEq(elem1) {
  return elem2 => elem1 !== elem2;
}
