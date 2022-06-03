import { Graph } from '../../../data-structures/graph/Graph';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';

interface Callbacks<T>
{
  /**
   * Determines whether DFS should traverse from the vertex to its neighbor
   * (along the edge). By default prohibits visiting the same vertex again.
   */
  allowTraversal?: (vertices: any) => boolean;
  /**
   * Called when DFS enters the vertex.
   */
  enterVertex?: (vertices: any) => any;
  /**
   * Called when DFS leaves the vertex.
   */
  leaveVertex?: (vertices: { currentVertex: GraphVertex<T>, previousVertex: GraphVertex<T> }) => any;
}

/**
 * @param callbacks
 */
function initCallbacks<T>(callbacks: Callbacks<T> = {}): Callbacks<T>
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
 * @param currentVertex
 * @param previousVertex
 * @param callbacks
 */
function depthFirstSearchRecursive<T>(graph: Graph<T>, currentVertex: GraphVertex<T>, previousVertex: GraphVertex<T>, callbacks: Callbacks<T>)
{
  callbacks.enterVertex({ currentVertex, previousVertex });

  graph.getNeighbors(currentVertex).forEach((nextVertex) =>
  {
    if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex }))
    {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertex({ currentVertex, previousVertex });
}

/**
 * @param graph
 * @param startVertex
 * @param callbacks
 */
export function depthFirstSearch<T>(graph: Graph<T>, startVertex: GraphVertex<T>, callbacks?: Callbacks<T>)
{
  const previousVertex = null;
  depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}
