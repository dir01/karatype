type TKeystroke = {
  char: string;
  date: Date;
};

export type TStats = {
  level: number | undefined;
  accuracy: number;
  wordsPerMinute: number;
  unproductiveKeystrokesRate?: number;
};

export interface IExercise {
  isOver: boolean;
  isStarted: boolean;
  progress: number;
  textToType: string;
  errorsIndexes: number[];
  index: number;
  level: number | undefined;
  activeKeys: string[];
  stats: TStats;
  tryChar(char: string, date?: Date): boolean | undefined;
}

export default class Exercise {
  public textToType: string;
  public loggedKeystrokes: TKeystroke[];
  public index: number;
  public errorsCount: number;
  public errorsIndexes: number[];
  public level: number | undefined;

  constructor(textToType: string, level?: number) {
    this.textToType = textToType;
    this.index = 0;
    this.errorsIndexes = [];
    this.errorsCount = 0;
    this.level = level;
    this.loggedKeystrokes = [];
  }

  public tryChar(char: string, date?: Date) {
    if (this.isOver) {
      return undefined;
    }

    this.loggedKeystrokes.push({
      char,
      date: date || new Date()
    });

    if (char.length > 1) {
      return this._trySpectialChar(char);
    }
    if (this._isCharCorrect(char)) {
      this._onCorrectChar();
      return true;
    } else {
      this._onIncorrectChar();
      return false;
    }
  }

  public _trySpectialChar(char: string) {
    if (char !== "Backspace" || this.index === 0) {
      return undefined;
    }
    this.index--;
    const idx = this.errorsIndexes.indexOf(this.index);
    if (idx !== -1) {
      this.errorsIndexes.splice(idx, 1);
    }
    return true;
  }

  get isStarted() {
    return this.index > 0;
  }

  get isOver() {
    return this.index === this.textToType.length;
  }

  get stats(): TStats {
    return {
      accuracy: this.accuracy,
      level: this.level,
      unproductiveKeystrokesRate: this.unproductiveKeystrokesRate,
      wordsPerMinute: this.wordsPerMinute
    };
  }

  get accuracy() {
    return 1 - this.errorsIndexes.length / this.index;
  }

  get unproductiveKeystrokesRate() {
    const charsCount = this.textToType.length;
    return ((this.loggedKeystrokes.length - charsCount) / charsCount) * 100;
  }

  get wordsPerMinute() {
    const typedChars = this.index + 1;
    const typedWords = Math.floor(typedChars / 5);
    const last = this.loggedKeystrokes[this.loggedKeystrokes.length - 1];
    const first = this.loggedKeystrokes[0];
    const seconds = (last.date.getTime() - first.date.getTime()) / 1000;
    const wpm = Math.floor((typedWords * 60) / seconds);
    return wpm;
  }

  get progress() {
    return (this.index / this.textToType.length) * 100;
  }

  get activeKeys() {
    if (this.isOver) {
      return [];
    }
    const char = this._getCurrentChar();
    const lower = char.toLowerCase();
    const isUpperCase = char !== lower;
    return isUpperCase ? [lower, "shift"] : [char];
  }

  public _onCorrectChar() {
    this.index++;
  }

  public _onIncorrectChar() {
    this.errorsIndexes.push(this.index);
    this.errorsCount++;
    this.index++;
  }

  public _isCharCorrect(char: string) {
    return this._getCurrentChar() === char;
  }

  public _getCurrentChar() {
    return this.textToType[this.index];
  }
}
