import { deepEqual } from 'assert';
import { isPowerOfTwoBitwise } from '../isPowerOfTwoBitwise';

describe('isPowerOfTwoBitwise', () =>
{
  it('should check if the number is made by multiplying twos', () =>
  {
    deepEqual(isPowerOfTwoBitwise(-1), false);
    deepEqual(isPowerOfTwoBitwise(0), false);
    deepEqual(isPowerOfTwoBitwise(1), true);
    deepEqual(isPowerOfTwoBitwise(2), true);
    deepEqual(isPowerOfTwoBitwise(3), false);
    deepEqual(isPowerOfTwoBitwise(4), true);
    deepEqual(isPowerOfTwoBitwise(5), false);
    deepEqual(isPowerOfTwoBitwise(6), false);
    deepEqual(isPowerOfTwoBitwise(7), false);
    deepEqual(isPowerOfTwoBitwise(8), true);
    deepEqual(isPowerOfTwoBitwise(10), false);
    deepEqual(isPowerOfTwoBitwise(12), false);
    deepEqual(isPowerOfTwoBitwise(16), true);
    deepEqual(isPowerOfTwoBitwise(31), false);
    deepEqual(isPowerOfTwoBitwise(64), true);
    deepEqual(isPowerOfTwoBitwise(1024), true);
    deepEqual(isPowerOfTwoBitwise(1023), false);
  });
});
