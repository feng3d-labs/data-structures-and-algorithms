import { deepEqual } from 'assert';
import { Graph } from '../../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../../data-structures/graph/GraphEdge';
import { GraphVertex } from '../../../../data-structures/graph/GraphVertex';
import { floydWarshall } from '../floydWarshall';

describe('floydWarshall', () =>
{
  it('should find minimum paths to all vertices for undirected graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB, 4);
    const edgeAE = new GraphEdge(vertexA, vertexE, 7);
    const edgeAC = new GraphEdge(vertexA, vertexC, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 6);
    const edgeBD = new GraphEdge(vertexB, vertexD, 5);
    const edgeEC = new GraphEdge(vertexE, vertexC, 8);
    const edgeED = new GraphEdge(vertexE, vertexD, 2);
    const edgeDC = new GraphEdge(vertexD, vertexC, 11);
    const edgeDG = new GraphEdge(vertexD, vertexG, 10);
    const edgeDF = new GraphEdge(vertexD, vertexF, 2);
    const edgeFG = new GraphEdge(vertexF, vertexG, 3);
    const edgeEG = new GraphEdge(vertexE, vertexG, 5);

    const graph = new Graph();

    // Add vertices first just to have them in desired order.
    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD)
      .addVertex(vertexE)
      .addVertex(vertexF)
      .addVertex(vertexG)
      .addVertex(vertexH);

    // Now, when vertices are in correct order let's add edges.
    graph
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeEC)
      .addEdge(edgeED)
      .addEdge(edgeDC)
      .addEdge(edgeDG)
      .addEdge(edgeDF)
      .addEdge(edgeFG)
      .addEdge(edgeEG);

    const { distances, nextVertices } = floydWarshall(graph);

    const vertices = graph.getAllVertices();

    const vertexAIndex = vertices.indexOf(vertexA);
    const vertexBIndex = vertices.indexOf(vertexB);
    const vertexCIndex = vertices.indexOf(vertexC);
    const vertexDIndex = vertices.indexOf(vertexD);
    const vertexEIndex = vertices.indexOf(vertexE);
    const vertexFIndex = vertices.indexOf(vertexF);
    const vertexGIndex = vertices.indexOf(vertexG);
    const vertexHIndex = vertices.indexOf(vertexH);

    deepEqual(distances[vertexAIndex][vertexHIndex], Infinity);
    deepEqual(distances[vertexAIndex][vertexAIndex], 0);
    deepEqual(distances[vertexAIndex][vertexBIndex], 4);
    deepEqual(distances[vertexAIndex][vertexEIndex], 7);
    deepEqual(distances[vertexAIndex][vertexCIndex], 3);
    deepEqual(distances[vertexAIndex][vertexDIndex], 9);
    deepEqual(distances[vertexAIndex][vertexGIndex], 12);
    deepEqual(distances[vertexAIndex][vertexFIndex], 11);

    deepEqual(nextVertices[vertexAIndex][vertexFIndex], vertexD);
    deepEqual(nextVertices[vertexAIndex][vertexDIndex], vertexB);
    deepEqual(nextVertices[vertexAIndex][vertexBIndex], vertexA);
    deepEqual(nextVertices[vertexAIndex][vertexGIndex], vertexE);
    deepEqual(nextVertices[vertexAIndex][vertexCIndex], vertexA);
    deepEqual(nextVertices[vertexAIndex][vertexAIndex], null);
    deepEqual(nextVertices[vertexAIndex][vertexHIndex], null);
  });

  it('should find minimum paths to all vertices for directed graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 3);
    const edgeBA = new GraphEdge(vertexB, vertexA, 8);
    const edgeAD = new GraphEdge(vertexA, vertexD, 7);
    const edgeDA = new GraphEdge(vertexD, vertexA, 2);
    const edgeBC = new GraphEdge(vertexB, vertexC, 2);
    const edgeCA = new GraphEdge(vertexC, vertexA, 5);
    const edgeCD = new GraphEdge(vertexC, vertexD, 1);

    const graph = new Graph(true);

    // Add vertices first just to have them in desired order.
    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD);

    // Now, when vertices are in correct order let's add edges.
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBA)
      .addEdge(edgeAD)
      .addEdge(edgeDA)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeCD);

    const { distances, nextVertices } = floydWarshall(graph);

    const vertices = graph.getAllVertices();

    const vertexAIndex = vertices.indexOf(vertexA);
    const vertexBIndex = vertices.indexOf(vertexB);
    const vertexCIndex = vertices.indexOf(vertexC);
    const vertexDIndex = vertices.indexOf(vertexD);

    deepEqual(distances[vertexAIndex][vertexAIndex], 0);
    deepEqual(distances[vertexAIndex][vertexBIndex], 3);
    deepEqual(distances[vertexAIndex][vertexCIndex], 5);
    deepEqual(distances[vertexAIndex][vertexDIndex], 6);

    deepEqual(distances, [
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ]);

    deepEqual(nextVertices[vertexAIndex][vertexDIndex], vertexC);
    deepEqual(nextVertices[vertexAIndex][vertexCIndex], vertexB);
    deepEqual(nextVertices[vertexBIndex][vertexDIndex], vertexC);
    deepEqual(nextVertices[vertexAIndex][vertexAIndex], null);
    deepEqual(nextVertices[vertexAIndex][vertexBIndex], vertexA);
  });

  it('should find minimum paths to all vertices for directed graph with negative edge weights', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeFE = new GraphEdge(vertexF, vertexE, 8);
    const edgeFA = new GraphEdge(vertexF, vertexA, 10);
    const edgeED = new GraphEdge(vertexE, vertexD, 1);
    const edgeDA = new GraphEdge(vertexD, vertexA, -4);
    const edgeDC = new GraphEdge(vertexD, vertexC, -1);
    const edgeAC = new GraphEdge(vertexA, vertexC, 2);
    const edgeCB = new GraphEdge(vertexC, vertexB, -2);
    const edgeBA = new GraphEdge(vertexB, vertexA, 1);

    const graph = new Graph(true);

    // Add vertices first just to have them in desired order.
    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD)
      .addVertex(vertexE)
      .addVertex(vertexF)
      .addVertex(vertexG);

    // Now, when vertices are in correct order let's add edges.
    graph
      .addEdge(edgeFE)
      .addEdge(edgeFA)
      .addEdge(edgeED)
      .addEdge(edgeDA)
      .addEdge(edgeDC)
      .addEdge(edgeAC)
      .addEdge(edgeCB)
      .addEdge(edgeBA);

    const { distances, nextVertices } = floydWarshall(graph);

    const vertices = graph.getAllVertices();

    const vertexAIndex = vertices.indexOf(vertexA);
    const vertexBIndex = vertices.indexOf(vertexB);
    const vertexCIndex = vertices.indexOf(vertexC);
    const vertexDIndex = vertices.indexOf(vertexD);
    const vertexEIndex = vertices.indexOf(vertexE);
    const vertexGIndex = vertices.indexOf(vertexG);
    const vertexFIndex = vertices.indexOf(vertexF);

    deepEqual(distances[vertexFIndex][vertexGIndex], Infinity);
    deepEqual(distances[vertexFIndex][vertexFIndex], 0);
    deepEqual(distances[vertexFIndex][vertexAIndex], 5);
    deepEqual(distances[vertexFIndex][vertexBIndex], 5);
    deepEqual(distances[vertexFIndex][vertexCIndex], 7);
    deepEqual(distances[vertexFIndex][vertexDIndex], 9);
    deepEqual(distances[vertexFIndex][vertexEIndex], 8);

    deepEqual(nextVertices[vertexFIndex][vertexGIndex], null);
    deepEqual(nextVertices[vertexFIndex][vertexFIndex], null);
    deepEqual(nextVertices[vertexAIndex][vertexBIndex], vertexC);
    deepEqual(nextVertices[vertexAIndex][vertexCIndex], vertexA);
    deepEqual(nextVertices[vertexFIndex][vertexBIndex], vertexE);
    deepEqual(nextVertices[vertexEIndex][vertexBIndex], vertexD);
    deepEqual(nextVertices[vertexDIndex][vertexBIndex], vertexC);
    deepEqual(nextVertices[vertexCIndex][vertexBIndex], vertexC);
  });
});
