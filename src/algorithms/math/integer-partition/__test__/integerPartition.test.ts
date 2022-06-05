import { deepEqual } from 'assert';
import { integerPartition } from '../integerPartition';

describe('integerPartition', () =>
{
  it('should partition the number', () =>
  {
    deepEqual(integerPartition(1), 1);
    deepEqual(integerPartition(2), 2);
    deepEqual(integerPartition(3), 3);
    deepEqual(integerPartition(4), 5);
    deepEqual(integerPartition(5), 7);
    deepEqual(integerPartition(6), 11);
    deepEqual(integerPartition(7), 15);
    deepEqual(integerPartition(8), 22);
  });
});
