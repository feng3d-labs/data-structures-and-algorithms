type Cell = number;
// type Matrix = Cell[][]|Cell[][][];
export type Matrix = any;
type Shape = number[];
type CellIndices = number[];

/**
 * Gets the matrix's shape.
 *
 * @param m
 */
export function shape(m: Matrix)
{
  const shapes: Shape = [];
  let dimension = m;
  while (dimension && Array.isArray(dimension))
  {
    shapes.push(dimension.length);
    dimension = (dimension.length && [...dimension][0]) || null as any;
  }

  return shapes;
}

/**
 * Checks if matrix has a correct type.
 *
 * @throws Error
 */
function validateType(m: Matrix)
{
  if (
    !m
    || !Array.isArray(m)
    || !Array.isArray(m[0])
  )
  {
    throw new Error('Invalid matrix format');
  }
}

/**
 * Checks if matrix is two dimensional.
 *
 * @param m
 * @throws Error
 */
function validate2D(m: Matrix)
{
  validateType(m);
  const aShape = shape(m);
  if (aShape.length !== 2)
  {
    throw new Error('Matrix is not of 2D shape');
  }
}

/**
 * Validates that matrices are of the same shape.
 *
 * @param a
 * @param  b
 * @throws Error
 */
export function validateSameShape(a: Matrix, b: Matrix)
{
  validateType(a);
  validateType(b);

  const aShape = shape(a);
  const bShape = shape(b);

  if (aShape.length !== bShape.length)
  {
    throw new Error('Matrices have different dimensions');
  }

  while (aShape.length && bShape.length)
  {
    if (aShape.pop() !== bShape.pop())
    {
      throw new Error('Matrices have different shapes');
    }
  }
}

/**
 * Generates the matrix of specific shape with specific values.
 *
 * @param mShape the shape of the matrix to generate
 * @param fill cell values of a generated matrix.
 */
export function generate(mShape: Shape, fill: (recIndices: CellIndices) => Cell): Matrix
{
  /**
   * Generates the matrix recursively.
   *
   * @param recShape the shape of the matrix to generate
   * @param recIndices
   */
  function generateRecursively(recShape: Shape, recIndices: CellIndices)
  {
    if (recShape.length === 1)
    {
      return Array(recShape[0])
        .fill(null)
        .map((cellValue, cellIndex) => fill([...recIndices, cellIndex])) as any;
    }
    const m: Matrix = [];
    for (let i = 0; i < recShape[0]; i += 1)
    {
      m.push(generateRecursively(recShape.slice(1), [...recIndices, i]));
    }

    return m;
  }

  return generateRecursively(mShape, []);
}

/**
 * Generates the matrix of zeros of specified shape.
 *
 * @param mShape shape of the matrix
 */
export function zeros(mShape: Shape): Matrix
{
  return generate(mShape, () => 0);
}

/**
 * @param a
 * @param b
 * @throws Error
 */
export function dot(a: Matrix, b: Matrix): Matrix
{
  // Validate inputs.
  validate2D(a);
  validate2D(b);

  // Check dimensions.
  const aShape = shape(a);
  const bShape = shape(b);
  if (aShape[1] !== bShape[0])
  {
    throw new Error('Matrices have incompatible shape for multiplication');
  }

  // Perform matrix multiplication.
  const outputShape = [aShape[0], bShape[1]];
  const c = zeros(outputShape);

  for (let bCol = 0; bCol < b[0].length; bCol += 1)
  {
    for (let aRow = 0; aRow < a.length; aRow += 1)
    {
      let cellSum = 0;
      for (let aCol = 0; aCol < a[aRow].length; aCol += 1)
      {
        cellSum += a[aRow][aCol] * b[aCol][bCol];
      }
      c[aRow][bCol] = cellSum;
    }
  }

  return c;
}

/**
 * Transposes the matrix.
 *
 * @param m
 * @throws Error
 */
export function t(m: Matrix): Matrix
{
  validate2D(m);
  const mShape = shape(m);
  const transposed = zeros([mShape[1], mShape[0]]);
  for (let row = 0; row < m.length; row += 1)
  {
    for (let col = 0; col < m[0].length; col += 1)
    {
      transposed[col][row] = m[row][col];
    }
  }

  return transposed;
}

