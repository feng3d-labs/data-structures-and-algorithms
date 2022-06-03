import { deepEqual } from 'assert';

import { factorial } from '../factorial';

describe('factorial', () =>
{
  it('should calculate factorial', () =>
  {
    deepEqual(factorial(0), 1);
    deepEqual(factorial(1), 1);
    deepEqual(factorial(5), 120);
    deepEqual(factorial(8), 40320);
    deepEqual(factorial(10), 3628800);
  });
});
