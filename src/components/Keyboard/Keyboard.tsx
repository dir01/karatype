import classNames from "classnames";
import * as React from "react";

import { LayoutChar, TLayout } from "src/layouts/KeyboardLayout";
import "./Keyboard.css";

type Props = {
  layout: TLayout;
  className?: string;
  highlightKeys?: string[];
};

export default class Keyboard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.renderKey = this.renderKey.bind(this);
    this.renderKeyRow = this.renderKeyRow.bind(this);
  }

  public render() {
    const className = classNames("Keyboard", this.props.className);
    return (
      <div className={className}>
        {this.props.layout.map(this.renderKeyRow)}
      </div>
    );
  }

  public renderKeyRow(row: LayoutChar[], id: number) {
    return (
      <div className="Keyboard__Row" key={id}>
        {row.map(this.renderKey)}
      </div>
    );
  }

  public renderKey(key: LayoutChar, i: number) {
    const char = key.key.replace("space", " ");
    const className = classNames(
      "Keyboard__Key",
      `Keyboard__Key--${key.className}`,
      {
        "Keyboard__Key--highlighted":
          (this.props.highlightKeys || []).indexOf(char) >= 0
      }
    );
    return (
      <div className={className} key={`${key.key}_${i}`}>
        {key.label || key.key}
      </div>
    );
  }
}
