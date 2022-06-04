import { Graph } from '../../../data-structures/graph/Graph';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';
import { depthFirstSearch } from '../depth-first-search/depthFirstSearch';

/**
 * Detect cycle in undirected graph using Depth First Search.
 *
 * @param graph
 */
export function detectUndirectedCycle<T>(graph: Graph<T>)
{
  let cycle: { [key: string]: GraphVertex<T> } = null;

  // List of vertices that we have visited.
  const visitedVertices: { [key: string]: GraphVertex<T> } = {};

  // List of parents vertices for every visited vertex.
  const parents: { [key: string]: GraphVertex<T> } = {};

  // Callbacks for DFS traversing.
  const callbacks = {
    allowTraversal: ({ currentVertex, nextVertex }: { currentVertex: GraphVertex<T>, nextVertex: GraphVertex<T> }) =>
    {
      // Don't allow further traversal in case if cycle has been detected.
      if (cycle)
      {
        return false;
      }

      // Don't allow traversal from child back to its parent.
      const currentVertexParent = parents[currentVertex.getKey()];
      const currentVertexParentKey = currentVertexParent ? currentVertexParent.getKey() : null;

      return currentVertexParentKey !== nextVertex.getKey();
    },
    enterVertex: ({ currentVertex, previousVertex }: { currentVertex: GraphVertex<T>, previousVertex: GraphVertex<T> }) =>
    {
      if (visitedVertices[currentVertex.getKey()])
      {
        // Compile cycle path based on parents of previous vertices.
        cycle = {};

        let currentCycleVertex = currentVertex;
        let previousCycleVertex = previousVertex;

        while (previousCycleVertex.getKey() !== currentVertex.getKey())
        {
          cycle[currentCycleVertex.getKey()] = previousCycleVertex;
          currentCycleVertex = previousCycleVertex;
          previousCycleVertex = parents[previousCycleVertex.getKey()];
        }

        cycle[currentCycleVertex.getKey()] = previousCycleVertex;
      }
      else
      {
        // Add next vertex to visited set.
        visitedVertices[currentVertex.getKey()] = currentVertex;
        parents[currentVertex.getKey()] = previousVertex;
      }
    },
  };

  // Start DFS traversing.
  const startVertex = graph.getAllVertices()[0];
  depthFirstSearch(graph, startVertex, callbacks);

  return cycle;
}
