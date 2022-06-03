import { GraphEdge } from './GraphEdge';
import { GraphVertex } from './GraphVertex';

/**
 * 图
 */
export class Graph<T>
{
  /**
   * 顶点列表
   */
  vertices: { [key: string]: GraphVertex<T> };

  /**
   * 边列表
   */
  edges: { [key: string]: GraphEdge<T> };

  /**
   * 是否有向
   */
  isDirected = false;

  /**
   * 构建图
   *
   * @param isDirected 是否有向
   */
  constructor(isDirected = false)
  {
    this.vertices = {};
    this.edges = {};
    this.isDirected = isDirected;
  }

  /**
   * 新增顶点
   *
   * @param newVertex 新顶点
   */
  addVertex(newVertex: GraphVertex<T>)
  {
    this.vertices[newVertex.getKey()] = newVertex;

    return this;
  }

  /**
   * 获取顶点
   *
   * @param vertexKey 顶点键值
   */
  getVertexByKey(vertexKey: string)
  {
    return this.vertices[vertexKey];
  }

  /**
   * 获取相邻点
   *
   * @param vertex 顶点
   */
  getNeighbors(vertex: GraphVertex<T>)
  {
    return vertex.getNeighbors();
  }

  /**
   * 获取所有顶点
   */
  getAllVertices()
  {
    return Object.values(this.vertices);
  }

  /**
   * 获取所有边
   */
  getAllEdges()
  {
    return Object.values(this.edges);
  }

  /**
   * 新增边
   *
   * @param edge 边
   */
  addEdge(edge: GraphEdge<T>)
  {
    // Try to find and end start vertices.
    let startVertex = this.getVertexByKey(edge.startVertex.getKey());
    let endVertex = this.getVertexByKey(edge.endVertex.getKey());

    // Insert start vertex if it wasn't inserted.
    if (!startVertex)
    {
      this.addVertex(edge.startVertex);
      startVertex = this.getVertexByKey(edge.startVertex.getKey());
    }

    // Insert end vertex if it wasn't inserted.
    if (!endVertex)
    {
      this.addVertex(edge.endVertex);
      endVertex = this.getVertexByKey(edge.endVertex.getKey());
    }

    // Check if edge has been already added.
    if (this.edges[edge.getKey()])
    {
      throw new Error('Edge has already been added before');
    }
 else
    {
      this.edges[edge.getKey()] = edge;
    }

    // Add edge to the vertices.
    if (this.isDirected)
    {
      // If graph IS directed then add the edge only to start vertex.
      startVertex.addEdge(edge);
    }
 else
    {
      // If graph ISN'T directed then add the edge to both vertices.
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  /**
   * 删除边
   *
   * @param edge 边
   */
  deleteEdge(edge: GraphEdge<T>)
  {
    // Delete edge from the list of edges.
    if (this.edges[edge.getKey()])
    {
      delete this.edges[edge.getKey()];
    }
 else
    {
      throw new Error('Edge not found in graph');
    }

    // Try to find and end start vertices and delete edge from them.
    const startVertex = this.getVertexByKey(edge.startVertex.getKey());
    const endVertex = this.getVertexByKey(edge.endVertex.getKey());

    startVertex.deleteEdge(edge);
    endVertex.deleteEdge(edge);
  }

  /**
   * 查找边
   *
   * @param ertex 起始顶点
   * @param endVertex 结束顶点
   * @return 查找到的边
   */
  findEdge(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>)
  {
    const vertex = this.getVertexByKey(startVertex.getKey());

    if (!vertex)
    {
      return null;
    }

    return vertex.findEdge(endVertex);
  }

  /**
   * 获取权重
   */
  getWeight()
  {
    return this.getAllEdges().reduce((weight, graphEdge) =>
    weight + graphEdge.weight, 0);
  }

  /**
   * Reverse all the edges in directed graph.
   */
  reverse()
  {
    this.getAllEdges().forEach((edge: GraphEdge<T>) =>
    {
      // Delete straight edge from graph and from vertices.
      this.deleteEdge(edge);

      // Reverse the edge.
      edge.reverse();

      // Add reversed edge back to the graph and its vertices.
      this.addEdge(edge);
    });

    return this;
  }

  /**
   * 获取所有顶点索引
   */
  getVerticesIndices()
  {
    const verticesIndices = {};
    this.getAllVertices().forEach((vertex, index) =>
    {
      verticesIndices[vertex.getKey()] = index;
    });

    return verticesIndices;
  }

  /**
   * 获取邻接矩阵
   */
  getAdjacencyMatrix()
  {
    const vertices = this.getAllVertices();
    const verticesIndices = this.getVerticesIndices();

    // Init matrix with infinities meaning that there is no ways of
    // getting from one vertex to another yet.
    const adjacencyMatrix: number[][] = Array(vertices.length).fill(null).map(() =>
    Array(vertices.length).fill(Infinity));

    // Fill the columns.
    vertices.forEach((vertex, vertexIndex) =>
    {
      vertex.getNeighbors().forEach((neighbor) =>
      {
        const neighborIndex = verticesIndices[neighbor.getKey()];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });

    return adjacencyMatrix;
  }

  /**
   * 转换为字符串
   */
  toString()
  {
    return Object.keys(this.vertices).toString();
  }
}
