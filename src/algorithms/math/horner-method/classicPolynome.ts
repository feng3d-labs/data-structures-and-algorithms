/**
 * Returns the evaluation of a polynomial function at a certain point.
 * Uses straightforward approach with powers.
 *
 * @param coefficients i.e. [4, 3, 2] for (4 * x^2 + 3 * x + 2)
 * @param xVal
 */
export function classicPolynome(coefficients: number[], xVal: number): number
{
  return coefficients.reverse().reduce(
    (accumulator, currentCoefficient, index) =>
      accumulator + currentCoefficient * (xVal ** index),
    0,
  );
}
