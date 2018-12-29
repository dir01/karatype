import * as React from "react";
import { TChallenge, TLevel } from "src/core/Tutor";
import * as hebrew100data from "./hebrew100.json";

type TSample = {
  original: string;
  romanization: string;
  english: string;
};

type TWord = {
  original: string;
  class: string;
  gender: string;
  romanization: string;
  english: string;
};

const words: TWord[] = hebrew100data.map((item: any) => item.word);
const samples: TSample[] = hebrew100data
  .map((item: any) => item.sample as TSample)
  .filter(s => s.english);

const mkLevels = (): TLevel[] => [
  mkWordLevel("Numbers", [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
  ]),
  mkWordLevel("Politeness", [
    "Hello.",
    "Good morning.",
    "Nice to meet you.",
    "Good afternoon.",
    "Good evening.",
    "Good night.",
    "How are you?",
    "Thank you!",
    "Delicious!",
    "I'm...(name).",
    "Goodbye.",
    "Yes.",
    "No."
  ]),
  mkWordLevel("Verbs", [
    "can",
    "use",
    "do",
    "go",
    "come",
    "laugh",
    "make",
    "see"
  ]),
  mkWordLevel("Adjectives", [
    "far",
    "small",
    "good",
    "beautiful",
    "ugly",
    "difficult",
    "easy",
    "bad",
    "near"
  ]),
  mkWordLevel("Food", [
    "water",
    "beef",
    "pork",
    "chicken",
    "lamb",
    "fish",
    "coffee",
    "beer",
    "tea",
    "wine"
  ]),
  mkWordLevel("Body", [
    "foot",
    "leg",
    "head",
    "arm",
    "hand",
    "finger",
    "body",
    "stomach",
    "back",
    "chest"
  ]),
  mkWordLevel("Time", [
    "week",
    "year",
    "today",
    "tomorrow",
    "yesterday",
    "calendar",
    "second",
    "hour",
    "minute",
    "o'clock",
    "clock",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]),
  mkWordLevel("Jobs", [
    "nurse",
    "employee",
    "police officer",
    "cook",
    "engineer",
    "doctor",
    "manager",
    "teacher",
    "programmer"
  ]),
  ...mkSampleChallengeList()
];

const mkWordChallenge = (word: TWord): TChallenge => ({
  text: `${word.original} `.repeat(20),
  description: ((
    <span>
      <span className="romanization">{word.romanization}</span>
      <span className="gender">({word.gender})</span>
      <span className="hyphen">&mdash;</span>
      <span className="translation">{word.english}</span>
      <span className="class">{word.class}</span>
    </span>
  ) as any) as string,
  ...word
});

const mkSampleChallenge = (sample: TSample): TChallenge => ({
  text: `${sample.original} `.repeat(8),
  description: ((
    <span>
      <span className="romanization">{sample.romanization}</span>
      <span className="hyphen">&mdash;</span>
      <span className="translation">{sample.english}</span>
    </span>
  ) as any) as string,
  ...sample
});

const mkWordLevel = (name: string, translations: string[]): TLevel => ({
  name,
  challenges: words
    .filter(i => translations.includes(i.english))
    .map(mkWordChallenge)
});

const mkSampleChallengeList = (): TLevel[] => {
  samples.sort((s1, s2) => s1.original.length - s2.original.length);
  const chunks = splitIntoChunks(samples, 8);
  return chunks.map((chunkSamples: TSample[], i: number) => ({
    name: `Phrases ${i + 1}`,
    challenges: chunkSamples.map(mkSampleChallenge)
  }));
};

function splitIntoChunks<T>(array: T[], size: number): T[][] {
  const chunkedArr: T[][] = [];
  let index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
}

export default mkLevels();
