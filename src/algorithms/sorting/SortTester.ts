import { deepEqual } from 'assert';
import { Sort } from './Sort';

export const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export const reverseArr = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
export const notSortedArr = [15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19];
export const equalArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const negativeArr = [-1, 0, 5, -10, 20, 13, -7, 3, 2, -3];
export const negativeArrSorted = [-10, -7, -3, -1, 0, 2, 3, 5, 13, 20];

export class SortTester
{
  static testSort<T>(SortingClass: SortingClassC<T>)
  {
    const sorter = new SortingClass() as any as Sort<number>;

    deepEqual(sorter.sort([]), []);
    deepEqual(sorter.sort([1]), [1]);
    deepEqual(sorter.sort([1, 2]), [1, 2]);
    deepEqual(sorter.sort([2, 1]), [1, 2]);
    deepEqual(sorter.sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2]), [0, 0, 1, 2, 2, 3, 3, 4, 4, 4]);
    deepEqual(sorter.sort(sortedArr), sortedArr);
    deepEqual(sorter.sort(reverseArr), sortedArr);
    deepEqual(sorter.sort(notSortedArr), sortedArr);
    deepEqual(sorter.sort(equalArr), equalArr);
  }

  static testNegativeNumbersSort(SortingClass)
  {
    const sorter = new SortingClass();
    deepEqual(sorter.sort(negativeArr), negativeArrSorted);
  }

  static testSortWithCustomComparator<T>(SortingClass: SortingClassC<T>)
  {
    const callbacks = {
      compareCallback: (a: string, b: string) =>
      {
        if (a.length === b.length)
        {
          return 0;
        }

        return a.length < b.length ? -1 : 1;
      },
    };

    const sorter = new SortingClass(callbacks) as any as Sort<string>;

    deepEqual(sorter.sort(['']), ['']);
    deepEqual(sorter.sort(['a']), ['a']);
    deepEqual(sorter.sort(['aa', 'a']), ['a', 'aa']);
    deepEqual(sorter.sort(['aa', 'q', 'bbbb', 'ccc']), ['q', 'aa', 'ccc', 'bbbb']);
    deepEqual(sorter.sort(['aa', 'aa']), ['aa', 'aa']);
  }

  static testSortStability<T>(SortingClass: SortingClassC<T>)
  {
    const callbacks = {
      compareCallback: (a: string, b: string) =>
      {
        if (a.length === b.length)
        {
          return 0;
        }

        return a.length < b.length ? -1 : 1;
      },
    };

    const sorter = new SortingClass(callbacks) as any as Sort<string>;

    deepEqual(sorter.sort(['bb', 'aa', 'c']), ['c', 'bb', 'aa']);
    deepEqual(sorter.sort(['aa', 'q', 'a', 'bbbb', 'ccc']), ['q', 'a', 'aa', 'ccc', 'bbbb']);
  }

  static testAlgorithmTimeComplexity<T>(SortingClass: SortingClassC<T>, arrayToBeSorted: T[], numberOfVisits: number)
  {
    let times = 0;
    const visitingCallback = () => { times++; };
    const callbacks = { visitingCallback };
    const sorter = new SortingClass(callbacks);

    sorter.sort(arrayToBeSorted);

    deepEqual(times, numberOfVisits);
  }
}

type SortingClassC<T> = new (...args: any[]) => Sort<T>;
