import { LinkedList } from '../../../data-structures/linked-list/LinkedList';

/**
 * @param linkedList
 * @param callback
 */
export function traversal<T>(linkedList: LinkedList<T>, callback: (nodeValue: T) => void)
{
  let currentNode = linkedList.head;

  while (currentNode)
  {
    callback(currentNode.value);
    currentNode = currentNode.next;
  }
}
