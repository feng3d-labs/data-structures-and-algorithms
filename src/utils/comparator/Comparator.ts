export type CompareFunction<T> = (a: T, b: T) => number;

/**
 * 比较器
 */
export class Comparator<T>
{
  private compare: CompareFunction<T>;

  /**
   * Constructor.
   * 
   * @param compareFunction It may be custom compare function that, let's say may compare custom objects together.
   */
  constructor(compareFunction?: CompareFunction<T>)
  {
    this.compare = compareFunction || Comparator.defaultCompareFunction as any;
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * @param a
   * @param b
   * @returns
   */
  static defaultCompareFunction(a: string | number, b: string | number)
  {
    if (a === b)
    {
      return 0;
    }

    return a < b ? -1 : 1;
  }

  /**
   * Checks if two variables are equal.
   * 
   * @param a
   * @param b
   * @return
   */
  equal(a: T, b: T)
  {
    return this.compare(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   * 
   * @param a
   * @param  b
   * @return
   */
  lessThan(a: T, b: T)
  {
    return this.compare(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * 
   * @param a
   * @param  b
   * @return
   */
  greaterThan(a: T, b: T)
  {
    return this.compare(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * 
   * @param a
   * @param  b
   * @return
   */
  lessThanOrEqual(a: T, b: T)
  {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * 
   * @param a
   * @param b
   * @return
   */
  greaterThanOrEqual(a: T, b: T)
  {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order.
   */
  reverse()
  {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
