export type PixelColor = ArrayLike<number> | Uint8ClampedArray;

export type PixelCoordinate = {
  /**
   * horizontal coordinate.
   */
  x: number;
  /**
   * vertical coordinate.
   */
  y: number;
};

/**
 * Helper function that returns the color of the pixel.
 * @param img
 * @param coordinate
 */
export const getPixel = (img: ImageData, { x, y }: PixelCoordinate) =>
{
  // The ImageData data array is a flat 1D array.
  // Thus we need to convert x and y coordinates to the linear index.
  const i = y * img.width + x;
  const cellsPerColor = 4; // RGBA

  // For better efficiency, instead of creating a new sub-array we return
  // a pointer to the part of the ImageData array.
  return img.data.subarray(i * cellsPerColor, i * cellsPerColor + cellsPerColor);
};

/**
 * Helper function that sets the color of the pixel.
 *
 * @param img
 * @param coordinate
 * @param color
 */
export const setPixel = (img: ImageData, { x, y }: PixelCoordinate, color: PixelColor) =>
{
  // The ImageData data array is a flat 1D array.
  // Thus we need to convert x and y coordinates to the linear index.
  const i = y * img.width + x;
  const cellsPerColor = 4; // RGBA
  img.data.set(color, i * cellsPerColor);
};
