import { euclideanDistance } from '../../math/euclidean-distance/euclideanDistance';

/**
 * Classifies the point in space based on k-nearest neighbors algorithm.
 *
 * @param dataSet array of data points, i.e. [[0, 1], [3, 4], [5, 7]]
 * @param labels array of classes (labels), i.e. [1, 1, 2]
 * @param toClassify the point in space that needs to be classified, i.e. [5, 4]
 * @param k number of nearest neighbors which will be taken into account (preferably odd)
 * @return the class of the point
 */
export function kNN(
  dataSet: number[][],
  labels: number[],
  toClassify: number[],
  k = 3,
): number
{
  if (!dataSet || !labels || !toClassify)
  {
    throw new Error('Either dataSet or labels or toClassify were not set');
  }

  // Calculate distance from toClassify to each point for all dimensions in dataSet.
  // Store distance and point's label into distances list.
  const distances: { dist: number, label: number }[] = [];
  for (let i = 0; i < dataSet.length; i += 1)
  {
    distances.push({
      dist: euclideanDistance([dataSet[i]], [toClassify]),
      label: labels[i],
    });
  }

  // Sort distances list (from closer point to further ones).
  // Take initial k values, count with class index
  const kNearest = distances.sort((a, b) =>
  {
    if (a.dist === b.dist)
    {
      return 0;
    }

    return a.dist < b.dist ? -1 : 1;
  }).slice(0, k);

  // Count the number of instances of each class in top k members.
  const labelsCounter: { [key: number]: number } = {};
  let topClass = 0;
  let topClassCount = 0;
  for (let i = 0; i < kNearest.length; i += 1)
  {
    if (kNearest[i].label in labelsCounter)
    {
      labelsCounter[kNearest[i].label] += 1;
    }
    else
    {
      labelsCounter[kNearest[i].label] = 1;
    }
    if (labelsCounter[kNearest[i].label] > topClassCount)
    {
      topClassCount = labelsCounter[kNearest[i].label];
      topClass = kNearest[i].label;
    }
  }

  // Return the class with highest count.
  return topClass;
}
