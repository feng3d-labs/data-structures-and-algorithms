import { deepEqual } from 'assert';
import { dpUniquePaths } from '../dpUniquePaths';

describe('dpUniquePaths', () =>
{
  it('should find the number of unique paths on board', () =>
  {
    deepEqual(dpUniquePaths(3, 2), 3);
    deepEqual(dpUniquePaths(7, 3), 28);
    deepEqual(dpUniquePaths(3, 7), 28);
    deepEqual(dpUniquePaths(10, 10), 48620);
    deepEqual(dpUniquePaths(100, 1), 1);
    deepEqual(dpUniquePaths(1, 100), 1);
  });
});
