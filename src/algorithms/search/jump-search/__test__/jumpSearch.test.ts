import { deepEqual } from 'assert';
import { jumpSearch } from '../jumpSearch';

describe('jumpSearch', () =>
{
  it('should search for an element in sorted array', () =>
  {
    deepEqual(jumpSearch([], 1), -1);
    deepEqual(jumpSearch([1], 2), -1);
    deepEqual(jumpSearch([1], 1), 0);
    deepEqual(jumpSearch([1, 2], 1), 0);
    deepEqual(jumpSearch([1, 2], 1), 0);
    deepEqual(jumpSearch([1, 1, 1], 1), 0);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 2), 1);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 0), -1);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 0), -1);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 7), -1);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 5), 2);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 20), 4);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 30), 7);
    deepEqual(jumpSearch([1, 2, 5, 10, 20, 21, 24, 30, 48], 48), 8);
  });

  it('should search object in sorted array', () =>
  {
    const sortedArrayOfObjects = [
      { key: 1, value: 'value1' },
      { key: 2, value: 'value2' },
      { key: 3, value: 'value3' },
    ];

    const comparator = (a, b) =>
    {
      if (a.key === b.key) return 0;

      return a.key < b.key ? -1 : 1;
    };

    deepEqual(jumpSearch([], { key: 1 }, comparator), -1);
    deepEqual(jumpSearch(sortedArrayOfObjects, { key: 4 }, comparator), -1);
    deepEqual(jumpSearch(sortedArrayOfObjects, { key: 1 }, comparator), 0);
    deepEqual(jumpSearch(sortedArrayOfObjects, { key: 2 }, comparator), 1);
    deepEqual(jumpSearch(sortedArrayOfObjects, { key: 3 }, comparator), 2);
  });
});
