import { textToSnippets } from './TextToType.js';
import { expect } from 'chai';


describe('textToSnippets', () => {
    it('beginning: current "H" and untyped "ello" ', () => {
        let snippets = textToSnippets('Hello');
        expect(snippets).to.deep.equal([
            {text: 'H', type: 'current'},
            {text: 'ello', type: 'untyped'}
        ]);
    });

    it('correct "H", current "e" and untyped "llo" ', () => {
        let snippets = textToSnippets('Hello', 1);
        expect(snippets).to.deep.equal([
            {text: 'H', type: 'correct'},
            {text: 'e', type: 'current'},
            {text: 'llo', type: 'untyped'}
        ]);
    });

    it('correct "H", error at "e", current "l" and untyped "lo" ', () => {
        let snippets = textToSnippets('Hello', 2, [1]);
        expect(snippets).to.deep.equal([
            {text: 'H', type: 'correct'},
            {text: 'e', type: 'error'},
            {text: 'l', type: 'current'},
            {text: 'lo', type: 'untyped'}
        ]);
    });

    it('correct "H", error at "e", correct "l", current "l" and untyped "o" ', () => {
        let snippets = textToSnippets('Hello', 3, [1]);
        expect(snippets).to.deep.equal([
            {text: 'H', type: 'correct'},
            {text: 'e', type: 'error'},
            {text: 'l', type: 'correct'},
            {text: 'l', type: 'current'},
            {text: 'o', type: 'untyped'}
        ]);
    });


});