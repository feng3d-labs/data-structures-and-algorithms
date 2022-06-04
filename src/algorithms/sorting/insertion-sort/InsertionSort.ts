import { Sort } from '../Sort';

export class InsertionSort<T> extends Sort<T>
{
  sort(originalArray: T[])
  {
    const array = [...originalArray];

    // Go through all array elements...
    for (let i = 1; i < array.length; i += 1)
    {
      let currentIndex = i;

      // Call visiting callback.
      this.callbacks.visitingCallback(array[i]);

      // Check if previous element is greater than current element.
      // If so, swap the two elements.
      while (
        array[currentIndex - 1] !== undefined
        && this.comparator.lessThan(array[currentIndex], array[currentIndex - 1])
      )
      {
        // Call visiting callback.
        this.callbacks.visitingCallback(array[currentIndex - 1]);

        // Swap the elements.
        [
          array[currentIndex - 1],
          array[currentIndex],
        ] = [
            array[currentIndex],
            array[currentIndex - 1],
          ];

        // Shift current index left.
        currentIndex -= 1;
      }
    }

    return array;
  }
}
