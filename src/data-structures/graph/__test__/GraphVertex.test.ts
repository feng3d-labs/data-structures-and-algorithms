import { deepEqual, throws } from 'assert';
import { GraphVertex } from '../GraphVertex';
import { GraphEdge } from '../GraphEdge';

describe('GraphVertex', () =>
{
  it('should throw an error when trying to create vertex without value', () =>
  {
    let vertex = null;

    function createEmptyVertex()
    {
      vertex = new GraphVertex();
    }

    deepEqual(vertex, null);
    throws(createEmptyVertex);
  });

  it('should create graph vertex', () =>
  {
    const vertex = new GraphVertex('A');

    deepEqual(!!vertex, true);
    deepEqual(vertex.value, 'A');
    deepEqual(vertex.toString(), 'A');
    deepEqual(vertex.getKey(), 'A');
    deepEqual(vertex.edges.toString(), '');
    deepEqual(vertex.getEdges(), []);
  });

  it('should add edges to vertex and check if it exists', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    deepEqual(vertexA.hasEdge(edgeAB), true);
    deepEqual(vertexB.hasEdge(edgeAB), false);
    deepEqual(vertexA.getEdges().length, 1);
    deepEqual(vertexA.getEdges()[0].toString(), 'A_B');
  });

  it('should delete edges from vertex', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    deepEqual(vertexA.hasEdge(edgeAB), true);
    deepEqual(vertexB.hasEdge(edgeAB), false);

    deepEqual(vertexA.hasEdge(edgeAC), true);
    deepEqual(vertexC.hasEdge(edgeAC), false);

    deepEqual(vertexA.getEdges().length, 2);

    deepEqual(vertexA.getEdges()[0].toString(), 'A_B');
    deepEqual(vertexA.getEdges()[1].toString(), 'A_C');

    vertexA.deleteEdge(edgeAB);
    deepEqual(vertexA.hasEdge(edgeAB), false);
    deepEqual(vertexA.hasEdge(edgeAC), true);
    deepEqual(vertexA.getEdges()[0].toString(), 'A_C');

    vertexA.deleteEdge(edgeAC);
    deepEqual(vertexA.hasEdge(edgeAB), false);
    deepEqual(vertexA.hasEdge(edgeAC), false);
    deepEqual(vertexA.getEdges().length, 0);
  });

  it('should delete all edges from vertex', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    deepEqual(vertexA.hasEdge(edgeAB), true);
    deepEqual(vertexB.hasEdge(edgeAB), false);

    deepEqual(vertexA.hasEdge(edgeAC), true);
    deepEqual(vertexC.hasEdge(edgeAC), false);

    deepEqual(vertexA.getEdges().length, 2);

    vertexA.deleteAllEdges();

    deepEqual(vertexA.hasEdge(edgeAB), false);
    deepEqual(vertexB.hasEdge(edgeAB), false);

    deepEqual(vertexA.hasEdge(edgeAC), false);
    deepEqual(vertexC.hasEdge(edgeAC), false);

    deepEqual(vertexA.getEdges().length, 0);
  });

  it('should return vertex neighbors in case if current node is start one', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    deepEqual(vertexB.getNeighbors(), []);

    const neighbors = vertexA.getNeighbors();

    deepEqual(neighbors.length, 2);
    deepEqual(neighbors[0], vertexB);
    deepEqual(neighbors[1], vertexC);
  });

  it('should return vertex neighbors in case if current node is end one', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeBA = new GraphEdge(vertexB, vertexA);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    vertexA
      .addEdge(edgeBA)
      .addEdge(edgeCA);

    deepEqual(vertexB.getNeighbors(), []);

    const neighbors = vertexA.getNeighbors();

    deepEqual(neighbors.length, 2);
    deepEqual(neighbors[0], vertexB);
    deepEqual(neighbors[1], vertexC);
  });

  it('should check if vertex has specific neighbor', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    deepEqual(vertexA.hasNeighbor(vertexB), true);
    deepEqual(vertexA.hasNeighbor(vertexC), false);
  });

  it('should edge by vertex', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    deepEqual(vertexA.findEdge(vertexB), edgeAB);
    deepEqual(vertexA.findEdge(vertexC), null);
  });

  it('should calculate vertex degree', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    deepEqual(vertexA.getDegree(), 0);

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    deepEqual(vertexA.getDegree(), 1);

    const edgeBA = new GraphEdge(vertexB, vertexA);
    vertexA.addEdge(edgeBA);

    deepEqual(vertexA.getDegree(), 2);

    vertexA.addEdge(edgeAB);
    deepEqual(vertexA.getDegree(), 3);

    deepEqual(vertexA.getEdges().length, 3);
  });
});
