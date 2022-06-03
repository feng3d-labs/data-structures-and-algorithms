import { deepEqual, throws } from 'assert';
import { RedBlackTree } from '../RedBlackTree';

describe('RedBlackTree', () =>
{
  it('should always color first inserted node as black', () =>
  {
    const tree = new RedBlackTree();

    const firstInsertedNode = tree.insert(10);

    deepEqual(tree.isNodeColored(firstInsertedNode), true);
    deepEqual(tree.isNodeBlack(firstInsertedNode), true);
    deepEqual(tree.isNodeRed(firstInsertedNode), false);

    deepEqual(tree.toString(), '10');
    deepEqual(tree.root.height, 0);
  });

  it('should always color new leaf node as red', () =>
  {
    const tree = new RedBlackTree();

    const firstInsertedNode = tree.insert(10);
    const secondInsertedNode = tree.insert(15);
    const thirdInsertedNode = tree.insert(5);

    deepEqual(tree.isNodeBlack(firstInsertedNode), true);
    deepEqual(tree.isNodeRed(secondInsertedNode), true);
    deepEqual(tree.isNodeRed(thirdInsertedNode), true);

    deepEqual(tree.toString(), '5,10,15');
    deepEqual(tree.root.height, 1);
  });

  it('should balance itself', () =>
  {
    const tree = new RedBlackTree();

    tree.insert(5);
    tree.insert(10);
    tree.insert(15);
    tree.insert(20);
    tree.insert(25);
    tree.insert(30);

    deepEqual(tree.toString(), '5,10,15,20,25,30');
    deepEqual(tree.root.height, 3);
  });

  it('should balance itself when parent is black', () =>
  {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);

    deepEqual(tree.isNodeBlack(node1), true);

    const node2 = tree.insert(-10);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeRed(node2), true);

    const node3 = tree.insert(20);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeRed(node2), true);
    deepEqual(tree.isNodeRed(node3), true);

    const node4 = tree.insert(-20);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeRed(node4), true);

    const node5 = tree.insert(25);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node5), true);

    const node6 = tree.insert(6);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node5), true);
    deepEqual(tree.isNodeRed(node6), true);

    deepEqual(tree.toString(), '-20,-10,6,10,20,25');
    deepEqual(tree.root.height, 2);

    const node7 = tree.insert(4);

    deepEqual(tree.root.left.value, node2.value);

    deepEqual(tree.toString(), '-20,-10,4,6,10,20,25');
    deepEqual(tree.root.height, 3);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeRed(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeBlack(node4), true);
    deepEqual(tree.isNodeBlack(node4), true);
    deepEqual(tree.isNodeRed(node5), true);
    deepEqual(tree.isNodeBlack(node6), true);
    deepEqual(tree.isNodeRed(node7), true);
  });

  it('should balance itself when uncle is red', () =>
  {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(-20);
    const node5 = tree.insert(6);
    const node6 = tree.insert(15);
    const node7 = tree.insert(25);
    const node8 = tree.insert(2);
    const node9 = tree.insert(8);

    deepEqual(tree.toString(), '-20,-10,2,6,8,10,15,20,25');
    deepEqual(tree.root.height, 3);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeRed(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeBlack(node4), true);
    deepEqual(tree.isNodeBlack(node5), true);
    deepEqual(tree.isNodeRed(node6), true);
    deepEqual(tree.isNodeRed(node7), true);
    deepEqual(tree.isNodeRed(node8), true);
    deepEqual(tree.isNodeRed(node9), true);

    const node10 = tree.insert(4);

    deepEqual(tree.toString(), '-20,-10,2,4,6,8,10,15,20,25');
    deepEqual(tree.root.height, 3);

    deepEqual(tree.root.value, node5.value);

    deepEqual(tree.isNodeBlack(node5), true);
    deepEqual(tree.isNodeRed(node1), true);
    deepEqual(tree.isNodeRed(node2), true);
    deepEqual(tree.isNodeRed(node10), true);
    deepEqual(tree.isNodeRed(node6), true);
    deepEqual(tree.isNodeRed(node7), true);
    deepEqual(tree.isNodeBlack(node4), true);
    deepEqual(tree.isNodeBlack(node8), true);
    deepEqual(tree.isNodeBlack(node9), true);
    deepEqual(tree.isNodeBlack(node3), true);
  });

  it('should do left-left rotation', () =>
  {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(7);
    const node5 = tree.insert(15);

    deepEqual(tree.toString(), '-10,7,10,15,20');
    deepEqual(tree.root.height, 2);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node5), true);

    const node6 = tree.insert(13);

    deepEqual(tree.toString(), '-10,7,10,13,15,20');
    deepEqual(tree.root.height, 2);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node5), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node6), true);
    deepEqual(tree.isNodeRed(node3), true);
  });

  it('should do left-right rotation', () =>
  {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(7);
    const node5 = tree.insert(15);

    deepEqual(tree.toString(), '-10,7,10,15,20');
    deepEqual(tree.root.height, 2);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node5), true);

    const node6 = tree.insert(17);

    deepEqual(tree.toString(), '-10,7,10,15,17,20');
    deepEqual(tree.root.height, 2);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node6), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node5), true);
    deepEqual(tree.isNodeRed(node3), true);
  });

  it('should do recoloring, left-left and left-right rotation', () =>
  {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(-20);
    const node5 = tree.insert(6);
    const node6 = tree.insert(15);
    const node7 = tree.insert(30);
    const node8 = tree.insert(1);
    const node9 = tree.insert(9);

    deepEqual(tree.toString(), '-20,-10,1,6,9,10,15,20,30');
    deepEqual(tree.root.height, 3);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeRed(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeBlack(node4), true);
    deepEqual(tree.isNodeBlack(node5), true);
    deepEqual(tree.isNodeRed(node6), true);
    deepEqual(tree.isNodeRed(node7), true);
    deepEqual(tree.isNodeRed(node8), true);
    deepEqual(tree.isNodeRed(node9), true);

    tree.insert(4);

    deepEqual(tree.toString(), '-20,-10,1,4,6,9,10,15,20,30');
    deepEqual(tree.root.height, 3);
  });

  it('should do right-left rotation', () =>
  {
    const tree = new RedBlackTree();

    const node1 = tree.insert(10);
    const node2 = tree.insert(-10);
    const node3 = tree.insert(20);
    const node4 = tree.insert(-20);
    const node5 = tree.insert(6);
    const node6 = tree.insert(30);

    deepEqual(tree.toString(), '-20,-10,6,10,20,30');
    deepEqual(tree.root.height, 2);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node3), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node5), true);
    deepEqual(tree.isNodeRed(node6), true);

    const node7 = tree.insert(25);

    const rightNode = tree.root.right;
    const rightLeftNode = rightNode.left;
    const rightRightNode = rightNode.right;

    deepEqual(rightNode.value, node7.value);
    deepEqual(rightLeftNode.value, node3.value);
    deepEqual(rightRightNode.value, node6.value);

    deepEqual(tree.toString(), '-20,-10,6,10,20,25,30');
    deepEqual(tree.root.height, 2);

    deepEqual(tree.isNodeBlack(node1), true);
    deepEqual(tree.isNodeBlack(node2), true);
    deepEqual(tree.isNodeBlack(node7), true);
    deepEqual(tree.isNodeRed(node4), true);
    deepEqual(tree.isNodeRed(node5), true);
    deepEqual(tree.isNodeRed(node3), true);
    deepEqual(tree.isNodeRed(node6), true);
  });

  it('should do left-left rotation with left grand-parent', () =>
  {
    const tree = new RedBlackTree();

    tree.insert(20);
    tree.insert(15);
    tree.insert(25);
    tree.insert(10);
    tree.insert(5);

    deepEqual(tree.toString(), '5,10,15,20,25');
    deepEqual(tree.root.height, 2);
  });

  it('should do right-right rotation with left grand-parent', () =>
  {
    const tree = new RedBlackTree();

    tree.insert(20);
    tree.insert(15);
    tree.insert(25);
    tree.insert(17);
    tree.insert(19);

    deepEqual(tree.toString(), '15,17,19,20,25');
    deepEqual(tree.root.height, 2);
  });

  it('should throw an error when trying to remove node', () =>
  {
    const removeNodeFromRedBlackTree = () =>
    {
      const tree = new RedBlackTree();

      tree.remove(1);
    };

    throws(removeNodeFromRedBlackTree);
  });
});
