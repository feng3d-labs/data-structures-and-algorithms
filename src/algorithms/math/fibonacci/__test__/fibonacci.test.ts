import { deepEqual } from 'assert';
import { fibonacci } from '../fibonacci';

describe('fibonacci', () =>
{
  it('should calculate fibonacci correctly', () =>
  {
    deepEqual(fibonacci(1), [1]);
    deepEqual(fibonacci(2), [1, 1]);
    deepEqual(fibonacci(3), [1, 1, 2]);
    deepEqual(fibonacci(4), [1, 1, 2, 3]);
    deepEqual(fibonacci(5), [1, 1, 2, 3, 5]);
    deepEqual(fibonacci(6), [1, 1, 2, 3, 5, 8]);
    deepEqual(fibonacci(7), [1, 1, 2, 3, 5, 8, 13]);
    deepEqual(fibonacci(8), [1, 1, 2, 3, 5, 8, 13, 21]);
    deepEqual(fibonacci(9), [1, 1, 2, 3, 5, 8, 13, 21, 34]);
    deepEqual(fibonacci(10), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
