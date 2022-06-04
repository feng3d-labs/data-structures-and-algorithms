import { deepEqual } from 'assert';
import { switchSign } from '../switchSign';

describe('switchSign', () =>
{
  it('should switch the sign of the number using twos complement approach', () =>
  {
    deepEqual(switchSign(0), 0);
    deepEqual(switchSign(1), -1);
    deepEqual(switchSign(-1), 1);
    deepEqual(switchSign(32), -32);
    deepEqual(switchSign(-32), 32);
    deepEqual(switchSign(23), -23);
    deepEqual(switchSign(-23), 23);
  });
});
