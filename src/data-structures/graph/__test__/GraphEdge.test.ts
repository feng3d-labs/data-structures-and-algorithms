import { deepEqual } from 'assert';
import { GraphEdge } from '../GraphEdge';
import { GraphVertex } from '../GraphVertex';

describe('GraphEdge', () =>
{
  it('should create graph edge with default weight', () =>
  {
    const startVertex = new GraphVertex('A');
    const endVertex = new GraphVertex('B');
    const edge = new GraphEdge(startVertex, endVertex);

    deepEqual(edge.getKey(), 'A_B');
    deepEqual(edge.toString(), 'A_B');
    deepEqual(edge.startVertex, startVertex);
    deepEqual(edge.endVertex, endVertex);
    deepEqual(edge.weight, 0);
  });

  it('should create graph edge with predefined weight', () =>
  {
    const startVertex = new GraphVertex('A');
    const endVertex = new GraphVertex('B');
    const edge = new GraphEdge(startVertex, endVertex, 10);

    deepEqual(edge.startVertex, startVertex);
    deepEqual(edge.endVertex, endVertex);
    deepEqual(edge.weight, 10);
  });

  it('should be possible to do edge reverse', () =>
  {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const edge = new GraphEdge(vertexA, vertexB, 10);

    deepEqual(edge.startVertex, vertexA);
    deepEqual(edge.endVertex, vertexB);
    deepEqual(edge.weight, 10);

    edge.reverse();

    deepEqual(edge.startVertex, vertexB);
    deepEqual(edge.endVertex, vertexA);
    deepEqual(edge.weight, 10);
  });
});
