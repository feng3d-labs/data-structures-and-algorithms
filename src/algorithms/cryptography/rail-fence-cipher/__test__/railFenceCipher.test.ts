import { deepEqual } from 'assert';
import { decodeRailFenceCipher, encodeRailFenceCipher } from '../railFenceCipher';

describe('railFenceCipher', () =>
{
  it('encodes a string correctly for base=3', () =>
  {
    deepEqual(encodeRailFenceCipher('', 3), '');
    deepEqual(encodeRailFenceCipher('12345', 3),
      '15243',
    );
    deepEqual(encodeRailFenceCipher('WEAREDISCOVEREDFLEEATONCE', 3),
      'WECRLTEERDSOEEFEAOCAIVDEN',
    );
    deepEqual(encodeRailFenceCipher('Hello, World!', 3),
      'Hoo!el,Wrdl l',
    );
  });

  it('decodes a string correctly for base=3', () =>
  {
    deepEqual(decodeRailFenceCipher('', 3), '');
    deepEqual(decodeRailFenceCipher('WECRLTEERDSOEEFEAOCAIVDEN', 3),
      'WEAREDISCOVEREDFLEEATONCE',
    );
    deepEqual(decodeRailFenceCipher('Hoo!el,Wrdl l', 3),
      'Hello, World!',
    );
    deepEqual(decodeRailFenceCipher('15243', 3),
      '12345',
    );
  });

  it('encodes a string correctly for base=4', () =>
  {
    deepEqual(encodeRailFenceCipher('', 4), '');
    deepEqual(encodeRailFenceCipher('THEYAREATTACKINGFROMTHENORTH', 4),
      'TEKOOHRACIRMNREATANFTETYTGHH',
    );
  });

  it('decodes a string correctly for base=4', () =>
  {
    deepEqual(decodeRailFenceCipher('', 4), '');
    deepEqual(decodeRailFenceCipher('TEKOOHRACIRMNREATANFTETYTGHH', 4),
      'THEYAREATTACKINGFROMTHENORTH',
    );
  });
});
