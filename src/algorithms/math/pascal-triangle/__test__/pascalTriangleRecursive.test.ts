import { deepEqual } from 'assert';
import { pascalTriangleRecursive } from '../pascalTriangleRecursive';

describe('pascalTriangleRecursive', () =>
{
  it('should calculate Pascal Triangle coefficients for specific line number', () =>
  {
    deepEqual(pascalTriangleRecursive(0), [1]);
    deepEqual(pascalTriangleRecursive(1), [1, 1]);
    deepEqual(pascalTriangleRecursive(2), [1, 2, 1]);
    deepEqual(pascalTriangleRecursive(3), [1, 3, 3, 1]);
    deepEqual(pascalTriangleRecursive(4), [1, 4, 6, 4, 1]);
    deepEqual(pascalTriangleRecursive(5), [1, 5, 10, 10, 5, 1]);
    deepEqual(pascalTriangleRecursive(6), [1, 6, 15, 20, 15, 6, 1]);
    deepEqual(pascalTriangleRecursive(7), [1, 7, 21, 35, 35, 21, 7, 1]);
  });
});
