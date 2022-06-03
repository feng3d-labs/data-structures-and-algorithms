import { deepEqual } from 'assert';
import { DisjointSet } from '../DisjointSet';

describe('DisjointSet', () =>
{
  it('should throw error when trying to union and check not existing sets', () =>
  {
    function mergeNotExistingSets()
    {
      const disjointSet = new DisjointSet();

      disjointSet.union('A', 'B');
    }

    function checkNotExistingSets()
    {
      const disjointSet = new DisjointSet();

      disjointSet.inSameSet('A', 'B');
    }

    try
    {
      mergeNotExistingSets();
    } catch (e)
    {
      deepEqual(!e, false);
    }

    try
    {
      checkNotExistingSets();
    } catch (e)
    {
      deepEqual(!e, false);
    }

  });

  it('should do basic manipulations on disjoint set', () =>
  {
    const disjointSet = new DisjointSet();

    deepEqual(disjointSet.find('A'), null);
    deepEqual(disjointSet.find('B'), null);

    disjointSet.makeSet('A');

    deepEqual(disjointSet.find('A'), 'A');
    deepEqual(disjointSet.find('B'), null);

    disjointSet.makeSet('B');

    deepEqual(disjointSet.find('A'), 'A');
    deepEqual(disjointSet.find('B'), 'B');

    disjointSet.makeSet('C');

    deepEqual(disjointSet.inSameSet('A', 'B'), false);

    disjointSet.union('A', 'B');

    deepEqual(disjointSet.find('A'), 'A');
    deepEqual(disjointSet.find('B'), 'A');
    deepEqual(disjointSet.inSameSet('A', 'B'), true);
    deepEqual(disjointSet.inSameSet('B', 'A'), true);
    deepEqual(disjointSet.inSameSet('A', 'C'), false);

    disjointSet.union('A', 'A');

    disjointSet.union('B', 'C');

    deepEqual(disjointSet.find('A'), 'A');
    deepEqual(disjointSet.find('B'), 'A');
    deepEqual(disjointSet.find('C'), 'A');

    deepEqual(disjointSet.inSameSet('A', 'B'), true);
    deepEqual(disjointSet.inSameSet('B', 'C'), true);
    deepEqual(disjointSet.inSameSet('A', 'C'), true);

    disjointSet
      .makeSet('E')
      .makeSet('F')
      .makeSet('G')
      .makeSet('H')
      .makeSet('I');

    disjointSet
      .union('E', 'F')
      .union('F', 'G')
      .union('G', 'H')
      .union('H', 'I');

    deepEqual(disjointSet.inSameSet('A', 'I'), false);
    deepEqual(disjointSet.inSameSet('E', 'I'), true);

    disjointSet.union('I', 'C');

    deepEqual(disjointSet.find('I'), 'E');
    deepEqual(disjointSet.inSameSet('A', 'I'), true);
  });

  it('should union smaller set with bigger one making bigger one to be new root', () =>
  {
    const disjointSet = new DisjointSet();

    disjointSet
      .makeSet('A')
      .makeSet('B')
      .makeSet('C')
      .union('B', 'C')
      .union('A', 'C');

    deepEqual(disjointSet.find('A'), 'B');
  });

  it('should do basic manipulations on disjoint set with custom key extractor', () =>
  {
    const keyExtractor = (value) => value.key;

    const disjointSet = new DisjointSet(keyExtractor);

    const itemA = { key: 'A', value: 1 };
    const itemB = { key: 'B', value: 2 };
    const itemC = { key: 'C', value: 3 };

    deepEqual(disjointSet.find(itemA), null);
    deepEqual(disjointSet.find(itemB), null);

    disjointSet.makeSet(itemA);

    deepEqual(disjointSet.find(itemA), 'A');
    deepEqual(disjointSet.find(itemB), null);

    disjointSet.makeSet(itemB);

    deepEqual(disjointSet.find(itemA), 'A');
    deepEqual(disjointSet.find(itemB), 'B');

    disjointSet.makeSet(itemC);

    deepEqual(disjointSet.inSameSet(itemA, itemB), false);

    disjointSet.union(itemA, itemB);

    deepEqual(disjointSet.find(itemA), 'A');
    deepEqual(disjointSet.find(itemB), 'A');
    deepEqual(disjointSet.inSameSet(itemA, itemB), true);
    deepEqual(disjointSet.inSameSet(itemB, itemA), true);
    deepEqual(disjointSet.inSameSet(itemA, itemC), false);

    disjointSet.union(itemA, itemC);

    deepEqual(disjointSet.find(itemA), 'A');
    deepEqual(disjointSet.find(itemB), 'A');
    deepEqual(disjointSet.find(itemC), 'A');

    deepEqual(disjointSet.inSameSet(itemA, itemB), true);
    deepEqual(disjointSet.inSameSet(itemB, itemC), true);
    deepEqual(disjointSet.inSameSet(itemA, itemC), true);
  });
});
