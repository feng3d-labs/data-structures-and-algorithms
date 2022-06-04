import { deepEqual } from 'assert';
import { Graph } from '../../../../data-structures/graph/Graph';
import { GraphEdge } from '../../../../data-structures/graph/GraphEdge';
import { GraphVertex } from '../../../../data-structures/graph/GraphVertex';
import { stronglyConnectedComponents } from '../stronglyConnectedComponents';

describe('stronglyConnectedComponents', () =>
{
  it('should detect strongly connected components in simple graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph(true);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeCD);

    const components = stronglyConnectedComponents(graph);

    deepEqual(!!components, true);
    deepEqual(components.length, 2);

    deepEqual(components[0][0].getKey(), vertexA.getKey());
    deepEqual(components[0][1].getKey(), vertexC.getKey());
    deepEqual(components[0][2].getKey(), vertexB.getKey());

    deepEqual(components[1][0].getKey(), vertexD.getKey());
  });

  it('should detect strongly connected components in graph', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');
    const vertexI = new GraphVertex('I');
    const vertexJ = new GraphVertex('J');
    const vertexK = new GraphVertex('K');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    const edgeBD = new GraphEdge(vertexB, vertexD);
    const edgeDE = new GraphEdge(vertexD, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeGF = new GraphEdge(vertexG, vertexF);
    const edgeGH = new GraphEdge(vertexG, vertexH);
    const edgeHI = new GraphEdge(vertexH, vertexI);
    const edgeIJ = new GraphEdge(vertexI, vertexJ);
    const edgeJG = new GraphEdge(vertexJ, vertexG);
    const edgeJK = new GraphEdge(vertexJ, vertexK);

    const graph = new Graph(true);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeBD)
      .addEdge(edgeDE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeGF)
      .addEdge(edgeGH)
      .addEdge(edgeHI)
      .addEdge(edgeIJ)
      .addEdge(edgeJG)
      .addEdge(edgeJK);

    const components = stronglyConnectedComponents(graph);

    deepEqual(!!components, true);
    deepEqual(components.length, 4);

    deepEqual(components[0][0].getKey(), vertexG.getKey());
    deepEqual(components[0][1].getKey(), vertexJ.getKey());
    deepEqual(components[0][2].getKey(), vertexI.getKey());
    deepEqual(components[0][3].getKey(), vertexH.getKey());

    deepEqual(components[1][0].getKey(), vertexK.getKey());

    deepEqual(components[2][0].getKey(), vertexA.getKey());
    deepEqual(components[2][1].getKey(), vertexC.getKey());
    deepEqual(components[2][2].getKey(), vertexB.getKey());

    deepEqual(components[3][0].getKey(), vertexD.getKey());
    deepEqual(components[3][1].getKey(), vertexF.getKey());
    deepEqual(components[3][2].getKey(), vertexE.getKey());
  });
});
