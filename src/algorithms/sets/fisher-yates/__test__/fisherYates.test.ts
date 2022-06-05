import { deepEqual, notDeepEqual } from 'assert';
import { fisherYates } from '../fisherYates';
import { sortedArr } from '../../../sorting/SortTester';
import { QuickSort } from '../../../sorting/quick-sort/QuickSort';

describe('fisherYates', () =>
{
  it('should shuffle small arrays', () =>
  {
    deepEqual(fisherYates([]), []);
    deepEqual(fisherYates([1]), [1]);
  });

  it('should shuffle array randomly', () =>
  {
    const shuffledArray = fisherYates(sortedArr);
    const sorter = new QuickSort();

    deepEqual(shuffledArray.length, sortedArr.length);
    notDeepEqual(shuffledArray, sortedArr);
    deepEqual(sorter.sort(shuffledArray), sortedArr);
  });
});
