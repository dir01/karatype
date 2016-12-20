let expect = require('chai').expect,
    path = require('path');

let Trial = require(path.join(__dirname, '..', 'trial'));


describe('Trial', () => {

    describe('tryChar gets correct char', () => {
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

    describe('tryChar gets incorrect char', () => {
        let trial = new Trial('H');
        let isCorrectChar = trial.tryChar('w');

        it('returns false since "w" is not "H" ', () => {
            expect(isCorrectChar).to.be.false;
        });

        it('does not increase index', () => {
            expect(trial.index).to.equal(0);
        });

        it('does not end game', () => {
            expect(trial.isOver).to.be.false;
        });
    })

});