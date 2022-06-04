import { deepEqual } from 'assert';
import { fibonacciNth } from '../fibonacciNth';

describe('fibonacciNth', () =>
{
  it('should calculate fibonacci correctly', () =>
  {
    deepEqual(fibonacciNth(1), 1);
    deepEqual(fibonacciNth(2), 1);
    deepEqual(fibonacciNth(3), 2);
    deepEqual(fibonacciNth(4), 3);
    deepEqual(fibonacciNth(5), 5);
    deepEqual(fibonacciNth(6), 8);
    deepEqual(fibonacciNth(7), 13);
    deepEqual(fibonacciNth(8), 21);
    deepEqual(fibonacciNth(20), 6765);
    deepEqual(fibonacciNth(30), 832040);
    deepEqual(fibonacciNth(50), 12586269025);
    deepEqual(fibonacciNth(70), 190392490709135);
    deepEqual(fibonacciNth(71), 308061521170129);
    deepEqual(fibonacciNth(72), 498454011879264);
    deepEqual(fibonacciNth(73), 806515533049393);
    deepEqual(fibonacciNth(74), 1304969544928657);
    deepEqual(fibonacciNth(75), 2111485077978050);
  });
});
