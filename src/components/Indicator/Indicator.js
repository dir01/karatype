import React, { Component } from 'react';
import classNames from 'classnames';

import './Indicator.css';


export default class Indicator extends Component {
    render() {
        var content = '';
        if (this.props.text) {
            content = this.renderText();
        } else if (this.props.progress) {
            content = this.renderProgressBar();
        }
        const className = classNames('Indicator', this.props.className);
        return <div className={ className } >{content}</div>;
    }

    renderText() {
        return <span
            className="Indicator__text"
            dangerouslySetInnerHTML={ {__html: this.props.text} }
        />; 
    }

    renderProgressBar() {
        return <div
            className="Indicator__progressbar"
        ><div style={ {width: `${this.props.progress}%`} }/></div>;
    }
}
