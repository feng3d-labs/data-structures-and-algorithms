import { deepEqual } from 'assert';
import { shortestCommonSupersequence } from '../shortestCommonSupersequence';

describe('shortestCommonSupersequence', () =>
{
  it('should find shortest common supersequence of two sequences', () =>
  {
    // LCS (longest common subsequence) is empty
    deepEqual(shortestCommonSupersequence(
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
    ), ['A', 'B', 'C', 'D', 'E', 'F']);

    // LCS (longest common subsequence) is "EE"
    deepEqual(shortestCommonSupersequence(
      ['G', 'E', 'E', 'K'],
      ['E', 'K', 'E'],
    ), ['G', 'E', 'K', 'E', 'K']);

    // LCS (longest common subsequence) is "GTAB"
    deepEqual(shortestCommonSupersequence(
      ['A', 'G', 'G', 'T', 'A', 'B'],
      ['G', 'X', 'T', 'X', 'A', 'Y', 'B'],
    ), ['A', 'G', 'G', 'X', 'T', 'X', 'A', 'Y', 'B']);

    // LCS (longest common subsequence) is "BCBA".
    deepEqual(shortestCommonSupersequence(
      ['A', 'B', 'C', 'B', 'D', 'A', 'B'],
      ['B', 'D', 'C', 'A', 'B', 'A'],
    ), ['A', 'B', 'D', 'C', 'A', 'B', 'D', 'A', 'B']);

    // LCS (longest common subsequence) is "BDABA".
    deepEqual(shortestCommonSupersequence(
      ['B', 'D', 'C', 'A', 'B', 'A'],
      ['A', 'B', 'C', 'B', 'D', 'A', 'B', 'A', 'C'],
    ), ['A', 'B', 'C', 'B', 'D', 'C', 'A', 'B', 'A', 'C']);
  });
});
