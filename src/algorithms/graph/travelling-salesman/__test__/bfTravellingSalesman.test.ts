import { deepEqual } from 'assert';
import { Graph } from '../../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../../data-structures/graph/GraphEdge';
import { GraphVertex } from '../../../../data-structures/graph/GraphVertex';
import { bfTravellingSalesman } from '../bfTravellingSalesman';

describe('bfTravellingSalesman', () =>
{
  it('should solve problem for simple graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 1);
    const edgeBD = new GraphEdge(vertexB, vertexD, 1);
    const edgeDC = new GraphEdge(vertexD, vertexC, 1);
    const edgeCA = new GraphEdge(vertexC, vertexA, 1);

    const edgeBA = new GraphEdge(vertexB, vertexA, 5);
    const edgeDB = new GraphEdge(vertexD, vertexB, 8);
    const edgeCD = new GraphEdge(vertexC, vertexD, 7);
    const edgeAC = new GraphEdge(vertexA, vertexC, 4);
    const edgeAD = new GraphEdge(vertexA, vertexD, 2);
    const edgeDA = new GraphEdge(vertexD, vertexA, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 3);
    const edgeCB = new GraphEdge(vertexC, vertexB, 9);

    const graph = new Graph(true);
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBD)
      .addEdge(edgeDC)
      .addEdge(edgeCA)
      .addEdge(edgeBA)
      .addEdge(edgeDB)
      .addEdge(edgeCD)
      .addEdge(edgeAC)
      .addEdge(edgeAD)
      .addEdge(edgeDA)
      .addEdge(edgeBC)
      .addEdge(edgeCB);

    const salesmanPath = bfTravellingSalesman(graph);

    deepEqual(salesmanPath.length, 4);

    deepEqual(salesmanPath[0].getKey(), vertexA.getKey());
    deepEqual(salesmanPath[1].getKey(), vertexB.getKey());
    deepEqual(salesmanPath[2].getKey(), vertexD.getKey());
    deepEqual(salesmanPath[3].getKey(), vertexC.getKey());
  });
});
