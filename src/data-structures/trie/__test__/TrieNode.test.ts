import { deepEqual } from 'assert';
import { TrieNode } from '../TrieNode';

describe('TrieNode', () =>
{
  it('should create trie node', () =>
  {
    const trieNode = new TrieNode('c', true);

    deepEqual(trieNode.character, 'c');
    deepEqual(trieNode.isCompleteWord, true);
    deepEqual(trieNode.toString(), 'c*');
  });

  it('should add child nodes', () =>
  {
    const trieNode = new TrieNode('c');

    trieNode.addChild('a', true);
    trieNode.addChild('o');

    deepEqual(trieNode.toString(), 'c:a,o');
  });

  it('should get child nodes', () =>
  {
    const trieNode = new TrieNode('c');

    trieNode.addChild('a');
    trieNode.addChild('o');

    deepEqual(trieNode.getChild('a').toString(), 'a');
    deepEqual(trieNode.getChild('a').character, 'a');
    deepEqual(trieNode.getChild('o').toString(), 'o');
    deepEqual(!!trieNode.getChild('b'), false);
  });

  it('should check if node has children', () =>
  {
    const trieNode = new TrieNode('c');

    deepEqual(trieNode.hasChildren(), false);

    trieNode.addChild('a');

    deepEqual(trieNode.hasChildren(), true);
  });

  it('should check if node has specific child', () =>
  {
    const trieNode = new TrieNode('c');

    trieNode.addChild('a');
    trieNode.addChild('o');

    deepEqual(trieNode.hasChild('a'), true);
    deepEqual(trieNode.hasChild('o'), true);
    deepEqual(trieNode.hasChild('b'), false);
  });

  it('should suggest next children', () =>
  {
    const trieNode = new TrieNode('c');

    trieNode.addChild('a');
    trieNode.addChild('o');

    deepEqual(trieNode.suggestChildren(), ['a', 'o']);
  });

  it('should delete child node if the child node has NO children', () =>
  {
    const trieNode = new TrieNode('c');
    trieNode.addChild('a');
    deepEqual(trieNode.hasChild('a'), true);

    trieNode.removeChild('a');
    deepEqual(trieNode.hasChild('a'), false);
  });

  it('should NOT delete child node if the child node has children', () =>
  {
    const trieNode = new TrieNode('c');
    trieNode.addChild('a');
    const childNode = trieNode.getChild('a');
    childNode.addChild('r');

    trieNode.removeChild('a');
    deepEqual(trieNode.hasChild('a'), true);
  });

  it('should NOT delete child node if the child node completes a word', () =>
  {
    const trieNode = new TrieNode('c');
    const IS_COMPLETE_WORD = true;
    trieNode.addChild('a', IS_COMPLETE_WORD);

    trieNode.removeChild('a');
    deepEqual(trieNode.hasChild('a'), true);
  });
});
