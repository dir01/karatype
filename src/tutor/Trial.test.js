"use strict";

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
                {text: "H", type: 'current'},
                {text: 'ello', type: 'untyped'}
            ]);
        });

        it('typed "H": correct "H", current "e" and untyped "llo" ', () => {
            trial.tryChar('H');
            expect(trial.snippets).to.deep.equal([
                {text: "H", type: 'correct'},
                {text: 'e', type: 'current'},
                {text: 'llo', type: 'untyped'}
            ]);
        });

        it('typed "HE": correct "H", error at "e", current "l" and untyped "lo" ', () => {
            trial.tryChar('H');
            trial.tryChar('E');
            expect(trial.snippets).to.deep.equal([
                {text: "H", type: 'correct'},
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
                {text: "H", type: 'correct'},
                {text: 'e', type: 'error'},
                {text: 'l', type: 'correct'},
                {text: 'l', type: 'current'},
                {text: 'o', type: 'untyped'}
            ]);
        });

    });

    describe('new Trial("foo").tryChar("Ctrl") == undefined', () => {
        expect(new Trial("foo").tryChar("Ctrl")).to.be.undefined;
    });

});
