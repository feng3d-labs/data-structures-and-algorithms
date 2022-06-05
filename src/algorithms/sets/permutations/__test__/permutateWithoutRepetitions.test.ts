import { deepEqual } from 'assert';
import { permutateWithoutRepetitions } from '../permutateWithoutRepetitions';
import { factorial } from '../../../math/factorial/factorial';

describe('permutateWithoutRepetitions', () =>
{
  it('should permutate string', () =>
  {
    const permutations1 = permutateWithoutRepetitions(['A']);
    deepEqual(permutations1, [
      ['A'],
    ]);

    const permutations2 = permutateWithoutRepetitions(['A', 'B']);
    deepEqual(permutations2.length, 2);
    deepEqual(permutations2, [
      ['A', 'B'],
      ['B', 'A'],
    ]);

    const permutations6 = permutateWithoutRepetitions(['A', 'A']);
    deepEqual(permutations6.length, 2);
    deepEqual(permutations6, [
      ['A', 'A'],
      ['A', 'A'],
    ]);

    const permutations3 = permutateWithoutRepetitions(['A', 'B', 'C']);
    deepEqual(permutations3.length, factorial(3));
    deepEqual(permutations3, [
      ['A', 'B', 'C'],
      ['B', 'A', 'C'],
      ['B', 'C', 'A'],
      ['A', 'C', 'B'],
      ['C', 'A', 'B'],
      ['C', 'B', 'A'],
    ]);

    const permutations4 = permutateWithoutRepetitions(['A', 'B', 'C', 'D']);
    deepEqual(permutations4.length, factorial(4));
    deepEqual(permutations4, [
      ['A', 'B', 'C', 'D'],
      ['B', 'A', 'C', 'D'],
      ['B', 'C', 'A', 'D'],
      ['B', 'C', 'D', 'A'],
      ['A', 'C', 'B', 'D'],
      ['C', 'A', 'B', 'D'],
      ['C', 'B', 'A', 'D'],
      ['C', 'B', 'D', 'A'],
      ['A', 'C', 'D', 'B'],
      ['C', 'A', 'D', 'B'],
      ['C', 'D', 'A', 'B'],
      ['C', 'D', 'B', 'A'],
      ['A', 'B', 'D', 'C'],
      ['B', 'A', 'D', 'C'],
      ['B', 'D', 'A', 'C'],
      ['B', 'D', 'C', 'A'],
      ['A', 'D', 'B', 'C'],
      ['D', 'A', 'B', 'C'],
      ['D', 'B', 'A', 'C'],
      ['D', 'B', 'C', 'A'],
      ['A', 'D', 'C', 'B'],
      ['D', 'A', 'C', 'B'],
      ['D', 'C', 'A', 'B'],
      ['D', 'C', 'B', 'A'],
    ]);

    const permutations5 = permutateWithoutRepetitions(['A', 'B', 'C', 'D', 'E', 'F']);
    deepEqual(permutations5.length, factorial(6));
  });
});
