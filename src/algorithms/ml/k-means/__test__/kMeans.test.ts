import { deepEqual, throws } from 'assert';
import { KMeans } from '../kMeans';

describe('kMeans', () =>
{
  it('should throw an error on invalid data', () =>
  {
    throws(() =>
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      KMeans();
    }, { message: 'The data is empty' });
  });

  it('should throw an error on inconsistent data', () =>
  {
    throws(() =>
    {
      KMeans([[1, 2], [1]], 2);
    }, { message: 'Matrices have different shapes' });
  });

  it('should find the nearest neighbour', () =>
  {
    const data = [[1, 1], [6, 2], [3, 3], [4, 5], [9, 2], [2, 4], [8, 7]];
    const k = 2;
    const deepEqualedClusters = [0, 1, 0, 1, 1, 0, 1];
    deepEqual(KMeans(data, k), deepEqualedClusters);

    deepEqual(KMeans([[0, 0], [0, 1], [10, 10]], 2),
      [0, 0, 1],
    );
  });

  it('should find the clusters with equal distances', () =>
  {
    const dataSet = [[0, 0], [1, 1], [2, 2]];
    const k = 3;
    const deepEqualedCluster = [0, 1, 2];
    deepEqual(KMeans(dataSet, k), deepEqualedCluster);
  });

  it('should find the nearest neighbour in 3D space', () =>
  {
    const dataSet = [[0, 0, 0], [0, 1, 0], [2, 0, 2]];
    const k = 2;
    const deepEqualedCluster = [1, 1, 0];
    deepEqual(KMeans(dataSet, k), deepEqualedCluster);
  });
});
