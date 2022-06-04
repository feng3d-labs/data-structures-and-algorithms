import { deepEqual } from 'assert';
import { updateBit } from '../updateBit';

describe('updateBit', () =>
{
  it('should update bit at specific position', () =>
  {
    // 1 = 0b0001
    deepEqual(updateBit(1, 0, 1), 1);
    deepEqual(updateBit(1, 0, 0), 0);
    deepEqual(updateBit(1, 1, 1), 3);
    deepEqual(updateBit(1, 2, 1), 5);

    // 10 = 0b1010
    deepEqual(updateBit(10, 0, 1), 11);
    deepEqual(updateBit(10, 0, 0), 10);
    deepEqual(updateBit(10, 1, 1), 10);
    deepEqual(updateBit(10, 1, 0), 8);
    deepEqual(updateBit(10, 2, 1), 14);
    deepEqual(updateBit(10, 2, 0), 10);
  });
});
