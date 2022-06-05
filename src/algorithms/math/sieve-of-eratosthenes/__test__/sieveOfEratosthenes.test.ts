import { deepEqual } from 'assert';
import { sieveOfEratosthenes } from '../sieveOfEratosthenes';

describe('sieveOfEratosthenes', () =>
{
  it('should find all primes less than or equal to n', () =>
  {
    deepEqual(sieveOfEratosthenes(5), [2, 3, 5]);
    deepEqual(sieveOfEratosthenes(10), [2, 3, 5, 7]);
    deepEqual(sieveOfEratosthenes(100), [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
      43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    ]);
  });
});
