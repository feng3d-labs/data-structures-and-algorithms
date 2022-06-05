import { Comparator } from '../../../utils/comparator/Comparator';

/**
 * Linear search implementation.
 *
 * @param array
 * @param seekElement
 * @param comparatorCallback
 */
export function linearSearch<T>(array: T[], seekElement: T, comparatorCallback?: (a: T, b: T) => number): number[]
{
  const comparator = new Comparator(comparatorCallback);
  const foundIndices = [];

  array.forEach((element, index) =>
  {
    if (comparator.equal(element, seekElement))
    {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}
