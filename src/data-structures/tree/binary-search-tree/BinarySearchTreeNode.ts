import { BinaryTreeNode } from '../BinaryTreeNode';
import { Comparator, CompareFunction } from '../../../utils/comparator/Comparator';

/**
 * 二叉查找树结点
 */
export class BinarySearchTreeNode<T> extends BinaryTreeNode<T> {

  /**
   * 左结点
   */
  left: BinarySearchTreeNode<T> = null;

  /**
   * 右结点
   */
  right: BinarySearchTreeNode<T> = null;

  /**
   * 父结点
   */
  parent: BinarySearchTreeNode<T> = null;

  /**
   * 比较函数
   */
  private compareFunction: CompareFunction<T>;

  /**
   * 结点值比较器
   */
  private nodeValueComparator: Comparator<T>;

  /**
   * 构建二叉查找树结点
   * 
   * @param value node value.
   * @param compareFunction comparator function for node values.
   */
  constructor(value: T = null, compareFunction: CompareFunction<T> = undefined)
  {
    super(value);

    // This comparator is used to compare node values with each other.
    this.compareFunction = compareFunction;
    this.nodeValueComparator = new Comparator(compareFunction);
  }

  /**
   * 插入值
   * 
   * @param value 值
   */
  insert(value: T): BinarySearchTreeNode<T>
  {
    if (this.nodeValueComparator.equal(this.value, null))
    {
      this.value = value;

      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value))
    {
      // Insert to the left.
      if (this.left)
      {
        return this.left.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setLeft(newNode);

      return newNode;
    }

    if (this.nodeValueComparator.greaterThan(value, this.value))
    {
      // Insert to the right.
      if (this.right)
      {
        return this.right.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value, this.compareFunction);
      this.setRight(newNode);

      return newNode;
    }

    return this;
  }

  /**
   * 查找结点
   * 
   * @param value 值
   * @return {BinarySearchTreeNode}
   */
  find(value: T): BinarySearchTreeNode<T>
  {
    // Check the root.
    if (this.nodeValueComparator.equal(this.value, value))
    {
      return this;
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left)
    {
      // Check left nodes.
      return this.left.find(value);
    }

    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right)
    {
      // Check right nodes.
      return this.right.find(value);
    }

    return null;
  }

  /**
   * 是否包含指定值
   * 
   * @param value 指定值
   */
  contains(value: T)
  {
    return !!this.find(value);
  }

  /**
   * 移除指定值
   * 
   * @param  value 指定值
   * @return 是否移除成功
   */
  remove(value: T)
  {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove)
    {
      throw new Error('Item not found in the tree');
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right)
    {
      // Node is a leaf and thus has no children.
      if (parent)
      {
        // Node has a parent. Just remove the pointer to this node from the parent.
        parent.removeChild(nodeToRemove);
      } else
      {
        // Node has no parent. Just erase current node value.
        nodeToRemove.setValue(undefined);
      }
    } else if (nodeToRemove.left && nodeToRemove.right)
    {
      // Node has two children.
      // Find the next biggest value (minimum value in the right branch)
      // and replace current value node with that next biggest value.
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right))
      {
        this.remove(nextBiggerNode.value);
        nodeToRemove.setValue(nextBiggerNode.value);
      } else
      {
        // In case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    } else
    {
      // Node has only one child.
      // Make this child to be a direct child of current node's parent.
      /** @var BinarySearchTreeNode */
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (parent)
      {
        parent.replaceChild(nodeToRemove, childNode);
      } else
      {
        BinaryTreeNode.copyNode(childNode, nodeToRemove);
      }
    }

    // Clear the parent of removed node.
    nodeToRemove.parent = null;

    return true;
  }

  /**
   * 查找最小值
   */
  findMin(): BinarySearchTreeNode<T>
  {
    if (!this.left)
    {
      return this;
    }

    return this.left.findMin();
  }
}
