import { deepEqual } from 'assert';
import { LinkedList } from '../../../../data-structures/linked-list/LinkedList';
import { reverseTraversal } from '../reverseTraversal';

describe('reverseTraversal', () =>
{
  it('should traverse linked list in reverse order', () =>
  {
    const linkedList = new LinkedList();

    linkedList
      .append(1)
      .append(2)
      .append(3);

    const traversedNodeValues = [];
    const traversalCallback = (nodeValue) =>
    {
      traversedNodeValues.push(nodeValue);
    };

    reverseTraversal(linkedList, traversalCallback);

    deepEqual(traversedNodeValues, [3, 2, 1]);
  });
});

// it('should reverse traversal the linked list with callback', () => {
//   const linkedList = new LinkedList();
//
//   linkedList
//     .append(1)
//     .append(2)
//     .append(3);
//
//   deepEqual(linkedList.toString()).toBe('1,2,3');
//   deepEqual(linkedList.reverseTraversal(linkedList.head, value => value * 2),[6, 4, 2]);
//   deepEqual(() => linkedList.reverseTraversal(linkedList.head)).toThrow();
// });
