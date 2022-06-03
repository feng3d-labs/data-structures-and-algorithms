import { Heap } from './Heap';

/**
 * 最小堆
 *
 * 所有父结点都小于子结点
 */
export class MinHeap<T> extends Heap<T>
{
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * 检查堆元素对的顺序是否正确。
   * 对于MinHeap，第一个元素必须总是小于等于。
   * 对于MaxHeap，第一个元素必须总是大于或等于。
   *
   * @param firstElement 第一个元素
   * @param secondElement 第二个元素
   * @return 堆元素对的顺序是否正确
   */
  pairIsInCorrectOrder(firstElement: T, secondElement: T)
  {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}
