import { DisjointSetItem } from './DisjointSetItem';

/**
 * 并查集
 *
 * 并查集是一种树型的数据结构，用于处理一些不交集（Disjoint Sets）的合并及查询问题。
 *
 * @see https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/disjoint-set/DisjointSet.js
 * @see https://en.wikipedia.org/wiki/Disjoint-set_data_structure
 * @see https://www.youtube.com/watch?v=wU6udHRIkcc&index=14&t=0s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8
 */
export class DisjointSet<T>
{
  private items: { [key: string]: DisjointSetItem<T> };

  /**
   * 计算键值函数
   */
  private keyCallback: (value: T) => string;

  /**
   * 构建 并查集
   *
   * @param keyCallback 计算键值函数
   */
  constructor(keyCallback?: (value: T) => string)
  {
    this.keyCallback = keyCallback;
    this.items = {};
  }

  /**
   * 创建集合
   *
   * @param itemValue 结点值
   * @return 创建的集合
   */
  makeSet(itemValue: T)
  {
    const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);

    if (!this.items[disjointSetItem.getKey()])
    {
      // Add new item only in case if it not presented yet.
      this.items[disjointSetItem.getKey()] = disjointSetItem;
    }

    return this;
  }

  /**
   * Find set representation node.
   *
   * @param itemValue 结点值
   */
  find(itemValue: T)
  {
    const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);

    // Try to find item itself;
    const requiredDisjointItem = this.items[templateDisjointItem.getKey()];

    if (!requiredDisjointItem)
    {
      return null;
    }

    return requiredDisjointItem.getRoot().getKey();
  }

  /**
   * Union by rank.
   *
   * @param valueA 值A
   * @param valueB 值B
   * @return 自身
   */
  union(valueA: T, valueB: T)
  {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null)
    {
      throw new Error('One or two values are not in sets');
    }

    if (rootKeyA === rootKeyB)
    {
      // In case if both elements are already in the same set then just return its key.
      return this;
    }

    const rootA = this.items[rootKeyA];
    const rootB = this.items[rootKeyB];

    if (rootA.getRank() < rootB.getRank())
    {
      // If rootB's tree is bigger then make rootB to be a new root.
      rootB.addChild(rootA);

      return this;
    }

    // If rootA's tree is bigger then make rootA to be a new root.
    rootA.addChild(rootB);

    return this;
  }

  /**
   * 判断两个值是否在相同集合中
   *
   * @param valueA 值A
   * @param valueB 值B
   */
  inSameSet(valueA: T, valueB: T)
  {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);

    if (rootKeyA === null || rootKeyB === null)
    {
      throw new Error('One or two values are not in sets');
    }

    return rootKeyA === rootKeyB;
  }
}
