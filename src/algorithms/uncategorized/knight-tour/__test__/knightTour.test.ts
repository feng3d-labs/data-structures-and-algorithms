import { deepEqual } from 'assert';
import { knightTour } from '../knightTour';

describe('knightTour', () =>
{
  it('should not find solution on 3x3 board', () =>
  {
    const moves = knightTour(3);

    deepEqual(moves.length, 0);
  });

  it('should find one solution to do knight tour on 5x5 board', () =>
  {
    const moves = knightTour(5);

    deepEqual(moves.length, 25);

    deepEqual(moves, [
      [0, 0],
      [1, 2],
      [2, 0],
      [0, 1],
      [1, 3],
      [3, 4],
      [2, 2],
      [4, 1],
      [3, 3],
      [1, 4],
      [0, 2],
      [1, 0],
      [3, 1],
      [4, 3],
      [2, 4],
      [0, 3],
      [1, 1],
      [3, 0],
      [4, 2],
      [2, 1],
      [4, 0],
      [3, 2],
      [4, 4],
      [2, 3],
      [0, 4],
    ]);
  });
});
