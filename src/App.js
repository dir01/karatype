import React, { Component } from 'react';
import './App.css';
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
