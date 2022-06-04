import { deepEqual } from 'assert';
import { backtrackingJumpGame } from '../backtrackingJumpGame';

describe('backtrackingJumpGame', () =>
{
  it('should solve Jump Game problem in backtracking manner', () =>
  {
    deepEqual(backtrackingJumpGame([1, 0]), true);
    deepEqual(backtrackingJumpGame([100, 0]), true);
    deepEqual(backtrackingJumpGame([2, 3, 1, 1, 4]), true);
    deepEqual(backtrackingJumpGame([1, 1, 1, 1, 1]), true);
    deepEqual(backtrackingJumpGame([1, 1, 1, 10, 1]), true);
    deepEqual(backtrackingJumpGame([1, 5, 2, 1, 0, 2, 0]), true);

    deepEqual(backtrackingJumpGame([1, 0, 1]), false);
    deepEqual(backtrackingJumpGame([3, 2, 1, 0, 4]), false);
    deepEqual(backtrackingJumpGame([0, 0, 0, 0, 0]), false);
    deepEqual(backtrackingJumpGame([5, 4, 3, 2, 1, 0, 0]), false);
  });
});
