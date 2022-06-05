import { deepEqual } from 'assert';
import { linearSearch } from '../linearSearch';

describe('linearSearch', () =>
{
  it('should search all numbers in array', () =>
  {
    const array = [1, 2, 4, 6, 2];

    deepEqual(linearSearch(array, 10), []);
    deepEqual(linearSearch(array, 1), [0]);
    deepEqual(linearSearch(array, 2), [1, 4]);
  });

  it('should search all strings in array', () =>
  {
    const array = ['a', 'b', 'a'];

    deepEqual(linearSearch(array, 'c'), []);
    deepEqual(linearSearch(array, 'b'), [1]);
    deepEqual(linearSearch(array, 'a'), [0, 2]);
  });

  it('should search through objects as well', () =>
  {
    const comparatorCallback = (a, b) =>
    {
      if (a.key === b.key)
      {
        return 0;
      }

      return a.key <= b.key ? -1 : 1;
    };

    const array = [
      { key: 5 },
      { key: 6 },
      { key: 7 },
      { key: 6 },
    ];

    deepEqual(linearSearch(array, { key: 10 }, comparatorCallback), []);
    deepEqual(linearSearch(array, { key: 5 }, comparatorCallback), [0]);
    deepEqual(linearSearch(array, { key: 6 }, comparatorCallback), [1, 3]);
  });
});