/**
 * Traverses the matrix.
 *
 * @param m
 * @param visit
 */
export function walk(m: Matrix, visit: (indices: CellIndices, c: Cell) => void)
{
  /**
   * Traverses the matrix recursively.
   *
   * @param recM
   * @param cellIndices
   */
  function recWalk(recM: Matrix, cellIndices: CellIndices): Matrix
  {
    const recMShape = shape(recM);

    if (recMShape.length === 1)
    {
      for (let i = 0; i < recM.length; i += 1)
      {
        visit([...cellIndices, i], recM[i]);
      }
    }
    for (let i = 0; i < recM.length; i += 1)
    {
      recWalk(recM[i], [...cellIndices, i]);
    }
  }

  recWalk(m, []);
}

/**
 * Gets the matrix cell value at specific index.
 *
 * @param m Matrix that contains the cell that needs to be updated
 * @param cellIndices Array of cell indices
 */
export function getCellAtIndex(m: Matrix, cellIndices: CellIndices): Cell
{
  // We start from the row at specific index.
  let cell = m[cellIndices[0]];
  // Going deeper into the next dimensions but not to the last one to preserve
  // the pointer to the last dimension array.
  for (let dimIdx = 1; dimIdx < cellIndices.length - 1; dimIdx += 1)
  {
    cell = cell[cellIndices[dimIdx]];
  }

  // At this moment the cell variable points to the array at the last needed dimension.
  return cell[cellIndices[cellIndices.length - 1]];
}

/**
 * Update the matrix cell at specific index.
 *
 * @param m Matrix that contains the cell that needs to be updated
 * @param cellIndices Array of cell indices
 * @param cellValue New cell value
 */
export function updateCellAtIndex(m: Matrix, cellIndices: CellIndices, cellValue: Cell)
{
  // We start from the row at specific index.
  let cell = m[cellIndices[0]];
  // Going deeper into the next dimensions but not to the last one to preserve
  // the pointer to the last dimension array.
  for (let dimIdx = 1; dimIdx < cellIndices.length - 1; dimIdx += 1)
  {
    cell = cell[cellIndices[dimIdx]];
  }
  // At this moment the cell variable points to the array at the last needed dimension.
  cell[cellIndices[cellIndices.length - 1]] = cellValue;
}

/**
 * Adds two matrices element-wise.
 *
 * @param a
 * @param b
 */
export function add(a: Matrix, b: Matrix): Matrix
{
  validateSameShape(a, b);
  const result = zeros(shape(a));

  walk(a, (cellIndices, cellValue) =>
  {
    updateCellAtIndex(result, cellIndices, cellValue);
  });

  walk(b, (cellIndices, cellValue) =>
  {
    const currentCellValue = getCellAtIndex(result, cellIndices);
    updateCellAtIndex(result, cellIndices, currentCellValue + cellValue);
  });

  return result;
}

/**
 * Multiplies two matrices element-wise.
 *
 * @param a
 * @param b
 */
export function mul(a: Matrix, b: Matrix): Matrix
{
  validateSameShape(a, b);
  const result = zeros(shape(a));

  walk(a, (cellIndices, cellValue) =>
  {
    updateCellAtIndex(result, cellIndices, cellValue);
  });

  walk(b, (cellIndices, cellValue) =>
  {
    const currentCellValue = getCellAtIndex(result, cellIndices);
    updateCellAtIndex(result, cellIndices, currentCellValue * cellValue);
  });

  return result;
}

/**
 * Subtract two matrices element-wise.
 *
 * @param a
 * @param b
 */
export function sub(a: Matrix, b: Matrix): Matrix
{
  validateSameShape(a, b);
  const result = zeros(shape(a));

  walk(a, (cellIndices, cellValue) =>
  {
    updateCellAtIndex(result, cellIndices, cellValue);
  });

  walk(b, (cellIndices, cellValue) =>
  {
    const currentCellValue = getCellAtIndex(result, cellIndices);
    updateCellAtIndex(result, cellIndices, currentCellValue - cellValue);
  });

  return result;
}
