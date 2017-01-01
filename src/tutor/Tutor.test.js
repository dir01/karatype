import { expect } from 'chai';
import Tutor from './Tutor.js';


describe('Tutor', () => {

    describe('getNextTrial', () => { 
        let tutor = new Tutor([
            {name: 'level1', texts: ['Hello']},
            {name: 'level2', texts: ['Hello world']},
        ]);

        it('returns trial for level 1', () => {
            tutor.currentLevel = 0;
            let trial = tutor.getNextTrial();
            expect(trial.textToType).to.equal('Hello');
            expect(trial.level).to.equal(0);
        });

        it('returns trial for level 2', () => {
            tutor.currentLevel = 1;
            let trial = tutor.getNextTrial();
            expect(trial.textToType).to.equal('Hello world');
            expect(trial.level).to.equal(1);
        });
    });

});
