/* eslint-disable @typescript-eslint/ban-ts-comment */
import { deepEqual, throws } from 'assert';
import { kNN } from '../kNN';

describe('kNN', () =>
{
  it('should throw an error on invalid data', () =>
  {
    throws(() =>
    {
      // @ts-ignore
      kNN();
    }, { message: 'Either dataSet or labels or toClassify were not set' });
  });

  it('should throw an error on invalid labels', () =>
  {
    const noLabels = () =>
    {
      // @ts-ignore
      kNN([[1, 1]]);
    };
    throws(noLabels, { message: 'Either dataSet or labels or toClassify were not set' });
  });

  it('should throw an error on not giving classification vector', () =>
  {
    const noClassification = () =>
    {
      // @ts-ignore
      kNN([[1, 1]], [1]);
    };
    throws(noClassification, { message: 'Either dataSet or labels or toClassify were not set' });
  });

  it('should throw an error on not giving classification vector', () =>
  {
    const inconsistent = () =>
    {
      kNN([[1, 1]], [1], [1]);
    };
    throws(inconsistent, { message: 'Matrices have different shapes' });
  });

  it('should find the nearest neighbour', () =>
  {
    let dataSet;
    let labels;
    let toClassify;
    let expectedClass;

    dataSet = [[1, 1], [2, 2]];
    labels = [1, 2];
    toClassify = [1, 1];
    expectedClass = 1;
    deepEqual(kNN(dataSet, labels, toClassify), expectedClass);

    dataSet = [[1, 1], [6, 2], [3, 3], [4, 5], [9, 2], [2, 4], [8, 7]];
    labels = [1, 2, 1, 2, 1, 2, 1];
    toClassify = [1.25, 1.25];
    expectedClass = 1;
    deepEqual(kNN(dataSet, labels, toClassify), expectedClass);

    dataSet = [[1, 1], [6, 2], [3, 3], [4, 5], [9, 2], [2, 4], [8, 7]];
    labels = [1, 2, 1, 2, 1, 2, 1];
    toClassify = [1.25, 1.25];
    expectedClass = 2;
    deepEqual(kNN(dataSet, labels, toClassify, 5), expectedClass);
  });

  it('should find the nearest neighbour with equal distances', () =>
  {
    const dataSet = [[0, 0], [1, 1], [0, 2]];
    const labels = [1, 3, 3];
    const toClassify = [0, 1];
    const expectedClass = 3;
    deepEqual(kNN(dataSet, labels, toClassify), expectedClass);
  });

  it('should find the nearest neighbour in 3D space', () =>
  {
    const dataSet = [[0, 0, 0], [0, 1, 1], [0, 0, 2]];
    const labels = [1, 3, 3];
    const toClassify = [0, 0, 1];
    const expectedClass = 3;
    deepEqual(kNN(dataSet, labels, toClassify), expectedClass);
  });
});
