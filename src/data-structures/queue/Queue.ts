import { LinkedList } from '../linked-list/LinkedList';

/**
 * 队列，只能从后面进，前面出
 * 使用单向链表实现
 */
export class Queue<T>
{
  linkedList: LinkedList<T>;

  constructor()
  {
    // We're going to implement Queue based on LinkedList since the two
    // structures are quite similar. Namely, they both operate mostly on
    // the elements at the beginning and the end. Compare enqueue/dequeue
    // operations of Queue with append/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList();
  }

  /**
   * 是否为空
   */
  isEmpty()
  {
    return !this.linkedList.head;
  }

  /**
   * Read the element at the front of the queue without removing it.
   *
   * 读取队列前面的元素，但不删除它。
   */
  peek()
  {
    if (this.isEmpty())
    {
      return null;
    }

    return this.linkedList.head.value;
  }

  /**
   * 入队
   *
   * 在队列的末尾(链表的尾部)添加一个新元素。
   * 这个元素将在它前面的所有元素之后被处理。
   *
   * Add a new element to the end of the queue (the tail of the linked list).
   * This element will be processed after all elements ahead of it.
   *
   * @param value 元素值
   */
  enqueue(value: T)
  {
    this.linkedList.append(value);
  }

  /**
   * 出队
   *
   * 删除队列前面的元素(链表的头)。如果队列为空，则返回null。
   *
   * Remove the element at the front of the queue (the head of the linked list).
   * If the queue is empty, return null.
   *
   * @return 出队的元素
   */
  dequeue()
  {
    const removedHead = this.linkedList.deleteHead();

return removedHead ? removedHead.value : null;
  }

  /**
   * 转换为字符串
   *
   * @param callback 值输出为字符串函数
   */
  toString(callback?: (value: T) => string)
  {
    // Return string representation of the queue's linked list.
    return this.linkedList.toString(callback);
  }
}
