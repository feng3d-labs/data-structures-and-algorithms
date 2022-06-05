import { deepEqual, throws } from 'assert';
import { squareRoot } from '../squareRoot';

describe('squareRoot', () =>
{
  it('should throw for negative numbers', () =>
  {
    function failingSquareRoot()
    {
      squareRoot(-5);
    }
    throws(failingSquareRoot);
  });

  it('should correctly calculate square root with default tolerance', () =>
  {
    deepEqual(squareRoot(0), 0);
    deepEqual(squareRoot(1), 1);
    deepEqual(squareRoot(2), 1);
    deepEqual(squareRoot(3), 2);
    deepEqual(squareRoot(4), 2);
    deepEqual(squareRoot(15), 4);
    deepEqual(squareRoot(16), 4);
    deepEqual(squareRoot(256), 16);
    deepEqual(squareRoot(473), 22);
    deepEqual(squareRoot(14723), 121);
  });

  it('should correctly calculate square root for integers with custom tolerance', () =>
  {
    let tolerance = 1;

    deepEqual(squareRoot(0, tolerance), 0);
    deepEqual(squareRoot(1, tolerance), 1);
    deepEqual(squareRoot(2, tolerance), 1.4);
    deepEqual(squareRoot(3, tolerance), 1.8);
    deepEqual(squareRoot(4, tolerance), 2);
    deepEqual(squareRoot(15, tolerance), 3.9);
    deepEqual(squareRoot(16, tolerance), 4);
    deepEqual(squareRoot(256, tolerance), 16);
    deepEqual(squareRoot(473, tolerance), 21.7);
    deepEqual(squareRoot(14723, tolerance), 121.3);

    tolerance = 3;

    deepEqual(squareRoot(0, tolerance), 0);
    deepEqual(squareRoot(1, tolerance), 1);
    deepEqual(squareRoot(2, tolerance), 1.414);
    deepEqual(squareRoot(3, tolerance), 1.732);
    deepEqual(squareRoot(4, tolerance), 2);
    deepEqual(squareRoot(15, tolerance), 3.873);
    deepEqual(squareRoot(16, tolerance), 4);
    deepEqual(squareRoot(256, tolerance), 16);
    deepEqual(squareRoot(473, tolerance), 21.749);
    deepEqual(squareRoot(14723, tolerance), 121.338);

    tolerance = 10;

    deepEqual(squareRoot(0, tolerance), 0);
    deepEqual(squareRoot(1, tolerance), 1);
    deepEqual(squareRoot(2, tolerance), 1.4142135624);
    deepEqual(squareRoot(3, tolerance), 1.7320508076);
    deepEqual(squareRoot(4, tolerance), 2);
    deepEqual(squareRoot(15, tolerance), 3.8729833462);
    deepEqual(squareRoot(16, tolerance), 4);
    deepEqual(squareRoot(256, tolerance), 16);
    deepEqual(squareRoot(473, tolerance), 21.7485631709);
    deepEqual(squareRoot(14723, tolerance), 121.3383698588);
  });

  it('should correctly calculate square root for integers with custom tolerance', () =>
  {
    deepEqual(squareRoot(4.5, 10), 2.1213203436);
    deepEqual(squareRoot(217.534, 10), 14.7490338667);
  });
});
