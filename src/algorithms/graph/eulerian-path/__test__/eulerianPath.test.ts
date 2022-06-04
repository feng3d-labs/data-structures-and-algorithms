import { deepEqual, throws } from 'assert';
import { GraphVertex } from '../../../../data-structures/graph/GraphVertex';
import { GraphEdge } from '../../../../data-structures/graph/GraphEdge';
import { Graph } from '../../../../data-structures/graph/Graph';
import { eulerianPath } from '../eulerianPath';

describe('eulerianPath', () =>
{
  it('should throw an error when graph is not Eulerian', () =>
  {
    function findEulerianPathInNotEulerianGraph()
    {
      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');
      const vertexC = new GraphVertex('C');
      const vertexD = new GraphVertex('D');
      const vertexE = new GraphVertex('E');

      const edgeAB = new GraphEdge(vertexA, vertexB);
      const edgeAC = new GraphEdge(vertexA, vertexC);
      const edgeBC = new GraphEdge(vertexB, vertexC);
      const edgeBD = new GraphEdge(vertexB, vertexD);
      const edgeCE = new GraphEdge(vertexC, vertexE);

      const graph = new Graph();

      graph
        .addEdge(edgeAB)
        .addEdge(edgeAC)
        .addEdge(edgeBC)
        .addEdge(edgeBD)
        .addEdge(edgeCE);

      eulerianPath(graph);
    }

    throws(findEulerianPathInNotEulerianGraph);
  });

  it('should find Eulerian Circuit in graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAE = new GraphEdge(vertexA, vertexE);
    const edgeAF = new GraphEdge(vertexA, vertexF);
    const edgeAG = new GraphEdge(vertexA, vertexG);
    const edgeGF = new GraphEdge(vertexG, vertexF);
    const edgeBE = new GraphEdge(vertexB, vertexE);
    const edgeEB = new GraphEdge(vertexE, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeED = new GraphEdge(vertexE, vertexD);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAF)
      .addEdge(edgeAG)
      .addEdge(edgeGF)
      .addEdge(edgeBE)
      .addEdge(edgeEB)
      .addEdge(edgeBC)
      .addEdge(edgeED)
      .addEdge(edgeCD);

    const graphEdgesCount = graph.getAllEdges().length;

    const eulerianPathSet = eulerianPath(graph);

    deepEqual(eulerianPathSet.length, graphEdgesCount + 1);

    deepEqual(eulerianPathSet[0].getKey(), vertexA.getKey());
    deepEqual(eulerianPathSet[1].getKey(), vertexB.getKey());
    deepEqual(eulerianPathSet[2].getKey(), vertexE.getKey());
    deepEqual(eulerianPathSet[3].getKey(), vertexB.getKey());
    deepEqual(eulerianPathSet[4].getKey(), vertexC.getKey());
    deepEqual(eulerianPathSet[5].getKey(), vertexD.getKey());
    deepEqual(eulerianPathSet[6].getKey(), vertexE.getKey());
    deepEqual(eulerianPathSet[7].getKey(), vertexA.getKey());
    deepEqual(eulerianPathSet[8].getKey(), vertexF.getKey());
    deepEqual(eulerianPathSet[9].getKey(), vertexG.getKey());
    deepEqual(eulerianPathSet[10].getKey(), vertexA.getKey());
  });

  it('should find Eulerian Path in graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeBD = new GraphEdge(vertexB, vertexD);
    const edgeDC = new GraphEdge(vertexD, vertexC);
    const edgeCE = new GraphEdge(vertexC, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFH = new GraphEdge(vertexF, vertexH);
    const edgeFG = new GraphEdge(vertexF, vertexG);
    const edgeHG = new GraphEdge(vertexH, vertexG);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeBD)
      .addEdge(edgeDC)
      .addEdge(edgeCE)
      .addEdge(edgeEF)
      .addEdge(edgeFH)
      .addEdge(edgeFG)
      .addEdge(edgeHG);

    const graphEdgesCount = graph.getAllEdges().length;

    const eulerianPathSet = eulerianPath(graph);

    deepEqual(eulerianPathSet.length, graphEdgesCount + 1);

    deepEqual(eulerianPathSet[0].getKey(), vertexC.getKey());
    deepEqual(eulerianPathSet[1].getKey(), vertexA.getKey());
    deepEqual(eulerianPathSet[2].getKey(), vertexB.getKey());
    deepEqual(eulerianPathSet[3].getKey(), vertexD.getKey());
    deepEqual(eulerianPathSet[4].getKey(), vertexC.getKey());
    deepEqual(eulerianPathSet[5].getKey(), vertexE.getKey());
    deepEqual(eulerianPathSet[6].getKey(), vertexF.getKey());
    deepEqual(eulerianPathSet[7].getKey(), vertexH.getKey());
    deepEqual(eulerianPathSet[8].getKey(), vertexG.getKey());
    deepEqual(eulerianPathSet[9].getKey(), vertexF.getKey());
  });
});
