/**
 * @param number
 */
export function isPowerOfTwo(number: number): boolean
{
  return (number & (number - 1)) === 0;
}
