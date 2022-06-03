import { LinkedList } from '../linked-list/LinkedList';
import { LinkedListNode } from '../linked-list/LinkedListNode';
import { GraphEdge } from './GraphEdge';

/**
 * 图顶点
 */
export class GraphVertex<T>
{
  /**
   * 值
   */
  value: T;

  /**
   * 边列表
   */
  edges: LinkedList<GraphEdge<T>>;

  /**
   * 构建图顶点
   *
   * @param value 值
   */
  constructor(value?: T)
  {
    if (value === undefined)
    {
      throw new Error('Graph vertex must have a value');
    }

    /**
     * @param {GraphEdge} edgeA
     * @param {GraphEdge} edgeB
     */
    const edgeComparator = (edgeA, edgeB) =>
    {
      if (edgeA.getKey() === edgeB.getKey())
      {
        return 0;
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
    };

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;
    this.edges = new LinkedList(edgeComparator);
  }

  /**
   * 新增边
   *
   * @param edge 新增的边
   * @returns 自身
   */
  addEdge(edge: GraphEdge<T>)
  {
    this.edges.append(edge);

    return this;
  }

  /**
   * 删除边
   *
   * @param edge 边
   */
  deleteEdge(edge: GraphEdge<T>)
  {
    this.edges.delete(edge);
  }

  /**
   * 获取相邻顶点列表
   */
  getNeighbors(): GraphVertex<T>[]
  {
    const edges = this.edges.toArray();

    const neighborsConverter = (node: LinkedListNode<GraphEdge<T>>) =>
    (node.value.startVertex === this ? node.value.endVertex : node.value.startVertex);

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  /**
   * 获取边列表
   */
  getEdges()
  {
    return this.edges.toArray().map((linkedListNode) => linkedListNode.value);
  }

  /**
   * 获取边的数量
   */
  getDegree()
  {
    return this.edges.toArray().length;
  }

  /**
   * 是否存在指定边
   *
   * @param requiredEdge 指定边
   * @returns 是否存在指定边
   */
  hasEdge(requiredEdge: GraphEdge<T>)
  {
    const edgeNode = this.edges.find({
      callback: (edge) => edge === requiredEdge,
    });

    return !!edgeNode;
  }

  /**
   * 是否有相邻顶点
   *
   * @param vertex 顶点
   * @returns 是否有相邻顶点
   */
  hasNeighbor(vertex: GraphVertex<T>)
  {
    const vertexNode = this.edges.find({
      callback: (edge) => edge.startVertex === vertex || edge.endVertex === vertex,
    });

    return !!vertexNode;
  }

  /**
   * 查找边
   *
   * @param vertex 顶点
   * @returns 查找到的边
   */
  findEdge(vertex: GraphVertex<T>)
  {
    const edgeFinder = (edge) =>
    edge.startVertex === vertex || edge.endVertex === vertex;

    const edge = this.edges.find({ callback: edgeFinder });

    return edge ? edge.value : null;
  }

  /**
   * 获取键值
   */
  getKey()
  {
    return this.value as any as string;
  }

  /**
   * 删除所有边
   */
  deleteAllEdges()
  {
    this.getEdges().forEach((edge) => this.deleteEdge(edge));

    return this;
  }

  /**
   * 转换为字符串
   *
   * @param callback 转换为字符串函数
   */
  toString(callback?: (value: T) => string)
  {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
