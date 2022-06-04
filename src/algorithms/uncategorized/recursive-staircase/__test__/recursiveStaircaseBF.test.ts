import { deepEqual } from 'assert';
import { recursiveStaircaseBF } from '../recursiveStaircaseBF';

describe('recursiveStaircaseBF', () =>
{
  it('should calculate number of variants using Brute Force solution', () =>
  {
    deepEqual(recursiveStaircaseBF(-1), 0);
    deepEqual(recursiveStaircaseBF(0), 0);
    deepEqual(recursiveStaircaseBF(1), 1);
    deepEqual(recursiveStaircaseBF(2), 2);
    deepEqual(recursiveStaircaseBF(3), 3);
    deepEqual(recursiveStaircaseBF(4), 5);
    deepEqual(recursiveStaircaseBF(5), 8);
    deepEqual(recursiveStaircaseBF(6), 13);
    deepEqual(recursiveStaircaseBF(7), 21);
    deepEqual(recursiveStaircaseBF(8), 34);
    deepEqual(recursiveStaircaseBF(9), 55);
    deepEqual(recursiveStaircaseBF(10), 89);
  });
});
