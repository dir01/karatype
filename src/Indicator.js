import React, { Component } from 'react';
import './Indicator.css';

export default class Indicator extends Component {
    render() {
        return (
            <div id="Indicator">{
                this.props.text ? this.text : this.props.progress ? this.progressBar : ''
            }</div>
        );
    }
    get text() {
        return <span dangerouslySetInnerHTML={ {__html: this.props.text} } />; 
    }
    get progressBar() {
        return <div className="progressBar"><div style={ {width: `${this.props.progress}%`} }/></div>;
    }
}
