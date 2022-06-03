import { deepEqual } from 'assert';
import { Comparator } from '../../../utils/comparator/Comparator';
import { MinHeap } from '../MinHeap';

describe('MinHeap', () =>
{
  it('should create an empty min heap', () =>
  {
    const minHeap = new MinHeap();

    deepEqual(!!minHeap, true);
    deepEqual(minHeap.peek(), null);
    deepEqual(minHeap.isEmpty(), true);
  });

  it('should add items to the heap and heapify it up', () =>
  {
    const minHeap = new MinHeap();

    minHeap.add(5);
    deepEqual(minHeap.isEmpty(), false);
    deepEqual(minHeap.peek(), 5);
    deepEqual(minHeap.toString(), '5');

    minHeap.add(3);
    deepEqual(minHeap.peek(), 3);
    deepEqual(minHeap.toString(), '3,5');

    minHeap.add(10);
    deepEqual(minHeap.peek(), 3);
    deepEqual(minHeap.toString(), '3,5,10');

    minHeap.add(1);
    deepEqual(minHeap.peek(), 1);
    deepEqual(minHeap.toString(), '1,3,10,5');

    minHeap.add(1);
    deepEqual(minHeap.peek(), 1);
    deepEqual(minHeap.toString(), '1,1,10,5,3');

    deepEqual(minHeap.poll(), 1);
    deepEqual(minHeap.toString(), '1,3,10,5');

    deepEqual(minHeap.poll(), 1);
    deepEqual(minHeap.toString(), '3,5,10');

    deepEqual(minHeap.poll(), 3);
    deepEqual(minHeap.toString(), '5,10');
  });

  it('should poll items from the heap and heapify it down', () =>
  {
    const minHeap = new MinHeap();

    minHeap.add(5);
    minHeap.add(3);
    minHeap.add(10);
    minHeap.add(11);
    minHeap.add(1);

    deepEqual(minHeap.toString(), '1,3,10,11,5');

    deepEqual(minHeap.poll(), 1);
    deepEqual(minHeap.toString(), '3,5,10,11');

    deepEqual(minHeap.poll(), 3);
    deepEqual(minHeap.toString(), '5,11,10');

    deepEqual(minHeap.poll(), 5);
    deepEqual(minHeap.toString(), '10,11');

    deepEqual(minHeap.poll(), 10);
    deepEqual(minHeap.toString(), '11');

    deepEqual(minHeap.poll(), 11);
    deepEqual(minHeap.toString(), '');

    deepEqual(minHeap.poll(), null);
    deepEqual(minHeap.toString(), '');
  });

  it('should heapify down through the right branch as well', () =>
  {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(12);
    minHeap.add(10);

    deepEqual(minHeap.toString(), '3,12,10');

    minHeap.add(11);
    deepEqual(minHeap.toString(), '3,11,10,12');

    deepEqual(minHeap.poll(), 3);
    deepEqual(minHeap.toString(), '10,11,12');
  });

  it('should be possible to find item indices in heap', () =>
  {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(12);
    minHeap.add(10);
    minHeap.add(11);
    minHeap.add(11);

    deepEqual(minHeap.toString(), '3,11,10,12,11');

    deepEqual(minHeap.find(5), []);
    deepEqual(minHeap.find(3), [0]);
    deepEqual(minHeap.find(11), [1, 4]);
  });

  it('should be possible to remove items from heap with heapify down', () =>
  {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(12);
    minHeap.add(10);
    minHeap.add(11);
    minHeap.add(11);

    deepEqual(minHeap.toString(), '3,11,10,12,11');

    deepEqual(minHeap.remove(3).toString(), '10,11,11,12');
    deepEqual(minHeap.remove(3).peek(), 10);
    deepEqual(minHeap.remove(11).toString(), '10,12');
    deepEqual(minHeap.remove(3).peek(), 10);
  });

  it('should be possible to remove items from heap with heapify up', () =>
  {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(10);
    minHeap.add(5);
    minHeap.add(6);
    minHeap.add(7);
    minHeap.add(4);
    minHeap.add(6);
    minHeap.add(8);
    minHeap.add(2);
    minHeap.add(1);

    deepEqual(minHeap.toString(), '1,2,4,6,3,5,6,10,8,7');
    deepEqual(minHeap.remove(8).toString(), '1,2,4,6,3,5,6,10,7');
    deepEqual(minHeap.remove(7).toString(), '1,2,4,6,3,5,6,10');
    deepEqual(minHeap.remove(1).toString(), '2,3,4,6,10,5,6');
    deepEqual(minHeap.remove(2).toString(), '3,6,4,6,10,5');
    deepEqual(minHeap.remove(6).toString(), '3,5,4,10');
    deepEqual(minHeap.remove(10).toString(), '3,5,4');
    deepEqual(minHeap.remove(5).toString(), '3,4');
    deepEqual(minHeap.remove(3).toString(), '4');
    deepEqual(minHeap.remove(4).toString(), '');
  });

  it('should be possible to remove items from heap with custom finding comparator', () =>
  {
    const minHeap = new MinHeap<string>();
    minHeap.add('dddd');
    minHeap.add('ccc');
    minHeap.add('bb');
    minHeap.add('a');

    deepEqual(minHeap.toString(), 'a,bb,ccc,dddd');

    const comparator = new Comparator<string>((a, b) =>
    {
      if (a.length === b.length)
      {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    minHeap.remove('hey', comparator);
    deepEqual(minHeap.toString(), 'a,bb,dddd');
  });

  it('should remove values from heap and correctly re-order the tree', () =>
  {
    const minHeap = new MinHeap();

    minHeap.add(1);
    minHeap.add(2);
    minHeap.add(3);
    minHeap.add(4);
    minHeap.add(5);
    minHeap.add(6);
    minHeap.add(7);
    minHeap.add(8);
    minHeap.add(9);

    deepEqual(minHeap.toString(), '1,2,3,4,5,6,7,8,9');

    minHeap.remove(2);
    deepEqual(minHeap.toString(), '1,4,3,8,5,6,7,9');

    minHeap.remove(4);
    deepEqual(minHeap.toString(), '1,5,3,8,9,6,7');
  });
});
