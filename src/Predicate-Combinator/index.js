/**
 * @desc Takes list of predicates and returns a one predicate, current
 * predicate will return true if at least one of passed predicates
 * returns true.
 * @param {...Function} predicates List of predicates.
 * @return {Function} Predicate function.
 */
export function or(...predicates) {
  return value => predicates.some(predicate => predicate(value));
};

/**
 * @desc Takes list of predicates and returns a one predicate, current
 * predicate will return true only in case if all passed predicates
 * return true.
 * @param {...Function} predicates List of predicates.
 * @return {Function} Predicate function.
 */
export function and(...predicates) {
  return value => predicates.every(predicate => predicate(value))
};

/**
 * @desc Takes list of predicates and returns a one predicate, current
 * predicate will return true only in case if all passed predicates
 * return false.
 * @param {...Function} predicates List of predicates.
 * @return {Function} Predicate function.
 */
export function not(...predicates) {
  return value => predicates.every(predicate => !predicate(value))
}

/**
 * @desc Takes list of predicates and returns a one predicate, current
 * predicate will return true only in the case if none of passed prdicates
 * returns true.
 * @param {...Function} predicates List of predicates.
 * @return {Function} Predicate function.
 */
export function notOr(...predicates) {
  return value => not(or(...predicates))(value);
}
