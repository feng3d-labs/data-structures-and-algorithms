import { deepEqual } from 'assert';
import { Stack } from '../Stack';

describe('Stack', () =>
{
  it('should create empty stack', () =>
  {
    const stack = new Stack();
    deepEqual(!!stack, true);
    deepEqual(!!stack.linkedList, true);
  });

  it('should stack data to stack', () =>
  {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    deepEqual(stack.toString(), '2,1');
  });

  it('should peek data from stack', () =>
  {
    const stack = new Stack();

    deepEqual(stack.peek(), null);

    stack.push(1);
    stack.push(2);

    deepEqual(stack.peek(), 2);
    deepEqual(stack.peek(), 2);
  });

  it('should check if stack is empty', () =>
  {
    const stack = new Stack();

    deepEqual(stack.isEmpty(), true);

    stack.push(1);

    deepEqual(stack.isEmpty(), false);
  });

  it('should pop data from stack', () =>
  {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    deepEqual(stack.pop(), 2);
    deepEqual(stack.pop(), 1);
    deepEqual(stack.pop(), null);
    deepEqual(stack.isEmpty(), true);
  });

  it('should be possible to push/pop objects', () =>
  {
    const stack = new Stack<{ value: string, key: string }>();

    stack.push({ value: 'test1', key: 'key1' });
    stack.push({ value: 'test2', key: 'key2' });

    const stringifier = (value: { value: string, key: string }) => `${value.key}:${value.value}`;

    deepEqual(stack.toString(stringifier), 'key2:test2,key1:test1');
    deepEqual(stack.pop().value, 'test2');
    deepEqual(stack.pop().value, 'test1');
  });

  it('should be possible to convert stack to array', () =>
  {
    const stack = new Stack();

    deepEqual(stack.peek(), null);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    deepEqual(stack.toArray(), [3, 2, 1]);
  });
});
