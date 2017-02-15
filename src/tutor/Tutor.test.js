import { expect } from 'chai';
import Tutor from './Tutor.js';


describe('Tutor', () => {

    let tutor = new Tutor([
        {name: 'level1', texts: ['Hello']},
        {name: 'level2', texts: ['Hello world']}
    ]);

    describe('getNextExercise', () => { 
        it('returns exercise for level 1', () => {
            tutor.currentLevel = 0;
            let exercise = tutor.getNextExercise();
            expect(exercise.textToType).to.equal('Hello');
            expect(exercise.level).to.equal(0);
        });

        it('returns exercise for level 2', () => {
            tutor.currentLevel = 1;
            let exercise = tutor.getNextExercise();
            expect(exercise.textToType).to.equal('Hello world');
            expect(exercise.level).to.equal(1);
        });

        it('saves stats for previous exercise if provided', () => {
            tutor.currentLevel = 0;
            let oldExercise = {stats: 'foo'};
            tutor.getNextExercise(oldExercise);
            expect(tutor.statsLog).to.deep.equal(['foo']);
        });
    });

    describe('shouldLevelUp', () => {

        it('false if there were inaccurate exercises lately', () => {
            tutor.statsLog = [
                {level: 0, accuracy: 1, wpm: 45},
                {level: 0, accuracy: 0.9, wpm: 60},
                {level: 0, accuracy: 1, wpm: 55}
            ];
            expect(tutor.shouldLevelUp()).to.be.false;
        });

        it('false if there were slow exercises lately', () => {
            tutor.statsLog = [
                {level: 0, accuracy: 1, wpm: 45},
                {level: 0, accuracy: 0.9, wpm: 60},
                {level: 0, accuracy: 1, wpm: 55}
            ];
            expect(tutor.shouldLevelUp()).to.be.false;
        });

        it('true if three last were 100% accurate with speed > 45wpm', () => {
            tutor.statsLog = [
                {level: 0, accuracy: 1, wpm: 45},
                {level: 0, accuracy: 1, wpm: 60},
                {level: 0, accuracy: 1, wpm: 55}
            ];
            expect(tutor.shouldLevelUp()).to.be.true;
        });

        it('false if less than 3 exercises', () => {
            tutor.statsLog = [];
            expect(tutor.shouldLevelUp()).to.be.false;
        });

        it('false if less than 3 exercises on current level', () => {
            tutor.statsLog = [
                {level: -1, accuracy: 1, wpm: 100},
                {level: 0, accuracy: 1, wpm: 100},
                {level: 0, accuracy: 1, wpm: 100}
            ];
            expect(tutor.shouldLevelUp()).to.be.false;
        });

        it('false if last level', () => {
            tutor.currentLevel = 1;
            tutor.statsLog = [
                {level: 1, accuracy: 1, wordsPerMinute: 45},
                {level: 1, accuracy: 1, wordsPerMinute: 46},
                {level: 1, accuracy: 1, wordsPerMinute: 66}
            ];
            expect(tutor.shouldLevelUp()).to.be.false;
        });
    });

});
