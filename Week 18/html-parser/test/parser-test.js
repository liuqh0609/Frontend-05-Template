const assert = require('assert');
import {parseHTML} from '../src/parser.js';

describe('parseHTML', () => {
  it('<a>abc</a>', () => {
    const tree = parseHTML('<a></a>');
    assert.strictEqual(tree.children[0].tagName, 'a');
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href="//example.com"></a>', () => {
    const tree = parseHTML('<a href="//example.com"></a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href ></a>', () => {
    const tree = parseHTML('<a href ></a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href id></a>', () => {
    const tree = parseHTML('<a href id></a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a href="abc" id></a>', () => {
    const tree = parseHTML('<a href="abc" id></a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a id=abc ></a>', () => {
    const tree = parseHTML('<a id=abc ></a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a id=abc/>', () => {
    const tree = parseHTML('<a id=abc/>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a id=\'abc\'/>', () => {
    const tree = parseHTML('<a id=\'abc\'/>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a />', () => {
    const tree = parseHTML('<a />');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<A /> uppercase', () => {
    const tree = parseHTML('<A />');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<>', () => {
    const tree = parseHTML('<>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].type, 'text');
  });

  it('<a id=abc></a>', () => {
    const tree = parseHTML('<a id=abc></a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 0);
  });

  it('<a>test</a>', () => {
    const tree = parseHTML('<a>test</a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 1);
  });

  it('<a href= id>test</a>', () => {
    const tree = parseHTML('<a href= id>test</a>');
    assert.strictEqual(tree.children.length, 1);
    assert.strictEqual(tree.children[0].children.length, 1);
  });
})
