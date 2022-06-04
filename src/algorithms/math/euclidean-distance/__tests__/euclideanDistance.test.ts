import { deepEqual, throws } from 'assert';
import { euclideanDistance } from '../euclideanDistance';

describe('euclideanDistance', () =>
{
  it('should calculate euclidean distance between vectors', () =>
  {
    deepEqual(euclideanDistance([[1]], [[2]]), 1);
    deepEqual(euclideanDistance([[2]], [[1]]), 1);
    deepEqual(euclideanDistance([[5, 8]], [[7, 3]]), 5.39);
    deepEqual(euclideanDistance([[5], [8]], [[7], [3]]), 5.39);
    deepEqual(euclideanDistance([[8, 2, 6]], [[3, 5, 7]]), 5.92);
    deepEqual(euclideanDistance([[8], [2], [6]], [[3], [5], [7]]), 5.92);
    deepEqual(euclideanDistance([[[8]], [[2]], [[6]]], [[[3]], [[5]], [[7]]]), 5.92);
  });

  it('should throw an error in case if two matrices are of different shapes', () =>
  {
    throws(() => euclideanDistance([[1]], [[[2]]]),
      { message: 'Matrices have different dimensions' },
    );

    throws(() => euclideanDistance([[1]], [[2, 3]]),
      { message: 'Matrices have different shapes' },
    );
  });
});
