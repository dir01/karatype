import { shallow } from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import LevelSelector from "./components/LevelSelector/LevelSelector";
import Toolbar from "./components/Toolbar/Toolbar";
import Exercise from "./core/Exercise";
import { ITutor } from "./core/Tutor";

const tutor = ({
  getNextExercise: () => {
    return new Exercise("Hello");
  },
  currentLevel: 0
} as unknown) as ITutor;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App tutor={tutor} />, div);
});

describe("LevelSelector", () => {
  it("has level 0 when just started", () => {
    const wrapper = shallow(<App tutor={tutor} />);
    const select = wrapper
      .find(Toolbar)
      .dive()
      .find(LevelSelector)
      .dive()
      .find("select")
      .getElement();
    expect(select.props.value).toEqual(0);
  });
});
