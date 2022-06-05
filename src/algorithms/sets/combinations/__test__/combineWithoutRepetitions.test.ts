import { deepEqual } from 'assert';
import { combineWithoutRepetitions } from '../combineWithoutRepetitions';
import { factorial } from '../../../math/factorial/factorial';
import { pascalTriangle } from '../../../math/pascal-triangle/pascalTriangle';

describe('combineWithoutRepetitions', () =>
{
  it('should combine string without repetitions', () =>
  {
    deepEqual(combineWithoutRepetitions(['A', 'B'], 3), []);

    deepEqual(combineWithoutRepetitions(['A', 'B'], 1), [
      ['A'],
      ['B'],
    ]);

    deepEqual(combineWithoutRepetitions(['A'], 1), [
      ['A'],
    ]);

    deepEqual(combineWithoutRepetitions(['A', 'B'], 2), [
      ['A', 'B'],
    ]);

    deepEqual(combineWithoutRepetitions(['A', 'B', 'C'], 2), [
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'C'],
    ]);

    deepEqual(combineWithoutRepetitions(['A', 'B', 'C'], 3), [
      ['A', 'B', 'C'],
    ]);

    deepEqual(combineWithoutRepetitions(['A', 'B', 'C', 'D'], 3), [
      ['A', 'B', 'C'],
      ['A', 'B', 'D'],
      ['A', 'C', 'D'],
      ['B', 'C', 'D'],
    ]);

    deepEqual(combineWithoutRepetitions(['A', 'B', 'C', 'D', 'E'], 3), [
      ['A', 'B', 'C'],
      ['A', 'B', 'D'],
      ['A', 'B', 'E'],
      ['A', 'C', 'D'],
      ['A', 'C', 'E'],
      ['A', 'D', 'E'],
      ['B', 'C', 'D'],
      ['B', 'C', 'E'],
      ['B', 'D', 'E'],
      ['C', 'D', 'E'],
    ]);

    const combinationOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const combinationSlotsNumber = 4;
    const combinations = combineWithoutRepetitions(combinationOptions, combinationSlotsNumber);
    const n = combinationOptions.length;
    const r = combinationSlotsNumber;
    const expectedNumberOfCombinations = factorial(n) / (factorial(r) * factorial(n - r));

    deepEqual(combinations.length, expectedNumberOfCombinations);

    // This one is just to see one of the way of Pascal's triangle application.
    deepEqual(combinations.length, pascalTriangle(n)[r]);
  });
});
