import { Graph } from '../../../data-structures/graph/Graph';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';
import { PriorityQueue } from '../../../data-structures/priority-queue/PriorityQueue';

interface ShortestPaths<T>
{
  /**
   * shortest distances to all vertices
   */
  distances: { [key: string]: number }

  /**
   * shortest paths to all vertices.
   */
  previousVertices: { [key: string]: GraphVertex<T> }
}

/**
 * Implementation of Dijkstra algorithm of finding the shortest paths to graph nodes.
 * @param graph graph we're going to traverse.
 * @param startVertex traversal start vertex.
 */
export function dijkstra<T>(graph: Graph<T>, startVertex: GraphVertex<T>): ShortestPaths<T>
{
  // Init helper variables that we will need for Dijkstra algorithm.
  const distances: { [key: string]: number } = {};
  const visitedVertices: { [key: string]: GraphVertex<T> } = {};
  const previousVertices: { [key: string]: GraphVertex<T> } = {};
  const queue = new PriorityQueue<GraphVertex<T>>();

  // Init all distances with infinity assuming that currently we can't reach
  // any of the vertices except the start one.
  graph.getAllVertices().forEach((vertex) =>
  {
    distances[vertex.getKey()] = Infinity;
    previousVertices[vertex.getKey()] = null;
  });

  // We are already at the startVertex so the distance to it is zero.
  distances[startVertex.getKey()] = 0;

  // Init vertices queue.
  queue.add(startVertex, distances[startVertex.getKey()]);

  // Iterate over the priority queue of vertices until it is empty.
  while (!queue.isEmpty())
  {
    // Fetch next closest vertex.
    const currentVertex = queue.poll();

    // Iterate over every unvisited neighbor of the current vertex.
    currentVertex.getNeighbors().forEach((neighbor) =>
    {
      // Don't visit already visited vertices.
      if (!visitedVertices[neighbor.getKey()])
      {
        // Update distances to every neighbor from current vertex.
        const edge = graph.findEdge(currentVertex, neighbor);

        const existingDistanceToNeighbor = distances[neighbor.getKey()];
        const distanceToNeighborFromCurrent = distances[currentVertex.getKey()] + edge.weight;

        // If we've found shorter path to the neighbor - update it.
        if (distanceToNeighborFromCurrent < existingDistanceToNeighbor)
        {
          distances[neighbor.getKey()] = distanceToNeighborFromCurrent;

          // Change priority of the neighbor in a queue since it might have became closer.
          if (queue.hasValue(neighbor))
          {
            queue.changePriority(neighbor, distances[neighbor.getKey()]);
          }

          // Remember previous closest vertex.
          previousVertices[neighbor.getKey()] = currentVertex;
        }

        // Add neighbor to the queue for further visiting.
        if (!queue.hasValue(neighbor))
        {
          queue.add(neighbor, distances[neighbor.getKey()]);
        }
      }
    });

    // Add current vertex to visited ones to avoid visiting it again later.
    visitedVertices[currentVertex.getKey()] = currentVertex;
  }

  // Return the set of shortest distances to all vertices and the set of
  // shortest paths to all vertices in a graph.
  return {
    distances,
    previousVertices,
  };
}
