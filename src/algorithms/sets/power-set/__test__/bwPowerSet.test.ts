import { deepEqual } from 'assert';
import { bwPowerSet } from '../bwPowerSet';

describe('bwPowerSet', () =>
{
  it('should calculate power set of given set using bitwise approach', () =>
  {
    deepEqual(bwPowerSet([1]), [
      [],
      [1],
    ]);

    deepEqual(bwPowerSet([1, 2, 3]), [
      [],
      [1],
      [2],
      [1, 2],
      [3],
      [1, 3],
      [2, 3],
      [1, 2, 3],
    ]);
  });
});
