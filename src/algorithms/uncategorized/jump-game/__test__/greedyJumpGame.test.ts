import { deepEqual } from 'assert';
import { greedyJumpGame } from '../greedyJumpGame';

describe('greedyJumpGame', () =>
{
  it('should solve Jump Game problem in greedy manner', () =>
  {
    deepEqual(greedyJumpGame([1, 0]), true);
    deepEqual(greedyJumpGame([100, 0]), true);
    deepEqual(greedyJumpGame([2, 3, 1, 1, 4]), true);
    deepEqual(greedyJumpGame([1, 1, 1, 1, 1]), true);
    deepEqual(greedyJumpGame([1, 1, 1, 10, 1]), true);
    deepEqual(greedyJumpGame([1, 5, 2, 1, 0, 2, 0]), true);

    deepEqual(greedyJumpGame([1, 0, 1]), false);
    deepEqual(greedyJumpGame([3, 2, 1, 0, 4]), false);
    deepEqual(greedyJumpGame([0, 0, 0, 0, 0]), false);
    deepEqual(greedyJumpGame([5, 4, 3, 2, 1, 0, 0]), false);
  });
});
