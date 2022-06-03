import { deepEqual } from 'assert';
import { DoublyLinkedListNode } from '../DoublyLinkedListNode';

describe('DoublyLinkedListNode', () =>
{
  it('should create list node with value', () =>
  {
    const node = new DoublyLinkedListNode(1);

    deepEqual(node.value, 1);
    deepEqual(node.next, null);
    deepEqual(node.previous, null);
  });

  it('should create list node with object as a value', () =>
  {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoublyLinkedListNode(nodeValue);

    deepEqual(node.value.value, 1);
    deepEqual(node.value.key, 'test');
    deepEqual(node.next, null);
    deepEqual(node.previous, null);
  });

  it('should link nodes together', () =>
  {
    const node2 = new DoublyLinkedListNode(2);
    const node1 = new DoublyLinkedListNode(1, node2);
    const node3 = new DoublyLinkedListNode(10, node1, node2);

    deepEqual(!!node1.next, true);
    deepEqual(node1.previous, null);
    deepEqual(node2.next, null);
    deepEqual(node2.previous, null);
    deepEqual(!!node3.next, true);
    deepEqual(!!node3.previous, true);
    deepEqual(node1.value, 1);
    deepEqual(node1.next.value, 2);
    deepEqual(node3.next.value, 1);
    deepEqual(node3.previous.value, 2);
  });

  it('should convert node to string', () =>
  {
    const node = new DoublyLinkedListNode<any>(1);

    deepEqual(node.toString(), '1');

    node.value = 'string value';
    deepEqual(node.toString(), 'string value');
  });

  it('should convert node to string with custom stringifier', () =>
  {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoublyLinkedListNode(nodeValue);
    const toStringCallback = (value) => `value: ${value.value}, key: ${value.key}`;

    deepEqual(node.toString(toStringCallback), 'value: 1, key: test');
  });
});
