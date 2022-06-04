import { deepEqual } from 'assert';
import { euclideanAlgorithmIterative } from '../euclideanAlgorithmIterative';

describe('euclideanAlgorithmIterative', () =>
{
  it('should calculate GCD iteratively', () =>
  {
    deepEqual(euclideanAlgorithmIterative(0, 0), 0);
    deepEqual(euclideanAlgorithmIterative(2, 0), 2);
    deepEqual(euclideanAlgorithmIterative(0, 2), 2);
    deepEqual(euclideanAlgorithmIterative(1, 2), 1);
    deepEqual(euclideanAlgorithmIterative(2, 1), 1);
    deepEqual(euclideanAlgorithmIterative(6, 6), 6);
    deepEqual(euclideanAlgorithmIterative(2, 4), 2);
    deepEqual(euclideanAlgorithmIterative(4, 2), 2);
    deepEqual(euclideanAlgorithmIterative(12, 4), 4);
    deepEqual(euclideanAlgorithmIterative(4, 12), 4);
    deepEqual(euclideanAlgorithmIterative(5, 13), 1);
    deepEqual(euclideanAlgorithmIterative(27, 13), 1);
    deepEqual(euclideanAlgorithmIterative(24, 60), 12);
    deepEqual(euclideanAlgorithmIterative(60, 24), 12);
    deepEqual(euclideanAlgorithmIterative(252, 105), 21);
    deepEqual(euclideanAlgorithmIterative(105, 252), 21);
    deepEqual(euclideanAlgorithmIterative(1071, 462), 21);
    deepEqual(euclideanAlgorithmIterative(462, 1071), 21);
    deepEqual(euclideanAlgorithmIterative(462, -1071), 21);
    deepEqual(euclideanAlgorithmIterative(-462, -1071), 21);
  });
});
