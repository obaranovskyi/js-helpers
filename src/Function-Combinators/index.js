import { isFunction } from '../Type';

/**
 * @desc The identity combinator is a function that returns the
 * same value it was provided as an argument.
 * I - combinator implementation.
 * @example
 * identity(2); // 2
 *
 * @param {T} value Argument that should returned back.
 * @return {T} Returns same value which was passed.
 */
export function identity(value) {
  return value;
};

/**
 * @desc Creates function which will always return passed argument.
 * K - combinator implementation.
 * @example
 * always(2)(); // 2
 *
 * @param {T} value Argument that should returned back from function which was returned.
 * @return {Function} Returns function which will always return first passed argument.
 */
export function always(value) {
  return () => value;
};

/**
 * @desc Takes function and changes argument order.
 * C - combinator implementation.
 * @example
 * const concat2Words = w1 => w2 => `${w1} ${w2}`;
 *
 * flip(concat2Words)('world')('hello'); // 'hello world'
 *
 * @param {Function} fn Function which will be invoked with fliped arguments.
 * @returns {Function} Function which expects to get first argument,
 * which will be used as a second argument.
 */
export function flip(fn) {
  return a => b => fn(b)(a);
}

/**
 * @desc Takes argument and returns function which expects to get
 * function which will be invoked with first argument.
 * T - combinator implementation.
 * @example
 * const addWorld = w => `${w} world`;
 *
 * thrush('hello')(addWorld); // 'hello world'
 *
 * @param {any} x Argument which will be passed into a function
 * which is expected as a second argument.
 * @returns {Function} Function which expects to get function
 * where will be passed first argument.
 */
export function thrush(x) {
  return f => f(x);
}

/**
 * @desc Takes function and invokes it with passed argument two times.
 * @example
 * const add = x => y => x + y;
 *
 * duplication(add)(7); // 14
 *
 * @param {Function} fn Function which will be invoked two times
 * with the same argument.
 * @returns {Function} Function which expects for argument.
 */
export function duplication(fn) {
  return x => fn(x)(x);
}

/**
 * @desc The fork combinator is useful in cases where you need to process a single resource
 * in two different ways and then combine the results. This combinator takes three functions:
 * a join function and two terminal functions that process the provided input. The result of
 * each forked function is ultimately passed in to a join function of two arguments.
 * @example
 * const calc = fork(multiply, x => x + x, identity);
 * calc(2); // 8
 *
 * @param {Function} join Argument that should returned back from function which was returned.
 * @param {Function} fn1 First terminal function.
 * @param {Function} fn2 Second terminal function.
 * @return {Function} Returns function which expects to get argument that should be passed into terminal
 *  functions.
 */
export function fork(join, fn1, fn2) {
  return val => join(fn1(val), fn2(val));
}

/**
 * @desc The seq combinator is used to loop over a sequence of functions.
 * @example
 * let result = 0
 *   , addToResult = x => result += x;
 *
 * result; // 0
 *
 * seq(addToResult, addToResult)(4);
 *
 * result; // 8
 *
 * @param {...Function} fns List of functions which will be invoked sequently.
 * @return {Function} Returns a new function, which runs all of them in sequence against the same value.
 */
export function seq(...fns) {
  return (...vals) => {
    fns.forEach((fn) => {
      fn(...vals);
    });
  };
}

/**
 * @desc This combinator takes two functions and returns the result of the first one if the value
 * is defined (not false, null, or undefined); otherwise, it returns the result of the second function.
 * @example
 * const calc = alt(identity, x => x + 1);
 * calc(0); // 1
 * calc(2); // 2
 * @param {Function} fn1 First result function.
 * @param {Function} fn2 Second result function.
 * @return {Function} Returns the result of the first one if the value
 * is defined (not false, null, or undefined); otherwise, it returns the result of the second function
 */
export function alt(fn1, fn2) {
  return val => fn1(val) || fn2(val);
}

/**
 * @desc Helps to check data in chain. Useful for debugging.
 * @example
 * let sayHelloTo = name => `Hello ${name}`
 *   , toUpperCase = str => str.toUpperCase()
 *   , addDollarSign  = str => `$${str}$`
 *   , chainMiddleResult = ''
 *   , tapHandler = data => chainMiddleResult = data
 *   , sayHelloInUpperCase = compose(addDollarSign, sayHelloTo, tap(tapHandler), toUpperCase);
 *
 *  sayHelloInUpperCase('oleh'); // '$Hello OLEH$'
 *  chainMiddleResult; // 'OLEH'
 *
 * @param {Function} fn Middleware function.
 * @return {Function} Returns data that was used for tap functio
 */
export function tap(fn) {
  return data => {
    if(isFunction(fn)) fn(data);
    return data;
  }
};
