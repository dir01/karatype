import React, { Component } from 'react';
import './TextToType.css';

export default class TextToType extends Component {
    render() {
        const snippets = textToSnippets(
            this.props.text,
            this.props.cursorIndex,
            this.props.errorsIndexes
        );
        return (
            <div className="TextToType">{
                snippets.map(this.renderSnippet.bind(this))
            }</div>
        );
    }

    renderSnippet(snippet, index) {
        if (snippet.type === 'error') {
            return this.renderErrorSnippet(snippet, index);
        } else {
            return this.renderNormalSnippet(snippet, index);
        }
    }

    renderNormalSnippet(snippet, index) {
        return (
            <span
                key={ index }
                className={ snippet.type }
            >{snippet.text}</span>
        );
    }

    renderErrorSnippet(snippet, index) {
        let newText = (
            '<span class="error">'
            + snippet.text.replace(/ /g, '</span><span class="error space"> </span><span class="error">')
            + '</span>'
        );
        return (
            <span key={ index } dangerouslySetInnerHTML={ {__html: newText} } />
        );
    }
}


export function textToSnippets (text, cursorIndex, errorsIndexes) {
    let snippets = [];
    let idx = cursorIndex || 0;
    errorsIndexes = errorsIndexes || [];
    if (idx) {
        let typedText = text.slice(0, idx);
        if (!errorsIndexes.length) {
            snippets.push({type: 'correct', text: typedText});
        } else {
            var correctText = '', errorText = '';
            for (var i = 0; i < typedText.length; i++) {
                let isError = errorsIndexes.includes(i);
                if (isError) {
                    errorText += typedText[i];
                    if (correctText) {
                        snippets.push({type: 'correct', text: correctText});
                        correctText = '';
                    }
                } else {
                    correctText += typedText[i];
                    if (errorText) {
                        snippets.push({type: 'error', text: errorText});
                        errorText = '';
                    }
                }
            }
            errorText && snippets.push({type: 'error', text: errorText});
            correctText && snippets.push({type: 'correct', text: correctText});
        }
    }
    snippets.push({type: 'current', text: text.slice(idx, idx + 1)});
    snippets.push({type: 'untyped', text: text.slice(idx + 1)});
    return snippets;
}
