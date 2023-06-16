import { assert, expect } from 'chai';

import * as CtxLib from '../src/Context';


/** @test {Context} */
describe('Context Library Tests', () => {

  /** @test {Context#using} */
  it('test: .using(ctx) ', () => {
    let contextObj = {counter: 0}
      , fn1 = function() { this.counter +=1; }
      , fn2 = function() { this.counter +=2; }
      , fn3 = function() { this.counter +=3; }
      , fn4 = function() { this.counter +=4; };

    CtxLib.using(contextObj)
      .invoke(fn1, fn2, fn3, fn4);

    assert.equal(contextObj.counter, 10);
  });

  /** @test {Context#using} */
  it('test: .using(ctx) with class', () => {
    class A {
      constructor() {
        this.counter = 0;
      }
    }
    let contextObj = new A()
      , fn1 = function() { this.counter +=1; }
      , fn2 = function() { this.counter +=2; }
      , fn3 = function() { this.counter +=3; }
      , fn4 = function() { this.counter +=4; };

    CtxLib.using(contextObj)
      .invoke(fn1, fn2, fn3, fn4);

    assert.equal(contextObj.counter, 10);
  });

  /** @test {Context#invoke} */
  it('test: .invoke(ctx)', () => {
    let contextObj = {counter: 0}
      , fn1 = function() { this.counter +=1; }
      , fn2 = function() { this.counter +=2; }
      , fn3 = function() { this.counter +=3; }
      , fn4 = function() { this.counter +=4; };

    CtxLib.invoke(fn1, fn2, fn3, fn4)
      .using(contextObj);

    assert.equal(contextObj.counter, 10);
  });

  /** @test {Context#invoke} */
  it('test: .invoke(ctx) with class', () => {
    class A {
      constructor() {
        this.counter = 0;
      }
    }
    let contextObj = new A()
      , fn1 = function() { this.counter +=1; }
      , fn2 = function() { this.counter +=2; }
      , fn3 = function() { this.counter +=3; }
      , fn4 = function() { this.counter +=4; };

    CtxLib.invoke(fn1, fn2, fn3, fn4)
      .using(contextObj);

    assert.equal(contextObj.counter, 10);
  });

  /** @test {Context#invokeWithCtx} */
  it('test: .invokeWithCtx(ctx, ...fns)', () => {
    let contextObj = {counter: 0}
      , fn1 = function() { this.counter +=1; }
      , fn2 = function() { this.counter +=2; }
      , fn3 = function() { this.counter +=3; }
      , fn4 = function() { this.counter +=4; };

    CtxLib.invokeWithCtx(contextObj, fn1, fn2, fn3, fn4);

    assert.equal(contextObj.counter, 10);
  });

  /** @test {Context#invokeWithCtx} */
  it('test: .invokeWithCtx(ctx, ...fns) with class', () => {
    class A {
      constructor() {
        this.counter = 0;
      }
    }
    let contextObj = new A()
      , fn1 = function() { this.counter +=1; }
      , fn2 = function() { this.counter +=2; }
      , fn3 = function() { this.counter +=3; }
      , fn4 = function() { this.counter +=4; };

    CtxLib.invokeWithCtx(contextObj, fn1, fn2, fn3, fn4);

    assert.equal(contextObj.counter, 10);
  });

  /** @test {Context#invoke} */
  it('test: using(ctx) invoke(...fns) with .wrap(fn, ...args)', () => {
    let contextObj = {counter: 0}
      , fn1 = function() { this.counter +=1; }
      , fn2 = function(num) { this.counter = this.counter + 2 + num; };

    CtxLib.using(contextObj)
      .invoke(fn1, CtxLib.wrap(fn2, 4));

    assert.equal(contextObj.counter, 7);
  });

  /** @test {Context#invoke} */
  it('test: using(ctx) invoke(...fns) with .wrap(fn, ...args) with class', () => {
    class A {
      constructor() {
        this.counter = 0;
      }
    }
    let contextObj = new A()
      , fn1 = function() { this.counter +=1; }
      , fn2 = function(num) { this.counter = this.counter + 2 + num; };

    CtxLib.using(contextObj)
      .invoke(fn1, CtxLib.wrap(fn2, 4));

    assert.equal(contextObj.counter, 7);
  });
});
