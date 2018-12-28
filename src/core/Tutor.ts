import Exercise, { IExercise, TStats } from "./Exercise";

export type TLevel = { name: string; texts: string[] };

export interface ITutor {
  currentLevel: number;
  levels: TLevel[];
  getNextExercise(oldExercise: null | IExercise): IExercise;
}

export default class Tutor implements ITutor {
  public levels: TLevel[];
  public currentLevel: number;
  public statsLog: TStats[];

  constructor(levels: TLevel[], currentLevel: number = 0) {
    this.levels = levels;
    this.currentLevel = currentLevel || 0;
    this.statsLog = [];
  }

  public getNextExercise(oldExercise?: IExercise | null): IExercise {
    if (oldExercise) {
      this.statsLog.push(oldExercise.stats);
      if (this.shouldLevelUp()) {
        this.currentLevel++;
      }
    }
    const texts = this.levels[this.currentLevel].texts;
    const rand = texts[Math.floor(Math.random() * texts.length)];
    return new Exercise(rand, this.currentLevel);
  }

  public shouldLevelUp() {
    if (this.statsLog.length < 3) {
      return false;
    }
    if (this.currentLevel === this.levels.length - 1) {
      return false;
    }
    const getLast3 = <T>(a: T[]): T[] => a.slice(a.length - 3, a.length);
    const isBadStat = (stat: TStats) =>
      !stat.level ||
      stat.level < this.currentLevel ||
      stat.accuracy < 0.95 ||
      stat.wordsPerMinute < 30;
    for (const stat of getLast3(this.statsLog)) {
      if (isBadStat(stat)) {
        return false;
      }
    }
    return true;
  }
}
