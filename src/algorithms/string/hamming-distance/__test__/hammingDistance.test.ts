import { deepEqual, throws } from 'assert';
import { hammingDistance } from '../hammingDistance';

describe('hammingDistance', () =>
{
  it('should throw an error when trying to compare the strings of different lengths', () =>
  {
    const compareStringsOfDifferentLength = () =>
    {
      hammingDistance('a', 'aa');
    };

    throws(compareStringsOfDifferentLength);
  });

  it('should calculate difference between two strings', () =>
  {
    deepEqual(hammingDistance('a', 'a'), 0);
    deepEqual(hammingDistance('a', 'b'), 1);
    deepEqual(hammingDistance('abc', 'add'), 2);
    deepEqual(hammingDistance('karolin', 'kathrin'), 3);
    deepEqual(hammingDistance('karolin', 'kerstin'), 3);
    deepEqual(hammingDistance('1011101', '1001001'), 2);
    deepEqual(hammingDistance('2173896', '2233796'), 3);
  });
});
