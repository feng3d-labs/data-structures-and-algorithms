import { deepEqual } from 'assert';
import { interpolationSearch } from '../interpolationSearch';

describe('interpolationSearch', () =>
{
  it('should search elements in sorted array of numbers', () =>
  {
    deepEqual(interpolationSearch([], 1), -1);
    deepEqual(interpolationSearch([1], 1), 0);
    deepEqual(interpolationSearch([1], 0), -1);
    deepEqual(interpolationSearch([1, 1], 1), 0);
    deepEqual(interpolationSearch([1, 2], 1), 0);
    deepEqual(interpolationSearch([1, 2], 2), 1);
    deepEqual(interpolationSearch([10, 20, 30, 40, 50], 40), 3);
    deepEqual(interpolationSearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 14), 13);
    deepEqual(interpolationSearch([1, 6, 7, 8, 12, 13, 14, 19, 21, 23, 24, 24, 24, 300], 24), 10);
    deepEqual(interpolationSearch([1, 2, 3, 700, 800, 1200, 1300, 1400, 1900], 600), -1);
    deepEqual(interpolationSearch([1, 2, 3, 700, 800, 1200, 1300, 1400, 1900], 1), 0);
    deepEqual(interpolationSearch([1, 2, 3, 700, 800, 1200, 1300, 1400, 1900], 2), 1);
    deepEqual(interpolationSearch([1, 2, 3, 700, 800, 1200, 1300, 1400, 1900], 3), 2);
    deepEqual(interpolationSearch([1, 2, 3, 700, 800, 1200, 1300, 1400, 1900], 700), 3);
    deepEqual(interpolationSearch([1, 2, 3, 700, 800, 1200, 1300, 1400, 1900], 800), 4);
    deepEqual(interpolationSearch([0, 2, 3, 700, 800, 1200, 1300, 1400, 1900], 1200), 5);
    deepEqual(interpolationSearch([1, 2, 3, 700, 800, 1200, 1300, 1400, 19000], 800), 4);
    deepEqual(interpolationSearch([0, 10, 11, 12, 13, 14, 15], 10), 1);
  });
});
