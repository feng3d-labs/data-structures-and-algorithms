/**
 * 阶乘（递归）
 * 
 * @param number 阶乘数
 * @return 值 
 */
export function factorialRecursive(number: number)
{
  return number > 1 ? number * factorialRecursive(number - 1) : 1;
}
