import { deepEqual } from 'assert';
import { countSetBits } from '../countSetBits';

describe('countSetBits', () =>
{
  it('should return number of set bits', () =>
  {
    deepEqual(countSetBits(0), 0);
    deepEqual(countSetBits(1), 1);
    deepEqual(countSetBits(2), 1);
    deepEqual(countSetBits(3), 2);
    deepEqual(countSetBits(4), 1);
    deepEqual(countSetBits(5), 2);
    deepEqual(countSetBits(21), 3);
    deepEqual(countSetBits(255), 8);
    deepEqual(countSetBits(1023), 10);
    deepEqual(countSetBits(-1), 32);
    deepEqual(countSetBits(-21), 30);
    deepEqual(countSetBits(-255), 25);
    deepEqual(countSetBits(-1023), 23);
    deepEqual(countSetBits(-4294967296), 0);
  });
});
