// Create alphabet array: ['a', 'b', 'c', ..., 'z'].
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

/**
 * Generates a cipher map out of the alphabet.
 * Example with a shift 3: {'a': 'd', 'b': 'e', 'c': 'f', ...}
 *
 * @param alphabet i.e. ['a', 'b', 'c', ... , 'z']
 * @param shift i.e. 3
 * @return i.e. {'a': 'd', 'b': 'e', 'c': 'f', ..., 'z': 'c'}
 */
const getCipherMap = (alphabet: string[], shift: number) =>
alphabet
    .reduce((charsMap, currentChar, charIndex) =>
    {
      const charsMapClone = { ...charsMap };
      // Making the shift to be cyclic (i.e. with a shift of 1 - 'z' would be mapped to 'a').
      let encryptedCharIndex = (charIndex + shift) % alphabet.length;
      // Support negative shifts for creating a map for decryption
      // (i.e. with shift -1 - 'a' would be mapped to 'z').
      if (encryptedCharIndex < 0)
      {
        encryptedCharIndex += alphabet.length;
      }
      charsMapClone[currentChar] = alphabet[encryptedCharIndex];

return charsMapClone;
    }, {});

/**
 * 凯撒密码加密
 *
 * @param str
 * @param shift
 * @param alphabet
 */
export const caesarCipherEncrypt = (str: string, shift: number, alphabet = englishAlphabet) =>
{
  // Create a cipher map:
  const cipherMap = getCipherMap(alphabet, shift);

return str
    .toLowerCase()
    .split('')
    .map((char) => cipherMap[char] || char)
    .join('');
};

/**
 * 凯撒密码解密
 *
 * @param str
 * @param shift
 * @param alphabet
 */
export const caesarCipherDecrypt = (str: string, shift: number, alphabet = englishAlphabet) =>
{
  // Create a cipher map:
  const cipherMap = getCipherMap(alphabet, -shift);

return str
    .toLowerCase()
    .split('')
    .map((char) => cipherMap[char] || char)
    .join('');
};
