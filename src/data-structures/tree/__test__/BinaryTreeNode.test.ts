import { deepEqual } from 'assert';
import { BinaryTreeNode } from '../BinaryTreeNode';

describe('BinaryTreeNode', () =>
{
  it('should create node', () =>
  {
    const node = new BinaryTreeNode();

    deepEqual(!!node, true);

    deepEqual(node.value, null);
    deepEqual(node.left, null);
    deepEqual(node.right, null);

    const leftNode = new BinaryTreeNode(1);
    const rightNode = new BinaryTreeNode(3);
    const rootNode = new BinaryTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    deepEqual(rootNode.value, 2);
    deepEqual(rootNode.left.value, 1);
    deepEqual(rootNode.right.value, 3);
  });

  it('should set parent', () =>
  {
    const leftNode = new BinaryTreeNode(1);
    const rightNode = new BinaryTreeNode(3);
    const rootNode = new BinaryTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    deepEqual(rootNode.parent, null);
    deepEqual(rootNode.left.parent.value, 2);
    deepEqual(rootNode.right.parent.value, 2);
    deepEqual(rootNode.right.parent, rootNode);
  });

  it('should traverse node', () =>
  {
    const leftNode = new BinaryTreeNode(1);
    const rightNode = new BinaryTreeNode(3);
    const rootNode = new BinaryTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    deepEqual(rootNode.traverseInOrder(), [1, 2, 3]);

    deepEqual(rootNode.toString(), '1,2,3');
  });

  it('should remove child node', () =>
  {
    const leftNode = new BinaryTreeNode(1);
    const rightNode = new BinaryTreeNode(3);
    const rootNode = new BinaryTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    deepEqual(rootNode.traverseInOrder(), [1, 2, 3]);

    deepEqual(rootNode.removeChild(rootNode.left), true);
    deepEqual(rootNode.traverseInOrder(), [2, 3]);

    deepEqual(rootNode.removeChild(rootNode.right), true);
    deepEqual(rootNode.traverseInOrder(), [2]);

    deepEqual(rootNode.removeChild(rootNode.right), false);
    deepEqual(rootNode.traverseInOrder(), [2]);
  });

  it('should replace child node', () =>
  {
    const leftNode = new BinaryTreeNode(1);
    const rightNode = new BinaryTreeNode(3);
    const rootNode = new BinaryTreeNode(2);

    rootNode
      .setLeft(leftNode)
      .setRight(rightNode);

    deepEqual(rootNode.traverseInOrder(), [1, 2, 3]);

    const replacementNode = new BinaryTreeNode(5);
    rightNode.setRight(replacementNode);

    deepEqual(rootNode.traverseInOrder(), [1, 2, 3, 5]);

    deepEqual(rootNode.replaceChild(rootNode.right, rootNode.right.right), true);
    deepEqual(rootNode.right.value, 5);
    deepEqual(rootNode.right.right, null);
    deepEqual(rootNode.traverseInOrder(), [1, 2, 5]);

    deepEqual(rootNode.replaceChild(rootNode.right, rootNode.right.right), false);
    deepEqual(rootNode.traverseInOrder(), [1, 2, 5]);

    deepEqual(rootNode.replaceChild(rootNode.right, replacementNode), true);
    deepEqual(rootNode.traverseInOrder(), [1, 2, 5]);

    deepEqual(rootNode.replaceChild(rootNode.left, replacementNode), true);
    deepEqual(rootNode.traverseInOrder(), [5, 2, 5]);

    deepEqual(rootNode.replaceChild(new BinaryTreeNode(), new BinaryTreeNode()), false);
  });

  it('should calculate node height', () =>
  {
    const root = new BinaryTreeNode(1);
    const left = new BinaryTreeNode(3);
    const right = new BinaryTreeNode(2);
    const grandLeft = new BinaryTreeNode(5);
    const grandRight = new BinaryTreeNode(6);
    const grandGrandLeft = new BinaryTreeNode(7);

    deepEqual(root.height, 0);
    deepEqual(root.balanceFactor, 0);

    root
      .setLeft(left)
      .setRight(right);

    deepEqual(root.height, 1);
    deepEqual(left.height, 0);
    deepEqual(root.balanceFactor, 0);

    left
      .setLeft(grandLeft)
      .setRight(grandRight);

    deepEqual(root.height, 2);
    deepEqual(left.height, 1);
    deepEqual(grandLeft.height, 0);
    deepEqual(grandRight.height, 0);
    deepEqual(root.balanceFactor, 1);

    grandLeft.setLeft(grandGrandLeft);

    deepEqual(root.height, 3);
    deepEqual(left.height, 2);
    deepEqual(grandLeft.height, 1);
    deepEqual(grandRight.height, 0);
    deepEqual(grandGrandLeft.height, 0);
    deepEqual(root.balanceFactor, 2);
  });

  it('should calculate node height for right nodes as well', () =>
  {
    const root = new BinaryTreeNode(1);
    const right = new BinaryTreeNode(2);

    root.setRight(right);

    deepEqual(root.height, 1);
    deepEqual(right.height, 0);
    deepEqual(root.balanceFactor, -1);
  });

  it('should set null for left and right node', () =>
  {
    const root = new BinaryTreeNode(2);
    const left = new BinaryTreeNode(1);
    const right = new BinaryTreeNode(3);

    root.setLeft(left);
    root.setRight(right);

    deepEqual(root.left.value, 1);
    deepEqual(root.right.value, 3);

    root.setLeft(null);
    root.setRight(null);

    deepEqual(root.left, null);
    deepEqual(root.right, null);
  });

  it('should be possible to create node with object as a value', () =>
  {
    const obj1 = { key: 'object_1', toString: () => 'object_1' };
    const obj2 = { key: 'object_2' };

    const node1 = new BinaryTreeNode(obj1);
    const node2 = new BinaryTreeNode(obj2);

    node1.setLeft(node2);

    deepEqual(node1.value, obj1);
    deepEqual(node2.value, obj2);
    deepEqual(node1.left.value, obj2);

    node1.removeChild(node2);

    deepEqual(node1.value, obj1);
    deepEqual(node2.value, obj2);
    deepEqual(node1.left, null);

    deepEqual(node1.toString(), 'object_1');
    deepEqual(node2.toString(), '[object Object]');
  });

  it('should be possible to attach meta information to the node', () =>
  {
    const redNode = new BinaryTreeNode(1);
    const blackNode = new BinaryTreeNode(2);

    redNode.meta.set('color', 'red');
    blackNode.meta.set('color', 'black');

    deepEqual(redNode.meta.get('color'), 'red');
    deepEqual(blackNode.meta.get('color'), 'black');
  });

  it('should detect right uncle', () =>
  {
    const grandParent = new BinaryTreeNode('grand-parent');
    const parent = new BinaryTreeNode('parent');
    const uncle = new BinaryTreeNode('uncle');
    const child = new BinaryTreeNode('child');

    deepEqual(!grandParent.uncle, true);
    deepEqual(!parent.uncle, true);

    grandParent.setLeft(parent);

    deepEqual(!parent.uncle, true);
    deepEqual(!child.uncle, true);

    parent.setLeft(child);

    deepEqual(!child.uncle, true);

    grandParent.setRight(uncle);

    deepEqual(!parent.uncle, true);
    deepEqual(!!child.uncle, true);
    deepEqual(child.uncle, uncle);
  });

  it('should detect left uncle', () =>
  {
    const grandParent = new BinaryTreeNode('grand-parent');
    const parent = new BinaryTreeNode('parent');
    const uncle = new BinaryTreeNode('uncle');
    const child = new BinaryTreeNode('child');

    deepEqual(!grandParent.uncle, true);
    deepEqual(!parent.uncle, true);

    grandParent.setRight(parent);

    deepEqual(!parent.uncle, true);
    deepEqual(!child.uncle, true);

    parent.setRight(child);

    deepEqual(!child.uncle, true);

    grandParent.setLeft(uncle);

    deepEqual(!parent.uncle, true);
    deepEqual(!!child.uncle, true);
    deepEqual(child.uncle, uncle);
  });

  it('should be possible to set node values', () =>
  {
    const node = new BinaryTreeNode('initial_value');

    deepEqual(node.value, 'initial_value');

    node.setValue('new_value');

    deepEqual(node.value, 'new_value');
  });

  it('should be possible to copy node', () =>
  {
    const root = new BinaryTreeNode('root');
    const left = new BinaryTreeNode('left');
    const right = new BinaryTreeNode('right');

    root
      .setLeft(left)
      .setRight(right);

    deepEqual(root.toString(), 'left,root,right');

    const newRoot = new BinaryTreeNode('new_root');
    const newLeft = new BinaryTreeNode('new_left');
    const newRight = new BinaryTreeNode('new_right');

    newRoot
      .setLeft(newLeft)
      .setRight(newRight);

    deepEqual(newRoot.toString(), 'new_left,new_root,new_right');

    BinaryTreeNode.copyNode(root, newRoot);

    deepEqual(root.toString(), 'left,root,right');
    deepEqual(newRoot.toString(), 'left,root,right');
  });
});
