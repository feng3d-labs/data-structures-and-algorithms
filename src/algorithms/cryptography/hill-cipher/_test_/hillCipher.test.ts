import { deepEqual, throws } from 'assert';
import { hillCipherEncrypt, hillCipherDecrypt } from '../hillCipher';

describe('hillCipher', () =>
{
  it('should throw an exception when trying to decipher', () =>
  {
    throws(hillCipherDecrypt, { message: 'This method is not implemented yet' });
  });

  it('should throw an error when message or keyString contains none letter character', () =>
  {
    const invalidCharacterInMessage = () =>
    {
      hillCipherEncrypt('hell3', 'helloworld');
    };
    const invalidCharacterInKeyString = () =>
    {
      hillCipherEncrypt('hello', 'hel12world');
    };
    throws(invalidCharacterInMessage,
      { message: 'The message and key string can only contain letters' },
    );
    throws(invalidCharacterInKeyString,
      { message: 'The message and key string can only contain letters' },
    );
  });

  it('should throw an error when the length of the keyString has a square root which is not integer', () =>
  {
    const invalidLengthOfKeyString = () =>
    {
      hillCipherEncrypt('ab', 'ab');
    };
    throws(invalidLengthOfKeyString,
      { message: 'Invalid key string length. The square root of the key string must be an integer' },
    );
  });

  it('should throw an error when the length of the keyString does not equal to the power of length of the message', () =>
  {
    const invalidLengthOfKeyString = () =>
    {
      hillCipherEncrypt('ab', 'aaabbbccc');
    };
    throws(invalidLengthOfKeyString,
      { message: 'Invalid key string length. The key length must be a square of message length' },
    );
  });

  it('should encrypt passed message using Hill Cipher', () =>
  {
    deepEqual(hillCipherEncrypt('ACT', 'GYBNQKURP'), 'POH');
    deepEqual(hillCipherEncrypt('CAT', 'GYBNQKURP'), 'FIN');
    deepEqual(hillCipherEncrypt('GFG', 'HILLMAGIC'), 'SWK');
  });
});
