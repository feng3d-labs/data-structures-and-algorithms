/**
 * 链表结点
 */
export class LinkedListNode<T>
{
  /**
   * 值
   */
  value: T;
  /**
   * 下一个结点
   */
  next: LinkedListNode<T>;

  constructor(value: T, next = null)
  {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (value: T) => string)
  {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
