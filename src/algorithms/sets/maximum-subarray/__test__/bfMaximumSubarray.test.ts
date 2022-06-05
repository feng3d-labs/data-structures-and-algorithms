import { deepEqual } from 'assert';
import { bfMaximumSubarray } from '../bfMaximumSubarray';

describe('bfMaximumSubarray', () =>
{
  it('should find maximum subarray using the brute force algorithm', () =>
  {
    deepEqual(bfMaximumSubarray([]), []);
    deepEqual(bfMaximumSubarray([0, 0]), [0]);
    deepEqual(bfMaximumSubarray([0, 0, 1]), [0, 0, 1]);
    deepEqual(bfMaximumSubarray([0, 0, 1, 2]), [0, 0, 1, 2]);
    deepEqual(bfMaximumSubarray([0, 0, -1, 2]), [2]);
    deepEqual(bfMaximumSubarray([-1, -2, -3, -4, -5]), [-1]);
    deepEqual(bfMaximumSubarray([1, 2, 3, 2, 3, 4, 5]), [1, 2, 3, 2, 3, 4, 5]);
    deepEqual(bfMaximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), [4, -1, 2, 1]);
    deepEqual(bfMaximumSubarray([-2, -3, 4, -1, -2, 1, 5, -3]), [4, -1, -2, 1, 5]);
    deepEqual(bfMaximumSubarray([1, -3, 2, -5, 7, 6, -1, 4, 11, -23]), [7, 6, -1, 4, 11]);
  });
});
