import { countSetBits } from './countSetBits';

/**
 * Counts the number of bits that need to be change in order
 * to convert numberA to numberB.
 *
 * @param numberA
 * @param numberB
 */
export function bitsDiff(numberA: number, numberB: number): number
{
  return countSetBits(numberA ^ numberB);
}
