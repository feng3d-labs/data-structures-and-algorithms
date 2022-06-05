import { deepEqual } from 'assert';
import { longestCommonSubsequence } from '../longestCommonSubsequence';

describe('longestCommonSubsequence', () =>
{
  it('should find longest common subsequence for two strings', () =>
  {
    deepEqual(longestCommonSubsequence([''], ['']), ['']);

    deepEqual(longestCommonSubsequence([''], ['A', 'B', 'C']), ['']);

    deepEqual(longestCommonSubsequence(['A', 'B', 'C'], ['']), ['']);

    deepEqual(longestCommonSubsequence(
      ['A', 'B', 'C'],
      ['D', 'E', 'F', 'G'],
    ), ['']);

    deepEqual(longestCommonSubsequence(
      ['A', 'B', 'C', 'D', 'G', 'H'],
      ['A', 'E', 'D', 'F', 'H', 'R'],
    ), ['A', 'D', 'H']);

    deepEqual(longestCommonSubsequence(
      ['A', 'G', 'G', 'T', 'A', 'B'],
      ['G', 'X', 'T', 'X', 'A', 'Y', 'B'],
    ), ['G', 'T', 'A', 'B']);

    deepEqual(longestCommonSubsequence(
      ['A', 'B', 'C', 'D', 'A', 'F'],
      ['A', 'C', 'B', 'C', 'F'],
    ), ['A', 'B', 'C', 'F']);
  });
});
