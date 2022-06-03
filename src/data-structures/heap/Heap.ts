import { Comparator, CompareFunction } from '../../utils/comparator/Comparator';

/**
 * 堆
 *
 * Parent class for Min and Max Heaps.
 */
export class Heap<T>
{
  /**
   * 堆的数组表示。
   */
  private heapContainer: T[];

  /**
   * 比较器
   */
  protected compare: Comparator<T>;

  /**
   * 构建链表
   *
   * @param comparatorFunction 比较函数
   */
  constructor(comparatorFunction?: CompareFunction<T>)
  {
    if (new.target === Heap)
    {
      throw new TypeError('Cannot construct Heap instance directly');
    }

    // Array representation of the heap.
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * 获取左边子结点索引
   *
   * @param parentIndex 父结点索引
   * @return 左边子结点索引
   */
  getLeftChildIndex(parentIndex: number)
  {
    return (2 * parentIndex) + 1;
  }

  /**
   * 获取右边子结点索引
   *
   * @param parentIndex 父结点索引
   * @return 右边子结点索引
   */
  getRightChildIndex(parentIndex: number)
  {
    return (2 * parentIndex) + 2;
  }

  /**
   * 获取父结点索引
   *
   * @param childIndex 子结点索引
   * @return 父结点索引
   */
  getParentIndex(childIndex: number)
  {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * 是否有父结点
   *
   * @param childIndex 子结点索引
   * @return 是否有父结点
   */
  hasParent(childIndex: number)
  {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * 是否有左子结点
   *
   * @param parentIndex 父结点索引
   * @return 是否有左子结点
   */
  hasLeftChild(parentIndex: number)
  {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * 是否有右子结点
   *
   * @param parentIndex 父结点索引
   * @return 是否有右子结点
   */
  hasRightChild(parentIndex: number)
  {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * 获取左结点
   *
   * @param parentIndex 父结点索引
   * @return 左结点
   */
  leftChild(parentIndex: number)
  {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * 获取右结点
   *
   * @param parentIndex 父结点索引
   * @return 右结点
   */
  rightChild(parentIndex: number)
  {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   * 获取父结点
   *
   * @param childIndex 子结点索引
   * @return 父结点
   */
  parent(childIndex: number)
  {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * 交换两个结点数据
   *
   * @param indexOne 索引1
   * @param indexTwo 索引2
   */
  swap(indexOne: number, indexTwo: number)
  {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  /**
   * 查看堆顶数据
   *
   * @return 堆顶数据
   */
  peek()
  {
    if (this.heapContainer.length === 0)
    {
      return null;
    }

    return this.heapContainer[0];
  }

  /**
   * 取出堆顶元素
   *
   * @return 堆顶元素
   */
  poll()
  {
    if (this.heapContainer.length === 0)
    {
      return null;
    }

    if (this.heapContainer.length === 1)
    {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    // Move the last element from the end to the head.
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }

  /**
   * 新增元素
   *
   * @param item 新元素
   * @return 自身
   */
  add(item: T)
  {
    this.heapContainer.push(item);
    this.heapifyUp();

return this;
  }

  /**
   * 移除所有指定元素
   *
   * @param item 被移除的元素
   * @param comparator 比较器
   * @return 自身
   */
  remove(item: T, comparator = this.compare)
  {
    // Find number of items to remove.
    const numberOfItemsToRemove = this.find(item, comparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1)
    {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify process.
      const indexToRemove = this.find(item, comparator).pop();

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === (this.heapContainer.length - 1))
      {
        this.heapContainer.pop();
      }
 else
      {
        // Move last element in heap to the vacant (removed) position.
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        // Get parent.
        const parentItem = this.parent(indexToRemove);

        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up.
        if (
          this.hasLeftChild(indexToRemove)
          && (
            !parentItem
            || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
          )
        )
        {
          this.heapifyDown(indexToRemove);
        }
 else
        {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * 查找元素所在的所有索引
   *
   * @param item 查找的元素
   * @param comparator 比较器
   * @return 查找的元素所在索引了吧
   */
  find(item: T, comparator = this.compare)
  {
    const foundItemIndices: number[] = [];

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1)
    {
      if (comparator.equal(item, this.heapContainer[itemIndex]))
      {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  /**
   * 是否为空
   */
  isEmpty()
  {
    return !this.heapContainer.length;
  }

  /**
   * 转换为字符串
   */
  toString()
  {
    return this.heapContainer.toString();
  }

  /**
   * 堆冒泡
   *
   * @param customStartIndex 堆冒泡起始索引
   */
  heapifyUp(customStartIndex?: number)
  {
    // Take the last element (last in array or the bottom left in a tree)
    // in the heap container and lift it up until it is in the correct
    // order with respect to its parent element.
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex)
      && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    )
    {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * 堆下沉
   *
   * @param customStartIndex 堆下沉起始索引
   */
  heapifyDown(customStartIndex = 0)
  {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap.
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex))
    {
      if (
        this.hasRightChild(currentIndex)
        && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      )
      {
        nextIndex = this.getRightChildIndex(currentIndex);
      }
 else
      {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.pairIsInCorrectOrder(
        this.heapContainer[currentIndex],
        this.heapContainer[nextIndex],
      ))
      {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param firstElement 第一个元素
   * @param secondElement 第二个元素
   * @return {boolean}
   */
  pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean
  {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }
}
