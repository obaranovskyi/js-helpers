/**
 * @desc Compares two small decimal values.
 * @param {number} number1 First number to compare.
 * @param {number} number2 Second number to compare.
 * @return {boolean} true if two number are equal.
 */
export function compareDecimalNumbers(number1, number2) {
  return Math.abs(number1 - number2) < Number.EPSILON;
};

/**
 * @desc Will generate random integer.
 * @param {number} max Max number that can be returned.
 * @return {number} Random integer.
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

/**
 * @desc Will generate random integer in passed range.
 * @param {number} min Min number that can be returned.
 * @param {number} max Max number that can be returned.
 * @return {number} Random integer.
 */
export function getRandomIntFromTo(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Subtract numbers.
 * @param {number} minuend The first number in a subtraction.
 * @param {number} subtrahendList  The subtrahend list.
 * @return {number} Returns the difference.
 */
export function subtract(minuend, ...subtrahendList) {
  return subtrahendList.reduce((accumulator, value) => accumulator - value, minuend) || 0;
};

/**
 * Multiply numbers.
 * @param {number} multiplier The first number in a multiplication.
 * @param {number} multiplicandList The multiplicand list.
 * @return {number} Returns the product.
 */
export function multiply(multiplier, ...multiplicandList) {
  return multiplicandList.reduce((accumulator, value) => accumulator * value, multiplier) || 0;
};

/**
 * Adds numbers.
 * @param {number} augend The first number in an addition.
 * @param {...number} addendList The addend list.
 * @example
 * add(1, 2, 3, 1); // 7
 * add(1, 3); // 4
 * @return {number} Returns the total.
 */
export function add(augend, ...addendList) {
  return addendList.reduce((accumulator, value) => accumulator + value, augend) || 0;
};

/**
 * Divide numbers.
 * @param {number} dividend The first number in a division.
 * @param {number} divisorList The divisor list.
 * @return {number} Returns the quotient.
 */
export function divide(dividend, ...divisorList) {
  return divisorList.reduce((accumulator, value) => accumulator / value, dividend) || 0;
};

