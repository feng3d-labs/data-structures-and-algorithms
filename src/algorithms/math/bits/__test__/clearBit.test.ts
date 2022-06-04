import { deepEqual } from 'assert';
import { clearBit } from '../clearBit';

describe('clearBit', () =>
{
  it('should clear bit at specific position', () =>
  {
    // 1 = 0b0001
    deepEqual(clearBit(1, 0), 0);
    deepEqual(clearBit(1, 1), 1);
    deepEqual(clearBit(1, 2), 1);

    // 10 = 0b1010
    deepEqual(clearBit(10, 0), 10);
    deepEqual(clearBit(10, 1), 8);
    deepEqual(clearBit(10, 3), 2);
  });
});
