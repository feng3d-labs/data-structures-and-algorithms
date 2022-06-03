import { LinkedList } from '../linked-list/LinkedList';

/**
 * Hash table size directly affects on the number of collisions.
 * The bigger the hash table size the less collisions you'll get.
 * For demonstrating purposes hash table size is small to show how collisions
 * are being handled.
 */
const defaultHashTableSize = 32;

/**
 * 哈希表（散列表）
 */
export class HashTable
{
  private keys: { [key: string]: number };

  buckets: LinkedList<{ key: string, value: any }>[];

  /**
   * 构建哈希表
   *
   * @param hashTableSize 哈希表尺寸
   */
  constructor(hashTableSize = defaultHashTableSize)
  {
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());

    // Just to keep track of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Converts key string to hash number.
   * 将字符串键转换为哈希数。
   *
   * @param key 字符串键
   * @return 哈希数
   */
  hash(key: string)
  {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  /**
   * 设置值
   *
   * @param key 键
   * @param value 值
   */
  set(key: string, value: any)
  {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (!node)
    {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    }
 else
    {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  /**
   * 删除指定键以及对于值
   *
   * @param key 需要删除的键
   * @return 被删除的结点
   */
  delete(key: string)
  {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (node)
    {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * 获取与键对应的值
   *
   * @param key 键
   * @return
   */
  get(key: string)
  {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * 是否拥有键
   *
   * @param key 键
   * @return 是否拥有键
   */
  has(key: string)
  {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * 获取键列表
   *
   * @return 键列表
   */
  getKeys()
  {
    return Object.keys(this.keys);
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return 值列表
   */
  getValues()
  {
    return this.buckets.reduce((values, bucket) =>
    {
      const bucketValues = bucket.toArray()
        .map((linkedListNode) => linkedListNode.value.value);

return values.concat(bucketValues);
    }, []);
  }
}
