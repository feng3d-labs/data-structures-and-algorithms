import { deepEqual } from 'assert';
import { recursiveStaircaseIT } from '../recursiveStaircaseIT';

describe('recursiveStaircaseIT', () =>
{
  it('should calculate number of variants using Iterative solution', () =>
  {
    deepEqual(recursiveStaircaseIT(-1), 0);
    deepEqual(recursiveStaircaseIT(0), 0);
    deepEqual(recursiveStaircaseIT(1), 1);
    deepEqual(recursiveStaircaseIT(2), 2);
    deepEqual(recursiveStaircaseIT(3), 3);
    deepEqual(recursiveStaircaseIT(4), 5);
    deepEqual(recursiveStaircaseIT(5), 8);
    deepEqual(recursiveStaircaseIT(6), 13);
    deepEqual(recursiveStaircaseIT(7), 21);
    deepEqual(recursiveStaircaseIT(8), 34);
    deepEqual(recursiveStaircaseIT(9), 55);
    deepEqual(recursiveStaircaseIT(10), 89);
  });
});
