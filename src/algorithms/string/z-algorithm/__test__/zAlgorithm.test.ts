import { deepEqual } from 'assert';
import { zAlgorithm } from '../zAlgorithm';

describe('zAlgorithm', () =>
{
  it('should find word positions in given text', () =>
  {
    deepEqual(zAlgorithm('abcbcglx', 'abca'), []);
    deepEqual(zAlgorithm('abca', 'abca'), [0]);
    deepEqual(zAlgorithm('abca', 'abcadfd'), []);
    deepEqual(zAlgorithm('abcbcglabcx', 'abc'), [0, 7]);
    deepEqual(zAlgorithm('abcbcglx', 'bcgl'), [3]);
    deepEqual(zAlgorithm('abcbcglx', 'cglx'), [4]);
    deepEqual(zAlgorithm('abcxabcdabxabcdabcdabcy', 'abcdabcy'), [15]);
    deepEqual(zAlgorithm('abcxabcdabxabcdabcdabcy', 'abcdabca'), []);
    deepEqual(zAlgorithm('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca'), [12]);
    deepEqual(zAlgorithm('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa'), [11]);
  });
});
