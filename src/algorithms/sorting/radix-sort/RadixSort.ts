import { Sort } from '../Sort';

// Using charCode (a = 97, b = 98, etc), we can map characters to buckets from 0 - 25
const BASE_CHAR_CODE = 97;
const NUMBER_OF_POSSIBLE_DIGITS = 10;
const ENGLISH_ALPHABET_LENGTH = 26;

/**
 * 基数排序（Radix sort）
 */
export class RadixSort<T> extends Sort<T>
{
  /**
   * @param originalArray
   */
  sort(originalArray: T[]): T[]
  {
    // Assumes all elements of array are of the same type
    const isArrayOfNumbers = this.isArrayOfNumbers(originalArray);

    let sortedArray = [...originalArray];
    const numPasses = this.determineNumPasses(sortedArray);

    for (let currentIndex = 0; currentIndex < numPasses; currentIndex += 1)
    {
      const buckets = isArrayOfNumbers
        ? this.placeElementsInNumberBuckets(sortedArray, currentIndex)
        : this.placeElementsInCharacterBuckets(sortedArray, currentIndex, numPasses);

      // Flatten buckets into sortedArray, and repeat at next index
      sortedArray = buckets.reduce((acc, val) =>
        [...acc, ...val], []);
    }

    return sortedArray;
  }

  /**
   * @param array
   * @param index
   */
  placeElementsInNumberBuckets(array: T[], index: number)
  {
    // See below. These are used to determine which digit to use for bucket allocation
    const modded = 10 ** (index + 1);
    const divided = 10 ** index;
    const buckets = this.createBuckets(NUMBER_OF_POSSIBLE_DIGITS);

    array.forEach((element) =>
    {
      this.callbacks.visitingCallback(element);
      if ((element as any as number) < divided)
      {
        buckets[0].push(element);
      }
      else
      {
        /**
         * Say we have element of 1,052 and are currently on index 1 (starting from 0). This means
         * we want to use '5' as the bucket. `modded` would be 10 ** (1 + 1), which
         * is 100. So we take 1,052 % 100 (52) and divide it by 10 (5.2) and floor it (5).
         */
        const currentDigit = Math.floor(((element as any as number) % modded) / divided);
        buckets[currentDigit].push(element);
      }
    });

    return buckets;
  }

  /**
   * @param array
   * @param index
   * @param numPasses
   */
  placeElementsInCharacterBuckets(array: T[], index: number, numPasses: number)
  {
    const buckets = this.createBuckets(ENGLISH_ALPHABET_LENGTH);

    array.forEach((element) =>
    {
      this.callbacks.visitingCallback(element);
      const currentBucket = this.getCharCodeOfElementAtIndex(element as any, index, numPasses);
      buckets[currentBucket].push(element);
    });

    return buckets;
  }

  /**
   * @param element
   * @param index
   * @param numPasses
   */
  getCharCodeOfElementAtIndex(element: string, index: number, numPasses: number)
  {
    // Place element in last bucket if not ready to organize
    if ((numPasses - index) > element.length)
    {
      return ENGLISH_ALPHABET_LENGTH - 1;
    }

    /**
     * If each character has been organized, use first character to determine bucket,
     * otherwise iterate backwards through element
     */
    const charPos = index > element.length - 1 ? 0 : element.length - index - 1;

    return element.toLowerCase().charCodeAt(charPos) - BASE_CHAR_CODE;
  }

  /**
   * Number of passes is determined by the length of the longest element in the array.
   * For integers, this log10(num), and for strings, this would be the length of the string.
   */
  determineNumPasses(array: T[])
  {
    return this.getLengthOfLongestElement(array);
  }

  /**
   * @param array
   */
  getLengthOfLongestElement(array: any[]): number
  {
    if (this.isArrayOfNumbers(array))
    {
      return Math.floor(Math.log10(Math.max(...array))) + 1;
    }

    return array.reduce((acc, val) => (val.length > acc ? val.length : acc), -Infinity);
  }

  /**
   * @param array
   */
  isArrayOfNumbers(array: T[])
  {
    // Assumes all elements of array are of the same type
    return this.isNumber(array[0]);
  }

  /**
   * @param numBuckets
   */
  createBuckets(numBuckets: number)
  {
    /**
     * Mapping buckets to an array instead of filling them with
     * an array prevents each bucket from containing a reference to the same array
     */
    return new Array(numBuckets).fill(null).map(() => []) as T[][];
  }

  /**
   * @param element
   */
  isNumber(element: T)
  {
    return Number.isInteger(element);
  }
}
