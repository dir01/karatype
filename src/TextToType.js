import React, { Component } from 'react';
import './TextToType.css';

export default class TextToType extends Component {
    render() {
        return (
            <div className="TextToType">{
                this.props.snippets.map((snippet, index) => {
                    return this.renderSnippet(snippet, index);
                })
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
