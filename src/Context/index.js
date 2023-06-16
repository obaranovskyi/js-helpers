/**
 * @desc Will invoke list of functions with given context.
 * @param {...Function} fns List of functions that should
 * be invoked with given context.
 * @return {object} object that will have a using(*) function. In using
 * function should be passed context object.
 */
export function invoke(...fns) {
  return {
    using: ctx => {
      fns.forEach(function(fn) {
        fn.call(ctx);
      });
    }
  }
};

/**
 * @desc Is opposite to invoke function.
 * @param {object} ctx Context for all functions that should be invoked.
 * @return {object} Object that will have a invoke(*) function. In invoke
 * function should be passed functions that should be invoked with
 * current context.
 */
export function using(ctx) {
  return {
    invoke: function(...fns) {
      fns.forEach(function(fn) {
        fn.call(ctx);
      });
    }
  }
};

/**
 * @desc Will invoke list of functions with given context in single invokation.
 * @param {object} ctx Contecxt for all functions that should be invoked.
 * @param {...Function} fns List of functions that should
 * be invoked with given context.
 * @return {void} -
 */
export function invokeWithCtx(ctx, ...fns) {
  using(ctx).invoke(...fns);
};

/**
 * @desc Will take function, arguments and return function
 * that will invoke given function with given arguments.
 * @param {Function} fn Function that
 * should be wrapped.
 * @param {...T} args List of arguments that should be invoked with given function.
 * @return {void} -
 */
export function wrap(fn, ...args) {
  return function() {
    fn.call(this, ...args);
  }
};
