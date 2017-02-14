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
        return (
            <div className="App">
                <Toolbar
                    progress={ this.trial.isStarted ? this.trial.progress : null }
                    text={ this.trial.isStarted ? null : 'Excercise is loaded. Start typing whenever ready' }
                    levels={ this.props.tutor.levels }
                    currentLevel={ this.props.tutor.currentLevel }
                    onLevelChange={ this.handleLevelChange.bind(this) }
                />
                <div className="text-container">
                    <TextToType snippets={ this.trial.snippets } />
                </div>
                <div className="keyboard-container">
                    <Keyboard layout={ layouts.qwerty } activeKeys={ this.trial.activeKeys }/>
                </div>
            </div>
        );
    }

    get trial() {
        if (!this._trial || this._trial.isOver) {
            this._trial = this.props.tutor.getNextTrial(this._trial);
        }
        return this._trial;
    }

    componentWillMount() {
        document.addEventListener('keydown', (event) => {
            let result = this.trial.tryChar(event.key);
            if (result === undefined) {
                return;
            }
            this.playSound(result);
            this.forceUpdate();
        });
    }

    handleLevelChange(newLevel) {
        this.props.tutor.currentLevel = newLevel;
        this._trial = null;
        this.forceUpdate();
    }

    playSound(isCorrect) {
        let path = soundPaths[isCorrect ? 'keystroke' : 'error'];
        new Audio(path).play();
    }

}

export default App;
