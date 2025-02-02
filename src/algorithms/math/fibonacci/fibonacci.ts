/**
 * Return a fibonacci sequence as an array.
 *
 * @param n
 */
export function fibonacci(n: number): number[]
{
  const fibSequence = [1];

  let currentValue = 1;
  let previousValue = 0;

  if (n === 1)
  {
    return fibSequence;
  }

  let iterationsCounter = n - 1;

  while (iterationsCounter)
  {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;

    fibSequence.push(currentValue);

    iterationsCounter -= 1;
  }

  return fibSequence;
}
