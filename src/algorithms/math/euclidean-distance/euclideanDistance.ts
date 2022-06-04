/**
 * @typedef {import('../matrix/Matrix.js').Matrix} Matrix
 */

import * as mtrx from '../matrix/Matrix';
import { Matrix } from '../matrix/Matrix';

/**
 * Calculates the euclidean distance between 2 matrices.
 *
 * @param a
 * @param b
 *
 * @trows Error
 */
export function euclideanDistance(a: Matrix, b: Matrix): number
{
  mtrx.validateSameShape(a, b);

  let squaresTotal = 0;

  mtrx.walk(a, (indices, aCellValue) =>
  {
    const bCellValue = mtrx.getCellAtIndex(b, indices);
    squaresTotal += (aCellValue - bCellValue) ** 2;
  });

  return Number(Math.sqrt(squaresTotal).toFixed(2));
}

