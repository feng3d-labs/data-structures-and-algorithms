import { deepEqual } from 'assert';
import { accumulatorBestTimeToBuySellStocks } from '../accumulatorBestTimeToBuySellStocks';

describe('accumulatorBestTimeToBuySellStocks', () =>
{
  it('should find the best time to buy and sell stocks', () =>
  {
    let visitTimes = 0;
    const visit = () => { visitTimes++; };

    deepEqual(accumulatorBestTimeToBuySellStocks([1, 5]), 4);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([1], visit), 0);
    deepEqual(visitTimes, 1);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([1, 5], visit), 4);
    deepEqual(visitTimes, 2);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([5, 1], visit), 0);
    deepEqual(visitTimes, 2);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([1, 5, 10], visit), 9);
    deepEqual(visitTimes, 3);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([10, 1, 5, 20, 15, 21], visit), 25);
    deepEqual(visitTimes, 6);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([7, 1, 5, 3, 6, 4], visit), 7);
    deepEqual(visitTimes, 6);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([1, 2, 3, 4, 5], visit), 4);
    deepEqual(visitTimes, 5);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks([7, 6, 4, 3, 1], visit), 0);
    deepEqual(visitTimes, 5);

    visitTimes = 0;
    deepEqual(accumulatorBestTimeToBuySellStocks(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      visit,
    ), 19);
    deepEqual(visitTimes, 20);
  });
});
