import Exercise from './Exercise';

export default class Tutor {
    constructor (levels, currentLevel) {
        this.levels = levels;
        this.currentLevel = currentLevel || 0;
        this.statsLog = [];
    }

    getNextExercise(oldExercise) {
        if (oldExercise) {
            this.statsLog.push(oldExercise.stats);
            if (this.shouldLevelUp()) this.currentLevel++;
        }
        let texts = this.levels[this.currentLevel].texts;
        let rand = texts[Math.floor(Math.random() * texts.length)];
        return new Exercise(rand, this.currentLevel);
    }

    shouldLevelUp() {
        if (this.statsLog.length < 3) {
            return false;
        }
        if (this.currentLevel === this.levels.length - 1) {
            return false;
        }
        const getLast3 = (a) => a.slice(a.length - 3, a.length);
        const isBadStat = (stat) => (
            stat.level < this.currentLevel
            || stat.accuracy < .95
            || stat.wordsPerMinute < 30
        );
        for (var stat of getLast3(this.statsLog)) {
            if (isBadStat(stat)) {
                return false;
            }
        }
        return true;
    }

}
