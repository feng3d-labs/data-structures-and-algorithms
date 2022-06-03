import { deepEqual } from 'assert';
import { PriorityQueue } from '../PriorityQueue';

describe('PriorityQueue', () =>
{
  it('should create default priority queue', () =>
  {
    const priorityQueue = new PriorityQueue();

    deepEqual(!!priorityQueue, true);
  });

  it('should insert items to the queue and respect priorities', () =>
  {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    deepEqual(priorityQueue.peek(), 10);

    priorityQueue.add(5, 2);
    deepEqual(priorityQueue.peek(), 10);

    priorityQueue.add(100, 0);
    deepEqual(priorityQueue.peek(), 100);
  });

  it('should be possible to use objects in priority queue', () =>
  {
    const priorityQueue = new PriorityQueue();

    const user1 = { name: 'Mike' };
    const user2 = { name: 'Bill' };
    const user3 = { name: 'Jane' };

    priorityQueue.add(user1, 1);
    deepEqual(priorityQueue.peek(), user1);

    priorityQueue.add(user2, 2);
    deepEqual(priorityQueue.peek(), user1);

    priorityQueue.add(user3, 0);
    deepEqual(priorityQueue.peek(), user3);
  });

  it('should poll from queue with respect to priorities', () =>
  {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    deepEqual(priorityQueue.poll(), 100);
    deepEqual(priorityQueue.poll(), 200);
    deepEqual(priorityQueue.poll(), 10);
    deepEqual(priorityQueue.poll(), 5);
  });

  it('should be possible to change priority of head node', () =>
  {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    deepEqual(priorityQueue.peek(), 100);

    priorityQueue.changePriority(100, 10);
    priorityQueue.changePriority(10, 20);

    deepEqual(priorityQueue.poll(), 200);
    deepEqual(priorityQueue.poll(), 5);
    deepEqual(priorityQueue.poll(), 100);
    deepEqual(priorityQueue.poll(), 10);
  });

  it('should be possible to change priority of internal nodes', () =>
  {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    deepEqual(priorityQueue.peek(), 100);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    deepEqual(priorityQueue.poll(), 100);
    deepEqual(priorityQueue.poll(), 5);
    deepEqual(priorityQueue.poll(), 200);
    deepEqual(priorityQueue.poll(), 10);
  });

  it('should be possible to change priority along with node addition', () =>
  {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    priorityQueue.add(15, 15);

    deepEqual(priorityQueue.poll(), 100);
    deepEqual(priorityQueue.poll(), 5);
    deepEqual(priorityQueue.poll(), 200);
    deepEqual(priorityQueue.poll(), 15);
    deepEqual(priorityQueue.poll(), 10);
  });

  it('should be possible to search in priority queue by value', () =>
  {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);
    priorityQueue.add(15, 15);

    deepEqual(priorityQueue.hasValue(70), false);
    deepEqual(priorityQueue.hasValue(15), true);
  });
});
