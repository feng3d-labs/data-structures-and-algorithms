import { deepEqual } from 'assert';
import { divideByTwo } from '../divideByTwo';

describe('divideByTwo', () =>
{
  it('should divide numbers by two using bitwise operations', () =>
  {
    deepEqual(divideByTwo(0), 0);
    deepEqual(divideByTwo(1), 0);
    deepEqual(divideByTwo(3), 1);
    deepEqual(divideByTwo(10), 5);
    deepEqual(divideByTwo(17), 8);
    deepEqual(divideByTwo(125), 62);
  });
});
