import { deepClone } from '../Object';
import { isFunction, isBoolean, isObject } from '../Type';

/**
 * @desc Creates Setoid from given function.
 * @example
 * const comparePeopleFn = (p, p2) => p.id === p2.id;
 * const PersonSetoid = toSetoid(comparePeopleFn);
 * const person1 = { id: 1, name: 'Oleh' };
 * const person2 = { id: 1, name: 'Oleh' };
 * const person3 = { id: 7, name: 'Oleh' };
 *
 * PersonSetoid(person1).equals(PersonSetoid(person2))); // true
 * PersonSetoid(person2).equals(PersonSetoid(person1))); // true
 *
 * PersonSetoid(person1).equals(PersonSetoid(person3))); // false
 * PersonSetoid(person2).equals(PersonSetoid(person3))); // false
 *
 * Object.keys(PersonSetoid(person1)); // ['id', 'name'];
 *
 * @param {Function} eqFn Setoid implementation function.
 * @returns {Setoid} New concrete Setoid implementation.
 */
export function toSetoid(eqFn) {
  return x =>
    Object.defineProperty(deepClone(x), 'equals', {
      value: x2 => eqFn(x, x2),
      enumerable: false,
      writable: false,
      configurable: false
    });
}

/**
 * @desc Checks if passed object implements setoid.
 * @example
 * const comparePeopleFn = (p, p2) => p.id === p2.id;
 * const PersonSetoid = toSetoid(comparePeopleFn);
 * const person1 = { id: 1, name: 'Oleh' }
 * const person2 = {
 *    id: 2,
 *    name: 'Oleh',
 *    equals: p => true
 * };
 *
 * isSetoid(PersonSetoid(person1)); // true
 * isSetoid(person1); // false
 * isSetoid(person2); // false
 *
 * @param {object} obj Object to check.
 * @returns {boolean} true in case is passed object implements Setoid.
 */
export function isSetoid(obj) {
  return isObject(obj) && isFunction(obj.equals) &&
    obj.equals.length === 1 && isBoolean(obj.equals(obj)) &&
      obj.equals(obj) && !obj.equals({});
}
