import { deepEqual } from 'assert';
import { recursiveStaircaseDP } from '../recursiveStaircaseDP';

describe('recursiveStaircaseDP', () =>
{
  it('should calculate number of variants using Dynamic Programming solution', () =>
  {
    deepEqual(recursiveStaircaseDP(-1), 0);
    deepEqual(recursiveStaircaseDP(0), 0);
    deepEqual(recursiveStaircaseDP(1), 1);
    deepEqual(recursiveStaircaseDP(2), 2);
    deepEqual(recursiveStaircaseDP(3), 3);
    deepEqual(recursiveStaircaseDP(4), 5);
    deepEqual(recursiveStaircaseDP(5), 8);
    deepEqual(recursiveStaircaseDP(6), 13);
    deepEqual(recursiveStaircaseDP(7), 21);
    deepEqual(recursiveStaircaseDP(8), 34);
    deepEqual(recursiveStaircaseDP(9), 55);
    deepEqual(recursiveStaircaseDP(10), 89);
  });
});
