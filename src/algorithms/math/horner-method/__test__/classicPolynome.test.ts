import { deepEqual } from 'assert';
import { classicPolynome } from '../classicPolynome';

describe('classicPolynome', () =>
{
  it('should evaluate the polynomial for the specified value of x correctly', () =>
  {
    deepEqual(classicPolynome([8], 0.1), 8);
    deepEqual(classicPolynome([2, 4, 2, 5], 0.555), 7.68400775);
    deepEqual(classicPolynome([2, 4, 2, 5], 0.75), 9.59375);
    deepEqual(classicPolynome([1, 1, 1, 1, 1], 1.75), 20.55078125);
    deepEqual(classicPolynome([15, 3.5, 0, 2, 1.42, 0.41], 0.315), 1.1367300651406251);
    deepEqual(classicPolynome([0, 0, 2.77, 1.42, 0.41], 1.35), 7.375325000000001);
    deepEqual(classicPolynome([0, 0, 2.77, 1.42, 2.3311], 1.35), 9.296425000000001);
    deepEqual(classicPolynome([2, 0, 0, 5.757, 5.31412, 12.3213], 3.141), 697.2731167035034);
  });
});
