/**
 * 双向链接结点
 */
export class DoublyLinkedListNode<T>
{
  /**
   * 值
   */
  value: T;

  /**
   * 上一个结点
   */
  previous: DoublyLinkedListNode<T>;

  /**
   * 下一个结点
   */
  next: DoublyLinkedListNode<T>;

  constructor(value: T, next: DoublyLinkedListNode<T> = null, previous: DoublyLinkedListNode<T> = null)
  {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback?: (value: T) => string)
  {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
