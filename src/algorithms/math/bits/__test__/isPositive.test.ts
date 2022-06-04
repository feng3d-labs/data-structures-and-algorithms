import { deepEqual } from 'assert';
import { isPositive } from '../isPositive';

describe('isPositive', () =>
{
  it('should detect if a number is positive', () =>
  {
    deepEqual(isPositive(1), true);
    deepEqual(isPositive(2), true);
    deepEqual(isPositive(3), true);
    deepEqual(isPositive(5665), true);
    deepEqual(isPositive(56644325), true);

    deepEqual(isPositive(0), false);
    deepEqual(isPositive(-0), false);
    deepEqual(isPositive(-1), false);
    deepEqual(isPositive(-2), false);
    deepEqual(isPositive(-126), false);
    deepEqual(isPositive(-5665), false);
    deepEqual(isPositive(-56644325), false);
  });
});
