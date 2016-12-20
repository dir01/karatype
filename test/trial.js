let expect = require('chai').expect,
    path = require('path');

let Trial = require(path.join(__dirname, '..', 'trial'));


describe('Trial', () => {
    describe('tryKey gets right key', () => {
        let trial = new Trial('Hello world');

        it('returns true if key matches position', () => {
            expect(trial.tryKey('H')).to.be.true;
        });

        it('increases index', () => {
            expect(trial.index).to.equal(1);
        });
    })
});