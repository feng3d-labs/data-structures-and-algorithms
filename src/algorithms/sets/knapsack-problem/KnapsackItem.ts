export class KnapsackItem
{
  /**
   * value of the item.
   */
  value: number;
  /**
   * weight of the item.
   */
  weight: number;
  /**
   * how many items are available to be added.
   */
  itemsInStock: number;

  /**
   * Actual number of items that is going to be added to knapsack.
   */
  quantity: number;
  /**
   */
  constructor({ value, weight, itemsInStock = 1 }: {
    /**
     * value of the item.
     */
    value: number,
    /**
     * weight of the item.
     */
    weight: number,
    /**
     * how many items are available to be added.
     */
    itemsInStock?: number
  })
  {
    this.value = value;
    this.weight = weight;
    this.itemsInStock = itemsInStock;
    this.quantity = 1;
  }

  get totalValue()
  {
    return this.value * this.quantity;
  }

  get totalWeight()
  {
    return this.weight * this.quantity;
  }

  // This coefficient shows how valuable the 1 unit of weight is
  // for current item.
  get valuePerWeightRatio()
  {
    return this.value / this.weight;
  }

  toString()
  {
    return `v${this.value} w${this.weight} x ${this.quantity}`;
  }
}
