import * as ArrLib from '../Array';
import { isNotFunction } from '../Type';

/**
 * @desc Creates a function that accepts arguments of func and either
 * invokes func returning its result, if at least arity number
 * of arguments have been provided, or returns a function that
 * accepts the remaining func arguments, and so on. The arity
 * of func may be specified if func.length is not sufficient.
 * @param {Function} fn Function for Curring.
 * @return {Function|T} Function that should collect arguments.
 */
export function curry(fn) {
  return function curriedFn(...args) {
    if(args.length < fn.length) {
      return function() {
        return curriedFn.call(null, ...args, ...Array.from(arguments)); };
      };
    return fn.apply(null, args);
  };
}

/**
 * @desc Creates a function that invokes fn with partials prepended
 * to the arguments it receives.
 * @param {Function} fn The function to partially apply arguments to.
 * @param {...T} partialArgs Arguments that should be applied.
 * @return {Function} Returns the new partially applied function.
 */
export function partial(fn, ...partialArgs) {
  let fnArgsLength = fn.length
    , fnArgs = partialArgs
    , canInvokeFn = () =>
      fnArgs.length >= fnArgsLength && ArrLib.compact(fnArgs).length >= fnArgsLength
    , getArgs = (...newArgs) => {
      fnArgs = ArrLib.times(fnArgsLength, index => fnArgs[index] || newArgs.pop());
      return (canInvokeFn()) ? fn(...fnArgs) : getArgs;
    }

  return getArgs;
}

/**
 * @desc This method is like pipe except that it creates a function that
 * invokes the provided functions from right to left.
 * @param {...Function} fns Function that should be invoked with given arguments.
 * @return {Function} Returns the new function.
 */
export function compose(...fns) {
  return val =>
    fns.reverse().reduce((accumulator, fn) =>
      fn(accumulator), val);
}

/**
 * @desc Creates a function that returns the result of invoking the provided f
 * unctions with the this binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 * @param {...Function} fns Function that should be invoked with given arguments.
 * @return {Function} Returns the new function.
 */
export function pipe(...fns) {
  return (...vals) =>
    fns.reduce((accumulator, fn) =>
      fn(accumulator), fns.shift()(...vals));
}

/**
 * @desc Creates a function that memoizes the result of fn.
 * If resolver is provided, it determines the cache key for storing
 * the result based on the arguments provided to the memoized function.
 * By default, the first argument provided to the memoized function is
 * used as the map cache key.
 * @param {Function} fn Function to memoize.
 * @return {Function} Memoized function.
 */
export function memoize(fn) {
  let lookupTable = {};
  return arg => (lookupTable[arg] ||
    (lookupTable[arg] = fn(arg)));
};

/**
 * @desc Creates a function that is restricted to invoking func once.
 * Repeat calls to the function return undefined.
 * @param {Function} fn Function that should be invoked only once.
 * @return {T|undefined} Returns invocation result of passed function.
 */
export function once(fn) {
  let isDone = false;
  return () => isDone ? undefined : ((isDone = true), fn.apply(this, arguments));
};

/**
 * @desc Create funtion that makes same as passed function but newly created
 * function will use only first argument.
 * @param {Function} fn Function that should use only one argument.
 * @return {Function} Same function that was passed but now it uses only
 * first argument.
 */
export function unary(fn) {
  return fn.length === 1
    ? fn : (arg) => fn(arg);
};

/**
 * @desc Reorginizes argument order.
 * @param {Function} fn Function that should be invoked with
 * reorganized argument order.
 * @param {Array<number>} order Argument order.
 */
export function rearg(fn, order) {
  return (...values) =>
    fn(...ArrLib.changeOrder(values, order));
};

/**
 * Creates a function that invokes fn once it's called n or more times.
 * @param {number} count The number of calls before func is invoked.
 * @param {Function} fn The function to restrict.
 * @returns {Function} Function that invokes fn once it's called n or more times.
 */
export function after(count, fn){
  let runCount = 0;
  return function() {
    runCount = runCount + 1;
    if (runCount >= count) {
      return fn.apply(this, arguments);
    }
  }
}

/**
 * @desc Creates curry variation of function if some of
 * arguments are missed.
 * @param {Function} fn Function for Curring.
 * @param {ArrayLike|Array<any>} args Arguments which should be invoked woith passed function.
 * @return {Function|T} Function that should collect arguments or result on invokation.
 */
export function orCurry(fn, args) {
  if(isNotFunction(fn)) return orCurry;

  let argsWithoutUndefined = Array.from(args)
    .filter(i => i !== undefined);

  return fn.length === argsWithoutUndefined.length
    ? fn(...argsWithoutUndefined)
    : curry(fn)(...argsWithoutUndefined);
}
