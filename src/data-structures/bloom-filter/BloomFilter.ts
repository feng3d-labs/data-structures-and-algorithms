/**
 * 布隆过滤器
 */
export class BloomFilter
{
  private size = 100;
  private storage: { getValue(index: any): any; setValue(index: any): void; };

  /**
   * @param size the size of the storage.
   */
  constructor(size = 100)
  {
    // Bloom filter size directly affects the likelihood of false positives.
    // The bigger the size the lower the likelihood of false positives.
    this.size = size;
    this.storage = this.createStore(size);
  }

  /**
   * 插入
   *
   * @param item 元素
   */
  insert(item: string)
  {
    const hashValues = this.getHashValues(item);

    // Set each hashValue index to true.
    hashValues.forEach((val) => this.storage.setValue(val));
  }

  /**
   * 可能包含
   *
   * @param item 元素
   * @return
   */
  mayContain(item: string)
  {
    const hashValues = this.getHashValues(item);

    for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1)
    {
      if (!this.storage.getValue(hashValues[hashIndex]))
      {
        // We know that the item was definitely not inserted.
        return false;
      }
    }

    // The item may or may not have been inserted.
    return true;
  }

  /**
   * Creates the data store for our filter.
   * We use this method to generate the store in order to
   * encapsulate the data itself and only provide access
   * to the necessary methods.
   *
   * @param size 尺寸
   * @return
   */
  createStore(size: number)
  {
    const storage = [];

    // Initialize all indexes to false
    for (let storageCellIndex = 0; storageCellIndex < size; storageCellIndex += 1)
    {
      storage.push(false);
    }

    const storageInterface = {
      getValue(index: number)
      {
        return storage[index];
      },
      setValue(index: number)
      {
        storage[index] = true;
      },
    };

    return storageInterface;
  }

  /**
   * 计算哈希值1
   *
   * @param item 元素
   * @return 哈希值1
   */
  hash1(item: string)
  {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1)
    {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char;
      hash &= hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }

    return hash % this.size;
  }

  /**
   * 计算哈希值2
   *
   * @param item 元素
   * @return 哈希值2
   */
  hash2(item: string)
  {
    let hash = 5381;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1)
    {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char; /* hash * 33 + c */
    }

    return Math.abs(hash % this.size);
  }

  /**
   * 计算哈希值3
   *
   * @param item 元素
   * @return 哈希值3
   */
  hash3(item: string)
  {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1)
    {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) - hash;
      hash += char;
      hash &= hash; // Convert to 32bit integer
    }

    return Math.abs(hash % this.size);
  }

  /**
   * Runs all 3 hash functions on the input and returns an array of results.
   * 获取3个哈希值组成的数组
   *
   * @param item 元素
   * @return 3个哈希值组成的数组
   */
  getHashValues(item: string)
  {
    return [
      this.hash1(item),
      this.hash2(item),
      this.hash3(item),
    ];
  }
}
