import { deepEqual } from 'assert';
import { caesarCipherEncrypt, caesarCipherDecrypt } from '../caesarCipher';

describe('caesarCipher', () =>
{
  it('should not change a string with zero shift', () =>
  {
    deepEqual(caesarCipherEncrypt('abcd', 0), 'abcd');
    deepEqual(caesarCipherDecrypt('abcd', 0), 'abcd');
  });

  it('should cipher a string with different shifts', () =>
  {
    deepEqual(caesarCipherEncrypt('abcde', 3), 'defgh');
    deepEqual(caesarCipherDecrypt('defgh', 3), 'abcde');

    deepEqual(caesarCipherEncrypt('abcde', 1), 'bcdef');
    deepEqual(caesarCipherDecrypt('bcdef', 1), 'abcde');

    deepEqual(caesarCipherEncrypt('xyz', 1), 'yza');
    deepEqual(caesarCipherDecrypt('yza', 1), 'xyz');
  });

  it('should be case insensitive', () =>
  {
    deepEqual(caesarCipherEncrypt('ABCDE', 3), 'defgh');
  });

  it('should correctly handle an empty strings', () =>
  {
    deepEqual(caesarCipherEncrypt('', 3), '');
  });

  it('should not cipher unknown chars', () =>
  {
    deepEqual(caesarCipherEncrypt('ab2cde', 3), 'de2fgh');
    deepEqual(caesarCipherDecrypt('de2fgh', 3), 'ab2cde');
  });

  it('should encrypt and decrypt full phrases', () =>
  {
    deepEqual(caesarCipherEncrypt('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG', 23), 'qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald');

    deepEqual(caesarCipherDecrypt('qeb nrfzh yoltk clu grjmp lsbo qeb ixwv ald', 23), 'the quick brown fox jumps over the lazy dog');
  });
});
