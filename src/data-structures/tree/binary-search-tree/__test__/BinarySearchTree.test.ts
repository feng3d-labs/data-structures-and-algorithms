import { deepEqual } from 'assert';
import { BinarySearchTree } from '../BinarySearchTree';

describe('BinarySearchTree', () =>
{
  it('should create binary search tree', () =>
  {
    const bst = new BinarySearchTree();

    deepEqual(!!bst, true);
    deepEqual(!!bst.root, true);
    deepEqual(bst.root.value, null);
    deepEqual(bst.root.left, null);
    deepEqual(bst.root.right, null);
  });

  it('should insert values', () =>
  {
    const bst = new BinarySearchTree();

    const insertedNode1 = bst.insert(10);
    const insertedNode2 = bst.insert(20);
    bst.insert(5);

    deepEqual(bst.toString(), '5,10,20');
    deepEqual(insertedNode1.value, 10);
    deepEqual(insertedNode2.value, 20);
  });

  it('should check if value exists', () =>
  {
    const bst = new BinarySearchTree();

    bst.insert(10);
    bst.insert(20);
    bst.insert(5);

    deepEqual(bst.contains(20), true);
    deepEqual(bst.contains(40), false);
  });

  it('should remove nodes', () =>
  {
    const bst = new BinarySearchTree();

    bst.insert(10);
    bst.insert(20);
    bst.insert(5);

    deepEqual(bst.toString(), '5,10,20');

    const removed1 = bst.remove(5);
    deepEqual(bst.toString(), '10,20');
    deepEqual(removed1, true);

    const removed2 = bst.remove(20);
    deepEqual(bst.toString(), '10');
    deepEqual(removed2, true);
  });

  it('should insert object values', () =>
  {
    const nodeValueCompareFunction = (a, b) =>
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

    const bst = new BinarySearchTree(nodeValueCompareFunction);

    bst.insert(obj2);
    bst.insert(obj3);
    bst.insert(obj1);

    deepEqual(bst.toString(), 'obj1,obj2,obj3');
  });

  it('should be traversed to sorted array', () =>
  {
    const bst = new BinarySearchTree();

    bst.insert(10);
    bst.insert(-10);
    bst.insert(20);
    bst.insert(-20);
    bst.insert(25);
    bst.insert(6);

    deepEqual(bst.toString(), '-20,-10,6,10,20,25');
    deepEqual(bst.root.height, 2);

    bst.insert(4);

    deepEqual(bst.toString(), '-20,-10,4,6,10,20,25');
    deepEqual(bst.root.height, 3);
  });
});
