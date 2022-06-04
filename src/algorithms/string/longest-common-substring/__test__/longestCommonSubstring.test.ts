import { deepEqual } from 'assert';
import { longestCommonSubstring } from '../longestCommonSubstring';

describe('longestCommonSubstring', () =>
{
  it('should find longest common substring between two strings', () =>
  {
    deepEqual(longestCommonSubstring('', ''), '');
    deepEqual(longestCommonSubstring('ABC', ''), '');
    deepEqual(longestCommonSubstring('', 'ABC'), '');
    deepEqual(longestCommonSubstring('ABABC', 'BABCA'), 'BABC');
    deepEqual(longestCommonSubstring('BABCA', 'ABCBA'), 'ABC');
    deepEqual(longestCommonSubstring(
      'Algorithms and data structures implemented in JavaScript',
      'Here you may find Algorithms and data structures that are implemented in JavaScript',
    ), 'Algorithms and data structures ');
  });

  it('should handle unicode correctly', () =>
  {
    deepEqual(longestCommonSubstring('𐌵𐌵**ABC', '𐌵𐌵--ABC'), 'ABC');
    deepEqual(longestCommonSubstring('𐌵𐌵**A', '𐌵𐌵--A'), '𐌵𐌵');
    deepEqual(longestCommonSubstring('A买B时', '买B时GD'), '买B时');
    deepEqual(longestCommonSubstring('After test买时 case', 'another_test买时'), 'test买时');
  });
});
