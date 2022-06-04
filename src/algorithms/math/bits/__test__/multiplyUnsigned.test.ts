import { deepEqual } from 'assert';
import { multiplyUnsigned } from '../multiplyUnsigned';

describe('multiplyUnsigned', () =>
{
  it('should multiply two unsigned numbers', () =>
  {
    deepEqual(multiplyUnsigned(0, 2), 0);
    deepEqual(multiplyUnsigned(2, 0), 0);
    deepEqual(multiplyUnsigned(1, 1), 1);
    deepEqual(multiplyUnsigned(1, 2), 2);
    deepEqual(multiplyUnsigned(2, 7), 14);
    deepEqual(multiplyUnsigned(7, 2), 14);
    deepEqual(multiplyUnsigned(30, 2), 60);
    deepEqual(multiplyUnsigned(17, 34), 578);
    deepEqual(multiplyUnsigned(170, 2340), 397800);
  });
});
