import { deepEqual } from 'assert';
import { euclideanAlgorithm } from '../euclideanAlgorithm';

describe('euclideanAlgorithm', () =>
{
  it('should calculate GCD recursively', () =>
  {
    deepEqual(euclideanAlgorithm(0, 0), 0);
    deepEqual(euclideanAlgorithm(2, 0), 2);
    deepEqual(euclideanAlgorithm(0, 2), 2);
    deepEqual(euclideanAlgorithm(1, 2), 1);
    deepEqual(euclideanAlgorithm(2, 1), 1);
    deepEqual(euclideanAlgorithm(6, 6), 6);
    deepEqual(euclideanAlgorithm(2, 4), 2);
    deepEqual(euclideanAlgorithm(4, 2), 2);
    deepEqual(euclideanAlgorithm(12, 4), 4);
    deepEqual(euclideanAlgorithm(4, 12), 4);
    deepEqual(euclideanAlgorithm(5, 13), 1);
    deepEqual(euclideanAlgorithm(27, 13), 1);
    deepEqual(euclideanAlgorithm(24, 60), 12);
    deepEqual(euclideanAlgorithm(60, 24), 12);
    deepEqual(euclideanAlgorithm(252, 105), 21);
    deepEqual(euclideanAlgorithm(105, 252), 21);
    deepEqual(euclideanAlgorithm(1071, 462), 21);
    deepEqual(euclideanAlgorithm(462, 1071), 21);
    deepEqual(euclideanAlgorithm(462, -1071), 21);
    deepEqual(euclideanAlgorithm(-462, -1071), 21);
  });
});
