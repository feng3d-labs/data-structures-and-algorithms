import { LinkedList } from '../linked-list/LinkedList';

/**
 * 栈
 *
 * 后进先出
 */
export class Stack<T>
{
  linkedList = new LinkedList<T>();

  constructor()
  {
    // We're going to implement Stack based on LinkedList since these
    // structures are quite similar. Compare push/pop operations of the Stack
    // with prepend/deleteHead operations of LinkedList.
    this.linkedList = new LinkedList();
  }

  /**
   * 是否为空
   */
  isEmpty()
  {
    // The stack is empty if its linked list doesn't have a head.
    return !this.linkedList.head;
  }

  /**
   * 查看第一个元素值
   */
  peek()
  {
    if (this.isEmpty())
    {
      // If the linked list is empty then there is nothing to peek from.
      return null;
    }

    // Just read the value from the start of linked list without deleting it.
    return this.linkedList.head.value;
  }

  /**
   * 入栈
   *
   * @param value 元素值
   */
  push(value: T)
  {
    // Pushing means to lay the value on top of the stack. Therefore let's just add
    // the new value at the start of the linked list.
    this.linkedList.prepend(value);
  }

  /**
   * 出栈
   */
  pop()
  {
    // Let's try to delete the first node (the head) from the linked list.
    // If there is no head (the linked list is empty) just return null.
    const removedHead = this.linkedList.deleteHead();

return removedHead ? removedHead.value : null;
  }

  /**
   * 转换为数组
   */
  toArray()
  {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  /**
   * 转换为字符串
   *
   * @param callback 值输出为字符串函数
   */
  toString(callback?: (value: T) => string)
  {
    return this.linkedList.toString(callback);
  }
}
