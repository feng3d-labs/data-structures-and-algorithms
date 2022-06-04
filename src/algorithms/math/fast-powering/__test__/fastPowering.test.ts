import { deepEqual } from 'assert';
import { fastPowering } from '../fastPowering';

describe('fastPowering', () =>
{
  it('should compute power in log(n) time', () =>
  {
    deepEqual(fastPowering(1, 1), 1);
    deepEqual(fastPowering(2, 0), 1);
    deepEqual(fastPowering(2, 2), 4);
    deepEqual(fastPowering(2, 3), 8);
    deepEqual(fastPowering(2, 4), 16);
    deepEqual(fastPowering(2, 5), 32);
    deepEqual(fastPowering(2, 6), 64);
    deepEqual(fastPowering(2, 7), 128);
    deepEqual(fastPowering(2, 8), 256);
    deepEqual(fastPowering(3, 4), 81);
    deepEqual(fastPowering(190, 2), 36100);
    deepEqual(fastPowering(11, 5), 161051);
    deepEqual(fastPowering(13, 11), 1792160394037);
    deepEqual(fastPowering(9, 16), 1853020188851841);
    deepEqual(fastPowering(16, 16), 18446744073709552000);
    deepEqual(fastPowering(7, 21), 558545864083284000);
    deepEqual(fastPowering(100, 9), 1000000000000000000);
  });
});
