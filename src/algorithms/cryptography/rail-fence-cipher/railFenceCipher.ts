type Rail = string[];
type Fence = Rail[];
type Direction = number;

/**
 *
 */
const DIRECTIONS: { UP: Direction, DOWN: Direction } = { UP: -1, DOWN: 1 };

/**
 * Builds a fence with a specific number of rows.
 *
 * @param rowsNum
 */
function buildFence(rowsNum: number)
{
  return Array(rowsNum).fill(null).map(() => []);
}

/**
 * Get next direction to move (based on the current one) while traversing the fence.
 *
 * @returns The next direction to take
 */
function getNextDirection({ railCount, currentRail, direction }: {
  /**
   * Number of rows in the fence
   */
  railCount: number,
  /**
   * Current row that we're visiting
   */
  currentRail: number,
  /**
   * Current direction
   */
  direction: Direction
})
{
  switch (currentRail)
  {
    case 0:
      // Go down if we're on top of the fence.
      return DIRECTIONS.DOWN;
    case railCount - 1:
      // Go up if we're at the bottom of the fence.
      return DIRECTIONS.UP;
    default:
      // Continue with the same direction if we're in the middle of the fence.
      return direction;
  }
}

/**
 * @param targetRailIndex
 * @param letter
 */
function addCharToRail(targetRailIndex: number, letter: string)
{
  /**
   * Given a rail, adds a char to it if it matches a targetIndex.
   *
   * @param rail
   * @param currentRail
   */
  function onEachRail(rail: Rail, currentRail: number)
  {
    return currentRail === targetRailIndex
      ? [...rail, letter]
      : rail;
  }

return onEachRail;
}

/**
 * Hangs the characters on the fence.
 */
function fillEncodeFence({ fence, currentRail, direction, chars }: {
  fence: Fence,
  currentRail: number,
  direction: Direction,
  chars: string[],
}): Fence
{
  if (chars.length === 0)
  {
    // All chars have been placed on a fence.
    return fence;
  }

  const railCount = fence.length;

  // Getting the next character to place on a fence.
  const [letter, ...nextChars] = chars;
  const nextDirection = getNextDirection({
    railCount,
    currentRail,
    direction,
  });

  return fillEncodeFence({
    fence: fence.map(addCharToRail(currentRail, letter)),
    currentRail: currentRail + nextDirection,
    direction: nextDirection,
    chars: nextChars,
  });
}

/**
 * @param params
 */
function fillDecodeFence(params: { strLen: number, chars: string[], fence: Fence, targetRail: number, direction: Direction, coords: number[] }): Fence
{
  const {
    strLen, chars, fence, targetRail, direction, coords,
  } = params;

  const railCount = fence.length;

  if (chars.length === 0)
  {
    return fence;
  }

  const [currentRail, currentColumn] = coords;
  const shouldGoNextRail = currentColumn === strLen - 1;
  const nextDirection = shouldGoNextRail
    ? DIRECTIONS.DOWN
    : getNextDirection(
      { railCount, currentRail, direction },
    );
  const nextRail = shouldGoNextRail ? targetRail + 1 : targetRail;
  const nextCoords = [
    shouldGoNextRail ? 0 : currentRail + nextDirection,
    shouldGoNextRail ? 0 : currentColumn + 1,
  ];

  const shouldAddChar = currentRail === targetRail;
  const [currentChar, ...remainderChars] = chars;
  const nextString = shouldAddChar ? remainderChars : chars;
  const nextFence = shouldAddChar ? fence.map(addCharToRail(currentRail, currentChar)) : fence;

  return fillDecodeFence({
    strLen,
    chars: nextString,
    fence: nextFence,
    targetRail: nextRail,
    direction: nextDirection,
    coords: nextCoords,
  });
}

/**
 * @param params
 */
function decodeFence(params: {
  railCount?: number,
  strLen: number,
  fence: Fence,
  currentRail: number,
  direction: Direction,
  code: string[],
}): string
{
  const {
    strLen,
    fence,
    currentRail,
    direction,
    code,
  } = params;

  if (code.length === strLen)
  {
    return code.join('');
  }

  const railCount = fence.length;

  const [currentChar, ...nextRail] = fence[currentRail];
  const nextDirection = getNextDirection(
    { railCount, currentRail, direction },
  );

  return decodeFence({
    railCount,
    strLen,
    currentRail: currentRail + nextDirection,
    direction: nextDirection,
    code: [...code, currentChar],
    fence: fence.map((rail, idx) => (idx === currentRail ? nextRail : rail)),
  });
}

/**
 * Encodes the message using Rail Fence Cipher.
 *
 * @param string The string to be encoded
 * @param railCount The number of rails in a fence
 * @returns Encoded string
 */
export function encodeRailFenceCipher(string: string, railCount: number)
{
  const fence = buildFence(railCount);

  const filledFence = fillEncodeFence({
    fence,
    currentRail: 0,
    direction: DIRECTIONS.DOWN,
    chars: string.split(''),
  });

  return filledFence.flat().join('');
}

/**
 * Decodes the message using Rail Fence Cipher.
 *
 * @param string Encoded string
 * @param railCount The number of rows in a fence
 * @returns Decoded string.
 */
export function decodeRailFenceCipher(string: string, railCount: number)
{
  const strLen = string.length;
  const emptyFence = buildFence(railCount);
  const filledFence = fillDecodeFence({
    strLen,
    chars: string.split(''),
    fence: emptyFence,
    targetRail: 0,
    direction: DIRECTIONS.DOWN,
    coords: [0, 0],
  });

  return decodeFence({
    strLen,
    fence: filledFence,
    currentRail: 0,
    direction: DIRECTIONS.DOWN,
    code: [],
  });
}
