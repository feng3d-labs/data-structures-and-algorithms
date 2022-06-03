import { deepEqual } from 'assert';
import { SimplePolynomialHash } from '../SimplePolynomialHash';

describe('PolynomialHash', () =>
{
  it('should calculate new hash based on previous one', () =>
  {
    const bases = [3, 5];
    const frameSizes = [5, 10];

    const text = 'Lorem Ipsum is simply dummy text of the printing and '
      + 'typesetting industry. Lorem Ipsum has been the industry\'s standard '
      + 'galley of type and \u{ffff} scrambled it to make a type specimen book. It '
      + 'electronic 耀 typesetting, remaining essentially unchanged. It was '
      + 'popularised in the 1960s with the release of Letraset sheets '
      + 'publishing software like Aldus 耀 PageMaker including versions of Lorem.';

    // Check hashing for different prime base.
    bases.forEach((base) =>
    {
      const polynomialHash = new SimplePolynomialHash(base);

      // Check hashing for different word lengths.
      frameSizes.forEach((frameSize) =>
      {
        let previousWord = text.substr(0, frameSize);
        let previousHash = polynomialHash.hash(previousWord);

        // Shift frame through the whole text.
        for (let frameShift = 1; frameShift < (text.length - frameSize); frameShift += 1)
        {
          const currentWord = text.substr(frameShift, frameSize);
          const currentHash = polynomialHash.hash(currentWord);
          const currentRollingHash = polynomialHash.roll(previousHash, previousWord, currentWord);

          // Check that rolling hash is the same as directly calculated hash.
          deepEqual(currentRollingHash, currentHash);

          previousWord = currentWord;
          previousHash = currentHash;
        }
      });
    });
  });

  it('should generate numeric hashed', () =>
  {
    const polynomialHash = new SimplePolynomialHash();

    deepEqual(polynomialHash.hash('Test'), 604944);
    deepEqual(polynomialHash.hash('a'), 97);
    deepEqual(polynomialHash.hash('b'), 98);
    deepEqual(polynomialHash.hash('c'), 99);
    deepEqual(polynomialHash.hash('d'), 100);
    deepEqual(polynomialHash.hash('e'), 101);
    deepEqual(polynomialHash.hash('ab'), 1763);
    deepEqual(polynomialHash.hash('abc'), 30374);
  });
});
