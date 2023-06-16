import { IncorrectArgsTypeError } from './incorrect-args-type-error';


/**
 * @desc Throws IncorrectArgsTypeError if at least one of conditions is positive.
 * @throws {IncorrectArgsTypeError} throw error when one of conditions is true.
 * @param {...boolean} conditions Conditions which should be negative in order
 * to not throw IncorrectArgsTypeError error.
 */
export function throwIncorrectArgsTypeErrorIfSomeOf(...conditions) {
  if(conditions.some(condition => condition)) throw new IncorrectArgsTypeError();
}
