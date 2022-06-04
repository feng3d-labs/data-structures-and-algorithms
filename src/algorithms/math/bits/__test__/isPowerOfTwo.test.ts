import { deepEqual } from 'assert';
import { isPowerOfTwo } from '../isPowerOfTwo';

describe('isPowerOfTwo', () =>
{
  it('should detect if the number is power of two', () =>
  {
    deepEqual(isPowerOfTwo(1), true);
    deepEqual(isPowerOfTwo(2), true);
    deepEqual(isPowerOfTwo(3), false);
    deepEqual(isPowerOfTwo(4), true);
    deepEqual(isPowerOfTwo(5), false);
    deepEqual(isPowerOfTwo(6), false);
    deepEqual(isPowerOfTwo(7), false);
    deepEqual(isPowerOfTwo(8), true);
    deepEqual(isPowerOfTwo(9), false);
    deepEqual(isPowerOfTwo(16), true);
    deepEqual(isPowerOfTwo(23), false);
    deepEqual(isPowerOfTwo(32), true);
    deepEqual(isPowerOfTwo(127), false);
    deepEqual(isPowerOfTwo(128), true);
  });
});
