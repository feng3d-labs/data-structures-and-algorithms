import { deepEqual } from 'assert';
import { BinaryTreeNode } from '../../../../data-structures/tree/BinaryTreeNode';
import { breadthFirstSearch } from '../breadthFirstSearch';

describe('breadthFirstSearch', () =>
{
  it('should perform BFS operation on tree', () =>
  {
    const nodeA = new BinaryTreeNode('A');
    const nodeB = new BinaryTreeNode('B');
    const nodeC = new BinaryTreeNode('C');
    const nodeD = new BinaryTreeNode('D');
    const nodeE = new BinaryTreeNode('E');
    const nodeF = new BinaryTreeNode('F');
    const nodeG = new BinaryTreeNode('G');

    nodeA.setLeft(nodeB).setRight(nodeC);
    nodeB.setLeft(nodeD).setRight(nodeE);
    nodeC.setLeft(nodeF).setRight(nodeG);

    // In-order traversing.
    deepEqual(nodeA.toString(), 'D,B,E,A,F,C,G');

    let enterNodeCallbackTimes = 0;
    const enterNodeCallbackCalls = [];
    const enterNodeCallback = (...args: any) =>
    {
      enterNodeCallbackTimes++;
      enterNodeCallbackCalls.push(args);
    };

    let leaveNodeCallbackTimes = 0;
    const leaveNodeCallbackCalls = [];
    const leaveNodeCallback = (...args: any) =>
    {
      leaveNodeCallbackTimes++;
      leaveNodeCallbackCalls.push(args);
    };

    // Traverse tree without callbacks first to check default ones.
    breadthFirstSearch(nodeA);

    // Traverse tree with callbacks.
    breadthFirstSearch(nodeA, {
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
    });

    deepEqual(enterNodeCallbackTimes, 7);
    deepEqual(leaveNodeCallbackTimes, 7);

    // Check node entering.
    deepEqual(enterNodeCallbackCalls[0][0].value, 'A');
    deepEqual(enterNodeCallbackCalls[1][0].value, 'B');
    deepEqual(enterNodeCallbackCalls[2][0].value, 'C');
    deepEqual(enterNodeCallbackCalls[3][0].value, 'D');
    deepEqual(enterNodeCallbackCalls[4][0].value, 'E');
    deepEqual(enterNodeCallbackCalls[5][0].value, 'F');
    deepEqual(enterNodeCallbackCalls[6][0].value, 'G');

    // Check node leaving.
    deepEqual(leaveNodeCallbackCalls[0][0].value, 'A');
    deepEqual(leaveNodeCallbackCalls[1][0].value, 'B');
    deepEqual(leaveNodeCallbackCalls[2][0].value, 'C');
    deepEqual(leaveNodeCallbackCalls[3][0].value, 'D');
    deepEqual(leaveNodeCallbackCalls[4][0].value, 'E');
    deepEqual(leaveNodeCallbackCalls[5][0].value, 'F');
    deepEqual(leaveNodeCallbackCalls[6][0].value, 'G');
  });

  it('allow users to redefine node visiting logic', () =>
  {
    const nodeA = new BinaryTreeNode('A');
    const nodeB = new BinaryTreeNode('B');
    const nodeC = new BinaryTreeNode('C');
    const nodeD = new BinaryTreeNode('D');
    const nodeE = new BinaryTreeNode('E');
    const nodeF = new BinaryTreeNode('F');
    const nodeG = new BinaryTreeNode('G');

    nodeA.setLeft(nodeB).setRight(nodeC);
    nodeB.setLeft(nodeD).setRight(nodeE);
    nodeC.setLeft(nodeF).setRight(nodeG);

    // In-order traversing.
    deepEqual(nodeA.toString(), 'D,B,E,A,F,C,G');

    let enterNodeCallbackTimes = 0;
    const enterNodeCallbackCalls = [];
    const enterNodeCallback = (...args: any) =>
    {
      enterNodeCallbackTimes++;
      enterNodeCallbackCalls.push(args);
    };

    let leaveNodeCallbackTimes = 0;
    const leaveNodeCallbackCalls = [];
    const leaveNodeCallback = (...args: any) =>
    {
      leaveNodeCallbackTimes++;
      leaveNodeCallbackCalls.push(args);
    };

    // Traverse tree without callbacks first to check default ones.
    breadthFirstSearch(nodeA);

    // Traverse tree with callbacks.
    breadthFirstSearch(nodeA, {
      allowTraversal: (node, child) =>

        // Forbid traversing left half of the tree.
        child.value !== 'B',
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
    });

    deepEqual(enterNodeCallbackTimes, 4);
    deepEqual(leaveNodeCallbackTimes, 4);

    // Check node entering.
    deepEqual(enterNodeCallbackCalls[0][0].value, 'A');
    deepEqual(enterNodeCallbackCalls[1][0].value, 'C');
    deepEqual(enterNodeCallbackCalls[2][0].value, 'F');
    deepEqual(enterNodeCallbackCalls[3][0].value, 'G');

    // Check node leaving.
    deepEqual(leaveNodeCallbackCalls[0][0].value, 'A');
    deepEqual(leaveNodeCallbackCalls[1][0].value, 'C');
    deepEqual(leaveNodeCallbackCalls[2][0].value, 'F');
    deepEqual(leaveNodeCallbackCalls[3][0].value, 'G');
  });
});
