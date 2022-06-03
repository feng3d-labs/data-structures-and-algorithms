import { deepEqual, throws } from 'assert';
import { FenwickTree } from '../FenwickTree';

describe('FenwickTree', () =>
{
  it('should create empty fenwick tree of correct size', () =>
  {
    const tree1 = new FenwickTree(5);
    deepEqual(tree1.treeArray.length, 5 + 1);

    for (let i = 0; i < 5; i += 1)
    {
      deepEqual(tree1.treeArray[i], 0);
    }

    const tree2 = new FenwickTree(50);
    deepEqual(tree2.treeArray.length, 50 + 1);
  });

  it('should create correct fenwick tree', () =>
  {
    const inputArray = [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3];

    const tree = new FenwickTree(inputArray.length);
    deepEqual(tree.treeArray.length, inputArray.length + 1);

    inputArray.forEach((value, index) =>
    {
      tree.increase(index + 1, value);
    });

    deepEqual(tree.treeArray, [0, 3, 5, -1, 10, 5, 9, -3, 19, 7, 9, 3]);

    deepEqual(tree.query(1), 3);
    deepEqual(tree.query(2), 5);
    deepEqual(tree.query(3), 4);
    deepEqual(tree.query(4), 10);
    deepEqual(tree.query(5), 15);
    deepEqual(tree.query(6), 19);
    deepEqual(tree.query(7), 16);
    deepEqual(tree.query(8), 19);
    deepEqual(tree.query(9), 26);
    deepEqual(tree.query(10), 28);
    deepEqual(tree.query(11), 31);

    deepEqual(tree.queryRange(1, 1), 3);
    deepEqual(tree.queryRange(1, 2), 5);
    deepEqual(tree.queryRange(2, 4), 7);
    deepEqual(tree.queryRange(6, 9), 11);

    tree.increase(3, 1);

    deepEqual(tree.query(1), 3);
    deepEqual(tree.query(2), 5);
    deepEqual(tree.query(3), 5);
    deepEqual(tree.query(4), 11);
    deepEqual(tree.query(5), 16);
    deepEqual(tree.query(6), 20);
    deepEqual(tree.query(7), 17);
    deepEqual(tree.query(8), 20);
    deepEqual(tree.query(9), 27);
    deepEqual(tree.query(10), 29);
    deepEqual(tree.query(11), 32);

    deepEqual(tree.queryRange(1, 1), 3);
    deepEqual(tree.queryRange(1, 2), 5);
    deepEqual(tree.queryRange(2, 4), 8);
    deepEqual(tree.queryRange(6, 9), 11);
  });

  it('should correctly execute queries', () =>
  {
    const tree = new FenwickTree(5);

    tree.increase(1, 4);
    tree.increase(3, 7);

    deepEqual(tree.query(1), 4);
    deepEqual(tree.query(3), 11);
    deepEqual(tree.query(5), 11);
    deepEqual(tree.queryRange(2, 3), 7);

    tree.increase(2, 5);
    deepEqual(tree.query(5), 16);

    tree.increase(1, 3);
    deepEqual(tree.queryRange(1, 1), 7);
    deepEqual(tree.query(5), 19);
    deepEqual(tree.queryRange(1, 5), 19);
  });

  it('should throw exceptions', () =>
  {
    const tree = new FenwickTree(5);

    const increaseAtInvalidLowIndex = () =>
    {
      tree.increase(0, 1);
    };

    const increaseAtInvalidHighIndex = () =>
    {
      tree.increase(10, 1);
    };

    const queryInvalidLowIndex = () =>
    {
      tree.query(0);
    };

    const queryInvalidHighIndex = () =>
    {
      tree.query(10);
    };

    const rangeQueryInvalidIndex = () =>
    {
      tree.queryRange(3, 2);
    };

    throws(increaseAtInvalidLowIndex);
    throws(increaseAtInvalidHighIndex);
    throws(queryInvalidLowIndex);
    throws(queryInvalidHighIndex);
    throws(rangeQueryInvalidIndex);
  });
});
