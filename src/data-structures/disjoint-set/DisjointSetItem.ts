/**
 * 并查集结点
 */
export class DisjointSetItem<T>
{
  /**
   * 值
   */
  private value: T;

  /**
   * 计算键值函数
   */
  private keyCallback: (value: T) => string;

  /**
   * 父结点
   */
  private parent: DisjointSetItem<T>;
  /**
   * 子结点
   */
  private children: { [key: string]: DisjointSetItem<T> };

  /**
   * 构建 并查集 项
   * 
   * @param value 值
   * @param keyCallback 计算键值函数
   */
  constructor(value: T, keyCallback?: (value: T) => string)
  {
    this.value = value;
    this.keyCallback = keyCallback;
    this.parent = null;
    this.children = {};
  }

  /**
   * 获取键值
   */
  getKey()
  {
    // Allow user to define custom key generator.
    if (this.keyCallback)
    {
      return this.keyCallback(this.value);
    }

    // Otherwise use value as a key by default.
    return this.value as any as string;
  }

  /**
   * 获取根结点
   */
  getRoot(): DisjointSetItem<T>
  {
    return this.isRoot() ? this : this.parent.getRoot();
  }

  /**
   * 是否为根结点
   */
  isRoot()
  {
    return this.parent === null;
  }

  /**
   * Rank basically means the number of all ancestors.
   *
   * @return 所有子孙结点数量
   */
  getRank()
  {
    if (this.getChildren().length === 0)
    {
      return 0;
    }

    let rank = 0;

    this.getChildren().forEach((child) =>
    {
      // Count child itself.
      rank += 1;

      // Also add all children of current child.
      rank += child.getRank();
    });

    return rank;
  }

  /**
   * 获取子结点列表
   * 
   * @return 子结点列表
   */
  getChildren()
  {
    return Object.values(this.children);
  }

  /**
   * 设置父结点
   * 
   * @param parentItem 父结点
   * @param forceSettingParentChild 强制这是父子关系
   * @return 自身
   */
  setParent(parentItem: DisjointSetItem<T>, forceSettingParentChild = true)
  {
    this.parent = parentItem;
    if (forceSettingParentChild)
    {
      parentItem.addChild(this);
    }

    return this;
  }

  /**
   * 添加子结点
   * 
   * @param childItem 子结点
   * @return 自身
   */
  addChild(childItem: DisjointSetItem<T>)
  {
    this.children[childItem.getKey()] = childItem;
    childItem.setParent(this, false);

    return this;
  }
}
