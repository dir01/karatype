import classNames from "classnames";
import * as React from "react";

import "./Indicator.css";

type Props = {
  className?: string;
  text?: string | null;
  progress?: number | null;
};
export default class Indicator extends React.Component<Props> {
  public render() {
    let content;
    if (this.props.text) {
      content = this.renderText();
    } else if (this.props.progress) {
      content = this.renderProgressBar();
    }
    const className = classNames("Indicator", this.props.className);
    return <div className={className}>{content}</div>;
  }

  public renderText() {
    return (
      <span
        className="Indicator__text"
        dangerouslySetInnerHTML={{ __html: this.props.text || "" }}
      />
    );
  }

  public renderProgressBar() {
    return (
      <div className="Indicator__progressbar">
        <div style={{ width: `${this.props.progress}%` }} />
      </div>
    );
  }
}
