import { deepEqual } from 'assert';
import { AvlTree } from '../AvlTree';

describe('AvlTree', () =>
{
  it('should do simple left-left rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(4);
    tree.insert(3);
    tree.insert(2);

    deepEqual(tree.toString(), '2,3,4');
    deepEqual(tree.root.value, 3);
    deepEqual(tree.root.height, 1);

    tree.insert(1);

    deepEqual(tree.toString(), '1,2,3,4');
    deepEqual(tree.root.value, 3);
    deepEqual(tree.root.height, 2);

    tree.insert(0);

    deepEqual(tree.toString(), '0,1,2,3,4');
    deepEqual(tree.root.value, 3);
    deepEqual(tree.root.left.value, 1);
    deepEqual(tree.root.height, 2);
  });

  it('should do complex left-left rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(10);

    deepEqual(tree.root.value, 30);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '10,20,30,40');

    tree.insert(25);
    deepEqual(tree.root.value, 30);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '10,20,25,30,40');

    tree.insert(5);
    deepEqual(tree.root.value, 20);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '5,10,20,25,30,40');
  });

  it('should do simple right-right rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(2);
    tree.insert(3);
    tree.insert(4);

    deepEqual(tree.toString(), '2,3,4');
    deepEqual(tree.root.value, 3);
    deepEqual(tree.root.height, 1);

    tree.insert(5);

    deepEqual(tree.toString(), '2,3,4,5');
    deepEqual(tree.root.value, 3);
    deepEqual(tree.root.height, 2);

    tree.insert(6);

    deepEqual(tree.toString(), '2,3,4,5,6');
    deepEqual(tree.root.value, 3);
    deepEqual(tree.root.right.value, 5);
    deepEqual(tree.root.height, 2);
  });

  it('should do complex right-right rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(50);

    deepEqual(tree.root.value, 30);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '20,30,40,50');

    tree.insert(35);
    deepEqual(tree.root.value, 30);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '20,30,35,40,50');

    tree.insert(55);
    deepEqual(tree.root.value, 40);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '20,30,35,40,50,55');
  });

  it('should do left-right rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(20);
    tree.insert(25);

    deepEqual(tree.root.height, 1);
    deepEqual(tree.root.value, 25);
    deepEqual(tree.toString(), '20,25,30');
  });

  it('should do right-left rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(40);
    tree.insert(35);

    deepEqual(tree.root.height, 1);
    deepEqual(tree.root.value, 35);
    deepEqual(tree.toString(), '30,35,40');
  });

  it('should create balanced tree: case #1', () =>
  {
    // @see: https://www.youtube.com/watch?v=rbg7Qf8GkQ4&t=839s
    const tree = new AvlTree();

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    deepEqual(tree.root.value, 2);
    deepEqual(tree.root.height, 1);
    deepEqual(tree.toString(), '1,2,3');

    tree.insert(6);

    deepEqual(tree.root.value, 2);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '1,2,3,6');

    tree.insert(15);

    deepEqual(tree.root.value, 2);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '1,2,3,6,15');

    tree.insert(-2);

    deepEqual(tree.root.value, 2);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '-2,1,2,3,6,15');

    tree.insert(-5);

    deepEqual(tree.root.value, 2);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '-5,-2,1,2,3,6,15');

    tree.insert(-8);

    deepEqual(tree.root.value, 2);
    deepEqual(tree.root.height, 3);
    deepEqual(tree.toString(), '-8,-5,-2,1,2,3,6,15');
  });

  it('should create balanced tree: case #2', () =>
  {
    // @see https://www.youtube.com/watch?v=7m94k2Qhg68
    const tree = new AvlTree();

    tree.insert(43);
    tree.insert(18);
    tree.insert(22);
    tree.insert(9);
    tree.insert(21);
    tree.insert(6);

    deepEqual(tree.root.value, 18);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '6,9,18,21,22,43');

    tree.insert(8);

    deepEqual(tree.root.value, 18);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.toString(), '6,8,9,18,21,22,43');
  });

  it('should do left right rotation and keeping left right node safe', () =>
  {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(15);
    tree.insert(40);
    tree.insert(10);
    tree.insert(18);
    tree.insert(35);
    tree.insert(45);
    tree.insert(5);
    tree.insert(12);

    deepEqual(tree.toString(), '5,10,12,15,18,30,35,40,45');
    deepEqual(tree.root.height, 3);

    tree.insert(11);

    deepEqual(tree.toString(), '5,10,11,12,15,18,30,35,40,45');
    deepEqual(tree.root.height, 3);
  });

  it('should do left right rotation and keeping left right node safe', () =>
  {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(15);
    tree.insert(40);
    tree.insert(10);
    tree.insert(18);
    tree.insert(35);
    tree.insert(45);
    tree.insert(42);
    tree.insert(47);

    deepEqual(tree.toString(), '10,15,18,30,35,40,42,45,47');
    deepEqual(tree.root.height, 3);

    tree.insert(43);

    deepEqual(tree.toString(), '10,15,18,30,35,40,42,43,45,47');
    deepEqual(tree.root.height, 3);
  });

  it('should remove values from the tree with right-right rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(40);

    deepEqual(tree.toString(), '10,20,30,40');

    tree.remove(10);

    deepEqual(tree.toString(), '20,30,40');
    deepEqual(tree.root.value, 30);
    deepEqual(tree.root.left.value, 20);
    deepEqual(tree.root.right.value, 40);
    deepEqual(tree.root.balanceFactor, 0);
  });

  it('should remove values from the tree with left-left rotation', () =>
  {
    const tree = new AvlTree();

    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(5);

    deepEqual(tree.toString(), '5,10,20,30');

    tree.remove(30);

    deepEqual(tree.toString(), '5,10,20');
    deepEqual(tree.root.value, 10);
    deepEqual(tree.root.left.value, 5);
    deepEqual(tree.root.right.value, 20);
    deepEqual(tree.root.balanceFactor, 0);
  });

  it('should keep balance after removal', () =>
  {
    const tree = new AvlTree();

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);
    tree.insert(9);

    deepEqual(tree.toString(), '1,2,3,4,5,6,7,8,9');
    deepEqual(tree.root.value, 4);
    deepEqual(tree.root.height, 3);
    deepEqual(tree.root.balanceFactor, -1);

    tree.remove(8);

    deepEqual(tree.root.value, 4);
    deepEqual(tree.root.balanceFactor, -1);

    tree.remove(9);

    deepEqual(tree.contains(8), false);
    deepEqual(tree.contains(9), false);
    deepEqual(tree.toString(), '1,2,3,4,5,6,7');
    deepEqual(tree.root.value, 4);
    deepEqual(tree.root.height, 2);
    deepEqual(tree.root.balanceFactor, 0);
  });
});
