import { pascalTriangle } from '../../math/pascal-triangle/pascalTriangle';

/**
 * @param width
 * @param height
 */
export function uniquePaths(width: number, height: number)
{
  const pascalLine = width + height - 2;
  const pascalLinePosition = Math.min(width, height) - 1;

  return pascalTriangle(pascalLine)[pascalLinePosition];
}
