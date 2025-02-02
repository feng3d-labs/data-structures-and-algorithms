/**
 * @param permutationOptions
 * @param permutationLength
 */
export function permutateWithRepetitions<T>(
  permutationOptions: T[],
  permutationLength = permutationOptions.length,
): T[][]
{
  if (permutationLength === 1)
  {
    return permutationOptions.map((permutationOption) => [permutationOption]);
  }

  // Init permutations array.
  const permutations: T[][] = [];

  // Get smaller permutations.
  const smallerPermutations = permutateWithRepetitions(
    permutationOptions,
    permutationLength - 1,
  );

  // Go through all options and join it to the smaller permutations.
  permutationOptions.forEach((currentOption) =>
  {
    smallerPermutations.forEach((smallerPermutation) =>
    {
      permutations.push([currentOption].concat(smallerPermutation));
    });
  });

  return permutations;
}
