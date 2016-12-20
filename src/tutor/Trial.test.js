let expect = require('chai').expect,
    path = require('path');

let Trial = require(path.join(__dirname, 'Trial'));


describe('Trial', () => {

    describe('new Trial("H").tryChar("H")', () => {
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

    describe('new Trial("H").tryChar("w")', () => {
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
    });

    describe('new Trial("Hello").tryChar("H")', () => {
        let trial = new Trial('Hello');
        let isCorrectChar = trial.tryChar('H');

        it('sets typedTextPart to "H" ', () => {
            expect(trial.typedTextPart).to.equal("H");
        });

        it('sets untypedTextPart to "ellow world" ', () => {
            expect(trial.untypedTextPart).to.equal('ello');
        });
    })

});
