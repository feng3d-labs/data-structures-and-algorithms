import { deepEqual } from 'assert';
import { multiply } from '../multiply';

describe('multiply', () =>
{
  it('should multiply two numbers', () =>
  {
    deepEqual(multiply(0, 0), 0);
    deepEqual(multiply(2, 0), 0);
    deepEqual(multiply(0, 2), 0);
    deepEqual(multiply(1, 2), 2);
    deepEqual(multiply(2, 1), 2);
    deepEqual(multiply(6, 6), 36);
    deepEqual(multiply(-2, 4), -8);
    deepEqual(multiply(4, -2), -8);
    deepEqual(multiply(-4, -4), 16);
    deepEqual(multiply(4, -5), -20);
    deepEqual(multiply(2, 121), 242);
    deepEqual(multiply(121, 2), 242);
  });
});
