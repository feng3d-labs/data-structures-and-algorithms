import { deepEqual } from 'assert';
import { permutateWithRepetitions } from '../permutateWithRepetitions';

describe('permutateWithRepetitions', () =>
{
  it('should permutate string with repetition', () =>
  {
    const permutations1 = permutateWithRepetitions(['A']);
    deepEqual(permutations1, [
      ['A'],
    ]);

    const permutations2 = permutateWithRepetitions(['A', 'B']);
    deepEqual(permutations2, [
      ['A', 'A'],
      ['A', 'B'],
      ['B', 'A'],
      ['B', 'B'],
    ]);

    const permutations3 = permutateWithRepetitions(['A', 'B', 'C']);
    deepEqual(permutations3, [
      ['A', 'A', 'A'],
      ['A', 'A', 'B'],
      ['A', 'A', 'C'],
      ['A', 'B', 'A'],
      ['A', 'B', 'B'],
      ['A', 'B', 'C'],
      ['A', 'C', 'A'],
      ['A', 'C', 'B'],
      ['A', 'C', 'C'],
      ['B', 'A', 'A'],
      ['B', 'A', 'B'],
      ['B', 'A', 'C'],
      ['B', 'B', 'A'],
      ['B', 'B', 'B'],
      ['B', 'B', 'C'],
      ['B', 'C', 'A'],
      ['B', 'C', 'B'],
      ['B', 'C', 'C'],
      ['C', 'A', 'A'],
      ['C', 'A', 'B'],
      ['C', 'A', 'C'],
      ['C', 'B', 'A'],
      ['C', 'B', 'B'],
      ['C', 'B', 'C'],
      ['C', 'C', 'A'],
      ['C', 'C', 'B'],
      ['C', 'C', 'C'],
    ]);

    const permutations4 = permutateWithRepetitions(['A', 'B', 'C', 'D']);
    deepEqual(permutations4.length, 4 * 4 * 4 * 4);
  });
});
