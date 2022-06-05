import { deepEqual } from 'assert';
import { binarySearch } from '../binarySearch';

describe('binarySearch', () =>
{
  it('should search number in sorted array', () =>
  {
    deepEqual(binarySearch([], 1), -1);
    deepEqual(binarySearch([1], 1), 0);
    deepEqual(binarySearch([1, 2], 1), 0);
    deepEqual(binarySearch([1, 2], 2), 1);
    deepEqual(binarySearch([1, 5, 10, 12], 1), 0);
    deepEqual(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 17), 5);
    deepEqual(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 1), 0);
    deepEqual(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 100), 7);
    deepEqual(binarySearch([1, 5, 10, 12, 14, 17, 22, 100], 0), -1);
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

    deepEqual(binarySearch([], { key: 1 }, comparator), -1);
    deepEqual(binarySearch(sortedArrayOfObjects, { key: 4 }, comparator), -1);
    deepEqual(binarySearch(sortedArrayOfObjects, { key: 1 }, comparator), 0);
    deepEqual(binarySearch(sortedArrayOfObjects, { key: 2 }, comparator), 1);
    deepEqual(binarySearch(sortedArrayOfObjects, { key: 3 }, comparator), 2);
  });
});
