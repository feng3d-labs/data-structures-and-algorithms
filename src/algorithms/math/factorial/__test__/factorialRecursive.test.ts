import { deepEqual } from 'assert';
import { factorialRecursive } from '../factorialRecursive';

describe('factorialRecursive', () =>
{
  it('should calculate factorial', () =>
  {
    deepEqual(factorialRecursive(0), 1);
    deepEqual(factorialRecursive(1), 1);
    deepEqual(factorialRecursive(5), 120);
    deepEqual(factorialRecursive(8), 40320);
    deepEqual(factorialRecursive(10), 3628800);
  });
});
