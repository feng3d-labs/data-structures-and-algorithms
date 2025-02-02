/**
 * @param lineNumber - zero based.
 */
export function pascalTriangle(lineNumber: number): number[]
{
  const currentLine = [1];

  const currentLineSize = lineNumber + 1;

  for (let numIndex = 1; numIndex < currentLineSize; numIndex += 1)
  {
    // See explanation of this formula in README.
    currentLine[numIndex] = (currentLine[numIndex - 1] * (lineNumber - numIndex + 1)) / numIndex;
  }

  return currentLine;
}
