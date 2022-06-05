import { euclideanAlgorithm } from '../euclidean-algorithm/euclideanAlgorithm';

/**
 * @param a
 * @param b
 */
export function leastCommonMultiple(a: number, b: number)
{
  return ((a === 0) || (b === 0)) ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b);
}
