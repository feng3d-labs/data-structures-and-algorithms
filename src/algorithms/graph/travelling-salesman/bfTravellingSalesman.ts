import { Graph } from '../../../data-structures/graph/Graph';
import { GraphVertex } from '../../../data-structures/graph/GraphVertex';

/**
 * Get all possible paths
 * @param {GraphVertex} startVertex
 * @param {GraphVertex[][]} [paths]
 * @param {GraphVertex[]} [path]
 */
function findAllPaths<T>(startVertex: GraphVertex<T>, paths: GraphVertex<T>[][] = [], path: GraphVertex<T>[] = [])
{
  // Clone path.
  const currentPath = [...path];

  // Add startVertex to the path.
  currentPath.push(startVertex);

  // Generate visited set from path.
  const visitedSet = currentPath.reduce((accumulator: { [key: string]: GraphVertex<T> }, vertex) =>
  {
    const updatedAccumulator: { [key: string]: GraphVertex<T> } = { ...accumulator };
    updatedAccumulator[vertex.getKey()] = vertex;

    return updatedAccumulator;
  }, {});

  // Get all unvisited neighbors of startVertex.
  const unvisitedNeighbors = startVertex.getNeighbors().filter((neighbor) =>
    !visitedSet[neighbor.getKey()]);

  // If there no unvisited neighbors then treat current path as complete and save it.
  if (!unvisitedNeighbors.length)
  {
    paths.push(currentPath);

    return paths;
  }

  // Go through all the neighbors.
  for (let neighborIndex = 0; neighborIndex < unvisitedNeighbors.length; neighborIndex += 1)
  {
    const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
    findAllPaths(currentUnvisitedNeighbor, paths, currentPath);
  }

  return paths;
}

/**
 * @param adjacencyMatrix
 * @param verticesIndices
 * @param cycle
 */
function getCycleWeight<T>(adjacencyMatrix: number[][], verticesIndices: { [key: string]: number }, cycle: GraphVertex<T>[]): number
{
  let weight = 0;

  for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1)
  {
    const fromVertex = cycle[cycleIndex - 1];
    const toVertex = cycle[cycleIndex];
    const fromVertexIndex = verticesIndices[fromVertex.getKey()];
    const toVertexIndex = verticesIndices[toVertex.getKey()];
    weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
  }

  return weight;
}

/**
 * BRUTE FORCE approach to solve Traveling Salesman Problem.
 *
 * @param graph
 */
export function bfTravellingSalesman<T>(graph: Graph<T>): GraphVertex<T>[]
{
  // Pick starting point from where we will traverse the graph.
  const startVertex = graph.getAllVertices()[0];

  // BRUTE FORCE.
  // Generate all possible paths from startVertex.
  const allPossiblePaths = findAllPaths(startVertex);

  // Filter out paths that are not cycles.
  const allPossibleCycles = allPossiblePaths.filter((path) =>
  {
    /** @var {GraphVertex} */
    const lastVertex = path[path.length - 1];
    const lastVertexNeighbors = lastVertex.getNeighbors();

    return lastVertexNeighbors.includes(startVertex);
  });

  // Go through all possible cycles and pick the one with minimum overall tour weight.
  const adjacencyMatrix = graph.getAdjacencyMatrix();
  const verticesIndices = graph.getVerticesIndices();
  let salesmanPath: GraphVertex<T>[] = [];
  let salesmanPathWeight: number = null;
  for (let cycleIndex = 0; cycleIndex < allPossibleCycles.length; cycleIndex += 1)
  {
    const currentCycle = allPossibleCycles[cycleIndex];
    const currentCycleWeight = getCycleWeight(adjacencyMatrix, verticesIndices, currentCycle);

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight)
    {
      salesmanPath = currentCycle;
      salesmanPathWeight = currentCycleWeight;
    }
  }

  // Return the solution.
  return salesmanPath;
}
