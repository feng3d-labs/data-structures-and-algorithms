import { Stack } from '../../../data-structures/stack/Stack';

function hanoiTowerRecursive<T>({
  numberOfDiscs,
  fromPole,
  withPole,
  toPole,
  moveCallback,
}: {
  numberOfDiscs: number,
  fromPole: Stack<T>,
  withPole: Stack<T>,
  toPole: Stack<T>,
  moveCallback: (disc: T, fromPole: T[], toPole: T[]) => void,
})
{
  if (numberOfDiscs === 1)
  {
    // Base case with just one disc.
    moveCallback(fromPole.peek(), fromPole.toArray(), toPole.toArray());
    const disc = fromPole.pop();
    toPole.push(disc);
  }
  else
  {
    // In case if there are more discs then move them recursively.

    // Expose the bottom disc on fromPole stack.
    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole,
      withPole: toPole,
      toPole: withPole,
      moveCallback,
    });

    // Move the disc that was exposed to its final destination.
    hanoiTowerRecursive({
      numberOfDiscs: 1,
      fromPole,
      withPole,
      toPole,
      moveCallback,
    });

    // Move temporary tower from auxiliary pole to its final destination.
    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole: withPole,
      withPole: fromPole,
      toPole,
      moveCallback,
    });
  }
}

export function hanoiTower<T>({
  numberOfDiscs,
  moveCallback,
  fromPole = new Stack(),
  withPole = new Stack(),
  toPole = new Stack(),
}: {
  numberOfDiscs: number,
  moveCallback: (disc: T, fromPole: T[], toPole: T[]) => void,
  fromPole?: Stack<T>,
  withPole?: Stack<T>,
  toPole?: Stack<T>,
})
{
  // Each of three poles of Tower of Hanoi puzzle is represented as a stack
  // that might contain elements (discs). Each disc is represented as a number.
  // Larger discs have bigger number equivalent.

  // Let's create the discs and put them to the fromPole.
  for (let discSize = numberOfDiscs; discSize > 0; discSize -= 1)
  {
    fromPole.push(discSize as any);
  }

  hanoiTowerRecursive({
    numberOfDiscs,
    fromPole,
    withPole,
    toPole,
    moveCallback,
  });
}
