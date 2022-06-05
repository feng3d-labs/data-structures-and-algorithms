/**
 * Divide and Conquer solution.
 * Complexity: O(n^2) in case if no memoization applied
 *
 * @param inputArray
 */
export function dcMaximumSubarraySum(inputArray: number[]): number
{
  /**
   * We are going through the inputArray array and for each element we have two options:
   * - to pick
   * - not to pick
   *
   * Also keep in mind, that the maximum sub-array must be contiguous. It means if we picked
   * the element, we need to continue picking the next elements or stop counting the max sum.
   *
   * @param elementIndex the index of the element we're deciding to pick or not
   * @param mustPick to pick or not to pick the element
   * @returns maximum subarray sum that we'll get
   */
  function solveRecursively(elementIndex: number, mustPick: boolean): number
  {
    if (elementIndex >= inputArray.length)
    {
      return mustPick ? 0 : -Infinity;
    }

    return Math.max(
      // Option #1: Pick the current element, and continue picking next one.
      inputArray[elementIndex] + solveRecursively(elementIndex + 1, true),
      // Option #2: Don't pick the current element.
      mustPick ? 0 : solveRecursively(elementIndex + 1, false),
    );
  }

  return solveRecursively(0, false);
}
