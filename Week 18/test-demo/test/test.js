const assert = require('assert');
import {add, mul} from '../add';

describe('add function testing', () => {
  it('1+2 should be 3', () => {
    assert.strictEqual(add(1, 2), 3);
  });

  it('-5+2 should be -3', () => {
    assert.strictEqual(add(-5, 2), -3);
  });

  it('-5*2 should be -10', () => {
    assert.strictEqual(mul(-5, 2), -10);
  });
})