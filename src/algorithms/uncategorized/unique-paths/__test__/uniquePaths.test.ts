import { deepEqual } from 'assert';
import { uniquePaths } from '../uniquePaths';

describe('uniquePaths', () =>
{
  it('should find the number of unique paths on board', () =>
  {
    deepEqual(uniquePaths(3, 2), 3);
    deepEqual(uniquePaths(7, 3), 28);
    deepEqual(uniquePaths(3, 7), 28);
    deepEqual(uniquePaths(10, 10), 48620);
    deepEqual(uniquePaths(100, 1), 1);
    deepEqual(uniquePaths(1, 100), 1);
  });
});
