import { DisjointSetItem } from '../DisjointSetItem';
import { deepEqual } from 'assert';

describe('DisjointSetItem', () =>
{
  it('should do basic manipulation with disjoint set item', () =>
  {
    const itemA = new DisjointSetItem('A');
    const itemB = new DisjointSetItem('B');
    const itemC = new DisjointSetItem('C');
    const itemD = new DisjointSetItem('D');

    deepEqual(itemA.getRank(), 0);
    deepEqual(itemA.getChildren(), []);
    deepEqual(itemA.getKey(), 'A');
    deepEqual(itemA.getRoot(), itemA);
    deepEqual(itemA.isRoot(), true);
    deepEqual(itemB.isRoot(), true);

    itemA.addChild(itemB);
    itemD.setParent(itemC);

    deepEqual(itemA.getRank(), 1);
    deepEqual(itemC.getRank(), 1);

    deepEqual(itemB.getRank(), 0);
    deepEqual(itemD.getRank(), 0);

    deepEqual(itemA.getChildren().length, 1);
    deepEqual(itemC.getChildren().length, 1);

    deepEqual(itemA.getChildren()[0], itemB);
    deepEqual(itemC.getChildren()[0], itemD);

    deepEqual(itemB.getChildren().length, 0);
    deepEqual(itemD.getChildren().length, 0);

    deepEqual(itemA.getRoot(), itemA);
    deepEqual(itemB.getRoot(), itemA);

    deepEqual(itemC.getRoot(), itemC);
    deepEqual(itemD.getRoot(), itemC);

    deepEqual(itemA.isRoot(), true);
    deepEqual(itemB.isRoot(), false);
    deepEqual(itemC.isRoot(), true);
    deepEqual(itemD.isRoot(), false);

    itemA.addChild(itemC);

    deepEqual(itemA.isRoot(), true);
    deepEqual(itemB.isRoot(), false);
    deepEqual(itemC.isRoot(), false);
    deepEqual(itemD.isRoot(), false);

    deepEqual(itemA.getRank(), 3);
    deepEqual(itemB.getRank(), 0);
    deepEqual(itemC.getRank(), 1);
  });

  it('should do basic manipulation with disjoint set item with custom key extractor', () =>
  {
    const keyExtractor = (value) =>
    value.key;

    const itemA = new DisjointSetItem({ key: 'A', value: 1 }, keyExtractor);
    const itemB = new DisjointSetItem({ key: 'B', value: 2 }, keyExtractor);
    const itemC = new DisjointSetItem({ key: 'C', value: 3 }, keyExtractor);
    const itemD = new DisjointSetItem({ key: 'D', value: 4 }, keyExtractor);

    deepEqual(itemA.getRank(), 0);
    deepEqual(itemA.getChildren(), []);
    deepEqual(itemA.getKey(), 'A');
    deepEqual(itemA.getRoot(), itemA);
    deepEqual(itemA.isRoot(), true);
    deepEqual(itemB.isRoot(), true);

    itemA.addChild(itemB);
    itemD.setParent(itemC);

    deepEqual(itemA.getRank(), 1);
    deepEqual(itemC.getRank(), 1);

    deepEqual(itemB.getRank(), 0);
    deepEqual(itemD.getRank(), 0);

    deepEqual(itemA.getChildren().length, 1);
    deepEqual(itemC.getChildren().length, 1);

    deepEqual(itemA.getChildren()[0], itemB);
    deepEqual(itemC.getChildren()[0], itemD);

    deepEqual(itemB.getChildren().length, 0);
    deepEqual(itemD.getChildren().length, 0);

    deepEqual(itemA.getRoot(), itemA);
    deepEqual(itemB.getRoot(), itemA);

    deepEqual(itemC.getRoot(), itemC);
    deepEqual(itemD.getRoot(), itemC);

    deepEqual(itemA.isRoot(), true);
    deepEqual(itemB.isRoot(), false);
    deepEqual(itemC.isRoot(), true);
    deepEqual(itemD.isRoot(), false);

    itemA.addChild(itemC);

    deepEqual(itemA.isRoot(), true);
    deepEqual(itemB.isRoot(), false);
    deepEqual(itemC.isRoot(), false);
    deepEqual(itemD.isRoot(), false);

    deepEqual(itemA.getRank(), 3);
    deepEqual(itemB.getRank(), 0);
    deepEqual(itemC.getRank(), 1);
  });
});
