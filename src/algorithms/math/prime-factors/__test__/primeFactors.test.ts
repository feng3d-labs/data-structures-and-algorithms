import { deepEqual } from 'assert';
import
{
  primeFactors,
  hardyRamanujan,
} from '../primeFactors';

/**
 * Calculates the error between exact and approximate prime factor counts.
 * @param {number} exactCount
 * @param {number} approximateCount
 * @returns {number} - approximation error (percentage).
 */
function approximationError(exactCount, approximateCount)
{
  return (Math.abs((exactCount - approximateCount) / exactCount) * 100);
}

describe('primeFactors', () =>
{
  it('should find prime factors', () =>
  {
    deepEqual(primeFactors(1), []);
    deepEqual(primeFactors(2), [2]);
    deepEqual(primeFactors(3), [3]);
    deepEqual(primeFactors(4), [2, 2]);
    deepEqual(primeFactors(14), [2, 7]);
    deepEqual(primeFactors(40), [2, 2, 2, 5]);
    deepEqual(primeFactors(54), [2, 3, 3, 3]);
    deepEqual(primeFactors(100), [2, 2, 5, 5]);
    deepEqual(primeFactors(156), [2, 2, 3, 13]);
    deepEqual(primeFactors(273), [3, 7, 13]);
    deepEqual(primeFactors(300), [2, 2, 3, 5, 5]);
    deepEqual(primeFactors(980), [2, 2, 5, 7, 7]);
    deepEqual(primeFactors(1000), [2, 2, 2, 5, 5, 5]);
    deepEqual(primeFactors(52734), [2, 3, 11, 17, 47]);
    deepEqual(primeFactors(343434), [2, 3, 7, 13, 17, 37]);
    deepEqual(primeFactors(456745), [5, 167, 547]);
    deepEqual(primeFactors(510510), [2, 3, 5, 7, 11, 13, 17]);
    deepEqual(primeFactors(8735463), [3, 3, 11, 88237]);
    deepEqual(primeFactors(873452453), [149, 1637, 3581]);
  });

  it('should give approximate prime factors count using Hardy-Ramanujan theorem', () =>
  {
    deepEqual(hardyRamanujan(2) - -0.366 < 0.01, true);
    deepEqual(hardyRamanujan(4) - 0.326 < 0.01, true);
    deepEqual(hardyRamanujan(40) - 1.305 < 0.01, true);
    deepEqual(hardyRamanujan(156) - 1.6193 < 0.01, true);
    deepEqual(hardyRamanujan(980) - 1.929 < 0.01, true);
    deepEqual(hardyRamanujan(52734) - 2.386 < 0.01, true);
    deepEqual(hardyRamanujan(343434) - 2.545 < 0.01, true);
    deepEqual(hardyRamanujan(456745) - 2.567 < 0.01, true);
    deepEqual(hardyRamanujan(510510) - 2.575 < 0.01, true);
    deepEqual(hardyRamanujan(8735463) - 2.771 < 0.01, true);
    deepEqual(hardyRamanujan(873452453) - 3.024 < 0.01, true);
  });

  it('should give correct deviation between exact and approx counts', () =>
  {
    deepEqual(approximationError(primeFactors(2).length, hardyRamanujan(2)) - 136.651 < 0.01, true);

    deepEqual(approximationError(primeFactors(4).length, hardyRamanujan(2)) - 118.325 < 0.01, true);

    deepEqual(approximationError(primeFactors(40).length, hardyRamanujan(2)) - 109.162 < 0.01, true);

    deepEqual(approximationError(primeFactors(156).length, hardyRamanujan(2)) - 109.162 < 0.01, true);

    deepEqual(approximationError(primeFactors(980).length, hardyRamanujan(2)) - 107.330 < 0.01, true);

    deepEqual(approximationError(primeFactors(52734).length, hardyRamanujan(52734)) - 52.274 < 0.01, true);

    deepEqual(approximationError(primeFactors(343434).length, hardyRamanujan(343434)) - 57.578 < 0.01, true);

    deepEqual(approximationError(primeFactors(456745).length, hardyRamanujan(456745)) - 14.420 < 0.01, true);

    deepEqual(approximationError(primeFactors(510510).length, hardyRamanujan(510510)) - 63.201 < 0.01, true);

    deepEqual(approximationError(primeFactors(8735463).length, hardyRamanujan(8735463)) - 30.712 < 0.01, true);

    deepEqual(approximationError(primeFactors(873452453).length, hardyRamanujan(873452453)) - 0.823 < 0.01, true);
  });
});
