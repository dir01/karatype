import hebrew from "./hebrew";

describe("hebrew levels", () => {
  test("level 1", () => {
    const level = hebrew[0];
    expect(level.name).toEqual("Numbers");
    expect(level.challenges.map(ch => ch.english)).toMatchSnapshot();
    expect(level.challenges[0].text).toEqual("אפס אפס אפס אפס אפס אפס אפס אפס");
  });

  test("level 10", () => {
    expect(hebrew[9].challenges.map(ch => ch.original)).toMatchSnapshot();
    expect(hebrew[9].challenges[0].text).toEqual("פרחי מאי פרחי מאי פרחי מאי");
  });
});
