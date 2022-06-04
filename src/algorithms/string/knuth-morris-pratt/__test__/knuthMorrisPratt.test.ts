import { deepEqual } from 'assert';
import { knuthMorrisPratt } from '../knuthMorrisPratt';

describe('knuthMorrisPratt', () =>
{
  it('should find word position in given text', () =>
  {
    deepEqual(knuthMorrisPratt('', ''), 0);
    deepEqual(knuthMorrisPratt('a', ''), 0);
    deepEqual(knuthMorrisPratt('a', 'a'), 0);
    deepEqual(knuthMorrisPratt('abcbcglx', 'abca'), -1);
    deepEqual(knuthMorrisPratt('abcbcglx', 'bcgl'), 3);
    deepEqual(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy'), 15);
    deepEqual(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca'), -1);
    deepEqual(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca'), 12);
    deepEqual(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa'), 11);
  });
});
