import React, { Component } from 'react';
import './App.css';
import keydown from 'react-keydown';
import TextToType from './TextToType';
import {Keyboard, layouts} from './Keyboard';


let soundPaths = {
    error: '/sounds/error.wav',
    keystroke: '/sounds/keystroke.wav'
};


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="text-container">
                    <TextToType trial={this.props.trial} />
                </div>
                <div className="keyboard-container">
                    <Keyboard layout={layouts.qwerty} activeKeys={this.props.trial.activeKeys}/>
                </div>
            </div>
        );
    }

    componentWillReceiveProps({ keydown }) {
        if (keydown.event) {
            console.log(keydown.event);
            let result = this.props.trial.tryChar(keydown.event.key);
            if (result === undefined) {
                return
            }
            this.playSound(result);
        }
    }

    playSound(isCorrect) {
        let path = soundPaths[isCorrect ? 'keystroke' : 'error'];
        new Audio(path).play();
    }

}

export default keydown(App);
