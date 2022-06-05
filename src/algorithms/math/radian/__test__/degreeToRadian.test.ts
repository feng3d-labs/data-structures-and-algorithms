import { deepEqual } from 'assert';
import { degreeToRadian } from '../degreeToRadian';

describe('degreeToRadian', () =>
{
  it('should convert degree to radian', () =>
  {
    deepEqual(degreeToRadian(0), 0);
    deepEqual(degreeToRadian(45), Math.PI / 4);
    deepEqual(degreeToRadian(90), Math.PI / 2);
    deepEqual(degreeToRadian(180), Math.PI);
    deepEqual(degreeToRadian(270), (3 * Math.PI) / 2);
    deepEqual(degreeToRadian(360), 2 * Math.PI);
  });
});
