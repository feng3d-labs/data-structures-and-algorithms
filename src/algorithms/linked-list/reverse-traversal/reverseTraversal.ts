import { LinkedList } from '../../../data-structures/linked-list/LinkedList';
import { LinkedListNode } from '../../../data-structures/linked-list/LinkedListNode';

/**
 * Traversal callback function.
 */
type traversalCallback<T> = (nodeValue: T) => void;

/**
 * @param node
 * @param callback
 */
function reverseTraversalRecursive<T>(node: LinkedListNode<T>, callback: traversalCallback<T>)
{
  if (node)
  {
    reverseTraversalRecursive(node.next, callback);
    callback(node.value);
  }
}

/**
 * @param linkedList
 * @param callback
 */
export function reverseTraversal<T>(linkedList: LinkedList<T>, callback: traversalCallback<T>)
{
  reverseTraversalRecursive(linkedList.head, callback);
}
