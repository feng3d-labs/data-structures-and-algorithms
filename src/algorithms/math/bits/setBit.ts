/**
 * @param number
 * @param bitPosition zero based.
 */
export function setBit(number: number, bitPosition: number)
{
  return number | (1 << bitPosition);
}
