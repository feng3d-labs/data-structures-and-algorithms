import { deepEqual, throws } from 'assert';
import { Graph } from '../Graph';
import { GraphEdge } from '../GraphEdge';
import { GraphVertex } from '../GraphVertex';

describe('Graph', () =>
{
  it('should add vertices to graph', () =>
  {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    graph
      .addVertex(vertexA)
      .addVertex(vertexB);

    deepEqual(graph.toString(), 'A,B');
    deepEqual(graph.getVertexByKey(vertexA.getKey()), vertexA);
    deepEqual(graph.getVertexByKey(vertexB.getKey()), vertexB);
  });

  it('should add edges to undirected graph', () =>
  {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    deepEqual(graph.getAllVertices().length, 2);
    deepEqual(graph.getAllVertices()[0], vertexA);
    deepEqual(graph.getAllVertices()[1], vertexB);

    const graphVertexA = graph.getVertexByKey(vertexA.getKey());
    const graphVertexB = graph.getVertexByKey(vertexB.getKey());

    deepEqual(graph.toString(), 'A,B');
    deepEqual(!!graphVertexA, true);
    deepEqual(!!graphVertexB, true);

    deepEqual(!graph.getVertexByKey('not existing'), true);

    deepEqual(graphVertexA.getNeighbors().length, 1);
    deepEqual(graphVertexA.getNeighbors()[0], vertexB);
    deepEqual(graphVertexA.getNeighbors()[0], graphVertexB);

    deepEqual(graphVertexB.getNeighbors().length, 1);
    deepEqual(graphVertexB.getNeighbors()[0], vertexA);
    deepEqual(graphVertexB.getNeighbors()[0], graphVertexA);
  });

  it('should add edges to directed graph', () =>
  {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    const graphVertexA = graph.getVertexByKey(vertexA.getKey());
    const graphVertexB = graph.getVertexByKey(vertexB.getKey());

    deepEqual(graph.toString(), 'A,B');
    deepEqual(!!graphVertexA, true);
    deepEqual(!!graphVertexB, true);

    deepEqual(graphVertexA.getNeighbors().length, 1);
    deepEqual(graphVertexA.getNeighbors()[0], vertexB);
    deepEqual(graphVertexA.getNeighbors()[0], graphVertexB);

    deepEqual(graphVertexB.getNeighbors().length, 0);
  });

  it('should find edge by vertices in undirected graph', () =>
  {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexA, vertexC);
    const graphEdgeCA = graph.findEdge(vertexC, vertexA);

    deepEqual(graphEdgeAC, null);
    deepEqual(graphEdgeCA, null);
    deepEqual(graphEdgeAB, edgeAB);
    deepEqual(graphEdgeBA, edgeAB);
    deepEqual(graphEdgeAB.weight, 10);
  });

  it('should find edge by vertices in directed graph', () =>
  {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexA, vertexC);
    const graphEdgeCA = graph.findEdge(vertexC, vertexA);

    deepEqual(graphEdgeAC, null);
    deepEqual(graphEdgeCA, null);
    deepEqual(graphEdgeBA, null);
    deepEqual(graphEdgeAB, edgeAB);
    deepEqual(graphEdgeAB.weight, 10);
  });

  it('should return vertex neighbors', () =>
  {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    const neighbors = graph.getNeighbors(vertexA);

    deepEqual(neighbors.length, 2);
    deepEqual(neighbors[0], vertexB);
    deepEqual(neighbors[1], vertexC);
  });

  it('should throw an error when trying to add edge twice', () =>
  {
    function addSameEdgeTwice()
    {
      const graph = new Graph(true);

      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');

      const edgeAB = new GraphEdge(vertexA, vertexB);

      graph
        .addEdge(edgeAB)
        .addEdge(edgeAB);
    }

    throws(addSameEdgeTwice);
  });

  it('should return the list of all added edges', () =>
  {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC);

    const edges = graph.getAllEdges();

    deepEqual(edges.length, 2);
    deepEqual(edges[0], edgeAB);
    deepEqual(edges[1], edgeBC);
  });

  it('should calculate total graph weight for default graph', () =>
  {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeAD = new GraphEdge(vertexA, vertexD);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD);

    deepEqual(graph.getWeight(), 0);
  });

  it('should calculate total graph weight for weighted graph', () =>
  {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 1);
    const edgeBC = new GraphEdge(vertexB, vertexC, 2);
    const edgeCD = new GraphEdge(vertexC, vertexD, 3);
    const edgeAD = new GraphEdge(vertexA, vertexD, 4);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD);

    deepEqual(graph.getWeight(), 10);
  });

  it('should be possible to delete edges from graph', () =>
  {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC);

    deepEqual(graph.getAllEdges().length, 3);

    graph.deleteEdge(edgeAB);

    deepEqual(graph.getAllEdges().length, 2);
    deepEqual(graph.getAllEdges()[0].getKey(), edgeBC.getKey());
    deepEqual(graph.getAllEdges()[1].getKey(), edgeAC.getKey());
  });

  it('should should throw an error when trying to delete not existing edge', () =>
  {
    function deleteNotExistingEdge()
    {
      const graph = new Graph();

      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');
      const vertexC = new GraphVertex('C');

      const edgeAB = new GraphEdge(vertexA, vertexB);
      const edgeBC = new GraphEdge(vertexB, vertexC);

      graph.addEdge(edgeAB);
      graph.deleteEdge(edgeBC);
    }

    throws(deleteNotExistingEdge);
  });

  it('should be possible to reverse graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph(true);
    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeCD);

    deepEqual(graph.toString(), 'A,B,C,D');
    deepEqual(graph.getAllEdges().length, 3);
    deepEqual(graph.getNeighbors(vertexA).length, 2);
    deepEqual(graph.getNeighbors(vertexA)[0].getKey(), vertexB.getKey());
    deepEqual(graph.getNeighbors(vertexA)[1].getKey(), vertexC.getKey());
    deepEqual(graph.getNeighbors(vertexB).length, 0);
    deepEqual(graph.getNeighbors(vertexC).length, 1);
    deepEqual(graph.getNeighbors(vertexC)[0].getKey(), vertexD.getKey());
    deepEqual(graph.getNeighbors(vertexD).length, 0);

    graph.reverse();

    deepEqual(graph.toString(), 'A,B,C,D');
    deepEqual(graph.getAllEdges().length, 3);
    deepEqual(graph.getNeighbors(vertexA).length, 0);
    deepEqual(graph.getNeighbors(vertexB).length, 1);
    deepEqual(graph.getNeighbors(vertexB)[0].getKey(), vertexA.getKey());
    deepEqual(graph.getNeighbors(vertexC).length, 1);
    deepEqual(graph.getNeighbors(vertexC)[0].getKey(), vertexA.getKey());
    deepEqual(graph.getNeighbors(vertexD).length, 1);
    deepEqual(graph.getNeighbors(vertexD)[0].getKey(), vertexC.getKey());
  });

  it('should return vertices indices', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeBD = new GraphEdge(vertexB, vertexD);

    const graph = new Graph();
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD);

    const verticesIndices = graph.getVerticesIndices();
    deepEqual(verticesIndices, {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    });
  });

  it('should generate adjacency matrix for undirected graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeBD = new GraphEdge(vertexB, vertexD);

    const graph = new Graph();
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD);

    const adjacencyMatrix = graph.getAdjacencyMatrix();
    deepEqual(adjacencyMatrix, [
      [Infinity, 0, Infinity, Infinity],
      [0, Infinity, 0, 0],
      [Infinity, 0, Infinity, 0],
      [Infinity, 0, 0, Infinity],
    ]);
  });

  it('should generate adjacency matrix for directed graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 2);
    const edgeBC = new GraphEdge(vertexB, vertexC, 1);
    const edgeCD = new GraphEdge(vertexC, vertexD, 5);
    const edgeBD = new GraphEdge(vertexB, vertexD, 7);

    const graph = new Graph(true);
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD);

    const adjacencyMatrix = graph.getAdjacencyMatrix();
    deepEqual(adjacencyMatrix, [
      [Infinity, 2, Infinity, Infinity],
      [Infinity, Infinity, 1, 7],
      [Infinity, Infinity, Infinity, 5],
      [Infinity, Infinity, Infinity, Infinity],
    ]);
  });
});
