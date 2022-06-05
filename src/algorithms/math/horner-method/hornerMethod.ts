/**
 * Returns the evaluation of a polynomial function at a certain point.
 * Uses Horner's rule.
 *
 * @param coefficients i.e. [4, 3, 2] for (4 * x^2 + 3 * x + 2)
 * @param xVal
 */
export function hornerMethod(coefficients: number[], xVal: number): number
{
  return coefficients.reduce(
    (accumulator, currentCoefficient) =>
      accumulator * xVal + currentCoefficient,
    0,
  );
}
