import Trial from './Trial';

export default class Tutor {
    constructor (levels, currentLevel) {
        this.levels = levels;
        this.currentLevel = currentLevel;
    }

    getNextTrial() {
        let texts = this.levels[this.currentLevel].texts;
        let rand = texts[Math.floor(Math.random() * texts.length)];
        return new Trial(rand, this.currentLevel);
    }

}
