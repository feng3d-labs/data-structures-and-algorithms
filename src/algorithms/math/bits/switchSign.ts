/**
 * Switch the sign of the number using "Twos Complement" approach.
 * @param number
 */
export function switchSign(number: number)
{
  return ~number + 1;
}
