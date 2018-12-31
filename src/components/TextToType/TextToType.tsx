import classNames from "classnames";
import * as React from "react";

import "./TextToType.css";

type Props = {
  text: string;
  cursorIndex: number;
  errorsIndexes: number[];
  className?: string;
};

export default class TextToType extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.renderSnippet = this.renderSnippet.bind(this);
  }
  public render() {
    const snippets = textToSnippets(
      this.props.text,
      this.props.cursorIndex,
      this.props.errorsIndexes
    );
    const className = classNames("TextToType", this.props.className);
    return <div className={className}>{snippets.map(this.renderSnippet)}</div>;
  }

  public renderSnippet(snippet: TSnippet, index: number) {
    const newText = snippet.text.replace(/ /g, "<space> </space>");
    const className = classNames("TextToType__snippet", {
      "TextToType__snippet--current": snippet.type === "current",
      "TextToType__snippet--untyped": snippet.type === "untyped",
      "TextToType__snippet--error": snippet.type === "error",
      "TextToType__snippet--correct": snippet.type === "correct"
    });
    return (
      <span
        key={index}
        className={className}
        dangerouslySetInnerHTML={{ __html: newText }}
      />
    );
  }
}

export type TSnippet = {
  type: "correct" | "error" | "current" | "untyped";
  text: string;
};

export function textToSnippets(
  text: string,
  cursorIndex: number = 0,
  errorsIndexes: number[] = []
): TSnippet[] {
  const snippets: TSnippet[] = [];
  const idx = cursorIndex;
  errorsIndexes = errorsIndexes;
  if (idx) {
    const typedText = text.slice(0, idx);
    if (!errorsIndexes.length) {
      snippets.push({ type: "correct", text: typedText });
    } else {
      let correctText = "";
      let errorText = "";
      for (let i = 0; i < typedText.length; i++) {
        const isError = errorsIndexes.includes(i);
        if (isError) {
          errorText += typedText[i];
          if (correctText) {
            snippets.push({ type: "correct", text: correctText });
            correctText = "";
          }
        } else {
          correctText += typedText[i];
          if (errorText) {
            snippets.push({ type: "error", text: errorText });
            errorText = "";
          }
        }
      }
      if (errorText) {
        snippets.push({ type: "error", text: errorText });
      }
      if (correctText) {
        snippets.push({ type: "correct", text: correctText });
      }
    }
  }
  snippets.push({ type: "current", text: text.slice(idx, idx + 1) });
  snippets.push({ type: "untyped", text: text.slice(idx + 1) });
  return snippets;
}
