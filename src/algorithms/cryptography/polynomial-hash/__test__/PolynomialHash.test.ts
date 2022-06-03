import { deepEqual } from 'assert';
import { PolynomialHash } from '../PolynomialHash';

describe('PolynomialHash', () =>
{
  it('should calculate new hash based on previous one', () =>
  {
    const bases = [3, 79, 101, 3251, 13229, 122743, 3583213];
    const mods = [79, 101];
    const frameSizes = [5, 20];

    // @TODO: Provide Unicode support.
    const text = 'Lorem Ipsum is simply dummy text of the printing and '
      + 'typesetting industry. Lorem Ipsum has been the industry\'s standard '
      + 'galley of type and \u{ffff} scrambled it to make a type specimen book. It '
      + 'electronic 耀 typesetting, remaining essentially unchanged. It was '
      // + 'popularised in the \u{20005} \u{20000}1960s with the release of Letraset sheets '
      + 'publishing software like Aldus PageMaker 耀 including versions of Lorem.';

    // Check hashing for different prime base.
    bases.forEach((base) =>
    {
      mods.forEach((modulus) =>
      {
        const polynomialHash = new PolynomialHash({ base, modulus });

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
  });

  it('should generate numeric hashed less than 100', () =>
  {
    const polynomialHash = new PolynomialHash({ modulus: 100 });

    deepEqual(polynomialHash.hash('Some long text that is used as a key'), 41);
    deepEqual(polynomialHash.hash('Test'), 92);
    deepEqual(polynomialHash.hash('a'), 97);
    deepEqual(polynomialHash.hash('b'), 98);
    deepEqual(polynomialHash.hash('c'), 99);
    deepEqual(polynomialHash.hash('d'), 0);
    deepEqual(polynomialHash.hash('e'), 1);
    deepEqual(polynomialHash.hash('ab'), 87);

    // @TODO: Provide Unicode support.
    deepEqual(polynomialHash.hash('\u{20000}'), 92);
  });
});
