import { deepEqual } from 'assert';
import { Trie } from '../Trie';

describe('Trie', () =>
{
  it('should create trie', () =>
  {
    const trie = new Trie();

    deepEqual(!!trie, true);
    deepEqual(trie.head.toString(), '*');
  });

  it('should add words to trie', () =>
  {
    const trie = new Trie();

    trie.addWord('cat');

    deepEqual(trie.head.toString(), '*:c');
    deepEqual(trie.head.getChild('c').toString(), 'c:a');

    trie.addWord('car');
    deepEqual(trie.head.toString(), '*:c');
    deepEqual(trie.head.getChild('c').toString(), 'c:a');
    deepEqual(trie.head.getChild('c').getChild('a').toString(), 'a:t,r');
    deepEqual(trie.head.getChild('c').getChild('a').getChild('t').toString(), 't*');
  });

  it('should delete words from trie', () =>
  {
    const trie = new Trie();

    trie.addWord('carpet');
    trie.addWord('car');
    trie.addWord('cat');
    trie.addWord('cart');
    deepEqual(trie.doesWordExist('carpet'), true);
    deepEqual(trie.doesWordExist('car'), true);
    deepEqual(trie.doesWordExist('cart'), true);
    deepEqual(trie.doesWordExist('cat'), true);

    // Try to delete not-existing word first.
    trie.deleteWord('carpool');
    deepEqual(trie.doesWordExist('carpet'), true);
    deepEqual(trie.doesWordExist('car'), true);
    deepEqual(trie.doesWordExist('cart'), true);
    deepEqual(trie.doesWordExist('cat'), true);

    trie.deleteWord('carpet');
    deepEqual(trie.doesWordExist('carpet'), false);
    deepEqual(trie.doesWordExist('car'), true);
    deepEqual(trie.doesWordExist('cart'), true);
    deepEqual(trie.doesWordExist('cat'), true);

    trie.deleteWord('cat');
    deepEqual(trie.doesWordExist('car'), true);
    deepEqual(trie.doesWordExist('cart'), true);
    deepEqual(trie.doesWordExist('cat'), false);

    trie.deleteWord('car');
    deepEqual(trie.doesWordExist('car'), false);
    deepEqual(trie.doesWordExist('cart'), true);

    trie.deleteWord('cart');
    deepEqual(trie.doesWordExist('car'), false);
    deepEqual(trie.doesWordExist('cart'), false);
  });

  it('should suggests next characters', () =>
  {
    const trie = new Trie();

    trie.addWord('cat');
    trie.addWord('cats');
    trie.addWord('car');
    trie.addWord('caption');

    deepEqual(trie.suggestNextCharacters('ca'), ['t', 'r', 'p']);
    deepEqual(trie.suggestNextCharacters('cat'), ['s']);
    deepEqual(trie.suggestNextCharacters('cab'), null);
  });

  it('should check if word exists', () =>
  {
    const trie = new Trie();

    trie.addWord('cat');
    trie.addWord('cats');
    trie.addWord('carpet');
    trie.addWord('car');
    trie.addWord('caption');

    deepEqual(trie.doesWordExist('cat'), true);
    deepEqual(trie.doesWordExist('cats'), true);
    deepEqual(trie.doesWordExist('carpet'), true);
    deepEqual(trie.doesWordExist('car'), true);
    deepEqual(trie.doesWordExist('cap'), false);
    deepEqual(trie.doesWordExist('call'), false);
  });
});
