import { deepEqual } from 'assert';
import { KnapsackItem } from '../KnapsackItem';

describe('KnapsackItem', () =>
{
  it('should create knapsack item and count its total weight and value', () =>
  {
    const knapsackItem = new KnapsackItem({ value: 3, weight: 2 });

    deepEqual(knapsackItem.value, 3);
    deepEqual(knapsackItem.weight, 2);
    deepEqual(knapsackItem.quantity, 1);
    deepEqual(knapsackItem.valuePerWeightRatio, 1.5);
    deepEqual(knapsackItem.toString(), 'v3 w2 x 1');
    deepEqual(knapsackItem.totalValue, 3);
    deepEqual(knapsackItem.totalWeight, 2);

    knapsackItem.quantity = 0;

    deepEqual(knapsackItem.value, 3);
    deepEqual(knapsackItem.weight, 2);
    deepEqual(knapsackItem.quantity, 0);
    deepEqual(knapsackItem.valuePerWeightRatio, 1.5);
    deepEqual(knapsackItem.toString(), 'v3 w2 x 0');
    deepEqual(knapsackItem.totalValue, 0);
    deepEqual(knapsackItem.totalWeight, 0);

    knapsackItem.quantity = 2;

    deepEqual(knapsackItem.value, 3);
    deepEqual(knapsackItem.weight, 2);
    deepEqual(knapsackItem.quantity, 2);
    deepEqual(knapsackItem.valuePerWeightRatio, 1.5);
    deepEqual(knapsackItem.toString(), 'v3 w2 x 2');
    deepEqual(knapsackItem.totalValue, 6);
    deepEqual(knapsackItem.totalWeight, 4);
  });
});
