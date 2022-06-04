import { deepEqual } from 'assert';
import { BinaryTreeNode } from '../../../../data-structures/tree/BinaryTreeNode';
import { depthFirstSearch1 } from '../depthFirstSearch';

describe('depthFirstSearch', () =>
{
  it('should perform DFS operation on tree', () =>
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
    depthFirstSearch1(nodeA);

    // Traverse tree with callbacks.
    depthFirstSearch1(nodeA, {
      enterNode: enterNodeCallback,
      leaveNode: leaveNodeCallback,
    });

    deepEqual(enterNodeCallbackTimes, 7);
    deepEqual(leaveNodeCallbackTimes, 7);

    // Check node entering.
    deepEqual(enterNodeCallbackCalls[0][0].value, 'A');
    deepEqual(enterNodeCallbackCalls[1][0].value, 'B');
    deepEqual(enterNodeCallbackCalls[2][0].value, 'D');
    deepEqual(enterNodeCallbackCalls[3][0].value, 'E');
    deepEqual(enterNodeCallbackCalls[4][0].value, 'C');
    deepEqual(enterNodeCallbackCalls[5][0].value, 'F');
    deepEqual(enterNodeCallbackCalls[6][0].value, 'G');

    // Check node leaving.
    deepEqual(leaveNodeCallbackCalls[0][0].value, 'D');
    deepEqual(leaveNodeCallbackCalls[1][0].value, 'E');
    deepEqual(leaveNodeCallbackCalls[2][0].value, 'B');
    deepEqual(leaveNodeCallbackCalls[3][0].value, 'F');
    deepEqual(leaveNodeCallbackCalls[4][0].value, 'G');
    deepEqual(leaveNodeCallbackCalls[5][0].value, 'C');
    deepEqual(leaveNodeCallbackCalls[6][0].value, 'A');
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
    depthFirstSearch1(nodeA);

    // Traverse tree with callbacks.
    depthFirstSearch1(nodeA, {
      // Forbid traversing left part of the tree.
      allowTraversal: (node, child) => child.value !== 'B',
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
    deepEqual(leaveNodeCallbackCalls[0][0].value, 'F');
    deepEqual(leaveNodeCallbackCalls[1][0].value, 'G');
    deepEqual(leaveNodeCallbackCalls[2][0].value, 'C');
    deepEqual(leaveNodeCallbackCalls[3][0].value, 'A');
  });
});
