import { deepEqual } from 'assert';
import { regularExpressionMatching } from '../regularExpressionMatching';

describe('regularExpressionMatching', () =>
{
  it('should match regular expressions in a string', () =>
  {
    deepEqual(regularExpressionMatching('', ''), true);
    deepEqual(regularExpressionMatching('a', 'a'), true);
    deepEqual(regularExpressionMatching('aa', 'aa'), true);
    deepEqual(regularExpressionMatching('aab', 'aab'), true);
    deepEqual(regularExpressionMatching('aab', 'aa.'), true);
    deepEqual(regularExpressionMatching('aab', '.a.'), true);
    deepEqual(regularExpressionMatching('aab', '...'), true);
    deepEqual(regularExpressionMatching('a', 'a*'), true);
    deepEqual(regularExpressionMatching('aaa', 'a*'), true);
    deepEqual(regularExpressionMatching('aaab', 'a*b'), true);
    deepEqual(regularExpressionMatching('aaabb', 'a*b*'), true);
    deepEqual(regularExpressionMatching('aaabb', 'a*b*c*'), true);
    deepEqual(regularExpressionMatching('', 'a*'), true);
    deepEqual(regularExpressionMatching('xaabyc', 'xa*b.c'), true);
    deepEqual(regularExpressionMatching('aab', 'c*a*b*'), true);
    deepEqual(regularExpressionMatching('mississippi', 'mis*is*.p*.'), true);
    deepEqual(regularExpressionMatching('ab', '.*'), true);

    deepEqual(regularExpressionMatching('', 'a'), false);
    deepEqual(regularExpressionMatching('a', ''), false);
    deepEqual(regularExpressionMatching('aab', 'aa'), false);
    deepEqual(regularExpressionMatching('aab', 'baa'), false);
    deepEqual(regularExpressionMatching('aabc', '...'), false);
    deepEqual(regularExpressionMatching('aaabbdd', 'a*b*c*'), false);
    deepEqual(regularExpressionMatching('mississippi', 'mis*is*p*.'), false);
    deepEqual(regularExpressionMatching('ab', 'a*'), false);
    deepEqual(regularExpressionMatching('abba', 'a*b*.c'), false);
    deepEqual(regularExpressionMatching('abba', '.*c'), false);
  });
});
