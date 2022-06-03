import { deepEqual } from 'assert';
import { HashTable } from '../HashTable';

describe('HashTable', () =>
{
  it('should create hash table of certain size', () =>
  {
    const defaultHashTable = new HashTable();
    deepEqual(defaultHashTable.buckets.length, 32);

    const biggerHashTable = new HashTable(64);
    deepEqual(biggerHashTable.buckets.length, 64);
  });

  it('should generate proper hash for specified keys', () =>
  {
    const hashTable = new HashTable();

    deepEqual(hashTable.hash('a'), 1);
    deepEqual(hashTable.hash('b'), 2);
    deepEqual(hashTable.hash('abc'), 6);
  });

  it('should set, read and delete data with collisions', () =>
  {
    const hashTable = new HashTable(3);

    deepEqual(hashTable.hash('a'), 1);
    deepEqual(hashTable.hash('b'), 2);
    deepEqual(hashTable.hash('c'), 0);
    deepEqual(hashTable.hash('d'), 1);

    hashTable.set('a', 'sky-old');
    hashTable.set('a', 'sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');
    hashTable.set('d', 'ocean');

    deepEqual(hashTable.has('x'), false);
    deepEqual(hashTable.has('b'), true);
    deepEqual(hashTable.has('c'), true);

    const stringifier = (value) => `${value.key}:${value.value}`;

    deepEqual(hashTable.buckets[0].toString(stringifier), 'c:earth');
    deepEqual(hashTable.buckets[1].toString(stringifier), 'a:sky,d:ocean');
    deepEqual(hashTable.buckets[2].toString(stringifier), 'b:sea');

    deepEqual(hashTable.get('a'), 'sky');
    deepEqual(hashTable.get('d'), 'ocean');
    deepEqual(!hashTable.get('x'), true);

    hashTable.delete('a');

    deepEqual(hashTable.delete('not-existing'), null);

    deepEqual(!hashTable.get('a'), true);
    deepEqual(hashTable.get('d'), 'ocean');

    hashTable.set('d', 'ocean-new');
    deepEqual(hashTable.get('d'), 'ocean-new');
  });

  it('should be possible to add objects to hash table', () =>
  {
    const hashTable = new HashTable<{ prop1: string, prop2: string }>();

    hashTable.set('objectKey', { prop1: 'a', prop2: 'b' });

    const object = hashTable.get('objectKey');
    deepEqual(!!object, true);
    deepEqual(object.prop1, 'a');
    deepEqual(object.prop2, 'b');
  });

  it('should track actual keys', () =>
  {
    const hashTable = new HashTable(3);

    hashTable.set('a', 'sky-old');
    hashTable.set('a', 'sky');
    hashTable.set('b', 'sea');
    hashTable.set('c', 'earth');
    hashTable.set('d', 'ocean');

    deepEqual(hashTable.getKeys(), ['a', 'b', 'c', 'd']);
    deepEqual(hashTable.has('a'), true);
    deepEqual(hashTable.has('x'), false);

    hashTable.delete('a');

    deepEqual(hashTable.has('a'), false);
    deepEqual(hashTable.has('b'), true);
    deepEqual(hashTable.has('x'), false);
  });

  it('should get all the values', () =>
  {
    const hashTable = new HashTable(3);

    hashTable.set('a', 'alpha');
    hashTable.set('b', 'beta');
    hashTable.set('c', 'gamma');

    deepEqual(hashTable.getValues(), ['gamma', 'alpha', 'beta']);
  });

  it('should get all the values from empty hash table', () =>
  {
    const hashTable = new HashTable();
    deepEqual(hashTable.getValues(), []);
  });

  it('should get all the values in case of hash collision', () =>
  {
    const hashTable = new HashTable(3);

    // Keys `ab` and `ba` in current implementation should result in one hash (one bucket).
    // We need to make sure that several items from one bucket will be serialized.
    hashTable.set('ab', 'one');
    hashTable.set('ba', 'two');

    hashTable.set('ac', 'three');

    deepEqual(hashTable.getValues(), ['one', 'two', 'three']);
  });
});
