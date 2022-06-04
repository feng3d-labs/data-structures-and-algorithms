import { deepEqual } from 'assert';
import { bitLength } from '../bitLength';

describe('bitLength', () =>
{
  it('should calculate number of bits that the number is consists of', () =>
  {
    deepEqual(bitLength(0b0), 0);
    deepEqual(bitLength(0b1), 1);
    deepEqual(bitLength(0b01), 1);
    deepEqual(bitLength(0b101), 3);
    deepEqual(bitLength(0b0101), 3);
    deepEqual(bitLength(0b10101), 5);
    deepEqual(bitLength(0b11110101), 8);
    deepEqual(bitLength(0b00011110101), 8);
  });
});
