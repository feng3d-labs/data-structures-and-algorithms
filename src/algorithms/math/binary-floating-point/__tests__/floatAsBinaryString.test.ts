import { deepEqual } from 'assert';
import { floatAs32BinaryString, floatAs64BinaryString } from '../floatAsBinaryString';
import { testCases32Bits, testCases64Bits } from '../testCases';

describe('floatAs32Binary', () =>
{
  it('should create a binary representation of the floating numbers', () =>
  {
    for (let testCaseIndex = 0; testCaseIndex < testCases32Bits.length; testCaseIndex += 1)
    {
      const [decimal, binary] = testCases32Bits[testCaseIndex];
      deepEqual(floatAs32BinaryString(decimal), binary);
    }
  });
});

describe('floatAs64Binary', () =>
{
  it('should create a binary representation of the floating numbers', () =>
  {
    for (let testCaseIndex = 0; testCaseIndex < testCases64Bits.length; testCaseIndex += 1)
    {
      const [decimal, binary] = testCases64Bits[testCaseIndex];
      deepEqual(floatAs64BinaryString(decimal), binary);
    }
  });
});
