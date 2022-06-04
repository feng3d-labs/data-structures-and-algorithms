import { Graph } from '../../../data-structures/graph/Graph';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';
import { Stack } from '../../../data-structures/stack/Stack';
import { depthFirstSearch } from '../depth-first-search/depthFirstSearch';

/**
 * @param graph
 */
function getVerticesSortedByDfsFinishTime<T>(graph: Graph<T>): Stack<GraphVertex<T>>
{
  // Set of all visited vertices during DFS pass.
  const visitedVerticesSet: { [key: string]: GraphVertex<T> } = {};

  // Stack of vertices by finish time.
  // All vertices in this stack are ordered by finished time in decreasing order.
  // Vertex that has been finished first will be at the bottom of the stack and
  // vertex that has been finished last will be at the top of the stack.
  const verticesByDfsFinishTime = new Stack<GraphVertex<T>>();

  // Set of all vertices we're going to visit.
  const notVisitedVerticesSet: { [key: string]: GraphVertex<T> } = {};
  graph.getAllVertices().forEach((vertex) =>
  {
    notVisitedVerticesSet[vertex.getKey()] = vertex;
  });

  // Specify DFS traversal callbacks.
  const dfsCallbacks = {
    enterVertex: ({ currentVertex }: { currentVertex: GraphVertex<T> }) =>
    {
      // Add current vertex to visited set.
      visitedVerticesSet[currentVertex.getKey()] = currentVertex;

      // Delete current vertex from not visited set.
      delete notVisitedVerticesSet[currentVertex.getKey()];
    },
    leaveVertex: ({ currentVertex }: { currentVertex: GraphVertex<T> }) =>
    {
      // Push vertex to the stack when leaving it.
      // This will make stack to be ordered by finish time in decreasing order.
      verticesByDfsFinishTime.push(currentVertex);
    },
    // Don't allow to traverse the nodes that have been already visited.
    allowTraversal: ({ nextVertex }: { nextVertex: GraphVertex<T> }) => !visitedVerticesSet[nextVertex.getKey()],
  };

  // Do FIRST DFS PASS traversal for all graph vertices to fill the verticesByFinishTime stack.
  while (Object.values(notVisitedVerticesSet).length)
  {
    // Peek any vertex to start DFS traversal from.
    const startVertexKey = Object.keys(notVisitedVerticesSet)[0];
    const startVertex = notVisitedVerticesSet[startVertexKey];
    delete notVisitedVerticesSet[startVertexKey];

    depthFirstSearch(graph, startVertex, dfsCallbacks);
  }

  return verticesByDfsFinishTime;
}

/**
 * @param graph
 * @param verticesByFinishTime
 */
function getSCCSets<T>(graph: Graph<T>, verticesByFinishTime: Stack<GraphVertex<T>>): GraphVertex<T>[][]
{
  // Array of arrays of strongly connected vertices.
  const stronglyConnectedComponentsSets: GraphVertex<T>[][] = [];

  // Array that will hold all vertices that are being visited during one DFS run.
  let stronglyConnectedComponentsSet: GraphVertex<T>[] = [];

  // Visited vertices set.
  const visitedVerticesSet: { [key: string]: GraphVertex<T> } = {};

  // Callbacks for DFS traversal.
  const dfsCallbacks = {
    enterVertex: ({ currentVertex }) =>
    {
      // Add current vertex to SCC set of current DFS round.
      stronglyConnectedComponentsSet.push(currentVertex);

      // Add current vertex to visited set.
      visitedVerticesSet[currentVertex.getKey()] = currentVertex;
    },
    leaveVertex: ({ previousVertex }) =>
    {
      // Once DFS traversal is finished push the set of found strongly connected
      // components during current DFS round to overall strongly connected components set.
      // The sign that traversal is about to be finished is that we came back to start vertex
      // which doesn't have parent.
      if (previousVertex === null)
      {
        stronglyConnectedComponentsSets.push([...stronglyConnectedComponentsSet]);
      }
    },
    allowTraversal: ({ nextVertex }) =>

      // Don't allow traversal of already visited vertices.
      !visitedVerticesSet[nextVertex.getKey()]
    ,
  };

  while (!verticesByFinishTime.isEmpty())
  {
    /** @var {GraphVertex} startVertex */
    const startVertex = verticesByFinishTime.pop();

    // Reset the set of strongly connected vertices.
    stronglyConnectedComponentsSet = [];

    // Don't do DFS on already visited vertices.
    if (!visitedVerticesSet[startVertex.getKey()])
    {
      // Do DFS traversal.
      depthFirstSearch(graph, startVertex, dfsCallbacks);
    }
  }

  return stronglyConnectedComponentsSets;
}

/**
 * Kosaraju's algorithm.
 *
 * @param graph
 */
export function stronglyConnectedComponents<T>(graph: Graph<T>)
{
  // In this algorithm we will need to do TWO DFS PASSES overt the graph.

  // Get stack of vertices ordered by DFS finish time.
  // All vertices in this stack are ordered by finished time in decreasing order:
  // Vertex that has been finished first will be at the bottom of the stack and
  // vertex that has been finished last will be at the top of the stack.
  const verticesByFinishTime = getVerticesSortedByDfsFinishTime(graph);

  // Reverse the graph.
  graph.reverse();

  // Do DFS once again on reversed graph.
  return getSCCSets(graph, verticesByFinishTime);
}
