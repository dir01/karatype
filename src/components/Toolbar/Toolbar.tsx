import classNames from "classnames";
import * as React from "react";
import Indicator from "../Indicator/Indicator";
import LevelSelector from "../LevelSelector/LevelSelector";

import { TLevel } from "src/core/Tutor";
import "./Toolbar.css";

type Props = {
  className: string;
  currentLevel: number;
  levels: TLevel[];
  onSkip: () => void;
  text: string | null;
  onLevelChange: (level: number) => void;
  progress: number | null;
};

export default class Toolbar extends React.Component<Props> {
  public render() {
    return (
      <div className={classNames("Toolbar", this.props.className)}>
        <button
          className="Toolbar__button Toolbar__button--skip"
          onMouseUp={this.props.onSkip}
        />
        <Indicator
          className="Toolbar__Indicator"
          text={this.props.text}
          progress={this.props.progress}
        />
        <LevelSelector
          className="Toolbar__LevelSelector"
          levels={this.props.levels}
          currentLevel={this.props.currentLevel}
          onLevelChange={this.props.onLevelChange}
        />
      </div>
    );
  }
}
