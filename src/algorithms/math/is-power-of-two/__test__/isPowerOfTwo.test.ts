import { deepEqual } from 'assert';
import { isPowerOfTwo } from '../isPowerOfTwo';

describe('isPowerOfTwo', () =>
{
  it('should check if the number is made by multiplying twos', () =>
  {
    deepEqual(isPowerOfTwo(-1), false);
    deepEqual(isPowerOfTwo(0), false);
    deepEqual(isPowerOfTwo(1), true);
    deepEqual(isPowerOfTwo(2), true);
    deepEqual(isPowerOfTwo(3), false);
    deepEqual(isPowerOfTwo(4), true);
    deepEqual(isPowerOfTwo(5), false);
    deepEqual(isPowerOfTwo(6), false);
    deepEqual(isPowerOfTwo(7), false);
    deepEqual(isPowerOfTwo(8), true);
    deepEqual(isPowerOfTwo(10), false);
    deepEqual(isPowerOfTwo(12), false);
    deepEqual(isPowerOfTwo(16), true);
    deepEqual(isPowerOfTwo(31), false);
    deepEqual(isPowerOfTwo(64), true);
    deepEqual(isPowerOfTwo(1024), true);
    deepEqual(isPowerOfTwo(1023), false);
  });
});
