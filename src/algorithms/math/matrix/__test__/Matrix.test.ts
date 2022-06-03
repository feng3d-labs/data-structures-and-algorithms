import { deepEqual, throws } from 'assert';
import * as mtrx from '../Matrix';

describe('Matrix', () =>
{
  it('should throw when trying to add matrices of invalid shapes', () =>
  {
    throws(
      () => mtrx.dot([0], [1]),
      'Invalid matrix format');
    deepEqual(
      () => mtrx.dot([[0]], [1]),
      'Invalid matrix format');
    deepEqual(
      () => mtrx.dot([[[0]]], [[1]]),
      'Matrix is not of 2D shape');
    deepEqual(
      () => mtrx.dot([[0]], [[1], [2]]),
      'Matrices have incompatible shape for multiplication');
  });

  it('should calculate matrices dimensions', () =>
  {
    deepEqual(mtrx.shape([]), [0]);

    deepEqual(mtrx.shape([
      [],
    ]), [1, 0]);

    deepEqual(mtrx.shape([
      [0],
    ]), [1, 1]);

    deepEqual(mtrx.shape([
      [0, 0],
    ]), [1, 2]);

    deepEqual(mtrx.shape([
      [0, 0],
      [0, 0],
    ]), [2, 2]);

    deepEqual(mtrx.shape([
      [0, 0, 0],
      [0, 0, 0],
    ]), [2, 3]);

    deepEqual(mtrx.shape([
      [0, 0],
      [0, 0],
      [0, 0],
    ]), [3, 2]);

    deepEqual(mtrx.shape([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]), [3, 3]);

    deepEqual(mtrx.shape([
      [0],
      [0],
      [0],
    ]), [3, 1]);

    deepEqual(mtrx.shape([
      [[0], [0], [0]],
      [[0], [0], [0]],
      [[0], [0], [0]],
    ]), [3, 3, 1]);

    deepEqual(mtrx.shape([
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    ]), [3, 3, 3]);
  });

  it('should generate the matrix of zeros', () =>
  {
    deepEqual(mtrx.zeros([1, 0]), [
      [],
    ]);

    deepEqual(mtrx.zeros([1, 1]), [
      [0],
    ]);

    deepEqual(mtrx.zeros([1, 3]), [
      [0, 0, 0],
    ]);

    deepEqual(mtrx.zeros([3, 3]), [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    deepEqual(mtrx.zeros([3, 3, 1]), [
      [[0], [0], [0]],
      [[0], [0], [0]],
      [[0], [0], [0]],
    ]);
  });

  it('should generate the matrix with custom values', () =>
  {
    deepEqual(mtrx.generate([1, 0], () => 1), [
      [],
    ]);

    deepEqual(mtrx.generate([1, 1], () => 1), [
      [1],
    ]);

    deepEqual(mtrx.generate([1, 3], () => 1), [
      [1, 1, 1],
    ]);

    deepEqual(mtrx.generate([3, 3], () => 1), [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]);

    deepEqual(mtrx.generate([3, 3, 1], () => 1), [
      [[1], [1], [1]],
      [[1], [1], [1]],
      [[1], [1], [1]],
    ]);
  });

  // it('should generate a custom matrix based on specific cell indices', () =>
  // {
  //   const indicesCallback = jest.fn((indices) =>
  //   {
  //     return indices[0] * 10 + indices[1];
  //   });
  //   const m = mtrx.generate([3, 3], indicesCallback);

  //   deepEqual(indicesCallback).toHaveBeenCalledTimes(3 * 3);
  //   deepEqual(indicesCallback.mock.calls[0][0], [0, 0]);
  //   deepEqual(indicesCallback.mock.calls[1][0], [0, 1]);
  //   deepEqual(indicesCallback.mock.calls[2][0], [0, 2]);
  //   deepEqual(indicesCallback.mock.calls[3][0], [1, 0]);
  //   deepEqual(indicesCallback.mock.calls[4][0], [1, 1]);
  //   deepEqual(indicesCallback.mock.calls[5][0], [1, 2]);
  //   deepEqual(indicesCallback.mock.calls[6][0], [2, 0]);
  //   deepEqual(indicesCallback.mock.calls[7][0], [2, 1]);
  //   deepEqual(indicesCallback.mock.calls[8][0], [2, 2]);
  //   deepEqual(m, [
  //     [0, 1, 2],
  //     [10, 11, 12],
  //     [20, 21, 22],
  //   ]);
  // });

  it('should multiply two matrices', () =>
  {
    let c;
    c = mtrx.dot(
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    );
    deepEqual(mtrx.shape(c), [2, 2]);
    deepEqual(c, [
      [19, 22],
      [43, 50],
    ]);

    c = mtrx.dot(
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5],
        [6],
      ],
    );
    deepEqual(mtrx.shape(c), [2, 1]);
    deepEqual(c, [
      [17],
      [39],
    ]);

    c = mtrx.dot(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [
        [7, 8],
        [9, 10],
        [11, 12],
      ],
    );
    deepEqual(mtrx.shape(c), [2, 2]);
    deepEqual(c, [
      [58, 64],
      [139, 154],
    ]);

    c = mtrx.dot(
      [
        [3, 4, 2],
      ],
      [
        [13, 9, 7, 5],
        [8, 7, 4, 6],
        [6, 4, 0, 3],
      ],
    );
    deepEqual(mtrx.shape(c), [1, 4]);
    deepEqual(c, [
      [83, 63, 37, 45],
    ]);
  });

  it('should transpose matrices', () =>
  {
    deepEqual(mtrx.t([[1, 2, 3]]), [
      [1],
      [2],
      [3],
    ]);

    deepEqual(mtrx.t([
      [1],
      [2],
      [3],
    ]), [
      [1, 2, 3],
    ]);

    deepEqual(mtrx.t([
      [1, 2, 3],
      [4, 5, 6],
    ]), [
      [1, 4],
      [2, 5],
      [3, 6],
    ]);

    deepEqual(mtrx.t([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]), [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });

  it('should throw when trying to transpose non 2D matrix', () =>
  {
    throws(() =>
    {
      mtrx.t([[[1]]]);
    }, 'Matrix is not of 2D shape');
  });

  it('should add two matrices', () =>
  {
    deepEqual(mtrx.add([[1]], [[2]]), [[3]]);

    deepEqual(mtrx.add(
      [[1, 2, 3]],
      [[4, 5, 6]],
    ),
      [[5, 7, 9]],
    );

    deepEqual(mtrx.add(
      [[1], [2], [3]],
      [[4], [5], [6]],
    ),
      [[5], [7], [9]],
    );

    deepEqual(mtrx.add(
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18],
      ],
    ),
      [
        [11, 13, 15],
        [17, 19, 21],
        [23, 25, 27],
      ],
    );

    deepEqual(mtrx.add(
      [
        [[1], [2], [3]],
        [[4], [5], [6]],
        [[7], [8], [9]],
      ],
      [
        [[10], [11], [12]],
        [[13], [14], [15]],
        [[16], [17], [18]],
      ],
    ),
      [
        [[11], [13], [15]],
        [[17], [19], [21]],
        [[23], [25], [27]],
      ],
    );
  });

  it('should throw when trying to add matrices of different shape', () =>
  {
    throws(() => mtrx.add([[0]], [[[0]]]),
      'Matrices have different dimensions',
    );

    throws(() => mtrx.add([[0]], [[0, 0]]),
      'Matrices have different shapes',
    );
  });

  it('should do element wise multiplication two matrices', () =>
  {
    deepEqual(mtrx.mul([[2]], [[3]]), [[6]]);

    deepEqual(mtrx.mul(
      [[1, 2, 3]],
      [[4, 5, 6]],
    ),
      [[4, 10, 18]],
    );

    deepEqual(mtrx.mul(
      [[1], [2], [3]],
      [[4], [5], [6]],
    ),
      [[4], [10], [18]],
    );

    deepEqual(mtrx.mul(
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ),
      [
        [5, 12],
        [21, 32],
      ],
    );

    deepEqual(mtrx.mul(
      [
        [[1], [2]],
        [[3], [4]],
      ],
      [
        [[5], [6]],
        [[7], [8]],
      ],
    ),
      [
        [[5], [12]],
        [[21], [32]],
      ],
    );
  });

  it('should throw when trying to multiply matrices element-wise of different shape', () =>
  {
    throws(() => mtrx.mul([[0]], [[[0]]]),
      'Matrices have different dimensions',
    );

    throws(() => mtrx.mul([[0]], [[0, 0]]),
      'Matrices have different shapes',
    );
  });

  it('should do element wise subtraction two matrices', () =>
  {
    deepEqual(mtrx.sub([[3]], [[2]]), [[1]]);

    deepEqual(mtrx.sub(
      [[10, 12, 14]],
      [[4, 5, 6]],
    ),
      [[6, 7, 8]],
    );

    deepEqual(mtrx.sub(
      [[[10], [12], [14]]],
      [[[4], [5], [6]]],
    ),
      [[[6], [7], [8]]],
    );

    deepEqual(mtrx.sub(
      [
        [10, 20],
        [30, 40],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ),
      [
        [5, 14],
        [23, 32],
      ],
    );

    deepEqual(mtrx.sub(
      [
        [[10], [20]],
        [[30], [40]],
      ],
      [
        [[5], [6]],
        [[7], [8]],
      ],
    ),
      [
        [[5], [14]],
        [[23], [32]],
      ],
    );
  });

  it('should throw when trying to subtract matrices element-wise of different shape', () =>
  {
    throws(() => mtrx.sub([[0]], [[[0]]]),
      'Matrices have different dimensions',
    );

    throws(() => mtrx.sub([[0]], [[0, 0]]),
      'Matrices have different shapes',
    );
  });
});
