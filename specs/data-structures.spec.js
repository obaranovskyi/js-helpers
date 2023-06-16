import { assert } from 'chai';


import { SafeTupleBuilder } from '../src/Data-Structures/safe-tuple-builder';
import { Tuple } from '../src/Data-Structures/tuple';

/** @test {SafeTupleBuilder} */
describe('SafeTupleBuilder Tests', () => {

  /** @test {SafeTupleBuilder#of} */
  it('test: .of(...args)', () => {
    const expected = ['Barkley', 'Rosser']
       , StringPair = SafeTupleBuilder.of(String, String)
       , name = new StringPair(...expected)
       , [first, last] = name.getAll();

    assert.equal(first, expected[0]);
    assert.equal(last, expected[1]);

    name.unpack((first, last) => {
      assert.equal(first, expected[0]);
      assert.equal(last, expected[1]);
    });

    assert.equal(name.get(0), expected[0]);
    assert.equal(name.get(1), expected[1]);
  });
});

/** @test {Tuple} */
describe('Tuple Tests', () => {

  /** @test {Tuple#getAll} */
  it('test: .getAll()', () => {
    const expected = ['Barkley', 'Rosser']
       , name = new Tuple(...expected)
       , [first, last] = name.getAll();

    assert.equal(first, expected[0]);
    assert.equal(last, expected[1]);
  });

    /** @test {Tuple#unpack} */
    it('test: .unpack()', () => {
      const expected = ['Barkley', 'Rosser']
          , name = new Tuple(...expected);

      name.unpack((first, last) => {
        assert.equal(first, expected[0]);
        assert.equal(last, expected[1]);
      });
    });

    /** @test {Tuple#get} */
    it('test: .get(index)', () => {
      const expected = ['Barkley', 'Rosser']
          , name = new Tuple(...expected);

      assert.equal(name.get(0), expected[0]);
      assert.equal(name.get(1), expected[1]);
    });
});
