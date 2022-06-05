import { deepEqual } from 'assert';
import { combineWithRepetitions } from '../combineWithRepetitions';
import { factorial } from '../../../math/factorial/factorial';

describe('combineWithRepetitions', () =>
{
  it('should combine string with repetitions', () =>
  {
    deepEqual(combineWithRepetitions(['A'], 1), [
      ['A'],
    ]);

    deepEqual(combineWithRepetitions(['A', 'B'], 1), [
      ['A'],
      ['B'],
    ]);

    deepEqual(combineWithRepetitions(['A', 'B'], 2), [
      ['A', 'A'],
      ['A', 'B'],
      ['B', 'B'],
    ]);

    deepEqual(combineWithRepetitions(['A', 'B'], 3), [
      ['A', 'A', 'A'],
      ['A', 'A', 'B'],
      ['A', 'B', 'B'],
      ['B', 'B', 'B'],
    ]);

    deepEqual(combineWithRepetitions(['A', 'B', 'C'], 2), [
      ['A', 'A'],
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'B'],
      ['B', 'C'],
      ['C', 'C'],
    ]);

    deepEqual(combineWithRepetitions(['A', 'B', 'C'], 3), [
      ['A', 'A', 'A'],
      ['A', 'A', 'B'],
      ['A', 'A', 'C'],
      ['A', 'B', 'B'],
      ['A', 'B', 'C'],
      ['A', 'C', 'C'],
      ['B', 'B', 'B'],
      ['B', 'B', 'C'],
      ['B', 'C', 'C'],
      ['C', 'C', 'C'],
    ]);

    const combinationOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const combinationSlotsNumber = 4;
    const combinations = combineWithRepetitions(combinationOptions, combinationSlotsNumber);
    const n = combinationOptions.length;
    const r = combinationSlotsNumber;
    const expectedNumberOfCombinations = factorial((r + n) - 1) / (factorial(r) * factorial(n - 1));

    deepEqual(combinations.length, expectedNumberOfCombinations);
  });
});
