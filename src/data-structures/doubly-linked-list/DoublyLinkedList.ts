import { Comparator, CompareFunction } from '../../utils/comparator/Comparator';
import { DoublyLinkedListNode } from './DoublyLinkedListNode';

/**
 * 双向链表
 */
export class DoublyLinkedList<T>
{
  /**
   * 表头
   */
  head: DoublyLinkedListNode<T>;
  /**
   * 表尾
   */
  tail: DoublyLinkedListNode<T>;

  /**
   * 比较器
   */
  private compare: Comparator<T>;

  /**
   * 构建双向链表
   *
   * @param comparatorFunction 比较函数
   */
  constructor(comparatorFunction?: CompareFunction<T>)
  {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * 在头部新增结点
   * 
   * @param value 新增结点值
   * @return 新增的结点
   */
  prepend(value: T)
  {
    // Make new node to be a head.
    const newNode = new DoublyLinkedListNode(value, this.head);

    // If there is head, then it won't be head anymore.
    // Therefore, make its previous reference to be new node (new head).
    // Then mark the new node as head.
    if (this.head)
    {
      this.head.previous = newNode;
    }
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail)
    {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * 在尾部新增结点
   * 
   * @param value 新增结点值
   * @return 新增的结点
   */
  append(value: T)
  {
    const newNode = new DoublyLinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head)
    {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;

    // Attach current tail to the new node's previous reference.
    newNode.previous = this.tail;

    // Set new node to be the tail of linked list.
    this.tail = newNode;

    return this;
  }

  /**
   * 删除链表中第一个与指定值相等的结点
   * 
   * @param value 结点值
   * @return 删除的结点
   */
  delete(value: T)
  {
    if (!this.head)
    {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.head;

    while (currentNode)
    {
      if (this.compare.equal(currentNode.value, value))
      {
        deletedNode = currentNode;

        if (deletedNode === this.head)
        {
          // If HEAD is going to be deleted...

          // Set head to second node, which will become new head.
          this.head = deletedNode.next;

          // Set new head's previous to null.
          if (this.head)
          {
            this.head.previous = null;
          }

          // If all the nodes in list has same value that is passed as argument
          // then all nodes will get deleted, therefore tail needs to be updated.
          if (deletedNode === this.tail)
          {
            this.tail = null;
          }
        } else if (deletedNode === this.tail)
        {
          // If TAIL is going to be deleted...

          // Set tail to second last node, which will become new tail.
          this.tail = deletedNode.previous;
          this.tail.next = null;
        } else
        {
          // If MIDDLE node is going to be deleted...
          const previousNode = deletedNode.previous;
          const nextNode = deletedNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  /**
   * 查找与结点值相等的结点
   * 
   * @return 找到的第一个结点
   */
  find({ value = undefined, callback = undefined }: {
    /**
     * 查找的值
     */
    value?: T,
    /**
     * 比较函数
     */
    callback?: (value: T) => boolean
  })
  {
    if (!this.head)
    {
      return null;
    }

    let currentNode = this.head;

    while (currentNode)
    {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value))
      {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (value !== undefined && this.compare.equal(currentNode.value, value))
      {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * 删除表尾
   * 
   * @return 被删除的结点
   */
  deleteTail()
  {
    if (!this.tail)
    {
      // No tail to delete.
      return null;
    }

    if (this.head === this.tail)
    {
      // There is only one node in linked list.
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...
    const deletedTail = this.tail;

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deletedTail;
  }

  /**
   * 删除表头
   * 
   * @return 被删除的表头
   */
  deleteHead()
  {
    if (!this.head)
    {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next)
    {
      this.head = this.head.next;
      this.head.previous = null;
    } else
    {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * 转换为数组
   * 
   * @return 链表结点组成的函数
   */
  toArray()
  {
    const nodes: DoublyLinkedListNode<T>[] = [];

    let currentNode = this.head;
    while (currentNode)
    {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * 从数组中初始化链表
   * 
   * @param values - Array of values that need to be converted to linked list.
   * @return 初始化后的链表
   */
  fromArray(values: T[])
  {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * 转换为字符串
   * 
   * @param callback
   * @return 字符串
   */
  toString(callback?: (value: T) => string)
  {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  /**
   * Reverse a linked list.
   * 
   * @returns 反转后的链表
   */
  reverse()
  {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode)
    {
      // Store next node.
      nextNode = currNode.next;
      prevNode = currNode.previous;

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;
      currNode.previous = nextNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
