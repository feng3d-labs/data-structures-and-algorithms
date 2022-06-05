import { deepEqual } from 'assert';
import { btPowerSet } from '../btPowerSet';

describe('btPowerSet', () =>
{
  it('should calculate power set of given set using backtracking approach', () =>
  {
    deepEqual(btPowerSet([1]), [
      [],
      [1],
    ]);

    deepEqual(btPowerSet([1, 2, 3]), [
      [],
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 3],
      [2],
      [2, 3],
      [3],
    ]);
  });
});
