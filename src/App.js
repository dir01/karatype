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
                    progress={ this.exercise.isStarted ? this.exercise.progress : null }
                    text={ this.exercise.isStarted ? null : 'Excercise is loaded. Start typing whenever ready' }
                    levels={ this.props.tutor.levels }
                    currentLevel={ this.props.tutor.currentLevel }
                    onLevelChange={ this.handleLevelChange.bind(this) }
                />
                <div className="text-container">
                    <TextToType
                        text={ this.exercise.textToType }
                        errorsIndexes={ this.exercise.errorsIndexes }
                        cursorIndex={ this.exercise.index }
                    />
                </div>
                <div className="keyboard-container">
                    <Keyboard layout={ layouts.qwerty } highlightKeys={ this.exercise.activeKeys }/>
                </div>
            </div>
        );
    }

    get exercise() {
        if (!this._exercise || this._exercise.isOver) {
            this._exercise = this.props.tutor.getNextExercise(this._exercise);
        }
        return this._exercise;
    }

    componentWillMount() {
        document.addEventListener('keydown', (event) => {
            let result = this.exercise.tryChar(event.key);
            if (result === undefined) {
                return;
            }
            this.playSound(result);
            this.forceUpdate();
        });
    }

    handleLevelChange(newLevel) {
        this.props.tutor.currentLevel = newLevel;
        this._exercise = null;
        this.forceUpdate();
    }

    playSound(isCorrect) {
        let path = soundPaths[isCorrect ? 'keystroke' : 'error'];
        new Audio(path).play();
    }

}

export default App;
