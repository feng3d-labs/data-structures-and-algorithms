import { deepEqual } from 'assert';
import { isPalindrome } from '../isPalindrome';

describe('palindromeCheck', () =>
{
  it('should return whether or not the string is a palindrome', () =>
  {
    deepEqual(isPalindrome('a'), true);
    deepEqual(isPalindrome('pop'), true);
    deepEqual(isPalindrome('deed'), true);
    deepEqual(isPalindrome('kayak'), true);
    deepEqual(isPalindrome('racecar'), true);

    deepEqual(isPalindrome('rad'), false);
    deepEqual(isPalindrome('dodo'), false);
    deepEqual(isPalindrome('polo'), false);
  });
});
