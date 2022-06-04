/**
 * @param number
 * @param bitPosition zero based.
 */
export function getBit(number: number, bitPosition: number)
{
  return (number >> bitPosition) & 1;
}
