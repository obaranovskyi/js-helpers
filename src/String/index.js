import * as FnLib from '../Function';
import * as ArrLib from '../Array';

/**
 * @desc Works similarly to templates. Sequentially replaces all
 * placeholders ({0}, {1}, {2}...).
 * @param {String} [src='']  Source for replacements.
 * @param {Array<T>} args Values for replacements.
 * @return {String} New String with all replacements.
 */
export function buildResource(src = '', ...args) {
  if (!src || !args.length) return src;
  return buildResource(src.replace(`{${args.length - 1}}`,
    args.pop()), ...args);
};

/**
 * @desc Will replace all occurrences.
 * @param {String} replaceable Source for replacements.
 * @param {String} from Property that should be replaced.
 * @param {T} to Proprty that should be included instead of `from` propperty.
 * @return {String} New String with all replacements.
 */
export function replaceAll(replaceable, from, to) {
  return (includes(replaceable, from))
    ? replaceAll(replaceable.replace(from, to), from, to)
    : replaceable;
};

/**
 * @desc Will replace all different occurrences.
 * @param {String} replaceable Source for replacements.
 * @param {Array<T>} fromList Array of properties that should be replaced.
 * @param {Array<T>} to Array of properties that should be injected to source.
 * @return {String} New String with all replacements.
 */
export function replaceAllDifferences(replaceable, fromList, to) {
  return (fromList.length)
    ? replaceAllDifferences(
      replaceAll(replaceable, fromList.pop(), to), fromList, to)
    : replaceable;
};

/**
 * @desc Work similary to indexOf method but returns boolean.
 * @param {String} source String source.
 * @param {String|number} includement Searching value.
 * @returns {boolean} Result of searching as boolean.
 */
export function includes(source, includement) {
  return !!(~source.indexOf(includement));
};

/**
 * @desc Removes leading and trailing whitespace or
 * specified characters from string.
 * @param {String} stringSource The string to trim.
 * @returns Returns the trimmed string.
 */
export function trim(stringSource) {
  return stringSource.replace(/^\s+|\s+$/g, '');
};

/**
 * @desc Will compare two strings with ignore case.
 * @param {String} str1 First string to compare.
 * @param {String} str2 Second string to compare.
 * @returns {boolean} Result of comparison.
 */
export function equalsIgnoreCase(str1, str2) {
  return str1.toLocaleLowerCase() === str2.toLocaleLowerCase();
};

/**
 * @desc Will make a capital first letter.
 * @param {String} str Source string.
 * @returns {String} Source with first capital letter.
 */
export function upperFirst(str = '') {
  let firstChar = str.charAt(0).toUpperCase()
    , restOfString = str.substring(1, str.length);
  return `${firstChar}${str.substring(1, str.length)}`;
};

/**
 * @desc Will return first upper letter from source.
 * @param {String} source Source for searching.
 * @returns {String} First capital letter.
 */
export function getFirstUpperLetter(source) {
  return source.split('').filter(v => /[A-Z]/.test(v))[0];
};

/**
 * @desc Will return last upper letter from source.
 * @param {String} source Source for searching.
 * @returns {String} Last capital letter.
 */
export function getLastUpperLetter(source) {
  let allСoincidences = source.split('').filter(v => /[A-Z]/.test(v))
  return allСoincidences[allСoincidences.length-1];
};

/**
 * @desc Will return first lower letter from source.
 * @param {String} source Source for searching.
 * @returns {String} First lower letter.
 */
export function getFirstLowerLetter(source) {
  return source.split('').filter(v => /[a-z]/.test(v))[0];
};

/**
 * @desc Will return last lower letter from source.
 * @param {String} source Source for searching.
 * @returns {String} Last lower letter.
 */
export function getLastLowerLetter(source) {
  let allСoincidences = source.split('').filter(v => /[a-z]/.test(v))
  return allСoincidences[allСoincidences.length-1];
};

/**
 * @desc Splits string into an array of its words.
 * @param {String} strValue The string to inspect.
 * @returns {Array<String>} Returns the words of string.
 */
export function words(strValue) {
  let r = (str, ...args) => str.replace(...args);
  return FnLib.pipe(
    s => r(s, /[^-a-z-A-Z0-9]+/g, ','),
    s => r(s, /([a-z])([A-Z])/g, '$1 $2'),
    s => r(s, /([A-Z])([a-z])/g, ' $1$2'),
    s => r(s, /\ +/g, ','),
    s => s.split(','),
    ArrLib.compact
  )(strValue);
};

/**
 * @desc Converts string to snake case.
 * @param {String} str The string to convert.
 * @returns {String} Returns the snake cased string.
 */
export function snakeCase(str) {
  return words(str).join('_').toLowerCase();
};

/**
 * @desc Converts string to kebab case.
 * @param {String} str The string to convert.
 * @returns {String} Returns the kebab cased string.
 */
export function kebabCase(str) {
  return words(str).join('-').toLowerCase();
};

/**
 * @desc Converts string to camel case.
 * @param {String} str The string to convert.
 * @returns {String} Returns the camel cased string.
 */
export function camelCase(str) {
  return words(str).reduce((accumulator, value) =>
    (accumulator)
        ? `${accumulator}${upperFirst(value.toLowerCase())}`
        : value.toLowerCase(), '');
};

