// import { deepEqual } from 'assert';
// import { createCanvas, loadImage } from 'canvas';
// import { resizeImageWidth } from '../resizeImageWidth';

// const testImageBeforePath = './src/algorithms/image-processing/seam-carving/__tests__/test-image-before.jpg';
// const testImageAfterPath = './src/algorithms/image-processing/seam-carving/__tests__/test-image-after.jpg';

// /**
//  * Compares two images and finds the number of different pixels.
//  *
//  * @param imgA ImageData for the first image.
//  * @param imgB ImageData for the second image.
//  * @param threshold Color difference threshold [0..255]. Smaller - stricter.
//  * @returns Number of different pixels.
//  */
// function pixelsDiff(imgA: ImageData, imgB: ImageData, threshold = 0)
// {
//   if (imgA.width !== imgB.width || imgA.height !== imgB.height)
//   {
//     throw new Error('Images must have the same size');
//   }

//   let differentPixels = 0;
//   const numColorParams = 4; // RGBA

//   for (let pixelIndex = 0; pixelIndex < imgA.data.length; pixelIndex += numColorParams)
//   {
//     // Get pixel's color for each image.
//     const [aR, aG, aB] = imgA.data.subarray(pixelIndex, pixelIndex + numColorParams);
//     const [bR, bG, bB] = imgB.data.subarray(pixelIndex, pixelIndex + numColorParams);

//     // Get average pixel's color for each image (make them greyscale).
//     const aAvgColor = Math.floor((aR + aG + aB) / 3);
//     const bAvgColor = Math.floor((bR + bG + bB) / 3);

//     // Compare pixel colors.
//     if (Math.abs(aAvgColor - bAvgColor) > threshold)
//     {
//       differentPixels += 1;
//     }
//   }

//   return differentPixels;
// }

// describe('resizeImageWidth', () =>
// {
//   it('should perform content-aware image width reduction', () =>

//     // @see: https://jestjs.io/docs/asynchronous
//     Promise.all([
//       loadImage(testImageBeforePath),
//       loadImage(testImageAfterPath),
//     ]).then(([imgBefore, imgAfter]) =>
//     {
//       // Original image.
//       const canvasBefore = createCanvas(imgBefore.width, imgBefore.height);
//       const ctxBefore = canvasBefore.getContext('2d');
//       ctxBefore.drawImage(imgBefore, 0, 0, imgBefore.width, imgBefore.height);
//       const imgDataBefore = ctxBefore.getImageData(0, 0, imgBefore.width, imgBefore.height);

//       // Resized image saved.
//       const canvasAfter = createCanvas(imgAfter.width, imgAfter.height);
//       const ctxAfter = canvasAfter.getContext('2d');
//       ctxAfter.drawImage(imgAfter, 0, 0, imgAfter.width, imgAfter.height);
//       const imgDataAfter = ctxAfter.getImageData(0, 0, imgAfter.width, imgAfter.height);

//       const toWidth = Math.floor(imgBefore.width / 2);

//       const {
//         img: resizedImg,
//         size: resizedSize,
//       } = resizeImageWidth({ img: imgDataBefore, toWidth });

//       deepEqual(!!resizedImg, true);
//       deepEqual(!!resizedSize, true);

//       // Resized image generated.
//       const canvasTest = createCanvas(resizedSize.w, resizedSize.h);
//       const ctxTest = canvasTest.getContext('2d');
//       ctxTest.putImageData(resizedImg, 0, 0, 0, 0, resizedSize.w, resizedSize.h);
//       const imgDataTest = ctxTest.getImageData(0, 0, resizedSize.w, resizedSize.h);

//       deepEqual(resizedSize, { w: toWidth, h: imgBefore.height });
//       deepEqual(imgDataTest.width, toWidth);
//       deepEqual(imgDataTest.height, imgBefore.height);
//       deepEqual(imgDataTest.width, imgAfter.width);
//       deepEqual(imgDataTest.height, imgAfter.height);

//       const colorThreshold = 50;
//       const differentPixels = pixelsDiff(imgDataTest, imgDataAfter, colorThreshold);

//       // Allow 10% of pixels to be different
//       const pixelsThreshold = Math.floor((imgAfter.width * imgAfter.height) / 10);

//       deepEqual(differentPixels <= pixelsThreshold, true);
//     })
//   );
// });
