import { DisjointSet } from '../../../data-structures/disjoint-set/DisjointSet';
import { Graph } from '../../../data-structures/graph/Graph';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';

/**
 * Detect cycle in undirected graph using disjoint sets.
 *
 * @param graph
 */
export function detectUndirectedCycleUsingDisjointSet<T>(graph: Graph<T>)
{
  // Create initial singleton disjoint sets for each graph vertex.
  const keyExtractor = (graphVertex: GraphVertex<T>) => graphVertex.getKey();
  const disjointSet = new DisjointSet(keyExtractor);
  graph.getAllVertices().forEach((graphVertex) => disjointSet.makeSet(graphVertex));

  // Go trough all graph edges one by one and check if edge vertices are from the
  // different sets. In this case joint those sets together. Do this until you find
  // an edge where to edge vertices are already in one set. This means that current
  // edge will create a cycle.
  let cycleFound = false;
  graph.getAllEdges().forEach((graphEdge) =>
  {
    if (disjointSet.inSameSet(graphEdge.startVertex, graphEdge.endVertex))
    {
      // Cycle found.
      cycleFound = true;
    }
    else
    {
      disjointSet.union(graphEdge.startVertex, graphEdge.endVertex);
    }
  });

  return cycleFound;
}
