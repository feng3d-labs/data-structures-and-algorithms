import * as mtrx from '../../math/matrix/Matrix';

// The code of an 'A' character (equals to 65).
const alphabetCodeShift = 'A'.codePointAt(0);
const englishAlphabetSize = 26;

/**
 * Generates key matrix from given keyString.
 *
 * @param keyString a string to build a key matrix (must be of matrixSize^2 length).
 */
function generateKeyMatrix(keyString: string): number[][]
{
  const matrixSize = Math.sqrt(keyString.length);
  if (!Number.isInteger(matrixSize))
  {
    throw new Error(
      'Invalid key string length. The square root of the key string must be an integer',
    );
  }
  let keyStringIndex = 0;
  return mtrx.generate(
    [matrixSize, matrixSize],
    // Callback to get a value of each matrix cell.
    // The order the matrix is being filled in is from left to right, from top to bottom.
    () =>
    {
      // A → 0, B → 1, ..., a → 32, b → 33, ...
      const charCodeShifted = (keyString.codePointAt(keyStringIndex)) % alphabetCodeShift;
      keyStringIndex += 1;
      return charCodeShifted;
    },
  );
}

/**
 * Generates a message vector from a given message.
 *
 * @param message - the message to encrypt.
 */
function generateMessageVector(message: string): number[][]
{
  return mtrx.generate(
    [message.length, 1],
    // Callback to get a value of each matrix cell.
    // The order the matrix is being filled in is from left to right, from top to bottom.
    (cellIndices) =>
    {
      const rowIndex = cellIndices[0];
      return message.codePointAt(rowIndex) % alphabetCodeShift;
    },
  );
}

/**
 * Encrypts the given message using Hill Cipher.
 *
 * @param message plaintext
 * @param keyString
 */
export function hillCipherEncrypt(message: string, keyString: string): string
{
  // The keyString and message can only contain letters.
  const onlyLettersRegExp = /^[a-zA-Z]+$/;
  if (!onlyLettersRegExp.test(message) || !onlyLettersRegExp.test(keyString))
  {
    throw new Error('The message and key string can only contain letters');
  }

  const keyMatrix = generateKeyMatrix(keyString);
  const messageVector = generateMessageVector(message);

  // keyString.length must equal to square of message.length
  if (keyMatrix.length !== message.length)
  {
    throw new Error('Invalid key string length. The key length must be a square of message length');
  }

  const cipherVector = mtrx.dot(keyMatrix, messageVector);
  let cipherString = '';
  for (let row = 0; row < cipherVector.length; row += 1)
  {
    const item = cipherVector[row];
    cipherString += String.fromCharCode((item % englishAlphabetSize) + alphabetCodeShift);
  }

  return cipherString;
}

// @TODO: Implement this method.
export function hillCipherDecrypt()
{
  throw new Error('This method is not implemented yet');
}
