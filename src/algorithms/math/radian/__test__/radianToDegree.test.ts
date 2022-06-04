import { deepEqual } from 'assert';
import { radianToDegree } from '../radianToDegree';

describe('radianToDegree', () =>
{
  it('should convert radian to degree', () =>
  {
    deepEqual(radianToDegree(0), 0);
    deepEqual(radianToDegree(Math.PI / 4), 45);
    deepEqual(radianToDegree(Math.PI / 2), 90);
    deepEqual(radianToDegree(Math.PI), 180);
    deepEqual(radianToDegree((3 * Math.PI) / 2), 270);
    deepEqual(radianToDegree(2 * Math.PI), 360);
  });
});
