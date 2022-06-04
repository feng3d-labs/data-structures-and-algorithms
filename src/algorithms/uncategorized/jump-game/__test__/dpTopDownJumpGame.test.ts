import { deepEqual } from 'assert';
import { dpTopDownJumpGame } from '../dpTopDownJumpGame';

describe('dpTopDownJumpGame', () =>
{
  it('should solve Jump Game problem in top-down dynamic programming manner', () =>
  {
    deepEqual(dpTopDownJumpGame([1, 0]), true);
    deepEqual(dpTopDownJumpGame([100, 0]), true);
    deepEqual(dpTopDownJumpGame([2, 3, 1, 1, 4]), true);
    deepEqual(dpTopDownJumpGame([1, 1, 1, 1, 1]), true);
    deepEqual(dpTopDownJumpGame([1, 1, 1, 10, 1]), true);
    deepEqual(dpTopDownJumpGame([1, 5, 2, 1, 0, 2, 0]), true);

    deepEqual(dpTopDownJumpGame([1, 0, 1]), false);
    deepEqual(dpTopDownJumpGame([3, 2, 1, 0, 4]), false);
    deepEqual(dpTopDownJumpGame([0, 0, 0, 0, 0]), false);
    deepEqual(dpTopDownJumpGame([5, 4, 3, 2, 1, 0, 0]), false);
  });
});
