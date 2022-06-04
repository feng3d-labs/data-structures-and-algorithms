import { deepEqual } from 'assert';
import { fullAdder } from '../fullAdder';

describe('fullAdder', () =>
{
  it('should add up two numbers', () =>
  {
    deepEqual(fullAdder(0, 0), 0);
    deepEqual(fullAdder(2, 0), 2);
    deepEqual(fullAdder(0, 2), 2);
    deepEqual(fullAdder(1, 2), 3);
    deepEqual(fullAdder(2, 1), 3);
    deepEqual(fullAdder(6, 6), 12);
    deepEqual(fullAdder(-2, 4), 2);
    deepEqual(fullAdder(4, -2), 2);
    deepEqual(fullAdder(-4, -4), -8);
    deepEqual(fullAdder(4, -5), -1);
    deepEqual(fullAdder(2, 121), 123);
    deepEqual(fullAdder(121, 2), 123);
  });
});
