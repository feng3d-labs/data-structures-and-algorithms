import { deepEqual } from 'assert';
import { LinkedList } from '../LinkedList';

describe('LinkedList', () =>
{
  it('should create empty linked list', () =>
  {
    const linkedList = new LinkedList();
    deepEqual(linkedList.toString(), '');
  });

  it('should append node to linked list', () =>
  {
    const linkedList = new LinkedList();

    deepEqual(linkedList.head, null);
    deepEqual(linkedList.tail, null);

    linkedList.append(1);
    linkedList.append(2);

    deepEqual(linkedList.toString(), '1,2');
    deepEqual(linkedList.tail.next, null);
  });

  it('should prepend node to linked list', () =>
  {
    const linkedList = new LinkedList();

    linkedList.prepend(2);
    deepEqual(linkedList.head.toString(), '2');
    deepEqual(linkedList.tail.toString(), '2');

    linkedList.append(1);
    linkedList.prepend(3);

    deepEqual(linkedList.toString(), '3,2,1');
  });

  it('should insert node to linked list', () =>
  {
    const linkedList = new LinkedList();

    linkedList.insert(4, 3);
    deepEqual(linkedList.head.toString(), '4');
    deepEqual(linkedList.tail.toString(), '4');

    linkedList.insert(3, 2);
    linkedList.insert(2, 1);
    linkedList.insert(1, -7);
    linkedList.insert(10, 9);

    deepEqual(linkedList.toString(), '1,4,2,3,10');
  });

  it('should delete node by value from linked list', () =>
  {
    const linkedList = new LinkedList();

    deepEqual(linkedList.delete(5), null);

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    deepEqual(linkedList.head.toString(), '1');
    deepEqual(linkedList.tail.toString(), '5');

    const deletedNode = linkedList.delete(3);
    deepEqual(deletedNode.value, 3);
    deepEqual(linkedList.toString(), '1,1,2,4,5');

    linkedList.delete(3);
    deepEqual(linkedList.toString(), '1,1,2,4,5');

    linkedList.delete(1);
    deepEqual(linkedList.toString(), '2,4,5');

    deepEqual(linkedList.head.toString(), '2');
    deepEqual(linkedList.tail.toString(), '5');

    linkedList.delete(5);
    deepEqual(linkedList.toString(), '2,4');

    deepEqual(linkedList.head.toString(), '2');
    deepEqual(linkedList.tail.toString(), '4');

    linkedList.delete(4);
    deepEqual(linkedList.toString(), '2');

    deepEqual(linkedList.head.toString(), '2');
    deepEqual(linkedList.tail.toString(), '2');

    linkedList.delete(2);
    deepEqual(linkedList.toString(), '');
  });

  it('should delete linked list tail', () =>
  {
    const linkedList = new LinkedList();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    deepEqual(linkedList.head.toString(), '1');
    deepEqual(linkedList.tail.toString(), '3');

    const deletedNode1 = linkedList.deleteTail();

    deepEqual(deletedNode1.value, 3);
    deepEqual(linkedList.toString(), '1,2');
    deepEqual(linkedList.head.toString(), '1');
    deepEqual(linkedList.tail.toString(), '2');

    const deletedNode2 = linkedList.deleteTail();

    deepEqual(deletedNode2.value, 2);
    deepEqual(linkedList.toString(), '1');
    deepEqual(linkedList.head.toString(), '1');
    deepEqual(linkedList.tail.toString(), '1');

    const deletedNode3 = linkedList.deleteTail();

    deepEqual(deletedNode3.value, 1);
    deepEqual(linkedList.toString(), '');
    deepEqual(linkedList.head, null);
    deepEqual(linkedList.tail, null);
  });

  it('should delete linked list head', () =>
  {
    const linkedList = new LinkedList();

    deepEqual(linkedList.deleteHead(), null);

    linkedList.append(1);
    linkedList.append(2);

    deepEqual(linkedList.head.toString(), '1');
    deepEqual(linkedList.tail.toString(), '2');

    const deletedNode1 = linkedList.deleteHead();

    deepEqual(deletedNode1.value, 1);
    deepEqual(linkedList.toString(), '2');
    deepEqual(linkedList.head.toString(), '2');
    deepEqual(linkedList.tail.toString(), '2');

    const deletedNode2 = linkedList.deleteHead();

    deepEqual(deletedNode2.value, 2);
    deepEqual(linkedList.toString(), '');
    deepEqual(linkedList.head, null);
    deepEqual(linkedList.tail, null);
  });

  it('should be possible to store objects in the list and to print them out', () =>
  {
    const linkedList = new LinkedList();

    const nodeValue1 = { value: 1, key: 'key1' };
    const nodeValue2 = { value: 2, key: 'key2' };

    linkedList
      .append(nodeValue1)
      .prepend(nodeValue2);

    const nodeStringifier = (value) => `${value.key}:${value.value}`;

    deepEqual(linkedList.toString(nodeStringifier), 'key2:2,key1:1');
  });

  it('should find node by value', () =>
  {
    const linkedList = new LinkedList<number>();

    deepEqual(linkedList.find({ value: 5 }), null);

    linkedList.append(1);
    deepEqual(!!linkedList.find({ value: 1 }), true);

    linkedList
      .append(2)
      .append(3);

    const node = linkedList.find({ value: 2 });

    deepEqual(node.value, 2);
    deepEqual(linkedList.find({ value: 5 }), null);
  });

  it('should find node by callback', () =>
  {
    const linkedList = new LinkedList<{ value: number, key: string }>();

    linkedList
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' });

    const node = linkedList.find({ callback: (value) => value.key === 'test2' });

    deepEqual(!!node, true);
    deepEqual(node.value.value, 2);
    deepEqual(node.value.key, 'test2');
    deepEqual(linkedList.find({ callback: (value) => value.key === 'test5' }), null);
  });

  it('should create linked list from array', () =>
  {
    const linkedList = new LinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    deepEqual(linkedList.toString(), '1,1,2,3,3,3,4,5');
  });

  it('should find node by means of custom compare function', () =>
  {
    const comparatorFunction = (a, b) =>
    {
      if (a.customValue === b.customValue)
      {
        return 0;
      }

      return a.customValue < b.customValue ? -1 : 1;
    };

    const linkedList = new LinkedList(comparatorFunction);

    linkedList
      .append({ value: 1, customValue: 'test1' })
      .append({ value: 2, customValue: 'test2' })
      .append({ value: 3, customValue: 'test3' });

    const node = linkedList.find({
      value: { value: 2, customValue: 'test2' },
    });

    deepEqual(!!node, true);
    deepEqual(node.value.value, 2);
    deepEqual(node.value.customValue, 'test2');
    deepEqual(linkedList.find({ value: { value: 2, customValue: 'test5' } }), null);
  });

  it('should find preferring callback over compare function', () =>
  {
    const greaterThan = (value, compareTo) => (value > compareTo ? 0 : 1);

    const linkedList = new LinkedList(greaterThan);
    linkedList.fromArray([1, 2, 3, 4, 5]);

    let node = linkedList.find({ value: 3 });
    deepEqual(node.value, 4);

    node = linkedList.find({ callback: (value) => value < 3 });
    deepEqual(node.value, 1);
  });

  it('should convert to array', () =>
  {
    const linkedList = new LinkedList();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    deepEqual(linkedList.toArray().join(','), '1,2,3');
  });

  it('should reverse linked list', () =>
  {
    const linkedList = new LinkedList();

    // Add test values to linked list.
    linkedList
      .append(1)
      .append(2)
      .append(3);

    deepEqual(linkedList.toString(), '1,2,3');
    deepEqual(linkedList.head.value, 1);
    deepEqual(linkedList.tail.value, 3);

    // Reverse linked list.
    linkedList.reverse();
    deepEqual(linkedList.toString(), '3,2,1');
    deepEqual(linkedList.head.value, 3);
    deepEqual(linkedList.tail.value, 1);

    // Reverse linked list back to initial state.
    linkedList.reverse();
    deepEqual(linkedList.toString(), '1,2,3');
    deepEqual(linkedList.head.value, 1);
    deepEqual(linkedList.tail.value, 3);
  });
});
