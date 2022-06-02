import { BloomFilter } from '../BloomFilter';
import { deepEqual } from 'assert';

describe('BloomFilter', () =>
{
  let bloomFilter;
  const people = [
    'Bruce Wayne',
    'Clark Kent',
    'Barry Allen',
  ];

  beforeEach(() =>
  {
    bloomFilter = new BloomFilter();
  });

  it('should have methods named "insert" and "mayContain"', () =>
  {
    deepEqual(typeof bloomFilter.insert, 'function');
    deepEqual(typeof bloomFilter.mayContain, 'function');
  });

  it('should create a new filter store with the appropriate methods', () =>
  {
    const store = bloomFilter.createStore(18);
    deepEqual(typeof store.getValue, 'function');
    deepEqual(typeof store.setValue, 'function');
  });

  it('should hash deterministically with all 3 hash functions', () =>
  {
    const str1 = 'apple';

    deepEqual(bloomFilter.hash1(str1), bloomFilter.hash1(str1));
    deepEqual(bloomFilter.hash2(str1), bloomFilter.hash2(str1));
    deepEqual(bloomFilter.hash3(str1), bloomFilter.hash3(str1));

    deepEqual(bloomFilter.hash1(str1), 14);
    deepEqual(bloomFilter.hash2(str1), 43);
    deepEqual(bloomFilter.hash3(str1), 10);

    const str2 = 'orange';

    deepEqual(bloomFilter.hash1(str2), bloomFilter.hash1(str2));
    deepEqual(bloomFilter.hash2(str2), bloomFilter.hash2(str2));
    deepEqual(bloomFilter.hash3(str2), bloomFilter.hash3(str2));

    deepEqual(bloomFilter.hash1(str2), 0);
    deepEqual(bloomFilter.hash2(str2), 61);
    deepEqual(bloomFilter.hash3(str2), 10);
  });

  it('should create an array with 3 hash values', () =>
  {
    deepEqual(bloomFilter.getHashValues('abc').length, 3);
    deepEqual(bloomFilter.getHashValues('abc'), [66, 63, 54]);
  });

  it('should insert strings correctly and return true when checking for inserted values', () =>
  {
    people.forEach((person) => bloomFilter.insert(person));

    deepEqual(bloomFilter.mayContain('Bruce Wayne'), true);
    deepEqual(bloomFilter.mayContain('Clark Kent'), true);
    deepEqual(bloomFilter.mayContain('Barry Allen'), true);

    deepEqual(bloomFilter.mayContain('Tony Stark'), false);
  });
});
