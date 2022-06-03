import { Comparator } from '../../utils/comparator/Comparator';
import { HashTable } from '../hash-table/HashTable';

export class BinaryTreeNode<T>
{
  /**
   * 左结点
   */
  left: BinaryTreeNode<T>;

  /**
   * 右结点
   */
  right: BinaryTreeNode<T>;

  /**
   * 父结点
   */
  parent: BinaryTreeNode<T>;

  /**
   * 结点值
   */
  value: T;

  /**
   * 结点比较器
   */
  nodeComparator: Comparator<BinaryTreeNode<T>>;

  meta: HashTable<T>;

  /**
   * 构建二叉树结点
   *
   * @param value node value.
   */
  constructor(value: T = null)
  {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    // Any node related meta information may be stored here.
    this.meta = new HashTable();

    // This comparator is used to compare binary tree nodes with each other.
    this.nodeComparator = new Comparator();
  }

  /**
   * 左结点高度
   */
  get leftHeight()
  {
    if (!this.left)
    {
      return 0;
    }

    return this.left.height + 1;
  }

  /**
   * 右结点高度
   */
  get rightHeight()
  {
    if (!this.right)
    {
      return 0;
    }

    return this.right.height + 1;
  }

  /**
   * 高度
   */
  get height()
  {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  /**
   * 平衡系数
   */
  get balanceFactor()
  {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * Get parent's sibling if it exists.
   *
   * @return 叔伯结点
   */
  get uncle()
  {
    // Check if current node has parent.
    if (!this.parent)
    {
      return undefined;
    }

    // Check if current node has grand-parent.
    if (!this.parent.parent)
    {
      return undefined;
    }

    // Check if grand-parent has two children.
    if (!this.parent.parent.left || !this.parent.parent.right)
    {
      return undefined;
    }

    // So for now we know that current node has grand-parent and this
    // grand-parent has two children. Let's find out who is the uncle.
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left))
    {
      // Right one is an uncle.
      return this.parent.parent.right;
    }

    // Left one is an uncle.
    return this.parent.parent.left;
  }

  /**
   * 设置结点值
   *
   * @param value 结点新值
   */
  setValue(value: T)
  {
    this.value = value;

    return this;
  }

  /**
   * 设置左结点
   *
   * @param node 结点
   */
  setLeft(node: BinaryTreeNode<T>)
  {
    // Reset parent for left node since it is going to be detached.
    if (this.left)
    {
      this.left.parent = null;
    }

    // Attach new node to the left.
    this.left = node;

    // Make current node to be a parent for new left one.
    if (this.left)
    {
      this.left.parent = this;
    }

    return this;
  }

  /**
   * 设置右结点
   *
   * @param node 结点
   */
  setRight(node: BinaryTreeNode<T>)
  {
    // Reset parent for right node since it is going to be detached.
    if (this.right)
    {
      this.right.parent = null;
    }

    // Attach new node to the right.
    this.right = node;

    // Make current node to be a parent for new right one.
    if (node)
    {
      this.right.parent = this;
    }

    return this;
  }

  /**
   * 移除子结点
   *
   * @param nodeToRemove 需要移除的子结点
   * @return 是否成功移除
   */
  removeChild(nodeToRemove: BinaryTreeNode<T>)
  {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove))
    {
      this.left = null;

return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove))
    {
      this.right = null;

return true;
    }

    return false;
  }

  /**
   * 替换节点
   *
   * @param nodeToReplace 被替换的节点
   * @param replacementNode 替换后的节点
   * @return 是否替换成功
   */
  replaceChild(nodeToReplace, replacementNode)
  {
    if (!nodeToReplace || !replacementNode)
    {
      return false;
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace))
    {
      this.left = replacementNode;

return true;
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace))
    {
      this.right = replacementNode;

return true;
    }

    return false;
  }

  /**
   * 拷贝节点
   *
   * @param sourceNode 源节点
   * @param targetNode 目标节点
   */
  static copyNode<T>(sourceNode: BinaryTreeNode<T>, targetNode: BinaryTreeNode<T>)
  {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  /**
   * 左序深度遍历
   */
  traverseInOrder()
  {
    let traverse = [];

    // Add left node.
    if (this.left)
    {
      traverse = traverse.concat(this.left.traverseInOrder());
    }

    // Add root.
    traverse.push(this.value);

    // Add right node.
    if (this.right)
    {
      traverse = traverse.concat(this.right.traverseInOrder());
    }

    return traverse;
  }

  /**
   * 转换为字符串
   */
  toString()
  {
    return this.traverseInOrder().toString();
  }
}
