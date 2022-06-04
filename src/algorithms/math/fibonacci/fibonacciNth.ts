/**
 * Calculate fibonacci number at specific position using Dynamic Programming approach.
 *
 * @param n
 */
export function fibonacciNth(n: number): number
{
  let currentValue = 1;
  let previousValue = 0;

  if (n === 1)
  {
    return 1;
  }

  let iterationsCounter = n - 1;

  while (iterationsCounter)
  {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;

    iterationsCounter -= 1;
  }

  return currentValue;
}
