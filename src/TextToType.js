import React, { Component } from 'react';

export default class TextToType extends Component {
    render() {
        return (
            <div id="text-to-type">
                {
                    this.props.trial.snippets.map((snippet, index) => {
                        return <span
                            key={index}
                            className={snippet.type}
                            >{snippet.text}</span>;
                    })
                }
            </div>
        );
    }
};
