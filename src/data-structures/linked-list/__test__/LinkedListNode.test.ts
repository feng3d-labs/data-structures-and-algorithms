import { deepEqual } from 'assert';
import { LinkedListNode } from '../LinkedListNode';

describe('LinkedListNode', () =>
{
  it('should create list node with value', () =>
  {
    const node = new LinkedListNode(1);

    deepEqual(node.value, 1);
    deepEqual(node.next, null);
  });

  it('should create list node with object as a value', () =>
  {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedListNode(nodeValue);

    deepEqual(node.value.value, 1);
    deepEqual(node.value.key, 'test');
    deepEqual(node.next, null);
  });

  it('should link nodes together', () =>
  {
    const node2 = new LinkedListNode(2);
    const node1 = new LinkedListNode(1, node2);

    deepEqual(!!node1.next, true);
    deepEqual(node2.next, null);
    deepEqual(node1.value, 1);
    deepEqual(node1.next.value, 2);
  });

  it('should convert node to string', () =>
  {
    const node = new LinkedListNode<string | number>(1);

    deepEqual(node.toString(), '1');

    node.value = 'string value';
    deepEqual(node.toString(), 'string value');
  });

  it('should convert node to string with custom stringifier', () =>
  {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedListNode(nodeValue);
    const toStringCallback = (value: { value: number; key: string; }) => `value: ${value.value}, key: ${value.key}`;

    deepEqual(node.toString(toStringCallback), 'value: 1, key: test');
  });
});
