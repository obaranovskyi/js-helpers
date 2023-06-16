/**
 * @desc Maybe implementation.
 * @example
 * Maybe.just(3); // Maybe.Just(3)
 * Maybe.nothing(3);  // Maybe.Nothing()
 * Maybe.of(3); // Maybe.Just(3)
 * Maybe.fromNullable(null); // Maybe.Nothing()
 * Maybe.fromNullable(3); // Maybe.Just(3)
 */
export function Maybe() {}

/**
 * @desc Creates new Just with given value.
 * @example
 * Maybe.just(3); // Maybe.Just(3)
 *
 * @returns {Just} Newly created Just with given value.
 */
Maybe.just = v => Just(v);

/**
 * @desc Creates new Nothing.
 * @example
 * Maybe.nothing(); // Maybe.Nothing()
 *
 * @returns {Nothing} Newly created Nothing.
 */
Maybe.nothing = v => Nothing(v);

/**
 * @desc Checks value and returns Just or Nothing.
 * @example
 * Maybe.fromNullable(null); // Maybe.Nothing()
 * Maybe.fromNullable(3); // Maybe.Just(3)
 *
 * @returns {Just|Nothing} Newly created Just or Nothing.
 */
Maybe.fromNullable = v => v != null ? Maybe.just(v) : Maybe.nothing(v);

/**
 * @desc Creates new Just with given value.
 * @example
 * Maybe.of(3); // Maybe.Just(3)
 *
 * @returns {Just} Newly created Just with given value.
 */
Maybe.of = v => Maybe.just(v);

/**
 * @desc Just Implementation.
 * @example
 * Maybe.just(3); // Maybe.Just(3)
 *
 * @param {any} value Just with given value.
 * @returns {Just} Newly created Just with given value.
 */
export function Just(value) {
  return {
    getValue: () => value,
    map: f => Maybe.fromNullable(f(value)),
    get: () => value,
    getOrElse: elseValue => value,
    filter: f => Maybe.fromNullable(f(value) ? value : null),
    chain: f => f(value),
    toString: () => `Maybe.Just(${value})`,
    inspect: () => `Maybe.Just(${value})`,
    isNothing: false,
    isJust: true
  }
}

/**
 * @desc Creates new Nothing.
 * @example
 * Maybe.nothing(); // Maybe.Nothing()
 *
 * @param {any} value Nothing value.
 * @returns {Nothing} Newly created Nothing.
 */
export function Nothing(value) {
  return {
    getValue: () => value,
    map: f => Nothing(value),
    get: () => { throw new TypeError("Can't extract the value of a Nothing.") },
    getOrElse: (elseValue) => elseValue,
    filter: f => Nothing(value),
    chain: f => Nothing(value),
    toString: () => `Maybe.Nothing()`,
    inspect: () => `Maybe.Nothing()`,
    isNothing: true,
    isJust: false
  }
}

