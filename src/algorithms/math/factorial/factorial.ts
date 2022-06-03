/**
 * 阶乘
 * N!
 * 
 * @param number 阶乘数
 * @returns 值 
 */
export function factorial(number: number)
{
  let result = 1;

  for (let i = 2; i <= number; i += 1)
  {
    result *= i;
  }

  return result;
}
