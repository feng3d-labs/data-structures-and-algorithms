import { deepEqual } from 'assert';
import { nQueensBitwise } from '../nQueensBitwise';

describe('nQueensBitwise', () =>
{
  it('should have solutions for 4 to N queens', () =>
  {
    deepEqual(nQueensBitwise(4), 2);
    deepEqual(nQueensBitwise(5), 10);
    deepEqual(nQueensBitwise(6), 4);
    deepEqual(nQueensBitwise(7), 40);
    deepEqual(nQueensBitwise(8), 92);
    deepEqual(nQueensBitwise(9), 352);
    deepEqual(nQueensBitwise(10), 724);
    deepEqual(nQueensBitwise(11), 2680);
  });
});
