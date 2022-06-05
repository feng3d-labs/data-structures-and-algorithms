import { deepEqual } from 'assert';
import { liuHui } from '../liuHui';

describe('liuHui', () =>
{
  it('should calculate π based on 12-gon', () =>
  {
    deepEqual(liuHui(1), 3);
  });

  it('should calculate π based on 24-gon', () =>
  {
    deepEqual(liuHui(2), 3.105828541230249);
  });

  it('should calculate π based on 6144-gon', () =>
  {
    deepEqual(liuHui(10), 3.1415921059992717);
  });

  it('should calculate π based on 201326592-gon', () =>
  {
    deepEqual(liuHui(25), 3.141592653589793);
  });
});
