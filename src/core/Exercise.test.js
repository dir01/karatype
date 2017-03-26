'use strict';

import { expect } from 'chai';
import path from 'path';

import Exercise from './Exercise';


describe('Exercise', () => {

    describe('Exercise.tryChar internals', () => {
        it('saves time of a keystroke', () => {
            let exercise = new Exercise('Hi');
            exercise.tryChar('X');
            let loggedTime = exercise.loggedKeystrokes[0].date.getTime();
            let now = new Date().getTime();
            expect(now - loggedTime).not.to.be.above(1);
        });

        it('allows manually setting keystroke time', () => {
            let exercise = new Exercise('Hi');
            exercise.tryChar('s', new Date(1000));
            expect(exercise.loggedKeystrokes[0].date).to.deep.equal(new Date(1000));
        });
    });

    describe('Correct last char: new Exercise("H").tryChar("H")', () => {
        let exercise = new Exercise('H');
        const isCorrectChar = exercise.tryChar('H');

        it('returns true since "H" is indeed "H" ', () => {
            expect(isCorrectChar).to.be.true;
        });

        it('increases index', () => {
            expect(exercise.index).to.equal(1);
        });

        it('ends game', () => {
            expect(exercise.isOver).to.be.true;
        });

        it('finishes exercise', function() {
          expect(exercise.isStarted).to.be.false;
        });

        it('has empty activeChars', () => {
            expect(exercise.activeKeys).to.deep.equal([]);
        });

        it('makes exercise stop accepting chars', () => {
            expect(exercise.tryChar('W')).to.be.undefined;
        });

    });

    describe('Incorrect non-last char: new Exercise("He").tryChar("h")', () => {
        let exercise = new Exercise('He');
        let isCorrectChar = exercise.tryChar('h');

        it('returns false since "h" is not "H" ', () => {
            expect(isCorrectChar).to.be.false;
        });

        it('increases index', () => {
            expect(exercise.index).to.equal(1);
        });

        it('increases errors count', () => {
            expect(exercise.errorsCount).to.equal(1);
        });

        it('saves error index', () => {
            expect(exercise.errorsIndexes).to.deep.equal([0]);
        });

        it('game is not over since we have more stuff to type', () => {
            expect(exercise.isOver).to.be.false;
        });
    });

    describe('Exercise control keys handling', () => {
        let exercise;
        beforeEach(() => {
            exercise = new Exercise('foo bar');
        });

        it('denies Backspace when nothing was typed yet', () => {
            expect(exercise.tryChar('Backspace')).to.be.undefined;
            expect(exercise.index).to.equal(0);
        });

        it('handles Backspace after correct char', () => {
            exercise.tryChar('f');
            expect(exercise.index).to.equal(1);
            let ret = exercise.tryChar('Backspace');
            expect(ret).to.be.true;
            expect(exercise.index).to.equal(0);
        });

        it('handles Backspace after error', () => {
            exercise.tryChar('W');
            expect(exercise.index).to.equal(1);
            expect(exercise.errorsIndexes).to.deep.equal([0]);

            let ret = exercise.tryChar('Backspace');
            expect(ret).to.be.true;
            expect(exercise.index).to.equal(0);
            expect(exercise.errorsIndexes).to.deep.equal([]);
        });

        it('handles Backspace after error and space', () => {
            exercise.tryChar('f');
            exercise.tryChar('o');
            exercise.tryChar('X');
            exercise.tryChar(' ');
            expect(exercise.index).to.equal(4);
            expect(exercise.errorsIndexes).to.deep.equal([2]);
            exercise.tryChar('Backspace');
            expect(exercise.index).to.equal(3);
            expect(exercise.errorsIndexes).to.deep.equal([2]);
        });

        it('denies stuff like control', () => {
            expect(exercise.tryChar('Ctrl')).to.be.undefined;
        });
    });

    describe('Exercise.progress', () => {
        let exercise = new Exercise('Hello');

        it('is 0 in the beggining', () => {
            expect(exercise.progress).to.equal(0);
        });

        it('is 20 when 1 of 5 letters typed', () => {
            exercise.tryChar('H');
            expect(exercise.progress).to.equal(20);
        });
    });

    describe('Exercise stats', () => {
        it('calculates accuracy', () => {
            let exercise = new Exercise('Hello');
            exercise.tryChar('H');
            exercise.tryChar('e');
            exercise.tryChar('l');
            exercise.tryChar('l');
            expect(exercise.stats.accuracy).to.equal(1);
            exercise.tryChar('x');
            expect(exercise.stats.accuracy).to.equal(1-1/5);
        });

        it('ignores fixed errors while calculating accuracy', () => {
            let exercise = new Exercise('Hello');
            exercise.tryChar('H');
            exercise.tryChar('e');
            expect(exercise.stats.accuracy).to.equal(1);
            exercise.tryChar('k');
            expect(exercise.stats.accuracy).to.equal(1 - 1/3);
            exercise.tryChar('Backspace');
            expect(exercise.stats.accuracy).to.equal(1);
        });

        it('calculates unproductive keystrokes rate', () => {
            let exercise = new Exercise('Hello');
            ['h', 'Backspace', 'H', 'e', 'l', 'l', 'o'].forEach((chr) => {
                exercise.tryChar(chr);
            });
            expect(exercise.stats.unproductiveKeystrokesRate).to.equal((7-5)/5*100);
        });

        it('calculates WPM (words per minute)', () => {
            let exercise = new Exercise('Hello world!');
            [
                ['H', '22:46:24'],
                ['e', '22:46:25'],
                ['l', '22:46:26'],
                ['l', '22:46:26'],
                ['o', '22:46:26'],
                [' ', '22:46:27'],
                ['w', '22:46:27'],
                ['o', '22:46:27'],
                ['r', '22:46:27'],
                ['l', '22:46:27'],
                ['d', '22:46:27'],
                ['!', '22:46:27']
            ].forEach((i) => {
                let char = i[0];
                let time = i[1];
                let date = new Date('Thu Jan 26 2017 ' + time + ' GMT+0300 (MSK)');
                exercise.tryChar(char, date);
            });
            expect(exercise.wordsPerMinute).to.equal(40);
        });
    });

});
