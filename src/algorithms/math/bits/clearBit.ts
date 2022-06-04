/**
 * @param number
 * @param bitPosition zero based.
 */
export function clearBit(number: number, bitPosition: number)
{
  const mask = ~(1 << bitPosition);

  return number & mask;
}
