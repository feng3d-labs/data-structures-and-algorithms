import { LinkedListNode } from './LinkedListNode';
import { Comparator, CompareFunction } from '../../utils/comparator/Comparator';

/**
 * 链表
 */
export class LinkedList<T>
{
  /**
   * 表头
   */
  head: LinkedListNode<T>;

  /**
   * 表尾
   */
  tail: LinkedListNode<T>;

  /**
   * 比较器
   */
  private compare: Comparator<T>;

  /**
   * 构建链表
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
   * 添加新结点到表头
   * 
   * @param value 新结点值
   * @return 新增的结点
   */
  prepend(value: T)
  {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail)
    {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * 添加新结点到表尾
   * 
   * @param value 新结点值
   * @return 新增的结点
   */
  append(value: T)
  {
    const newNode = new LinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head)
    {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * 插入新结点
   * 
   * @param value 新结点值
   * @param rawIndex 插入索引
   * @return 自身
   */
  insert(value: T, rawIndex: number)
  {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0)
    {
      this.prepend(value);
    } else
    {
      let count = 1;
      let currentNode = this.head;
      const newNode = new LinkedListNode(value);
      while (currentNode)
      {
        if (count === index) break;
        currentNode = currentNode.next;
        count += 1;
      }
      if (currentNode)
      {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else
      {
        if (this.tail)
        {
          this.tail.next = newNode;
          this.tail = newNode;
        } else
        {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }
    return this;
  }

  /**
   * 删除链表中第一个与指定值相等的结点
   * 
   * @param value 结点值
   * @return 被删除的结点
   */
  delete(value: T)
  {
    if (!this.head)
    {
      return null;
    }

    let deletedNode = null;

    // If the head must be deleted then make next node that is different
    // from the head to be a new head.
    while (this.head && this.compare.equal(this.head.value, value))
    {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null)
    {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next)
      {
        if (this.compare.equal(currentNode.next.value, value))
        {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else
        {
          currentNode = currentNode.next;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.value, value))
    {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * 查找结点
   * 
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * 
   * @return 查找到的结点
   */
  find({ value = undefined, callback = undefined }: {
    /**
     * 结点值
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
    const deletedTail = this.tail;

    if (this.head === this.tail)
    {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.next)
    {
      if (!currentNode.next.next)
      {
        currentNode.next = null;
      } else
      {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * 删除表头
   * 
   * @return 被删除结点
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
    } else
    {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * 从数组中初始化链表
   * 
   * @param values - Array of values that need to be converted to linked list.
   * @return 自身
   */
  fromArray(values: T[])
  {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * 转换为数组
   */
  toArray()
  {
    const nodes: LinkedListNode<T>[] = [];

    let currentNode = this.head;
    while (currentNode)
    {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * 转换为字符串
   * 
   * @param callback 
   */
  toString(callback?: (value: T) => string)
  {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }

  /**
   * Reverse a linked list.
   * 
   * @returns 自身
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

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;

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
