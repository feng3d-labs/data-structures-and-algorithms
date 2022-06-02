import { Comparator } from '../Comparator';
import { deepEqual } from 'assert';

describe('Comparator', () =>
{
  it('should compare with default comparator function', () =>
  {
    const comparator = new Comparator();

    deepEqual(comparator.equal(0, 0), true);
    deepEqual(comparator.equal(0, 1), false);
    deepEqual(comparator.equal('a', 'a'), true);
    deepEqual(comparator.lessThan(1, 2), true);
    deepEqual(comparator.lessThan(-1, 2), true);
    deepEqual(comparator.lessThan('a', 'b'), true);
    deepEqual(comparator.lessThan('a', 'ab'), true);
    deepEqual(comparator.lessThan(10, 2), false);
    deepEqual(comparator.lessThanOrEqual(10, 2), false);
    deepEqual(comparator.lessThanOrEqual(1, 1), true);
    deepEqual(comparator.lessThanOrEqual(0, 0), true);
    deepEqual(comparator.greaterThan(0, 0), false);
    deepEqual(comparator.greaterThan(10, 0), true);
    deepEqual(comparator.greaterThanOrEqual(10, 0), true);
    deepEqual(comparator.greaterThanOrEqual(10, 10), true);
    deepEqual(comparator.greaterThanOrEqual(0, 10), false);
  });

  it('should compare with custom comparator function', () =>
  {
    const comparator = new Comparator<string>((a, b) =>
    {
      if (a.length === b.length)
      {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    deepEqual(comparator.equal('a', 'b'), true);
    deepEqual(comparator.equal('a', ''), false);
    deepEqual(comparator.lessThan('b', 'aa'), true);
    deepEqual(comparator.greaterThanOrEqual('a', 'aa'), false);
    deepEqual(comparator.greaterThanOrEqual('aa', 'a'), true);
    deepEqual(comparator.greaterThanOrEqual('a', 'a'), true);

    comparator.reverse();

    deepEqual(comparator.equal('a', 'b'), true);
    deepEqual(comparator.equal('a', ''), false);
    deepEqual(comparator.lessThan('b', 'aa'), false);
    deepEqual(comparator.greaterThanOrEqual('a', 'aa'), true);
    deepEqual(comparator.greaterThanOrEqual('aa', 'a'), false);
    deepEqual(comparator.greaterThanOrEqual('a', 'a'), true);
  });
});
