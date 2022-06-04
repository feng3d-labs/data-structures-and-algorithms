import { deepEqual } from 'assert';
import { rabinKarp } from '../rabinKarp';

describe('rabinKarp', () =>
{
  it('should find substring in a string', () =>
  {
    deepEqual(rabinKarp('', ''), 0);
    deepEqual(rabinKarp('a', ''), 0);
    deepEqual(rabinKarp('a', 'a'), 0);
    deepEqual(rabinKarp('ab', 'b'), 1);
    deepEqual(rabinKarp('abcbcglx', 'abca'), -1);
    deepEqual(rabinKarp('abcbcglx', 'bcgl'), 3);
    deepEqual(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabcy'), 15);
    deepEqual(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabca'), -1);
    deepEqual(rabinKarp('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca'), 12);
    deepEqual(rabinKarp('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa'), 11);
    deepEqual(rabinKarp('^ !/\'#\'pp', ' !/\'#\'pp'), 1);
  });

  it('should work with bigger texts', () =>
  {
    const text = 'Lorem Ipsum is simply dummy text of the printing and '
      + 'typesetting industry. Lorem Ipsum has been the industry\'s standard '
      + 'dummy text ever since the 1500s, when an unknown printer took a '
      + 'galley of type and scrambled it to make a type specimen book. It '
      + 'has survived not only five centuries, but also the leap into '
      + 'electronic typesetting, remaining essentially unchanged. It was '
      + 'popularised in the 1960s with the release of Letraset sheets '
      + 'containing Lorem Ipsum passages, and more recently with desktop'
      + 'publishing software like Aldus PageMaker including versions of Lorem '
      + 'Ipsum.';

    deepEqual(rabinKarp(text, 'Lorem'), 0);
    deepEqual(rabinKarp(text, 'versions'), 549);
    deepEqual(rabinKarp(text, 'versions of Lorem Ipsum.'), 549);
    deepEqual(rabinKarp(text, 'versions of Lorem Ipsum:'), -1);
    deepEqual(rabinKarp(text, 'Lorem Ipsum passages, and more recently with'), 446);
  });

  it('should work with UTF symbols', () =>
  {
    deepEqual(rabinKarp('a\u{ffff}', '\u{ffff}'), 1);
    deepEqual(rabinKarp('\u0000耀\u0000', '耀\u0000'), 1);
    // @TODO: Provide Unicode support.
    // deepEqual(rabinKarp('a\u{20000}', '\u{20000}'),1);
  });
});
