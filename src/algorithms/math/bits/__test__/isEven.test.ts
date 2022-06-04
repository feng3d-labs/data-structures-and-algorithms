import { deepEqual } from 'assert';
import { isEven } from '../isEven';

describe('isEven', () =>
{
  it('should detect if a number is even', () =>
  {
    deepEqual(isEven(0), true);
    deepEqual(isEven(2), true);
    deepEqual(isEven(-2), true);
    deepEqual(isEven(1), false);
    deepEqual(isEven(-1), false);
    deepEqual(isEven(-3), false);
    deepEqual(isEven(3), false);
    deepEqual(isEven(8), true);
    deepEqual(isEven(9), false);
    deepEqual(isEven(121), false);
    deepEqual(isEven(122), true);
    deepEqual(isEven(1201), false);
    deepEqual(isEven(1202), true);
  });
});
