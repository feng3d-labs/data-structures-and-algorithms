import { deepEqual, throws } from 'assert';
import { fibonacciNthClosedForm } from '../fibonacciNthClosedForm';

describe('fibonacciClosedForm', () =>
{
  it('should throw an error when trying to calculate fibonacci for not allowed positions', () =>
  {
    const calculateFibonacciForNotAllowedPosition = () =>
    {
      fibonacciNthClosedForm(76);
    };

    throws(calculateFibonacciForNotAllowedPosition);
  });

  it('should calculate fibonacci correctly', () =>
  {
    deepEqual(fibonacciNthClosedForm(1), 1);
    deepEqual(fibonacciNthClosedForm(2), 1);
    deepEqual(fibonacciNthClosedForm(3), 2);
    deepEqual(fibonacciNthClosedForm(4), 3);
    deepEqual(fibonacciNthClosedForm(5), 5);
    deepEqual(fibonacciNthClosedForm(6), 8);
    deepEqual(fibonacciNthClosedForm(7), 13);
    deepEqual(fibonacciNthClosedForm(8), 21);
    deepEqual(fibonacciNthClosedForm(20), 6765);
    deepEqual(fibonacciNthClosedForm(30), 832040);
    deepEqual(fibonacciNthClosedForm(50), 12586269025);
    deepEqual(fibonacciNthClosedForm(70), 190392490709135);
  });
});
