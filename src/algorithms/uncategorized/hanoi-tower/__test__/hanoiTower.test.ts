import { deepEqual } from 'assert';
import { Stack } from '../../../../data-structures/stack/Stack';
import { hanoiTower } from '../hanoiTower';

describe('hanoiTower', () =>
{
  it('should solve tower of hanoi puzzle with 2 discs', () =>
  {
    let moveCallbackTimes = 0;
    const moveCallbackCalls = [];
    const moveCallback = (...args: any) => { moveCallbackTimes++; moveCallbackCalls.push(args); };
    const numberOfDiscs = 2;

    const fromPole = new Stack();
    const withPole = new Stack();
    const toPole = new Stack();

    hanoiTower({
      numberOfDiscs,
      moveCallback,
      fromPole,
      withPole,
      toPole,
    });

    deepEqual(moveCallbackTimes, (2 ** numberOfDiscs) - 1);

    deepEqual(fromPole.toArray(), []);
    deepEqual(toPole.toArray(), [1, 2]);

    deepEqual(moveCallbackCalls[0][0], 1);
    deepEqual(moveCallbackCalls[0][1], [1, 2]);
    deepEqual(moveCallbackCalls[0][2], []);

    deepEqual(moveCallbackCalls[1][0], 2);
    deepEqual(moveCallbackCalls[1][1], [2]);
    deepEqual(moveCallbackCalls[1][2], []);

    deepEqual(moveCallbackCalls[2][0], 1);
    deepEqual(moveCallbackCalls[2][1], [1]);
    deepEqual(moveCallbackCalls[2][2], [2]);
  });

  it('should solve tower of hanoi puzzle with 3 discs', () =>
  {
    let moveCallbackTimes = 0;
    const moveCallback = () => { moveCallbackTimes++; };
    const numberOfDiscs = 3;

    hanoiTower({
      numberOfDiscs,
      moveCallback,
    });

    deepEqual(moveCallbackTimes, (2 ** numberOfDiscs) - 1);
  });

  it('should solve tower of hanoi puzzle with 6 discs', () =>
  {
    let moveCallbackTimes = 0;
    const moveCallback = () => { moveCallbackTimes++; };
    const numberOfDiscs = 6;

    hanoiTower({
      numberOfDiscs,
      moveCallback,
    });

    deepEqual(moveCallbackTimes, (2 ** numberOfDiscs) - 1);
  });
});
