import { deepEqual } from 'assert';
import { bitsDiff } from '../bitsDiff';

describe('bitsDiff', () =>
{
  it('should calculate bits difference between two numbers', () =>
  {
    deepEqual(bitsDiff(0, 0), 0);
    deepEqual(bitsDiff(1, 1), 0);
    deepEqual(bitsDiff(124, 124), 0);
    deepEqual(bitsDiff(0, 1), 1);
    deepEqual(bitsDiff(1, 0), 1);
    deepEqual(bitsDiff(1, 2), 2);
    deepEqual(bitsDiff(1, 3), 1);
  });
});
