import { DisjointSet } from '../../../data-structures/disjoint-set/DisjointSet';
import { Graph } from '../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../data-structures/graph/GraphEdge';
import { QuickSort } from '../../sorting/quick-sort/QuickSort';

/**
 * @param graph
 */
export function kruskal<T>(graph: Graph<T>): Graph<T>
{
  // It should fire error if graph is directed since the algorithm works only
  // for undirected graphs.
  if (graph.isDirected)
  {
    throw new Error('Kruskal\'s algorithms works only for undirected graphs');
  }

  // Init new graph that will contain minimum spanning tree of original graph.
  const minimumSpanningTree = new Graph<T>();

  // Sort all graph edges in increasing order.
  const sortingCallbacks = {
    compareCallback: (graphEdgeA: GraphEdge<T>, graphEdgeB: GraphEdge<T>) =>
    {
      if (graphEdgeA.weight === graphEdgeB.weight)
      {
        return 1;
      }

      return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1;
    },
  };
  const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges());

  // Create disjoint sets for all graph vertices.
  const keyCallback = (graphVertex) => graphVertex.getKey();
  const disjointSet = new DisjointSet(keyCallback);

  graph.getAllVertices().forEach((graphVertex) =>
  {
    disjointSet.makeSet(graphVertex);
  });

  // Go through all edges started from the minimum one and try to add them
  // to minimum spanning tree. The criteria of adding the edge would be whether
  // it is forms the cycle or not (if it connects two vertices from one disjoint
  // set or not).
  for (let edgeIndex = 0; edgeIndex < sortedEdges.length; edgeIndex += 1)
  {
    const currentEdge = sortedEdges[edgeIndex];

    // Check if edge forms the cycle. If it does then skip it.
    if (!disjointSet.inSameSet(currentEdge.startVertex, currentEdge.endVertex))
    {
      // Unite two subsets into one.
      disjointSet.union(currentEdge.startVertex, currentEdge.endVertex);

      // Add this edge to spanning tree.
      minimumSpanningTree.addEdge(currentEdge);
    }
  }

  return minimumSpanningTree;
}
