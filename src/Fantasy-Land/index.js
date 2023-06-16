const fold = x => f => f(x);
const apGet = x => v => x(v);
const inspect = (x, container) => () => `${container.name}(${x})`;
const toString = (x, container) => () => `${container.name}(${x})`;
const map = (x, container) => f => container(f(x));
const lazyMap = (g, container) => f => container(() => f(g()));
const lazyFold = g => f => f(g());
const ap = (x, container) => v => container(x(v));
const apChain = (f, container) => v => container(f(v.join()));
const get = (x) => () => x;
const chain = x => f => f(x);
const join = x => () => x;
const tap = (x, container) => f => {
  f(x);
  return container(x);
};

const construct = (x, container, ...fns) => {
  return fns.reduce((acc, fn) =>
    (Object.assign(acc, { [fn.name]: fn(x, container) })), {});
}

/**
 * @desc Functor implementation.
 * @example
 * let sideEffectVar = 0
 *   , functor = Functor('  64  ')
 *      .map(s => s.trim())
 *      .map(r => parseInt(r))
 *      .tap(v => sideEffectVar = 3)
 *      .map(i => i + 1)
 *      .map(i => String.fromCharCode(i));
 *
 *  functor.fold(identity); // 'A'
 *  functor.get(); // 'A'
 *  sideEffectVar; // 3
 *  functor.toString(); // 'Functor(A)'
 *  functor.inspect(); // 'Functor(A)'
 *
 * @param {any} x Functor value.
 * @returns {Functor} Functor with current value.
 */
export function Functor(x) {
  return construct(x, Functor, map, inspect, toString, tap, fold, get);
};

/**
 * @desc LazyFunctor implementation.
 * @example
 * let wasInvoked = false;
 * let multiplyWithInvokeUpdate = x => {
 *    wasInvoked = true;
 *    return x * x;
 * }
 *
 * isNotNumber(
 *    LazyFunctor(() => 7)
 *       .lazyMap(multiplyWithInvokeUpdate)
 *       .lazyMap(x => x  * 100)
 * );
 *
 * wasInvoked; // false
 *
 * isNumber(
 *    LazyFunctor(() => 7)
 *       .lazyMap(multiplyWithInvokeUpdate)
 *       .lazyMap(x => x  * 100)
 *       .lazyFold(identity)
 * );
 *
 * wasInvoked; // true
 *
 *  LazyFunctor(() => 7)
 *    .lazyMap(multiplyWithInvokeUpdate)
 *    .lazyMap(x => x  * 10)
 *    .lazyFold(identity); // 490
 *
 * @param {any} x LazyFunctor value.
 * @returns {LazyFunctor} LazyFunctor with current value.
 */
export function LazyFunctor(x) {
  return construct(x, LazyFunctor, lazyMap, lazyFold)
}

/**
 * @desc Apply implementation.
 * @example
 * let sideEffectVar = 0
 *   , curry2Add = x => y => x + y
 *   , apply = Apply(curry2Add)
 *      .tap(() => sideEffectVar = 3);
 *
 *  sideEffectVar; // 3
 *  isFunction(apply.get()); // true
 *  isFunction(apply.fold(identity)); // true
 *  isFunction(apply.ap(2).get()); // true
 *  apply.ap(2).ap(3).get(); // 5
 *  apply.ap(2).apGet(3); // 5
 *  apply.ap(2).ap(3).toString(); // 'Apply(5)'
 *  apply.ap(2).ap(3).inspect(); // 'Apply(5)');
 *  apply
 *    .ap(2)
 *    .ap(3)
 *    .map(n => `Number is ${n}`)
 *    .get(); // 'Number is 5'
 *
 * @param {any} f Apply value.
 * @returns {Apply} Apply with current value.
 */
export function Apply(f) {
  return construct(f, Apply, map, inspect, toString, tap, fold, get, apGet, ap);
};

/**
 * @desc Appicative implementation.
 * @example
 * @example
 * let sideEffectVar = 0
 *   , curry2Add = x => y => x + y
 *   , applicative = Applicative.of(curry2Add)
 *      .tap(() => sideEffectVar = 3);
 *
 *  sideEffectVar; // 3
 *  isFunction(applicative.get()); // true
 *  isFunction(applicative.fold(identity)); // true
 *  isFunction(applicative.ap(2).get()); // true
 *  applicative.ap(2).ap(3).get(); // 5
 *  applicative.ap(2).apGet(3); // 5
 *  applicative.ap(2).ap(3).toString(); // 'Apply(5)'
 *  applicative.ap(2).ap(3).inspect(); // 'Apply(5)');
 *  applicative
 *    .ap(2)
 *    .ap(3)
 *    .map(n => `Number is ${n}`)
 *    .get(); // 'Number is 5'
 *
 * @param {any} f Appicative value.
 * @returns {Appicative} Appicative with current value.
 */
export function Applicative(f) {
  return construct(f, Applicative, map, inspect, toString, tap, fold, get, apGet, ap);
};

/**
 * @desc Creates Appicative container.
 * @example
 * let applicative = Applicative.of(curry2Add);
 *
 * @param {any} f Appicative value.
 * @returns {Appicative} Appicative with current value.
 */
Applicative.of = x => Applicative(x);

/**
 * @desc Monad implementation.
 * @example
 * let sideEffectVar = 0
 *   , curry2Add = x => y => x + y
 *   , monad = Monad.of(curry2Add)
 *      .tap(() => sideEffectVar = 3);
 *
 * sideEffectVar; // 3
 * isFunction(monad.get()); // true
 * isFunction(monad.fold(identity)); // true
 * isFunction(monad.ap(2).get()); // true
 * monad.ap(2).ap(3).get(); // 5
 * monad.ap(2).apGet(3); // 5
 * monad.ap(2).ap(3).toString() // 'Monad(5)'
 * monad.ap(2).ap(3).inspect(); // 'Monad(5)'
 *
 * monad
 *   .ap(2)
 *   .ap(3)
 *   .map(n => `Number is ${n}`)
 *   .get(); // 'Number is 5'
 *
 * monad
 *   .ap(2)
 *   .ap(3)
 *   .chain(v => Monad.of(v * v))
 *   .get(); // 25
 *
 * monad
 *   .ap(2)
 *   .ap(3)
 *   .map(v => Monad.of(v * v))
 *   .join()
 *   .get(); // 25
 *
 * monad
 *   .ap(3)
 *   .apChain(Monad.of(2))
 *   .get(); // 5
 *
 * @param {any} x Monad value.
 * @returns {Monad} Monad with current value.
 */
export function Monad(x) {
  return construct(x, Monad, map, inspect, toString, tap, fold, get, apGet, ap, apChain, chain, join);
}

/**
 * @desc Creates Monad container.
 * @example
 * let monad = Monad.of(3);
 *
 * @param {any} x Monad value.
 * @returns {Monad} Monad with current value.
 */
Monad.of = x => Monad(x);
