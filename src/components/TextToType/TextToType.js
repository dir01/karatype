import React, { Component } from 'react';
import classNames from 'classnames';

import './TextToType.css';


export default class TextToType extends Component {
    render() {
        const snippets = textToSnippets(
            this.props.text,
            this.props.cursorIndex,
            this.props.errorsIndexes
        );
        const className = classNames('TextToType', this.props.className);
        return (
            <div className={ className }>{
                snippets.map(this.renderSnippet.bind(this))
            }</div>
        );
    }

    renderSnippet(snippet, index) {
        const newText = snippet.text.replace(/ /g, '<space> </space>');
        const className = classNames('TextToType__snippet', {
            'TextToType__snippet--current': snippet.type === 'current',
            'TextToType__snippet--untyped': snippet.type === 'untyped',
            'TextToType__snippet--error': snippet.type === 'error',
            'TextToType__snippet--correct': snippet.type === 'correct'
        });
        return (
            <span 
                key={ index }
                className={ className }
                dangerouslySetInnerHTML={ {__html: newText} } 
            />
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
