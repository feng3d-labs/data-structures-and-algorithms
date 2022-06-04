import { deepEqual } from 'assert';
import { multiplyByTwo } from '../multiplyByTwo';

describe('multiplyByTwo', () =>
{
  it('should multiply numbers by two using bitwise operations', () =>
  {
    deepEqual(multiplyByTwo(0), 0);
    deepEqual(multiplyByTwo(1), 2);
    deepEqual(multiplyByTwo(3), 6);
    deepEqual(multiplyByTwo(10), 20);
    deepEqual(multiplyByTwo(17), 34);
    deepEqual(multiplyByTwo(125), 250);
  });
});
