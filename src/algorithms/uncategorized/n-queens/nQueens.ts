import { QueenPosition } from './QueenPosition';

/**
 * @param queensPositions
 * @param rowIndex
 * @param columnIndex
 */
function isSafe(queensPositions: QueenPosition[], rowIndex: number, columnIndex: number): boolean
{
  // New position to which the Queen is going to be placed.
  const newQueenPosition = new QueenPosition(rowIndex, columnIndex);

  // Check if new queen position conflicts with any other queens.
  for (let queenIndex = 0; queenIndex < queensPositions.length; queenIndex += 1)
  {
    const currentQueenPosition = queensPositions[queenIndex];

    if (
      // Check if queen has been already placed.
      currentQueenPosition
      && (
        // Check if there are any queen on the same column.
        newQueenPosition.columnIndex === currentQueenPosition.columnIndex
        // Check if there are any queen on the same row.
        || newQueenPosition.rowIndex === currentQueenPosition.rowIndex
        // Check if there are any queen on the same left diagonal.
        || newQueenPosition.leftDiagonal === currentQueenPosition.leftDiagonal
        // Check if there are any queen on the same right diagonal.
        || newQueenPosition.rightDiagonal === currentQueenPosition.rightDiagonal
      )
    )
    {
      // Can't place queen into current position since there are other queens that
      // are threatening it.
      return false;
    }
  }

  // Looks like we're safe.
  return true;
}

/**
 * @param solutions
 * @param previousQueensPositions
 * @param queensCount
 * @param rowIndex
 */
function nQueensRecursive(solutions: QueenPosition[][], previousQueensPositions: QueenPosition[], queensCount: number, rowIndex: number): boolean
{
  // Clone positions array.
  const queensPositions = [...previousQueensPositions].map((queenPosition) =>
  (!queenPosition ? queenPosition : new QueenPosition(
    queenPosition.rowIndex,
    queenPosition.columnIndex,
  )));

  if (rowIndex === queensCount)
  {
    // We've successfully reached the end of the board.
    // Store solution to the list of solutions.
    solutions.push(queensPositions);

    // Solution found.
    return true;
  }

  // Let's try to put queen at row rowIndex into its safe column position.
  for (let columnIndex = 0; columnIndex < queensCount; columnIndex += 1)
  {
    if (isSafe(queensPositions, rowIndex, columnIndex))
    {
      // Place current queen to its current position.
      queensPositions[rowIndex] = new QueenPosition(rowIndex, columnIndex);

      // Try to place all other queens as well.
      nQueensRecursive(solutions, queensPositions, queensCount, rowIndex + 1);

      // BACKTRACKING.
      // Remove the queen from the row to avoid isSafe() returning false.
      queensPositions[rowIndex] = null;
    }
  }

  return false;
}

/**
 * @param queensCount
 */
export function nQueens(queensCount: number): QueenPosition[][]
{
  // Init NxN chessboard with zeros.
  // const chessboard = Array(queensCount).fill(null).map(() => Array(queensCount).fill(0));

  // This array will hold positions or coordinates of each of
  // N queens in form of [rowIndex, columnIndex].
  const queensPositions = Array(queensCount).fill(null);

  /** @var {QueenPosition[][]} solutions */
  const solutions = [];

  // Solve problem recursively.
  nQueensRecursive(solutions, queensPositions, queensCount, 0);

  return solutions;
}
