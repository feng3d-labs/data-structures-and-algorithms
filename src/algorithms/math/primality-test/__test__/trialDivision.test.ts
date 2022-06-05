import { deepEqual } from 'assert';
import { trialDivision } from '../trialDivision';

/**
 * @param testFunction
 */
function primalityTest(testFunction: (n: number) => boolean)
{
  deepEqual(testFunction(1), false);
  deepEqual(testFunction(2), true);
  deepEqual(testFunction(3), true);
  deepEqual(testFunction(5), true);
  deepEqual(testFunction(11), true);
  deepEqual(testFunction(191), true);
  deepEqual(testFunction(191), true);
  deepEqual(testFunction(199), true);

  deepEqual(testFunction(-1), false);
  deepEqual(testFunction(0), false);
  deepEqual(testFunction(4), false);
  deepEqual(testFunction(6), false);
  deepEqual(testFunction(12), false);
  deepEqual(testFunction(14), false);
  deepEqual(testFunction(25), false);
  deepEqual(testFunction(192), false);
  deepEqual(testFunction(200), false);
  deepEqual(testFunction(400), false);

  // It should also deal with floats.
  deepEqual(testFunction(0.5), false);
  deepEqual(testFunction(1.3), false);
  deepEqual(testFunction(10.5), false);
}

describe('trialDivision', () =>
{
  it('should detect prime numbers', () =>
  {
    primalityTest(trialDivision);
  });
});
