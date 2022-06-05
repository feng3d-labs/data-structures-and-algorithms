import { deepEqual } from 'assert';
import { dpMaximumSubarray } from '../dpMaximumSubarray';

describe('dpMaximumSubarray', () =>
{
  it('should find maximum subarray using the dynamic programming algorithm', () =>
  {
    deepEqual(dpMaximumSubarray([]), []);
    deepEqual(dpMaximumSubarray([0, 0]), [0]);
    deepEqual(dpMaximumSubarray([0, 0, 1]), [0, 0, 1]);
    deepEqual(dpMaximumSubarray([0, 0, 1, 2]), [0, 0, 1, 2]);
    deepEqual(dpMaximumSubarray([0, 0, -1, 2]), [2]);
    deepEqual(dpMaximumSubarray([-1, -2, -3, -4, -5]), [-1]);
    deepEqual(dpMaximumSubarray([1, 2, 3, 2, 3, 4, 5]), [1, 2, 3, 2, 3, 4, 5]);
    deepEqual(dpMaximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), [4, -1, 2, 1]);
    deepEqual(dpMaximumSubarray([-2, -3, 4, -1, -2, 1, 5, -3]), [4, -1, -2, 1, 5]);
    deepEqual(dpMaximumSubarray([1, -3, 2, -5, 7, 6, -1, 4, 11, -23]), [7, 6, -1, 4, 11]);
  });
});
