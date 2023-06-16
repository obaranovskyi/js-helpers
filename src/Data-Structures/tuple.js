/**
 * @desc Tuple implementation.
 * @example
 * let tuple = new Tuple(1, 3);
 *
 */
export class Tuple {

  /**
   * @param  {...any} values Tuple values.
   */
  constructor(...values) {
    values.forEach((val, index) => {
      this[`_${index + 1}`] = val;
    });
  }

  /**
   * @desc Returns all values.
   * @example
   * const expected = ['Barkley', 'Rosser']
   *     , name = new Tuple(...expected)
   *     , [first, last] = name.getAll();
   *
   * first // Barkley
   * last // Rosser
   * @returns {Array<any>} All values.
   */
  getAll() {
    return Object.keys(this).map(k => this[k], this);
  };

  /**
   * @desc Invokes callback with all values.
   * @param {Function} cb Callback which accepts all arguments from
   * current tuple.
   * @example
   * const expected = ['Barkley', 'Rosser']
   *     , name = new Tuple(...expected);

   * name.unpack((first, last) => {
   *    first // Barkley
   *    last // Rosser
   * });
   */
  unpack(cb) {
    cb(...this.getAll());
  };

  /**
   * @desc Returns value from tuple by index.
   * @param {number} index Index of tuple argument.
   * @example
   * const expected = ['Barkley', 'Rosser']
   *     , name = new Tuple(...expected);
   *
   * name.get(0); // Barkley
   * name.get(1); // Rosser
   * @returns {any} Value by index from tuple.
   */
  get(index) {
    return this.getAll()[index];
  };

  /**
   * @desc Returns string representation of tuple.
   * @example
   * const expected = ['Barkley', 'Rosser']
   *     , name = new Tuple(...expected);
   *
   * name // (Barkley, Rosser)
   *
   * @returns {string} String representation.
   */
  toString() {
    return `(${this.getAll().join(', ')})`
  };

  /**
   * @desc Returns string representation of tuple.
   * NodeJS analog.
   * @example
   * const expected = ['Barkley', 'Rosser']
   *     , name = new Tuple(...expected);
   *
   * name // (Barkley, Rosser)
   *
   * @returns {string} String representation.
   */
  inspect() {
    return this.toString();
  };
}
