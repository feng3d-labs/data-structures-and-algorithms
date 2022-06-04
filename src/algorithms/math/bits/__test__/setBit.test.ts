import { deepEqual } from 'assert';
import { setBit } from '../setBit';

describe('setBit', () =>
{
  it('should set bit at specific position', () =>
  {
    // 1 = 0b0001
    deepEqual(setBit(1, 0), 1);
    deepEqual(setBit(1, 1), 3);
    deepEqual(setBit(1, 2), 5);

    // 10 = 0b1010
    deepEqual(setBit(10, 0), 11);
    deepEqual(setBit(10, 1), 10);
    deepEqual(setBit(10, 2), 14);
  });
});
