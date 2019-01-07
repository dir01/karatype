import classNames from "classnames";
import * as React from "react";
import { TLevel } from "src/core/Tutor";
import "./LevelSelector.css";

type Props = {
  className: string;
  levels: TLevel[];
  currentLevel: number;
  onLevelChange: (levelNumber: number) => void;
};
export default class LevelSelector extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    return (
      <select
        className={classNames("LevelSelector", this.props.className)}
        value={this.props.currentLevel}
        onChange={this.handleChange}
        tabIndex={-1}
      >
        {this._renderOptions()}
      </select>
    );
  }

  public _renderOptions() {
    return (this.props.levels || []).map((level, i) => {
      return (
        <option key={i} value={i}>
          Level {i + 1}: {level.name}
        </option>
      );
    });
  }

  public handleChange(event: React.ChangeEvent) {
    if (this.props.onLevelChange) {
      this.props.onLevelChange(
        parseInt((event.target as HTMLInputElement).value)
      );
    }
  }
}
