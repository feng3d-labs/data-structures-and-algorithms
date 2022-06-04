import { deepEqual } from 'assert';
import { QueenPosition } from '../QueenPosition';

describe('QueenPosition', () =>
{
  it('should store queen position on chessboard', () =>
  {
    const position1 = new QueenPosition(0, 0);
    const position2 = new QueenPosition(2, 1);

    deepEqual(position2.columnIndex, 1);
    deepEqual(position2.rowIndex, 2);
    deepEqual(position1.leftDiagonal, 0);
    deepEqual(position1.rightDiagonal, 0);
    deepEqual(position2.leftDiagonal, 1);
    deepEqual(position2.rightDiagonal, 3);
    deepEqual(position2.toString(), '2,1');
  });
});
