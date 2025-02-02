import { Graph } from '../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../data-structures/graph/GraphEdge';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';
import { depthFirstSearch } from '../depth-first-search/depthFirstSearch';

/**
 * Helper class for visited vertex metadata.
 */
class VisitMetadata
{
  discoveryTime: number;
  lowDiscoveryTime: number;
  constructor({ discoveryTime, lowDiscoveryTime }: { discoveryTime: number, lowDiscoveryTime: number })
  {
    this.discoveryTime = discoveryTime;
    this.lowDiscoveryTime = lowDiscoveryTime;
  }
}

/**
 * @param graph
 */
export function graphBridges<T>(graph: Graph<T>)
{
  // Set of vertices we've already visited during DFS.
  const visitedSet: { [key: string]: VisitMetadata } = {};

  // Set of bridges.
  const bridges: { [key: string]: GraphEdge<T> } = {};

  // Time needed to discover to the current vertex.
  let discoveryTime = 0;

  // Peek the start vertex for DFS traversal.
  const startVertex = graph.getAllVertices()[0];

  const dfsCallbacks = {
    enterVertex: ({ currentVertex }: { currentVertex: GraphVertex<T> }) =>
    {
      // Tick discovery time.
      discoveryTime += 1;

      // Put current vertex to visited set.
      visitedSet[currentVertex.getKey()] = new VisitMetadata({
        discoveryTime,
        lowDiscoveryTime: discoveryTime,
      });
    },
    leaveVertex: ({ currentVertex, previousVertex }: { currentVertex: GraphVertex<T>, previousVertex: GraphVertex<T> }) =>
    {
      if (previousVertex === null)
      {
        // Don't do anything for the root vertex if it is already current (not previous one).
        return;
      }

      // Check if current node is connected to any early node other then previous one.
      visitedSet[currentVertex.getKey()].lowDiscoveryTime = currentVertex.getNeighbors()
        .filter((earlyNeighbor) => earlyNeighbor.getKey() !== previousVertex.getKey())
        .reduce(
          /**
           * @param {number} lowestDiscoveryTime
           * @param {GraphVertex} neighbor
           */
          (lowestDiscoveryTime, neighbor) =>
          {
            const neighborLowTime = visitedSet[neighbor.getKey()].lowDiscoveryTime;

            return neighborLowTime < lowestDiscoveryTime ? neighborLowTime : lowestDiscoveryTime;
          },
          visitedSet[currentVertex.getKey()].lowDiscoveryTime,
        );

      // Compare low discovery times. In case if current low discovery time is less than the one
      // in previous vertex then update previous vertex low time.
      const currentLowDiscoveryTime = visitedSet[currentVertex.getKey()].lowDiscoveryTime;
      const previousLowDiscoveryTime = visitedSet[previousVertex.getKey()].lowDiscoveryTime;
      if (currentLowDiscoveryTime < previousLowDiscoveryTime)
      {
        visitedSet[previousVertex.getKey()].lowDiscoveryTime = currentLowDiscoveryTime;
      }

      // Compare current vertex low discovery time with parent discovery time. Check if there
      // are any short path (back edge) exists. If we can't get to current vertex other then
      // via parent then the parent vertex is articulation point for current one.
      const parentDiscoveryTime = visitedSet[previousVertex.getKey()].discoveryTime;
      if (parentDiscoveryTime < currentLowDiscoveryTime)
      {
        const bridge = graph.findEdge(previousVertex, currentVertex);
        bridges[bridge.getKey()] = bridge;
      }
    },
    allowTraversal: ({ nextVertex }) => !visitedSet[nextVertex.getKey()],
  };

  // Do Depth First Search traversal over submitted graph.
  depthFirstSearch(graph, startVertex, dfsCallbacks);

  return bridges;
}
