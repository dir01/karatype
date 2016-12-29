'use strict';

let expect = require('chai').expect,
    path = require('path');

let Trial = require(path.join(__dirname, 'Trial'));


describe('Trial', () => {

    describe('Correct last char: new Trial("H").tryChar("H")', () => {
        let trial = new Trial('H');
        const isCorrectChar = trial.tryChar('H');

        it('returns true since "H" is indeed "H" ', () => {
            expect(isCorrectChar).to.be.true;
        });

        it('increases index', () => {
            expect(trial.index).to.equal(1);
        });

        it('ends game', () => {
            expect(trial.isOver).to.be.true;
        });

        it('has empty activeChars', () => {
            expect(trial.activeKeys).to.deep.equal([]);
        });

        it('makes trial stop accepting chars', () => {
            expect(trial.tryChar('W')).to.be.undefined;
        });

    });

    describe('Incorrect non-last char: new Trial("He").tryChar("h")', () => {
        let trial = new Trial('He');
        let isCorrectChar = trial.tryChar('h');

        it('returns false since "h" is not "H" ', () => {
            expect(isCorrectChar).to.be.false;
        });

        it('increases index', () => {
            expect(trial.index).to.equal(1);
        });

        it('increases errors count', () => {
            expect(trial.stats.errors).to.equal(1);
        });

        it('saves error index', () => {
            expect(trial.errorsIndexes).to.deep.equal([0]);
        });

        it('game is not over since we have more stuff to type', () => {
            expect(trial.isOver).to.be.false;
        });
    });

    describe('Text snippets: new Trial("Hello")', () => {
        var trial;

        beforeEach(() => {
            trial = new Trial('Hello');
        });

        it('beginning: current "H" and untyped "ello" ', () => {
            expect(trial.snippets).to.deep.equal([
                {text: 'H', type: 'current'},
                {text: 'ello', type: 'untyped'}
            ]);
        });

        it('typed "H": correct "H", current "e" and untyped "llo" ', () => {
            trial.tryChar('H');
            expect(trial.snippets).to.deep.equal([
                {text: 'H', type: 'correct'},
                {text: 'e', type: 'current'},
                {text: 'llo', type: 'untyped'}
            ]);
        });

        it('typed "HE": correct "H", error at "e", current "l" and untyped "lo" ', () => {
            trial.tryChar('H');
            trial.tryChar('E');
            expect(trial.snippets).to.deep.equal([
                {text: 'H', type: 'correct'},
                {text: 'e', type: 'error'},
                {text: 'l', type: 'current'},
                {text: 'lo', type: 'untyped'}
            ]);
        });

        it('typed "HEl": correct "H", error at "e", correct "l", current "l" and untyped "o" ', () => {
            trial.tryChar('H');
            trial.tryChar('E');
            trial.tryChar('l');
            expect(trial.snippets).to.deep.equal([
                {text: 'H', type: 'correct'},
                {text: 'e', type: 'error'},
                {text: 'l', type: 'correct'},
                {text: 'l', type: 'current'},
                {text: 'o', type: 'untyped'}
            ]);
        });

    });

    describe('Trial control keys handling', () => {
        let trial;
        beforeEach(() => {
            trial = new Trial('foo bar');
        });

        it('denies Backspace when nothing was typed yet', () => {
            expect(trial.tryChar('Backspace')).to.be.undefined;
            expect(trial.index).to.equal(0);
        });

        it('handles Backspace after correct char', () => {
            trial.tryChar('f');
            expect(trial.index).to.equal(1);
            let ret = trial.tryChar('Backspace');
            expect(ret).to.be.true;
            expect(trial.index).to.equal(0);
        });

        it('handles Backspace after error', () => {
            trial.tryChar('W');
            expect(trial.index).to.equal(1);
            expect(trial.errorsIndexes).to.deep.equal([0]);

            let ret = trial.tryChar('Backspace');
            expect(ret).to.be.true;
            expect(trial.index).to.equal(0);
            expect(trial.errorsIndexes).to.deep.equal([]);
        });

        it('handles Backspace after error and space', () => {
            trial.tryChar('f');
            trial.tryChar('o');
            trial.tryChar('X');
            trial.tryChar(' ');
            expect(trial.index).to.equal(4);
            expect(trial.errorsIndexes).to.deep.equal([2]);
            trial.tryChar('Backspace');
            expect(trial.index).to.equal(3);
            expect(trial.errorsIndexes).to.deep.equal([2]);
        });

        it('denies stuff like control', () => {
            expect(trial.tryChar('Ctrl')).to.be.undefined;
        });
    });

    describe('Trial.progress', () => {
        let trial = new Trial('Hello');

        it('is 0 in the beggining', () => {
            expect(trial.progress).to.equal(0);
        });

        it('is 20 when 1 of 5 letters typed', () => {
            trial.tryChar('H');
            expect(trial.progress).to.equal(20);
        });
    });

});
