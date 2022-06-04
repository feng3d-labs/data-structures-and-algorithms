import { deepEqual } from 'assert';
import { isPowerOfTwo1 } from '../isPowerOfTwo';

describe('isPowerOfTwo', () =>
{
  it('should check if the number is made by multiplying twos', () =>
  {
    deepEqual(isPowerOfTwo1(-1), false);
    deepEqual(isPowerOfTwo1(0), false);
    deepEqual(isPowerOfTwo1(1), true);
    deepEqual(isPowerOfTwo1(2), true);
    deepEqual(isPowerOfTwo1(3), false);
    deepEqual(isPowerOfTwo1(4), true);
    deepEqual(isPowerOfTwo1(5), false);
    deepEqual(isPowerOfTwo1(6), false);
    deepEqual(isPowerOfTwo1(7), false);
    deepEqual(isPowerOfTwo1(8), true);
    deepEqual(isPowerOfTwo1(10), false);
    deepEqual(isPowerOfTwo1(12), false);
    deepEqual(isPowerOfTwo1(16), true);
    deepEqual(isPowerOfTwo1(31), false);
    deepEqual(isPowerOfTwo1(64), true);
    deepEqual(isPowerOfTwo1(1024), true);
    deepEqual(isPowerOfTwo1(1023), false);
  });
});
