import Exercise from "./Exercise";

describe("Exercise", () => {
  describe("Exercise.tryChar internals", () => {
    it("saves time of a keystroke", () => {
      const exercise = new Exercise("Hi");
      exercise.tryChar("X");
      const loggedTime = exercise.loggedKeystrokes[0].date.getTime();
      const now = new Date().getTime();
      expect(now - loggedTime).not.toBeGreaterThan(1);
    });

    it("allows manually setting keystroke time", () => {
      const exercise = new Exercise("Hi");
      exercise.tryChar("s", new Date(1000));
      expect(exercise.loggedKeystrokes[0].date).toEqual(new Date(1000));
    });
  });

  describe('Correct last char: new Exercise("H").tryChar("H")', () => {
    const exercise = new Exercise("H");
    const isCorrectChar = exercise.tryChar("H");

    it('returns true since "H" is indeed "H" ', () => {
      expect(isCorrectChar).toBe(true);
    });

    it("increases index", () => {
      expect(exercise.index).toEqual(1);
    });

    it("ends game", () => {
      expect(exercise.isOver).toBe(true);
    });

    it("has empty activeChars", () => {
      expect(exercise.activeKeys).toEqual([]);
    });

    it("makes exercise stop accepting chars", () => {
      expect(exercise.tryChar("W")).toBeUndefined();
    });
  });

  describe('Incorrect non-last char: new Exercise("He").tryChar("h")', () => {
    const exercise = new Exercise("He");
    const isCorrectChar = exercise.tryChar("h");

    it('returns false since "h" is not "H" ', () => {
      expect(isCorrectChar).toBe(false);
    });

    it("increases index", () => {
      expect(exercise.index).toEqual(1);
    });

    it("increases errors count", () => {
      expect(exercise.errorsCount).toEqual(1);
    });

    it("saves error index", () => {
      expect(exercise.errorsIndexes).toEqual([0]);
    });

    it("game is not over since we have more stuff to type", () => {
      expect(exercise.isOver).toBe(false);
    });
  });

  describe("Exercise control keys handling", () => {
    let exercise: Exercise;

    beforeEach(() => {
      exercise = new Exercise("foo bar");
    });

    it("denies Backspace when nothing was typed yet", () => {
      expect(exercise.tryChar("Backspace")).toBeUndefined();
      expect(exercise.index).toEqual(0);
    });

    it("handles Backspace after correct char", () => {
      exercise.tryChar("f");
      expect(exercise.index).toEqual(1);
      const ret = exercise.tryChar("Backspace");
      expect(ret).toBe(true);
      expect(exercise.index).toEqual(0);
    });

    it("handles Backspace after error", () => {
      exercise.tryChar("W");
      expect(exercise.index).toEqual(1);
      expect(exercise.errorsIndexes).toEqual([0]);

      const ret = exercise.tryChar("Backspace");
      expect(ret).toBe(true);
      expect(exercise.index).toEqual(0);
      expect(exercise.errorsIndexes).toEqual([]);
    });

    it("handles Backspace after error and space", () => {
      exercise.tryChar("f");
      exercise.tryChar("o");
      exercise.tryChar("X");
      exercise.tryChar(" ");
      expect(exercise.index).toEqual(4);
      expect(exercise.errorsIndexes).toEqual([2]);
      exercise.tryChar("Backspace");
      expect(exercise.index).toEqual(3);
      expect(exercise.errorsIndexes).toEqual([2]);
    });

    it("denies stuff like control", () => {
      expect(exercise.tryChar("Ctrl")).toBeUndefined();
    });
  });

  describe("Exercise.progress", () => {
    const exercise = new Exercise("Hello");

    it("is 0 in the beggining", () => {
      expect(exercise.progress).toEqual(0);
    });

    it("is 20 when 1 of 5 letters typed", () => {
      exercise.tryChar("H");
      expect(exercise.progress).toEqual(20);
    });
  });

  describe("Exercise stats", () => {
    it("calculates accuracy", () => {
      const exercise = new Exercise("Hello");
      exercise.tryChar("H");
      exercise.tryChar("e");
      exercise.tryChar("l");
      exercise.tryChar("l");
      expect(exercise.stats.accuracy).toEqual(1);
      exercise.tryChar("x");
      expect(exercise.stats.accuracy).toEqual(1 - 1 / 5);
    });

    it("ignores fixed errors while calculating accuracy", () => {
      const exercise = new Exercise("Hello");
      exercise.tryChar("H");
      exercise.tryChar("e");
      expect(exercise.stats.accuracy).toEqual(1);
      exercise.tryChar("k");
      expect(exercise.stats.accuracy).toEqual(1 - 1 / 3);
      exercise.tryChar("Backspace");
      expect(exercise.stats.accuracy).toEqual(1);
    });

    it("calculates unproductive keystrokes rate", () => {
      const exercise = new Exercise("Hello");
      ["h", "Backspace", "H", "e", "l", "l", "o"].forEach(chr => {
        exercise.tryChar(chr);
      });
      expect(exercise.stats.unproductiveKeystrokesRate).toEqual(
        ((7 - 5) / 5) * 100
      );
    });

    it("calculates WPM (words per minute)", () => {
      const exercise = new Exercise("Hello world!");
      [
        ["H", "22:46:24"],
        ["e", "22:46:25"],
        ["l", "22:46:26"],
        ["l", "22:46:26"],
        ["o", "22:46:26"],
        [" ", "22:46:27"],
        ["w", "22:46:27"],
        ["o", "22:46:27"],
        ["r", "22:46:27"],
        ["l", "22:46:27"],
        ["d", "22:46:27"],
        ["!", "22:46:27"]
      ].forEach(i => {
        const char = i[0];
        const time = i[1];
        const date = new Date("Thu Jan 26 2017 " + time + " GMT+0300 (MSK)");
        exercise.tryChar(char, date);
      });
      expect(exercise.wordsPerMinute).toEqual(40);
    });
  });
});
