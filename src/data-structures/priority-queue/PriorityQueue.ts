import { Comparator } from '../../utils/comparator/Comparator';
import { MinHeap } from '../heap/MinHeap';

/**
 * 优先队列
 *
 * It is the same as min heap except that when comparing two elements
 * we take into account its priority instead of the element's value.
 */
export class PriorityQueue<T> extends MinHeap<T>
{
  private priorities: Map<T, number>;

  constructor()
  {
    // Call MinHip constructor first.
    super();

    // Setup priorities map.
    this.priorities = new Map();

    // Use custom comparator for heap elements that will take element priority
    // instead of element value into account.
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * Add item to the priority queue.
   *
   * @param item item we're going to add to the queue.
   * @param priority items priority.
   */
  add(item: T, priority = 0)
  {
    this.priorities.set(item, priority);
    super.add(item);

return this;
  }

  /**
   * Remove item from priority queue.
   *
   * @param item item we're going to remove.
   * @param customFindingComparator custom function for finding the item to remove
   */
  remove(item: T, customFindingComparator: Comparator<T>)
  {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);

return this;
  }

  /**
   * Change priority of the item in a queue.
   *
   * @param item item we're going to re-prioritize.
   * @param priority new item's priority.
   */
  changePriority(item: T, priority: number)
  {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);

return this;
  }

  /**
   * Find item by ite value.
   *
   * @param item
   */
  findByValue(item: T)
  {
    return this.find(item, new Comparator(this.compareValue));
  }

  /**
   * Check if item already exists in a queue.
   *
   * @param item 元素
   */
  hasValue(item: T)
  {
    return this.findByValue(item).length > 0;
  }

  /**
   * Compares priorities of two items.
   *
   * @param a 元素a
   * @param b 元素b
   */
  comparePriority(a: T, b: T)
  {
    if (this.priorities.get(a) === this.priorities.get(b))
    {
      return 0;
    }

return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  /**
   * Compares values of two items.
   * @param a 元素a
   * @param b 元素b
   */
  compareValue(a: T, b: T)
  {
    if (a === b)
    {
      return 0;
    }

return a < b ? -1 : 1;
  }
}
