import React, { Component } from 'react';
import './Indicator.css';

export default class Indicator extends Component {
    render() {
        var content;
        if (this.props.text) {
            content = this.renderText();
        } else if (this.props.progress) {
            content = this.renderProgressBar();
        } else {
            content = '';
        }
        return (<div id="Indicator">{content}</div>);
    }

    renderText() {
        return <span dangerouslySetInnerHTML={ {__html: this.props.text} } />; 
    }

    renderProgressBar() {
        return <div className="progressBar"><div style={ {width: `${this.props.progress}%`} }/></div>;
    }
}
