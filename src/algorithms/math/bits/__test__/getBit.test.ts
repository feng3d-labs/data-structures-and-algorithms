import { deepEqual } from 'assert';
import { getBit } from '../getBit';

describe('getBit', () =>
{
  it('should get bit at specific position', () =>
  {
    // 1 = 0b0001
    deepEqual(getBit(1, 0), 1);
    deepEqual(getBit(1, 1), 0);

    // 2 = 0b0010
    deepEqual(getBit(2, 0), 0);
    deepEqual(getBit(2, 1), 1);

    // 3 = 0b0011
    deepEqual(getBit(3, 0), 1);
    deepEqual(getBit(3, 1), 1);

    // 10 = 0b1010
    deepEqual(getBit(10, 0), 0);
    deepEqual(getBit(10, 1), 1);
    deepEqual(getBit(10, 2), 0);
    deepEqual(getBit(10, 3), 1);
  });
});
