import { deepEqual } from 'assert';
import { btUniquePaths } from '../btUniquePaths';

describe('btUniquePaths', () =>
{
  it('should find the number of unique paths on board', () =>
  {
    deepEqual(btUniquePaths(3, 2), 3);
    deepEqual(btUniquePaths(7, 3), 28);
    deepEqual(btUniquePaths(3, 7), 28);
    deepEqual(btUniquePaths(10, 10), 48620);
    deepEqual(btUniquePaths(100, 1), 1);
    deepEqual(btUniquePaths(1, 100), 1);
  });
});
