import { deepEqual } from 'assert';
import { dpBottomUpJumpGame } from '../dpBottomUpJumpGame';

describe('dpBottomUpJumpGame', () =>
{
  it('should solve Jump Game problem in bottom-up dynamic programming manner', () =>
  {
    deepEqual(dpBottomUpJumpGame([1, 0]), true);
    deepEqual(dpBottomUpJumpGame([100, 0]), true);
    deepEqual(dpBottomUpJumpGame([2, 3, 1, 1, 4]), true);
    deepEqual(dpBottomUpJumpGame([1, 1, 1, 1, 1]), true);
    deepEqual(dpBottomUpJumpGame([1, 1, 1, 10, 1]), true);
    deepEqual(dpBottomUpJumpGame([1, 5, 2, 1, 0, 2, 0]), true);

    deepEqual(dpBottomUpJumpGame([1, 0, 1]), false);
    deepEqual(dpBottomUpJumpGame([3, 2, 1, 0, 4]), false);
    deepEqual(dpBottomUpJumpGame([0, 0, 0, 0, 0]), false);
    deepEqual(dpBottomUpJumpGame([5, 4, 3, 2, 1, 0, 0]), false);
  });
});
