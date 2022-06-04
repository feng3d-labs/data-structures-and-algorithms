import { PolynomialHash } from '../../cryptography/polynomial-hash/PolynomialHash';

/**
 * 卡普-拉宾算法（Karp–Rabin algorithm）
 *
 * @param text - Text that may contain the searchable word.
 * @param word - Word that is being searched in text.
 * @return Position of the word in text.
 */
export function rabinKarp(text: string, word: string)
{
  const hasher = new PolynomialHash();

  // Calculate word hash that we will use for comparison with other substring hashes.
  const wordHash = hasher.hash(word);

  let prevFrame: string = null;
  let currentFrameHash: number = null;

  // Go through all substring of the text that may match.
  for (let charIndex = 0; charIndex <= (text.length - word.length); charIndex += 1)
  {
    const currentFrame = text.substring(charIndex, charIndex + word.length);

    // Calculate the hash of current substring.
    if (currentFrameHash === null)
    {
      currentFrameHash = hasher.hash(currentFrame);
    }
    else
    {
      currentFrameHash = hasher.roll(currentFrameHash, prevFrame, currentFrame);
    }

    prevFrame = currentFrame;

    // Compare the hash of current substring and seeking string.
    // In case if hashes match let's make sure that substrings are equal.
    // In case of hash collision the strings may not be equal.
    if (
      wordHash === currentFrameHash
      && text.substr(charIndex, word.length) === word
    )
    {
      return charIndex;
    }
  }

  return -1;
}
