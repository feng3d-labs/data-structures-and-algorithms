import { Comparator, CompareFunction } from '../../utils/comparator/Comparator';

interface SorterCallbacks<T>
{
  /**
   * If provided then all elements comparisons
   * will be done through this callback.
   */
  compareCallback?: CompareFunction<T>

  /**
   * If provided it will be called each time the sorting
   * function is visiting the next element.
   */
  visitingCallback?: (v?: T) => void;
}

export class Sort<T>
{
  callbacks: SorterCallbacks<T>;
  comparator: Comparator<T>;

  constructor(originalCallbacks?: SorterCallbacks<T>)
  {
    this.callbacks = Sort.initSortingCallbacks(originalCallbacks);
    this.comparator = new Comparator(this.callbacks.compareCallback);
  }

  /**
   * @param originalCallbacks
   */
  static initSortingCallbacks<T>(originalCallbacks: SorterCallbacks<T>)
  {
    const callbacks = originalCallbacks || {};
    const stubCallback = () => { };

    callbacks.compareCallback = callbacks.compareCallback || undefined;
    callbacks.visitingCallback = callbacks.visitingCallback || stubCallback;

    return callbacks;
  }

  sort(_array?: T[]): T[]
  {
    throw new Error('sort method must be implemented');
  }
}
