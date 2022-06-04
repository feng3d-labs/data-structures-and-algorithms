import { deepEqual } from 'assert';
import { recursiveStaircaseMEM } from '../recursiveStaircaseMEM';

describe('recursiveStaircaseMEM', () =>
{
  it('should calculate number of variants using Brute Force with Memoization', () =>
  {
    deepEqual(recursiveStaircaseMEM(-1), 0);
    deepEqual(recursiveStaircaseMEM(0), 0);
    deepEqual(recursiveStaircaseMEM(1), 1);
    deepEqual(recursiveStaircaseMEM(2), 2);
    deepEqual(recursiveStaircaseMEM(3), 3);
    deepEqual(recursiveStaircaseMEM(4), 5);
    deepEqual(recursiveStaircaseMEM(5), 8);
    deepEqual(recursiveStaircaseMEM(6), 13);
    deepEqual(recursiveStaircaseMEM(7), 21);
    deepEqual(recursiveStaircaseMEM(8), 34);
    deepEqual(recursiveStaircaseMEM(9), 55);
    deepEqual(recursiveStaircaseMEM(10), 89);
  });
});
