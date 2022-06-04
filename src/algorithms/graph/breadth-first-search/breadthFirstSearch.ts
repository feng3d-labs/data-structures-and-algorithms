import { Graph } from '../../../data-structures/graph/Graph';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';
import { Queue } from '../../../data-structures/queue/Queue';

interface Callbacks<T>
{
  /**
   * Determines whether DFS should traverse from the vertex to its neighbor
   * (along the edge). By default prohibits visiting the same vertex again.
   */
  allowTraversal?: (vertices: { currentVertex: GraphVertex<T>, previousVertex: GraphVertex<T>, nextVertex: GraphVertex<T> }) => boolean;

  /**
   * Called when BFS enters the vertex.
   */
  enterVertex?: (vertices: { currentVertex: GraphVertex<T>, previousVertex: GraphVertex<T> }) => any;

  /**
   * Called when BFS leaves the vertex.
   */
  leaveVertex?: (vertices: { currentVertex: GraphVertex<T>, previousVertex: GraphVertex<T> }) => void;
}

/**
 * @param callbacks
 */
function initCallbacks<T>(callbacks: Callbacks<T> = {})
{
  const initiatedCallback = callbacks;

  const stubCallback = () => { };

  const allowTraversalCallback = (
    () =>
    {
      const seen = {};

return ({ nextVertex }) =>
      {
        if (!seen[nextVertex.getKey()])
        {
          seen[nextVertex.getKey()] = true;

return true;
        }

return false;
      };
    }
  )();

  initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
  initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
  initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

  return initiatedCallback;
}

/**
 * @param graph
 * @param startVertex
 * @param originalCallbacks
 */
export function breadthFirstSearch<T>(graph: Graph<T>, startVertex: GraphVertex<T>, originalCallbacks?: Callbacks<T>)
{
  const callbacks = initCallbacks(originalCallbacks);
  const vertexQueue = new Queue<GraphVertex<T>>();

  // Do initial queue setup.
  vertexQueue.enqueue(startVertex);

  let previousVertex: GraphVertex<T> = null;

  // Traverse all vertices from the queue.
  while (!vertexQueue.isEmpty())
  {
    const currentVertex = vertexQueue.dequeue();
    callbacks.enterVertex({ currentVertex, previousVertex });

    // Add all neighbors to the queue for future traversals.
    // eslint-disable-next-line no-loop-func
    graph.getNeighbors(currentVertex).forEach((nextVertex) =>
    {
      if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex }))
      {
        vertexQueue.enqueue(nextVertex);
      }
    });

    callbacks.leaveVertex({ currentVertex, previousVertex });

    // Memorize current vertex before next loop.
    previousVertex = currentVertex;
  }
}
