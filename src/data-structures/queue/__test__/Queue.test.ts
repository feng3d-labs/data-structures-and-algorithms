import { deepEqual } from 'assert';
import { Queue } from '../Queue';

describe('Queue', () =>
{
  it('should create empty queue', () =>
  {
    const queue = new Queue();
    deepEqual(!!queue, true);
    deepEqual(!!queue.linkedList, true);
  });

  it('should enqueue data to queue', () =>
  {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    deepEqual(queue.toString(), '1,2');
  });

  it('should be possible to enqueue/dequeue objects', () =>
  {
    const queue = new Queue<{ value: string, key: string }>();

    queue.enqueue({ value: 'test1', key: 'key1' });
    queue.enqueue({ value: 'test2', key: 'key2' });

    const stringifier = (value) => `${value.key}:${value.value}`;

    deepEqual(queue.toString(stringifier), 'key1:test1,key2:test2');
    deepEqual(queue.dequeue().value, 'test1');
    deepEqual(queue.dequeue().value, 'test2');
  });

  it('should peek data from queue', () =>
  {
    const queue = new Queue();

    deepEqual(queue.peek(), null);

    queue.enqueue(1);
    queue.enqueue(2);

    deepEqual(queue.peek(), 1);
    deepEqual(queue.peek(), 1);
  });

  it('should check if queue is empty', () =>
  {
    const queue = new Queue();

    deepEqual(queue.isEmpty(), true);

    queue.enqueue(1);

    deepEqual(queue.isEmpty(), false);
  });

  it('should dequeue from queue in FIFO order', () =>
  {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    deepEqual(queue.dequeue(), 1);
    deepEqual(queue.dequeue(), 2);
    deepEqual(queue.dequeue(), null);
    deepEqual(queue.isEmpty(), true);
  });
});
