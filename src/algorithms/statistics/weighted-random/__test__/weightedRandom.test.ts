import { deepEqual, notDeepEqual, throws } from 'assert';
import { weightedRandom } from '../weightedRandom';

describe('weightedRandom', () =>
{
  it('should throw an error when the number of weights does not match the number of items', () =>
  {
    const getWeightedRandomWithInvalidInputs = () =>
    {
      weightedRandom(['a', 'b', 'c'], [10, 0]);
    };
    throws(getWeightedRandomWithInvalidInputs, { message: 'Items and weights must be of the same size' });
  });

  it('should throw an error when the number of weights or items are empty', () =>
  {
    const getWeightedRandomWithInvalidInputs = () =>
    {
      weightedRandom([], []);
    };
    throws(getWeightedRandomWithInvalidInputs, { message: 'Items must not be empty' });
  });

  it('should correctly do random selection based on wights in straightforward cases', () =>
  {
    deepEqual(weightedRandom(['a', 'b', 'c'], [1, 0, 0]), { index: 0, item: 'a' });
    deepEqual(weightedRandom(['a', 'b', 'c'], [0, 1, 0]), { index: 1, item: 'b' });
    deepEqual(weightedRandom(['a', 'b', 'c'], [0, 0, 1]), { index: 2, item: 'c' });
    notDeepEqual(weightedRandom(['a', 'b', 'c'], [0, 1, 1]), { index: 0, item: 'a' });
    notDeepEqual(weightedRandom(['a', 'b', 'c'], [1, 0, 1]), { index: 1, item: 'b' });
    notDeepEqual(weightedRandom(['a', 'b', 'c'], [1, 1, 0]), { index: 2, item: 'c' });
  });

  it('should correctly do random selection based on wights', () =>
  {
    // Number of times we're going to select the random items based on their weights.
    const ATTEMPTS_NUM = 1000;
    // The +/- delta in the number of times each item has been actually selected.
    // I.e. if we want the item 'a' to be selected 300 times out of 1000 cases (30%)
    // then 267 times is acceptable since it is bigger that 250 (which is 300 - 50)
    // ans smaller than 350 (which is 300 + 50)
    const THRESHOLD = 50;

    const items = ['a', 'b', 'c']; // The actual items values don't matter.
    const weights = [0.1, 0.3, 0.6];

    const counter = [];
    for (let i = 0; i < ATTEMPTS_NUM; i += 1)
    {
      const randomItem = weightedRandom(items, weights);
      if (!counter[randomItem.index])
      {
        counter[randomItem.index] = 1;
      }
      else
      {
        counter[randomItem.index] += 1;
      }
    }

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1)
    {
      /*
        i.e. item with the index of 0 must be selected 100 times (ideally)
        or with the threshold of [100 - 50, 100 + 50] times.

        i.e. item with the index of 1 must be selected 300 times (ideally)
        or with the threshold of [300 - 50, 300 + 50] times.

        i.e. item with the index of 2 must be selected 600 times (ideally)
        or with the threshold of [600 - 50, 600 + 50] times.
       */
      deepEqual(counter[itemIndex] > ATTEMPTS_NUM * weights[itemIndex] - THRESHOLD, true);
      deepEqual(counter[itemIndex] < ATTEMPTS_NUM * weights[itemIndex] + THRESHOLD, true);
    }
  });
});
