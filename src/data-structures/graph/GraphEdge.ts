import { GraphVertex } from './GraphVertex';

/**
 * 图边
 */
export class GraphEdge<T>
{
  /**
   * 起始顶点
   */
  startVertex: GraphVertex<T>;

  /**
   * 结束顶点
   */
  endVertex: GraphVertex<T>;

  /**
   * 权重
   */
  weight: number;

  /**
   * 构建图边
   * @param startVertex 起始顶点
   * @param endVertex 结束顶点
   * @param weight 权重
   */
  constructor(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>, weight = 0)
  {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  /**
   * 获取键值
   */
  getKey()
  {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  /**
   * 反转
   */
  reverse()
  {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  /**
   * 转换为字符串
   */
  toString()
  {
    return this.getKey();
  }
}
