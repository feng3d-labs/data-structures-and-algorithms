import { deepEqual } from 'assert';
import { dpRainTerraces } from '../dpRainTerraces';

describe('dpRainTerraces', () =>
{
  it('should find the amount of water collected after raining', () =>
  {
    deepEqual(dpRainTerraces([1]), 0);
    deepEqual(dpRainTerraces([1, 0]), 0);
    deepEqual(dpRainTerraces([0, 1]), 0);
    deepEqual(dpRainTerraces([0, 1, 0]), 0);
    deepEqual(dpRainTerraces([0, 1, 0, 0]), 0);
    deepEqual(dpRainTerraces([0, 1, 0, 0, 1, 0]), 2);
    deepEqual(dpRainTerraces([0, 2, 0, 0, 1, 0]), 2);
    deepEqual(dpRainTerraces([2, 0, 2]), 2);
    deepEqual(dpRainTerraces([2, 0, 5]), 2);
    deepEqual(dpRainTerraces([3, 0, 0, 2, 0, 4]), 10);
    deepEqual(dpRainTerraces([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
    deepEqual(dpRainTerraces([1, 1, 1, 1, 1]), 0);
    deepEqual(dpRainTerraces([1, 2, 3, 4, 5]), 0);
    deepEqual(dpRainTerraces([4, 1, 3, 1, 2, 1, 2, 1]), 4);
    deepEqual(dpRainTerraces([0, 2, 4, 3, 4, 2, 4, 0, 8, 7, 0]), 7);
  });
});
