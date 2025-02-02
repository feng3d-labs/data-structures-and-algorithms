import { deepEqual } from 'assert';
import { dpLongestIncreasingSubsequence } from '../dpLongestIncreasingSubsequence';

describe('dpLongestIncreasingSubsequence', () =>
{
  it('should find longest increasing subsequence length', () =>
  {
    // Should be:
    // 9 or
    // 8 or
    // 7 or
    // 6 or
    // ...
    deepEqual(dpLongestIncreasingSubsequence([
      9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
    ]), 1);

    // Should be:
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    deepEqual(dpLongestIncreasingSubsequence([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]), 10);

    // Should be:
    // -1, 0, 2, 3
    deepEqual(dpLongestIncreasingSubsequence([
      3, 4, -1, 0, 6, 2, 3,
    ]), 4);

    // Should be:
    // 0, 2, 6, 9, 11, 15 or
    // 0, 4, 6, 9, 11, 15 or
    // 0, 2, 6, 9, 13, 15 or
    // 0, 4, 6, 9, 13, 15
    deepEqual(dpLongestIncreasingSubsequence([
      0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15,
    ]), 6);
  });
});
