import { deepEqual } from 'assert';
import { SegmentTree } from '../SegmentTree';

describe('SegmentTree', () =>
{
  it('should build tree for input array #0 with length of power of two', () =>
  {
    const array = [-1, 2];
    const segmentTree = new SegmentTree(array, Math.min, Infinity);

    deepEqual(segmentTree.segmentTree, [-1, -1, 2]);
    deepEqual(segmentTree.segmentTree.length, (2 * array.length) - 1);
  });

  it('should build tree for input array #1 with length of power of two', () =>
  {
    const array = [-1, 2, 4, 0];
    const segmentTree = new SegmentTree(array, Math.min, Infinity);

    deepEqual(segmentTree.segmentTree, [-1, -1, 0, -1, 2, 4, 0]);
    deepEqual(segmentTree.segmentTree.length, (2 * array.length) - 1);
  });

  it('should build tree for input array #0 with length not of power of two', () =>
  {
    const array = [0, 1, 2];
    const segmentTree = new SegmentTree(array, Math.min, Infinity);

    deepEqual(segmentTree.segmentTree, [0, 0, 2, 0, 1, null, null]);
    deepEqual(segmentTree.segmentTree.length, (2 * 4) - 1);
  });

  it('should build tree for input array #1 with length not of power of two', () =>
  {
    const array = [-1, 3, 4, 0, 2, 1];
    const segmentTree = new SegmentTree(array, Math.min, Infinity);

    deepEqual(segmentTree.segmentTree, [
      -1, -1, 0, -1, 4, 0, 1, -1, 3, null, null, 0, 2, null, null,
    ]);
    deepEqual(segmentTree.segmentTree.length, (2 * 8) - 1);
  });

  it('should build max array', () =>
  {
    const array = [-1, 2, 4, 0];
    const segmentTree = new SegmentTree(array, Math.max, -Infinity);

    deepEqual(segmentTree.segmentTree, [4, 2, 4, -1, 2, 4, 0]);
    deepEqual(segmentTree.segmentTree.length, (2 * array.length) - 1);
  });

  it('should build sum array', () =>
  {
    const array = [-1, 2, 4, 0];
    const segmentTree = new SegmentTree(array, (a, b) => (a + b), 0);

    deepEqual(segmentTree.segmentTree, [5, 1, 4, -1, 2, 4, 0]);
    deepEqual(segmentTree.segmentTree.length, (2 * array.length) - 1);
  });

  it('should do min range query on power of two length array', () =>
  {
    const array = [-1, 3, 4, 0, 2, 1];
    const segmentTree = new SegmentTree(array, Math.min, Infinity);

    deepEqual(segmentTree.rangeQuery(0, 5), -1);
    deepEqual(segmentTree.rangeQuery(0, 2), -1);
    deepEqual(segmentTree.rangeQuery(1, 3), 0);
    deepEqual(segmentTree.rangeQuery(2, 4), 0);
    deepEqual(segmentTree.rangeQuery(4, 5), 1);
    deepEqual(segmentTree.rangeQuery(2, 2), 4);
  });

  it('should do min range query on not power of two length array', () =>
  {
    const array = [-1, 2, 4, 0];
    const segmentTree = new SegmentTree(array, Math.min, Infinity);

    deepEqual(segmentTree.rangeQuery(0, 4), -1);
    deepEqual(segmentTree.rangeQuery(0, 1), -1);
    deepEqual(segmentTree.rangeQuery(1, 3), 0);
    deepEqual(segmentTree.rangeQuery(1, 2), 2);
    deepEqual(segmentTree.rangeQuery(2, 3), 0);
    deepEqual(segmentTree.rangeQuery(2, 2), 4);
  });

  it('should do max range query', () =>
  {
    const array = [-1, 3, 4, 0, 2, 1];
    const segmentTree = new SegmentTree(array, Math.max, -Infinity);

    deepEqual(segmentTree.rangeQuery(0, 5), 4);
    deepEqual(segmentTree.rangeQuery(0, 1), 3);
    deepEqual(segmentTree.rangeQuery(1, 3), 4);
    deepEqual(segmentTree.rangeQuery(2, 4), 4);
    deepEqual(segmentTree.rangeQuery(4, 5), 2);
    deepEqual(segmentTree.rangeQuery(3, 3), 0);
  });

  it('should do sum range query', () =>
  {
    const array = [-1, 3, 4, 0, 2, 1];
    const segmentTree = new SegmentTree(array, (a, b) => (a + b), 0);

    deepEqual(segmentTree.rangeQuery(0, 5), 9);
    deepEqual(segmentTree.rangeQuery(0, 1), 2);
    deepEqual(segmentTree.rangeQuery(1, 3), 7);
    deepEqual(segmentTree.rangeQuery(2, 4), 6);
    deepEqual(segmentTree.rangeQuery(4, 5), 3);
    deepEqual(segmentTree.rangeQuery(3, 3), 0);
  });
});
