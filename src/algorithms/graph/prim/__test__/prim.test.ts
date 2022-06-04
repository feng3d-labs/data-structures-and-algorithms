import { deepEqual, throws } from 'assert';
import { Graph } from '../../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../../data-structures/graph/GraphEdge';
import { GraphVertex } from '../../../../data-structures/graph/GraphVertex';
import { prim } from '../prim';

describe('prim', () =>
{
  it('should fire an error for directed graph', () =>
  {
    function applyPrimToDirectedGraph()
    {
      const graph = new Graph(true);

      prim(graph);
    }

    throws(applyPrimToDirectedGraph);
  });

  it('should find minimum spanning tree', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeAB = new GraphEdge(vertexA, vertexB, 2);
    const edgeAD = new GraphEdge(vertexA, vertexD, 3);
    const edgeAC = new GraphEdge(vertexA, vertexC, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 4);
    const edgeBE = new GraphEdge(vertexB, vertexE, 3);
    const edgeDF = new GraphEdge(vertexD, vertexF, 7);
    const edgeEC = new GraphEdge(vertexE, vertexC, 1);
    const edgeEF = new GraphEdge(vertexE, vertexF, 8);
    const edgeFG = new GraphEdge(vertexF, vertexG, 9);
    const edgeFC = new GraphEdge(vertexF, vertexC, 6);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAD)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBE)
      .addEdge(edgeDF)
      .addEdge(edgeEC)
      .addEdge(edgeEF)
      .addEdge(edgeFC)
      .addEdge(edgeFG);

    deepEqual(graph.getWeight(), 46);

    const minimumSpanningTree = prim(graph);

    deepEqual(minimumSpanningTree.getWeight(), 24);
    deepEqual(minimumSpanningTree.getAllVertices().length, graph.getAllVertices().length);
    deepEqual(minimumSpanningTree.getAllEdges().length, graph.getAllVertices().length - 1);
    deepEqual(minimumSpanningTree.toString(), 'A,B,C,E,D,F,G');
  });

  it('should find minimum spanning tree for simple graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 1);
    const edgeAD = new GraphEdge(vertexA, vertexD, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 1);
    const edgeBD = new GraphEdge(vertexB, vertexD, 3);
    const edgeCD = new GraphEdge(vertexC, vertexD, 1);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAD)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeCD);

    deepEqual(graph.getWeight(), 9);

    const minimumSpanningTree = prim(graph);

    deepEqual(minimumSpanningTree.getWeight(), 3);
    deepEqual(minimumSpanningTree.getAllVertices().length, graph.getAllVertices().length);
    deepEqual(minimumSpanningTree.getAllEdges().length, graph.getAllVertices().length - 1);
    deepEqual(minimumSpanningTree.toString(), 'A,B,C,D');
  });
});
