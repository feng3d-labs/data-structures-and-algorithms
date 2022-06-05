import { deepEqual } from 'assert';
import { dcMaximumSubarraySum } from '../dcMaximumSubarraySum';

describe('dcMaximumSubarraySum', () =>
{
  it('should find maximum subarray sum using the divide and conquer algorithm', () =>
  {
    deepEqual(dcMaximumSubarraySum([]), -Infinity);
    deepEqual(dcMaximumSubarraySum([0, 0]), 0);
    deepEqual(dcMaximumSubarraySum([0, 0, 1]), 1);
    deepEqual(dcMaximumSubarraySum([0, 0, 1, 2]), 3);
    deepEqual(dcMaximumSubarraySum([0, 0, -1, 2]), 2);
    deepEqual(dcMaximumSubarraySum([-1, -2, -3, -4, -5]), -1);
    deepEqual(dcMaximumSubarraySum([1, 2, 3, 2, 3, 4, 5]), 20);
    deepEqual(dcMaximumSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
    deepEqual(dcMaximumSubarraySum([-2, -3, 4, -1, -2, 1, 5, -3]), 7);
    deepEqual(dcMaximumSubarraySum([1, -3, 2, -5, 7, 6, -1, 4, 11, -23]), 27);
  });
});
