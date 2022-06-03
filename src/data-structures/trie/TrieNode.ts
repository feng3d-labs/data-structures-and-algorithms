import { HashTable } from '../hash-table/HashTable';

export class TrieNode<T>
{
  /**
   * 字符
   */
  character: string;

  /**
   * 是否完整单词
   */
  isCompleteWord: boolean;

  /**
   * 子结点哈希表
   */
  children: HashTable<TrieNode<T>>;

  /**
   * @param character 字符
   * @param isCompleteWord 是否完整单词
   */
  constructor(character: string, isCompleteWord = false)
  {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }

  /**
   * 获取子结点
   *
   * @param character 字符
   */
  getChild(character: string)
  {
    return this.children.get(character);
  }

  /**
   * 添加子结点
   *
   * @param character 字符
   * @param isCompleteWord 字符完整单词
   * @return 自身
   */
  addChild(character: string, isCompleteWord = false)
  {
    if (!this.children.has(character))
    {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const childNode = this.children.get(character);

    // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

    return childNode;
  }

  /**
   * 移除结点
   *
   * @param character 字符
   * @return 自身
   */
  removeChild(character: string)
  {
    const childNode = this.getChild(character);

    // Delete childNode only if:
    // - childNode has NO children,
    // - childNode.isCompleteWord === false.
    if (
      childNode
      && !childNode.isCompleteWord
      && !childNode.hasChildren()
    )
    {
      this.children.delete(character);
    }

    return this;
  }

  /**
   * 是否有指定子结点
   *
   * @param character 字符
   */
  hasChild(character: string)
  {
    return this.children.has(character);
  }

  /**
   * Check whether current TrieNode has children or not.
   */
  hasChildren()
  {
    return this.children.getKeys().length !== 0;
  }

  /**
   *
   */
  suggestChildren()
  {
    return [...this.children.getKeys()];
  }

  /**
   * 转换为字符串
   */
  toString()
  {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
    const isCompleteString = this.isCompleteWord ? '*' : '';

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
