import React, { Component } from 'react';
import './App.css';
import TextToType from './TextToType';
import {Keyboard, layouts} from './Keyboard';
import Toolbar from './Toolbar';

let soundPaths = {
    error: '/sounds/error.wav',
    keystroke: '/sounds/keystroke.wav'
};


class App extends Component {
    render() {
        let toolbar = this.props.trial.isStarted ? (
            <Toolbar progress={ this.props.trial.progress } />
        ) : (
            <Toolbar text="Excercise is loaded. Start typing whenever ready."/>
        );
        return (
            <div className="App">
                { toolbar }
                <div className="text-container">
                    <TextToType trial={ this.props.trial } />
                </div>
                <div className="keyboard-container">
                    <Keyboard layout={ layouts.qwerty } activeKeys={ this.props.trial.activeKeys }/>
                </div>
            </div>
        );
    }

    componentWillMount() {
        document.addEventListener('keydown', (event) => {
            let result = this.props.trial.tryChar(event.key);
            if (result === undefined) {
                return;
            }
            this.playSound(result);
            this.forceUpdate();
        });
    }

    playSound(isCorrect) {
        let path = soundPaths[isCorrect ? 'keystroke' : 'error'];
        new Audio(path).play();
    }

}

export default App;
