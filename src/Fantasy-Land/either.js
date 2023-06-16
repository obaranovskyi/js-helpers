/**
 * @desc Either implementation.
 * @example
 * Either.right(3); // Either.Right(3)
 * Either.left(3);  // Either.Left(3)
 * Either.of(3); // Either.Right(3)
 * Either.fromNullable(null); // Either.Left(null)
 * Either.fromNullable(3); // Either.Right(3)
 */
export function Either() {};

/**
 * @desc Creates new Left with given value.
 * @example
 * Either.left(3); // Either.Left(3)
 *
 * @returns {Left} Newly created Left with given value.
 */
Either.left = value => Left(value);

/**
 * @desc Creates new Right with given value.
 * @example
 * Either.right(3); // Either.Right(3)
 *
 * @returns {Right} Newly created Right with given value.
 */
Either.right = value => Right(value);

/**
 * @desc Checks value and returns Right or Left.
 * @example
 * Either.fromNullable(null); // Either.Left(null)
 * Either.fromNullable(3); // Either.Right(3)
 *
 * @returns {Right|Left} Newly created Right or Left.
 */
Either.fromNullable = value => value != null ? Either.right(value) : Either.left(value);

/**
 * @desc Creates new Right with given value.
 * @example
 * Either.of(3); // Either.Right(3)
 *
 * @returns {Right} Newly created Right with given value.
 */
Either.of = value => Either.right(value);

/**
 * @desc Checks is given function throws error and
 * returns Right or Left.
 * @example
 * Either.tryCatch(() => JSON.parse('{"port": 8888}'))
 *    .map(c => c.port)
 *    .getOrElse(3000); // 8888
 *
 * Either.tryCatch(() => JSON.parse('incorrect json'))
 *    .map(c => Either.tryCatch(JSON.parse('another incorrect json')))
 *    .getOrElse(3000); // 3000
 *
 * @returns {Right|Left} Result of function with correct container.
 */
Either.tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  };
}

/**
 * @desc Right Implementation.
 * @example
 * Either.right(3); // Either.Right(3)
 *
 * @param {any} value Right with given value.
 * @returns {Right} Newly created Right with given value.
 */
export function Right(value) {
  return {
    getValue: () => value,
    map: f => Either.of(f(value)),
    get: () => value,
    getOrElse: elseValue => value,
    getOrElseThrow: err => value,
    orElse: f => Either.of(value),
    filter: f => Either.fromNullable(f(value) ? value : null),
    chain: f => f(value),
    toString: () => `Either.Right(${value})`,
    inspect: () => `Either.Right(${value})`,
    isLeft: false,
    isRight: true
  }
}

/**
 * @desc Left Implementation.
 * @example
 * Either.left(3); // Either.Left(3)
 *
 * @param {any} value Left with given value.
 * @returns {Left} Newly created Left with given value.
 */
export function Left(value) {
  return {
    getValue: () => value,
    map: f => Left(value),
    get: () => { throw new TypeError("Can't extract the value of a Left.") },
    getOrElse: elseValue => elseValue,
    getOrElseThrow: err => { throw new Error(err) },
    orElse: f => f(value),
    filter: f => Left(value),
    chain: f => Left(value),
    toString: () => `Either.Left(${value})`,
    inspect: () => `Either.Left(${value})`,
    isLeft: true,
    isRight: false
  }
}
