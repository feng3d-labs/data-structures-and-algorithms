import { deepEqual } from 'assert';
import { leastCommonMultiple } from '../leastCommonMultiple';

describe('leastCommonMultiple', () =>
{
  it('should find least common multiple', () =>
  {
    deepEqual(leastCommonMultiple(0, 0), 0);
    deepEqual(leastCommonMultiple(1, 0), 0);
    deepEqual(leastCommonMultiple(0, 1), 0);
    deepEqual(leastCommonMultiple(4, 6), 12);
    deepEqual(leastCommonMultiple(6, 21), 42);
    deepEqual(leastCommonMultiple(7, 2), 14);
    deepEqual(leastCommonMultiple(3, 5), 15);
    deepEqual(leastCommonMultiple(7, 3), 21);
    deepEqual(leastCommonMultiple(1000000, 2), 1000000);
    deepEqual(leastCommonMultiple(-9, -18), 18);
    deepEqual(leastCommonMultiple(-7, -9), 63);
    deepEqual(leastCommonMultiple(-7, 9), 63);
  });
});
