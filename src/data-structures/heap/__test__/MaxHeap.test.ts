import { deepEqual } from 'assert';
import { Comparator } from '../../../utils/comparator/Comparator';
import { MaxHeap } from '../MaxHeap';

describe('MaxHeap', () =>
{
  it('should create an empty max heap', () =>
  {
    const maxHeap = new MaxHeap();

    deepEqual(!!maxHeap, true);
    deepEqual(maxHeap.peek(), null);
    deepEqual(maxHeap.isEmpty(), true);
  });

  it('should add items to the heap and heapify it up', () =>
  {
    const maxHeap = new MaxHeap();

    maxHeap.add(5);
    deepEqual(maxHeap.isEmpty(), false);
    deepEqual(maxHeap.peek(), 5);
    deepEqual(maxHeap.toString(), '5');

    maxHeap.add(3);
    deepEqual(maxHeap.peek(), 5);
    deepEqual(maxHeap.toString(), '5,3');

    maxHeap.add(10);
    deepEqual(maxHeap.peek(), 10);
    deepEqual(maxHeap.toString(), '10,3,5');

    maxHeap.add(1);
    deepEqual(maxHeap.peek(), 10);
    deepEqual(maxHeap.toString(), '10,3,5,1');

    maxHeap.add(1);
    deepEqual(maxHeap.peek(), 10);
    deepEqual(maxHeap.toString(), '10,3,5,1,1');

    deepEqual(maxHeap.poll(), 10);
    deepEqual(maxHeap.toString(), '5,3,1,1');

    deepEqual(maxHeap.poll(), 5);
    deepEqual(maxHeap.toString(), '3,1,1');

    deepEqual(maxHeap.poll(), 3);
    deepEqual(maxHeap.toString(), '1,1');
  });

  it('should poll items from the heap and heapify it down', () =>
  {
    const maxHeap = new MaxHeap();

    maxHeap.add(5);
    maxHeap.add(3);
    maxHeap.add(10);
    maxHeap.add(11);
    maxHeap.add(1);

    deepEqual(maxHeap.toString(), '11,10,5,3,1');

    deepEqual(maxHeap.poll(), 11);
    deepEqual(maxHeap.toString(), '10,3,5,1');

    deepEqual(maxHeap.poll(), 10);
    deepEqual(maxHeap.toString(), '5,3,1');

    deepEqual(maxHeap.poll(), 5);
    deepEqual(maxHeap.toString(), '3,1');

    deepEqual(maxHeap.poll(), 3);
    deepEqual(maxHeap.toString(), '1');

    deepEqual(maxHeap.poll(), 1);
    deepEqual(maxHeap.toString(), '');

    deepEqual(maxHeap.poll(), null);
    deepEqual(maxHeap.toString(), '');
  });

  it('should heapify down through the right branch as well', () =>
  {
    const maxHeap = new MaxHeap();

    maxHeap.add(3);
    maxHeap.add(12);
    maxHeap.add(10);

    deepEqual(maxHeap.toString(), '12,3,10');

    maxHeap.add(11);
    deepEqual(maxHeap.toString(), '12,11,10,3');

    deepEqual(maxHeap.poll(), 12);
    deepEqual(maxHeap.toString(), '11,3,10');
  });

  it('should be possible to find item indices in heap', () =>
  {
    const maxHeap = new MaxHeap();

    maxHeap.add(3);
    maxHeap.add(12);
    maxHeap.add(10);
    maxHeap.add(11);
    maxHeap.add(11);

    deepEqual(maxHeap.toString(), '12,11,10,3,11');

    deepEqual(maxHeap.find(5), []);
    deepEqual(maxHeap.find(12), [0]);
    deepEqual(maxHeap.find(11), [1, 4]);
  });

  it('should be possible to remove items from heap with heapify down', () =>
  {
    const maxHeap = new MaxHeap();

    maxHeap.add(3);
    maxHeap.add(12);
    maxHeap.add(10);
    maxHeap.add(11);
    maxHeap.add(11);

    deepEqual(maxHeap.toString(), '12,11,10,3,11');

    deepEqual(maxHeap.remove(12).toString(), '11,11,10,3');
    deepEqual(maxHeap.remove(12).peek(), 11);
    deepEqual(maxHeap.remove(11).toString(), '10,3');
    deepEqual(maxHeap.remove(10).peek(), 3);
  });

  it('should be possible to remove items from heap with heapify up', () =>
  {
    const maxHeap = new MaxHeap();

    maxHeap.add(3);
    maxHeap.add(10);
    maxHeap.add(5);
    maxHeap.add(6);
    maxHeap.add(7);
    maxHeap.add(4);
    maxHeap.add(6);
    maxHeap.add(8);
    maxHeap.add(2);
    maxHeap.add(1);

    deepEqual(maxHeap.toString(), '10,8,6,7,6,4,5,3,2,1');
    deepEqual(maxHeap.remove(4).toString(), '10,8,6,7,6,1,5,3,2');
    deepEqual(maxHeap.remove(3).toString(), '10,8,6,7,6,1,5,2');
    deepEqual(maxHeap.remove(5).toString(), '10,8,6,7,6,1,2');
    deepEqual(maxHeap.remove(10).toString(), '8,7,6,2,6,1');
    deepEqual(maxHeap.remove(6).toString(), '8,7,1,2');
    deepEqual(maxHeap.remove(2).toString(), '8,7,1');
    deepEqual(maxHeap.remove(1).toString(), '8,7');
    deepEqual(maxHeap.remove(7).toString(), '8');
    deepEqual(maxHeap.remove(8).toString(), '');
  });

  it('should be possible to remove items from heap with custom finding comparator', () =>
  {
    const maxHeap = new MaxHeap<string>();
    maxHeap.add('a');
    maxHeap.add('bb');
    maxHeap.add('ccc');
    maxHeap.add('dddd');

    deepEqual(maxHeap.toString(), 'dddd,ccc,bb,a');

    const comparator = new Comparator<string>((a, b) =>
    {
      if (a.length === b.length)
      {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    maxHeap.remove('hey', comparator);
    deepEqual(maxHeap.toString(), 'dddd,a,bb');
  });
});
