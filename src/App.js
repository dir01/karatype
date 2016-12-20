import React, { Component } from 'react';
import keydown from 'react-keydown';
import './App.css';


class App extends Component {
    render() {
        let trial = this.props.trial;
        return (
            <div className="App">
                <div id="text-to-type">
                    <span className="typed">{trial.typedTextPart}</span>
                    <span className="untyped">{trial.untypedTextPart}</span>
                </div>
            </div>
        );
    }

    componentWillReceiveProps({ keydown }) {
        if (keydown.event) {
            this.props.trial.tryChar(keydown.event.key);
            console.log(keydown.event);
        }
    }
}

export default keydown(App);
