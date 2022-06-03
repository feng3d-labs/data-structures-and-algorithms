import { deepEqual, throws } from 'assert';
import { BinarySearchTreeNode } from '../BinarySearchTreeNode';

describe('BinarySearchTreeNode', () =>
{
  it('should create binary search tree', () =>
  {
    const bstNode = new BinarySearchTreeNode(2);

    deepEqual(bstNode.value, 2);
    deepEqual(bstNode.left, null);
    deepEqual(bstNode.right, null);
  });

  it('should insert in itself if it is empty', () =>
  {
    const bstNode = new BinarySearchTreeNode();
    bstNode.insert(1);

    deepEqual(bstNode.value, 1);
    deepEqual(bstNode.left, null);
    deepEqual(bstNode.right, null);
  });

  it('should insert nodes in correct order', () =>
  {
    const bstNode = new BinarySearchTreeNode(2);
    const insertedNode1 = bstNode.insert(1);

    deepEqual(insertedNode1.value, 1);
    deepEqual(bstNode.toString(), '1,2');
    deepEqual(bstNode.contains(1), true);
    deepEqual(bstNode.contains(3), false);

    const insertedNode2 = bstNode.insert(3);

    deepEqual(insertedNode2.value, 3);
    deepEqual(bstNode.toString(), '1,2,3');
    deepEqual(bstNode.contains(3), true);
    deepEqual(bstNode.contains(4), false);

    bstNode.insert(7);

    deepEqual(bstNode.toString(), '1,2,3,7');
    deepEqual(bstNode.contains(7), true);
    deepEqual(bstNode.contains(8), false);

    bstNode.insert(4);

    deepEqual(bstNode.toString(), '1,2,3,4,7');
    deepEqual(bstNode.contains(4), true);
    deepEqual(bstNode.contains(8), false);

    bstNode.insert(6);

    deepEqual(bstNode.toString(), '1,2,3,4,6,7');
    deepEqual(bstNode.contains(6), true);
    deepEqual(bstNode.contains(8), false);
  });

  it('should not insert duplicates', () =>
  {
    const bstNode = new BinarySearchTreeNode(2);
    bstNode.insert(1);

    deepEqual(bstNode.toString(), '1,2');
    deepEqual(bstNode.contains(1), true);
    deepEqual(bstNode.contains(3), false);

    bstNode.insert(1);

    deepEqual(bstNode.toString(), '1,2');
    deepEqual(bstNode.contains(1), true);
    deepEqual(bstNode.contains(3), false);
  });

  it('should find min node', () =>
  {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    deepEqual(!!node.findMin(), true);
    deepEqual(node.findMin().value, 1);
  });

  it('should be possible to attach meta information to binary search tree nodes', () =>
  {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    const node1 = node.insert(30);
    node.insert(5);
    node.insert(40);
    const node2 = node.insert(1);

    node.meta.set('color', 'red');
    node1.meta.set('color', 'black');
    node2.meta.set('color', 'white');

    deepEqual(node.meta.get('color'), 'red');

    deepEqual(!!node.findMin(), true);
    deepEqual(node.findMin().value, 1);
    deepEqual(node.findMin().meta.get('color'), 'white');
    deepEqual(node.find(30).meta.get('color'), 'black');
  });

  it('should find node', () =>
  {
    const node = new BinarySearchTreeNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    deepEqual(node.find(6), null);
    deepEqual(!!node.find(5), true);
    deepEqual(node.find(5).value, 5);
  });

  it('should remove leaf nodes', () =>
  {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);

    deepEqual(bstRootNode.toString(), '5,10,20');

    const removed1 = bstRootNode.remove(5);
    deepEqual(bstRootNode.toString(), '10,20');
    deepEqual(removed1, true);

    const removed2 = bstRootNode.remove(20);
    deepEqual(bstRootNode.toString(), '10');
    deepEqual(removed2, true);
  });

  it('should remove nodes with one child', () =>
  {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);

    deepEqual(bstRootNode.toString(), '5,10,20,30');

    bstRootNode.remove(20);
    deepEqual(bstRootNode.toString(), '5,10,30');

    bstRootNode.insert(1);
    deepEqual(bstRootNode.toString(), '1,5,10,30');

    bstRootNode.remove(5);
    deepEqual(bstRootNode.toString(), '1,10,30');
  });

  it('should remove nodes with two children', () =>
  {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);
    bstRootNode.insert(15);
    bstRootNode.insert(25);

    deepEqual(bstRootNode.toString(), '5,10,15,20,25,30');
    deepEqual(bstRootNode.find(20).left.value, 15);
    deepEqual(bstRootNode.find(20).right.value, 30);

    bstRootNode.remove(20);
    deepEqual(bstRootNode.toString(), '5,10,15,25,30');

    bstRootNode.remove(15);
    deepEqual(bstRootNode.toString(), '5,10,25,30');

    bstRootNode.remove(10);
    deepEqual(bstRootNode.toString(), '5,25,30');
    deepEqual(bstRootNode.value, 25);

    bstRootNode.remove(25);
    deepEqual(bstRootNode.toString(), '5,30');

    bstRootNode.remove(5);
    deepEqual(bstRootNode.toString(), '30');
  });

  it('should remove node with no parent', () =>
  {
    const bstRootNode = new BinarySearchTreeNode();
    deepEqual(bstRootNode.toString(), '');

    bstRootNode.insert(1);
    bstRootNode.insert(2);
    deepEqual(bstRootNode.toString(), '1,2');

    bstRootNode.remove(1);
    deepEqual(bstRootNode.toString(), '2');

    bstRootNode.remove(2);
    deepEqual(bstRootNode.toString(), '');
  });

  it('should throw error when trying to remove not existing node', () =>
  {
    const bstRootNode = new BinarySearchTreeNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);

    function removeNotExistingElementFromTree()
    {
      bstRootNode.remove(30);
    }

    throws(removeNotExistingElementFromTree);
  });

  it('should be possible to use objects as node values', () =>
  {
    const nodeValueComparatorCallback = (a, b) =>
    {
      const normalizedA = a || { value: null };
      const normalizedB = b || { value: null };

      if (normalizedA.value === normalizedB.value)
      {
        return 0;
      }

      return normalizedA.value < normalizedB.value ? -1 : 1;
    };

    const obj1 = { key: 'obj1', value: 1, toString: () => 'obj1' };
    const obj2 = { key: 'obj2', value: 2, toString: () => 'obj2' };
    const obj3 = { key: 'obj3', value: 3, toString: () => 'obj3' };

    const bstNode = new BinarySearchTreeNode(obj2, nodeValueComparatorCallback);
    bstNode.insert(obj1);

    deepEqual(bstNode.toString(), 'obj1,obj2');
    deepEqual(bstNode.contains(obj1), true);
    deepEqual(bstNode.contains(obj3), false);

    bstNode.insert(obj3);

    deepEqual(bstNode.toString(), 'obj1,obj2,obj3');
    deepEqual(bstNode.contains(obj3), true);

    deepEqual(bstNode.findMin().value, obj1);
  });

  it('should abandon removed node', () =>
  {
    const rootNode = new BinarySearchTreeNode('foo');
    rootNode.insert('bar');
    const childNode = rootNode.find('bar');
    rootNode.remove('bar');

    deepEqual(childNode.parent, null);
  });
});
