import { deepEqual } from 'assert';
import { nQueens } from '../nQueens';

describe('nQueens', () =>
{
  it('should not hae solution for 3 queens', () =>
  {
    const solutions = nQueens(3);
    deepEqual(solutions.length, 0);
  });

  it('should solve n-queens problem for 4 queens', () =>
  {
    const solutions = nQueens(4);
    deepEqual(solutions.length, 2);

    // First solution.
    deepEqual(solutions[0][0].toString(), '0,1');
    deepEqual(solutions[0][1].toString(), '1,3');
    deepEqual(solutions[0][2].toString(), '2,0');
    deepEqual(solutions[0][3].toString(), '3,2');

    // Second solution (mirrored).
    deepEqual(solutions[1][0].toString(), '0,2');
    deepEqual(solutions[1][1].toString(), '1,0');
    deepEqual(solutions[1][2].toString(), '2,3');
    deepEqual(solutions[1][3].toString(), '3,1');
  });

  it('should solve n-queens problem for 6 queens', () =>
  {
    const solutions = nQueens(6);
    deepEqual(solutions.length, 4);

    // First solution.
    deepEqual(solutions[0][0].toString(), '0,1');
    deepEqual(solutions[0][1].toString(), '1,3');
    deepEqual(solutions[0][2].toString(), '2,5');
    deepEqual(solutions[0][3].toString(), '3,0');
    deepEqual(solutions[0][4].toString(), '4,2');
    deepEqual(solutions[0][5].toString(), '5,4');
  });
});
