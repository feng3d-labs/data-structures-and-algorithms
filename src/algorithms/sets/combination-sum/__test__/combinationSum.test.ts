import { deepEqual } from 'assert';
import { combinationSum } from '../combinationSum';

describe('combinationSum', () =>
{
  it('should find all combinations with specific sum', () =>
  {
    deepEqual(combinationSum([1], 4), [
      [1, 1, 1, 1],
    ]);

    deepEqual(combinationSum([2, 3, 6, 7], 7), [
      [2, 2, 3],
      [7],
    ]);

    deepEqual(combinationSum([2, 3, 5], 8), [
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ]);

    deepEqual(combinationSum([2, 5], 3), []);

    deepEqual(combinationSum([], 3), []);
  });
});
