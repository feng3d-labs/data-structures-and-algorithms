import { deepEqual } from 'assert';
import { levenshteinDistance } from '../levenshteinDistance';

describe('levenshteinDistance', () =>
{
  it('should calculate edit distance between two strings', () =>
  {
    deepEqual(levenshteinDistance('', ''), 0);
    deepEqual(levenshteinDistance('a', ''), 1);
    deepEqual(levenshteinDistance('', 'a'), 1);
    deepEqual(levenshteinDistance('abc', ''), 3);
    deepEqual(levenshteinDistance('', 'abc'), 3);

    // Should just add I to the beginning.
    deepEqual(levenshteinDistance('islander', 'slander'), 1);

    // Needs to substitute M by K, T by M and add an A to the end
    deepEqual(levenshteinDistance('mart', 'karma'), 3);

    // Substitute K by S, E by I and insert G at the end.
    deepEqual(levenshteinDistance('kitten', 'sitting'), 3);

    // Should add 4 letters FOOT at the beginning.
    deepEqual(levenshteinDistance('ball', 'football'), 4);

    // Should delete 4 letters FOOT at the beginning.
    deepEqual(levenshteinDistance('football', 'foot'), 4);

    // Needs to substitute the first 5 chars: INTEN by EXECU
    deepEqual(levenshteinDistance('intention', 'execution'), 5);
  });
});
