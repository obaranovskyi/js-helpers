import { isNull, isUndefined, typeCheck } from '../Type';

/**
 * @desc Creates safe type tuple.
 * @example
 * const expected = ['Barkley', 'Rosser']
 *     , StringPair = SafeTupleBuilder.of(String, String)
 *     , name = new StringPair(...expected)
 *     , [first, last] = name.getAll();
 *
 *    first // Barkley
 *    last // Rosser
 *
 *    name.unpack((first, last) => {
 *      first // Barkley
 *      last // Rosser
 *    });
 *
 *    name.get(0); // Barkley
 *    name.get(1) // Rosser
 *
 */
export class SafeTupleBuilder {
  /**
   * @desc Creates Safe Type Tuple.
   * @example
   * const StringPair = SafeTupleBuilder.of(String, String);
   *
   * @param  {...any} types Types which will be checked in newly created tuples.
   * @returns {Tuple} Returns Safe Tuple.
   */
  static of(...types) {
    return class {
      constructor(...values) {
        if (values.some(v => [isNull, isUndefined].some(f => f(v))))
          throw new ReferenceError('Tuples may not have any null values');

        if (values.length !== types.length)
          throw new TypeError('Tuple arity does not match its prototype');

        values.forEach((val, index) => {
          this[`_${index + 1}`] = typeCheck(types[index], val);
        });
      }
      getAll() {
        return Object.keys(this).map(k => this[k], this);
      };

      unpack(cb) {
        cb(...this.getAll());
      };

      get(index) {
        return this.getAll()[index];
      };

      toString() {
        return `(${this.getAll().join(', ')})`
      };

      inspect() {
        return this.toString();
      };
    }
  }
};
