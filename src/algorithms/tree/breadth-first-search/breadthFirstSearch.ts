import { Queue } from '../../../data-structures/queue/Queue';
import { BinaryTreeNode } from '../../../data-structures/tree/BinaryTreeNode';

interface Callbacks<T>
{
  /**
   * Determines whether BFS should traverse from the node to its child.
   */
  allowTraversal?: (node: BinaryTreeNode<T>, child: BinaryTreeNode<T>) => boolean;

  /**
   * Called when BFS enters the node.
   */
  enterNode?: (node: BinaryTreeNode<T>) => void;

  /**
   * Called when BFS leaves the node.
   */
  leaveNode?: (node: BinaryTreeNode<T>) => void;
}

/**
 * @param callbacks
 */
function initCallbacks<T>(callbacks: Callbacks<T> = {})
{
  const initiatedCallback = callbacks;

  const stubCallback = () => { };
  const defaultAllowTraversal = () => true;

  initiatedCallback.allowTraversal = callbacks.allowTraversal || defaultAllowTraversal;
  initiatedCallback.enterNode = callbacks.enterNode || stubCallback;
  initiatedCallback.leaveNode = callbacks.leaveNode || stubCallback;

  return initiatedCallback;
}

/**
 * 广度优先搜索算法（英语：Breadth-First Search，缩写为BFS）
 *
 * @param rootNode
 * @param originalCallbacks
 */
export function breadthFirstSearch1<T>(rootNode: BinaryTreeNode<T>, originalCallbacks?: Callbacks<T>)
{
  const callbacks = initCallbacks(originalCallbacks);
  const nodeQueue = new Queue<BinaryTreeNode<T>>();

  // Do initial queue setup.
  nodeQueue.enqueue(rootNode);

  while (!nodeQueue.isEmpty())
  {
    const currentNode = nodeQueue.dequeue();

    callbacks.enterNode(currentNode);

    // Add all children to the queue for future traversals.

    // Traverse left branch.
    if (currentNode.left && callbacks.allowTraversal(currentNode, currentNode.left))
    {
      nodeQueue.enqueue(currentNode.left);
    }

    // Traverse right branch.
    if (currentNode.right && callbacks.allowTraversal(currentNode, currentNode.right))
    {
      nodeQueue.enqueue(currentNode.right);
    }

    callbacks.leaveNode(currentNode);
  }
}
